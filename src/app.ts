import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

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
