import express from 'express';
import { bookController } from './book.controller';
const router = express.Router();



router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:productId', bookController.getBookById);
router.delete('/:productId', bookController.deleteBook);



export const bookRoutes = router;