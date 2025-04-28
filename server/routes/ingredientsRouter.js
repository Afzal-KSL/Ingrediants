import express from 'express';
import { uploadReceipe, getReceipe, search, uploads} from '../controllers/ingredientsController.js';
import { likeRecipe, commentOnRecipe, readLike, readComment } from '../controllers/homeController.js';
import authorize from '../middleware/authMiddleware.js';

const ingredientsRouter = express.Router();

ingredientsRouter.post('/upload', authorize, uploads.single('image'), uploadReceipe);

ingredientsRouter.get('/', authorize, getReceipe);

ingredientsRouter.get('/search', authorize, search);

ingredientsRouter.get('/:id/like', authorize, readLike);

ingredientsRouter.post('/:id/like', authorize, likeRecipe);

ingredientsRouter.get('/:id/comment', authorize, readComment);

ingredientsRouter.post('/:id/comment', authorize, commentOnRecipe);

export default ingredientsRouter;