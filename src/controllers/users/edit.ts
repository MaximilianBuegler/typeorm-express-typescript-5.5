import { Request, Response, NextFunction } from 'express';

import * as dataSource from 'orm/dbCreateConnection';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

/**
 * @swagger
 *
 * /v1/users/{id}:
 *   patch:
 *     description: Edit a user
 *     security:
 *       - BearerAuth:
 *         - write
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: The user ID
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *             schema:
 *               properties:
 *                username:
 *                  type: string
 *                name:
 *                  type: string
 *     responses:
 *       200:
 *         description: login
 */
export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const { username, name } = req.body;

  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, 'General', `User with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }

    user.username = username;
    user.name = name;

    try {
      await userRepository.save(user);
      res.customSuccess(200, 'User successfully saved.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `User '${user.email}' can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
