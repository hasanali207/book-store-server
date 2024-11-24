import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { bookRoutes } from './app/modules/book/book.route';
import { orderRoutes } from './app/modules/order/order.routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/products', bookRoutes);
app.use('/api/orders', orderRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Book Store Server Rnning 😎');
});


app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: { message: 'Route not found' },
    stack: null,
  });
});

export default app;
