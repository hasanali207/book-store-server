import { TBook } from "./book.interface";
import { bookModel } from "./book.model";



const createBookInDB = async (book: TBook) => {
    const result = await bookModel.create(book);
    return result;
  };

  export const bookService  ={
    createBookInDB
  }