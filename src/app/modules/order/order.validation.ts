import { z } from 'zod';

const bookOrderValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email({
      message: 'Email Address format is not valid.',
    }),

  product: z.string({
    required_error: 'Product is required.',
  }),

  totalPrice: z
    .number({
      message: 'Total Price must be a number.',
    })
    .nonnegative({
      message: 'Total price must be zero or greater.',
    })
    .refine((value) => value > 0, {
      message: 'Total price must be greater than zero.',
    }),

  quantity: z
    .number({
      message: 'Quantity must be a number.',
    })
    .positive({
      message: 'Quantity must be greater than zero.',
    })
    .int({
      message: 'Quantity must be an integer.',
    }),
});

export default bookOrderValidationSchema;
