import { Router } from 'express';

import auth from './auth';
import users from './users';
import health from './health';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/health', health);

export default router;
