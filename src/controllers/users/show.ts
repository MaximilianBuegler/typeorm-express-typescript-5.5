import { Request, Response, NextFunction } from 'express';

import * as dataSource from 'orm/dbCreateConnection';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

/**
 * @swagger
 *
 * /v1/users/{id}:
 *   get:
 *     description: Show a user
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
 *     responses:
 *       200:
 *         description: login
 */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'name', 'email', 'role', 'language', 'created_at', 'updated_at'],
    });

    if (!user) {
      const customError = new CustomError(404, 'General', `User with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'User found', user);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
