import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const BookOrderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = model<TOrder>('Order', BookOrderSchema);
