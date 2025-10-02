// node modules
import { Router } from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcrypt';

// custom modules
import expressRateLimit from '@/lib/expressRateLimit';

//controllers
import register from '@/controllers/auth/register';

// middlewares
import validationError from '@/middlewares/validationError';

const router = Router();

router.post(
  '/register',
  expressRateLimit('passwordReset'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Valid email is required')
    .custom(async (value) => {
      // TODO after making user model
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['user', 'admin'])
    .withMessage('Role not supported'),
  validationError,
  register,
);

export default router;
