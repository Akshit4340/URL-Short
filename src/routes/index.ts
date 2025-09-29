// node modules
import { Router } from 'express';

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

export default router;
