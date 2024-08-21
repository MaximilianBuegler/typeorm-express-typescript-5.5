import { Request, Response, NextFunction } from 'express';

import * as dataSource from 'orm/dbCreateConnection';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

/**
 * @swagger
 *
 * /v1/users/{id}:
 *   delete:
 *     description: Delete a user
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
export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', [`User with id:${id} doesn't exists.`]);
      return next(customError);
    }
    userRepository.delete(id);

    res.customSuccess(200, 'User successfully deleted.', { id: user.id, name: user.name, email: user.email });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
