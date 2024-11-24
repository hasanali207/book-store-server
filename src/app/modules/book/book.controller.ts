import { Request, Response } from 'express';
import { bookService } from './book.service';
import { bookSchemaValidation } from './book.validation';
import { bookModel } from './book.model';

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

    const result = await bookService.getAllBooks(searchTerm as string | undefined);
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




// Export with consistent naming
export const bookController = {
  createBook,
  getAllBooks
};
