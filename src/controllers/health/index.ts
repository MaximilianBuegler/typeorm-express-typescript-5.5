import { Request, Response, NextFunction } from 'express';

import * as dataSource from 'orm/dbCreateConnection';
import { CustomError } from 'utils/response/custom-error/CustomError';

/**
 * @swagger
 *
 * /v1/health:
 *   get:
 *     description: Health check
 *     produces:
 *       - 200 OK
 *     responses:
 *       200:
 *         description: OK
 */
export const health = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    res.customSuccess(200, 'OK');
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Health check failed.`, null, err);
    return next(customError);
  }
};
