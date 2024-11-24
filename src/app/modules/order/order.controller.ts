import { Request, Response } from 'express';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = req.body;

    // Validate request body
    if (!order.product || !order.quantity) {
      res.status(400).json({
        status: false,
        message: "Product and quantity are required",
      });
      return;
    }

    const result = await orderService.createNewOrderInDb(order);

    res.status(201).json({
      status: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while creating the order',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};


const calculateRevenue = async (req: Request, res: Response) => {
    try {
      const result = await orderService.calculateTotalRevenue();
  
      res.status(200).json({
        status: true,
        message: "Revenue calculated successfully",
        data: {
          totalRevenue: result,
        },
      });
    } catch (error) {
        res.status(500).json({
          message: 'An error occurred while deleting Book ',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: null,
        });
      }
  };


export const orderController = {
  createOrder,
  calculateRevenue
};
