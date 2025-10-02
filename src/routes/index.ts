// node modules
import { Router } from 'express';

// routes
import authRoutes from '@/routes/auth';

// initialize express router
const router = Router();

// default route
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'ok',
    version: '1.0.0',
    docs: '',
    timestamp: new Date().toISOString(),
  });
});

// auth routes
router.use('/auth', authRoutes);

export default router;
