
import { bookModel } from '../book/book.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createNewOrderInDb = async (order: TOrder) => {
  const productId = order.product;
  const productQuantity = order.quantity;

  // Fetch product details
  const product = await bookModel.findById(productId);
  if (!product) {
    throw new Error('Product not found or unavailable');
  }

  // Check stock
  if (product.quantity < productQuantity) {
    throw new Error('Not enough stock available');
  }

  // Update product stock
  await bookModel.findByIdAndUpdate(
    productId,
    {
      $inc: { quantity: -productQuantity },
      $set: { inStock: product.quantity - productQuantity > 0 },
    },
    { new: true }
  );

  // Create and save the order
  const newOrderData = new OrderModel(order);
  await newOrderData.save();

  return newOrderData;
};


  
  const calculateTotalRevenue = async () => {
    const result = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);
    return result[0].totalRevenue;
  };



export const orderService = {
  createNewOrderInDb,
  calculateTotalRevenue
};
