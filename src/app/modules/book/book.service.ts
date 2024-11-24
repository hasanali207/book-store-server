import { TBook } from "./book.interface";
import { bookModel } from "./book.model";



const createBookInDB = async (book: TBook) => {
    const result = await bookModel.create(book);
    return result;
  };

const getAllBooksfromDb = async (searchItem: Record<string, unknown> = {}) => {
    const { searchTerm } = searchItem;
  
    if (!searchTerm) {
      return await bookModel.find();
    }
  
    return await bookModel.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: searchTerm, $options: "i" } },
            { author: { $regex: searchTerm, $options: "i" } },
            { category: { $regex: searchTerm, $options: "i" } },
          ],
        },
      },
    ]);
};

const getBookByIdFromDb = async (_id: string) => {
    return await bookModel.findById({_id});
};


  






  export const bookService  ={
    createBookInDB,
    getAllBooksfromDb,
    getBookByIdFromDb
  }