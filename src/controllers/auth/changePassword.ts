import { NextFunction, Request, Response } from 'express';

import * as dataSource from 'orm/dbCreateConnection';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

/**
 * @swagger
 *
 * /v1/auth/change-password:
 *   post:
 *     description: Change password
 *     security:
 *       - BearerAuth:
 *         - write
 *     produces:
 *       - application/json
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *             schema:
 *               properties:
 *                password:
 *                  type: string
 *               passwordNew:
 *                  type: string
 *     responses:
 *       200:
 *         description: changed password
 */
export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password, passwordNew } = req.body;
  const { id, name } = req.jwtPayload;

  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', [`User ${name} not found.`]);
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(400, 'General', 'Not Found', ['Incorrect password']);
      return next(customError);
    }

    user.password = passwordNew;
    user.hashPassword();
    await userRepository.save(user);

    res.customSuccess(200, 'Password successfully changed.');
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
