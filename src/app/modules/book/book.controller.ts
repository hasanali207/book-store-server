import { Request, Response } from 'express';
import { ZodError } from 'zod';
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
      message: 'Book item created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
        res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
        stack: error.stack,
      });
    }

    // Handle other errors
    res.status(500).json({
      message: 'An error occurred while creating the book',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : null,
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  
  try {
    const { searchTerm } = req.query;

    const result = await bookService.getAllBooksfromDb(searchTerm as string);
    res.status(200).json({
      status: true,
      message: "Books retrieved successfully",
      data: result,
    });
  }
  catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching Book ',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: null,
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await bookService.getBookByIdFromDb(productId);
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching Book ',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: null,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const upDateData = req.body;
    const result = await bookService.updateBookByIdFromDb(
      productId,
      upDateData,
    );
    res.json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching Book ',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: null,
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
  deleteBook,
  updateBook,
};
