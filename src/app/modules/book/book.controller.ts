import { Request, Response } from 'express';
import { bookService } from './book.service';
import { bookSchemaValidation } from './book.validation';

const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = req.body;

    // Validate the book data using Zod
    const validatedBook = bookSchemaValidation.parse(book);

    // Save the book in the database
    const result = await bookService.createBookInDB(validatedBook);

    // Send success response
    res.status(201).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    console.error(err);

    // Handle validation errors specifically if Zod throws them
    if (err.name === 'ZodError') {
      return res.status(400).json({
        message: 'Validation error',
        success: false,
        error: err.errors, // Zod-specific error details
      });
    }

    // Handle general errors
    res.status(500).json({
      message: 'Error creating book',
      success: false,
      error: err.message || String(err),
    });
  }
};


const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await bookService.getAllBooksfromDb(searchTerm as string | undefined);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
      error: err,
    });
  }
};


const getBookById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await bookService.getBookByIdFromDb(productId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};


const deleteBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await bookService.deleteBookByIdFromDb(productId);
    if (result) {
      res.status(200).json({
        message: 'A Book item deleted successfully.',
        success: true, 
        data: {},
      });
    } else {
      res.status(400).json({
        message: 'Failed to delete the Book',
        success: false,
        data: {},
        stack: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while deleting Book ',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: null,
    });
  }
};





// Export with consistent naming
export const bookController = {
  createBook,
  getAllBooks,
  getBookById,
  deleteBook
};
