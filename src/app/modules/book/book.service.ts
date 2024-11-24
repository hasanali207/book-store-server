import { TBook } from "./book.interface";
import { bookModel } from "./book.model";



const createBookInDB = async (book: TBook) => {
    const result = await bookModel.create(book);
    return result;
  };

  const getAllBooksfromDb = async (searchTerm: string) => {
    let result;
    if (searchTerm) {
      result = await bookModel.find({
        $or: [
          { title: { $eq: searchTerm } },
          { author: { $eq: searchTerm } },
          { category: { $eq: searchTerm } },
        ],
      });
    } else {
      result = await bookModel.find({});
    }
  
    return result;
  };

const getBookByIdFromDb = async (_id: string) => {
    return await bookModel.findById({_id});
};

const updateBookByIdFromDb = async (_id: string, book: Partial<TBook>) => {
const result = await bookModel.findOneAndUpdate({_id}, book, {new:true})
return result

}

const deleteBookByIdFromDb = async (_id: string) => {
  const result = await bookModel.findByIdAndDelete({ _id });
return result;
}
  






  export const bookService  ={
    createBookInDB,
    getAllBooksfromDb,
    getBookByIdFromDb,
    deleteBookByIdFromDb,
    updateBookByIdFromDb
  }