import { z } from 'zod';

export const bookSchemaValidation = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  author: z
    .string({
      required_error: 'Author is required',
    })
    .trim(),
  price: z
    .number({
      required_error: 'Price is required',
    })
    .positive('Price must be a positive number'),
  category: z.enum(
    ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
    {
      required_error: 'Category is required',
      invalid_type_error: 'category is not valid',
    },
  ),
  description: z.string({
    required_error: 'Description is required',
  }),
  quantity: z
    .number({
      required_error: 'Quantity is required',
    })
    .nonnegative('Quantity must be a positive number'),
  inStock: z.boolean({
    required_error: 'InStock is required',
  }),
});