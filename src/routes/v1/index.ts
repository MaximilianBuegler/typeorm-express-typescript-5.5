import { Router } from 'express';

import auth from './auth';
import health from './health';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/health', health);

export default router;
