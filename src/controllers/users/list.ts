import { Request, Response, NextFunction } from 'express';

import * as dataSource from 'orm/dbCreateConnection';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

/**
 * @swagger
 *
 * /v1/users:
 *   get:
 *     description: List all users
 *     security:
 *       - BearerAuth:
 *         - write
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: login
 */
export const list = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = dataSource.getRepository(User);
  try {
    const users = await userRepository.find({
      select: ['id', 'username', 'name', 'email', 'role', 'language', 'created_at', 'updated_at'],
    });
    res.customSuccess(200, 'List of users.', users);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};
