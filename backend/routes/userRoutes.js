import express from 'express';
import {
  authUser,
  registerUser,
  updateUserProfile,
  getUserProfile,
  logoutUser,
} from '../controller/index.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export { router as userRouter };
