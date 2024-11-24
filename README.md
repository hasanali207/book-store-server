# Book-store-Server

This code defines a schema for a Book store server System using Mongoose for a MongoDB database. It includes key details about each book, allowing you to manage inventory for a bookstore or similar application.

### 1. CloneRepository

```bash
git clone https://github.com/hasanali207/book-store-server.git
cd book-store-server
```

## API Endpoints

### Product Endpoints

- **GET** `/api/products` - Retrieve all products.
- **GET** `/api/products/productId` - Retrieve a specific product by ID.
- **POST** `/api/products/` - Add a new product.
- **PUT** `/api/products/productId` - Update an existing product.
- **DELETE** `/api/products/productId` - Delete a product by ID.

### Order Endpoints

- **GET** `/api/orders/revenue` - Retrieve all revenue.
- **POST** `/api/orders/` - Add a new Order. /api/orders

---

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
DATABASE_URL=DB_URL
NODE_ENV=development
```

## How to Run the Project

## Development

If you're working on the code and want to quickly see changes in real-time, use the following command. It will run the project in development mode with hot-reloading, so changes will be reflected immediately without needing to restart the server.

```bash
npm run dev
```

This will run the server using ts-node-dev and monitor for any changes in your TypeScript files.

## Production

Before deploying the project to a production environment, you need to compile the TypeScript code into JavaScript. Use the following two commands to prepare the project for production:

First, build the project:

```bash
npm run build
```

This will compile the TypeScript code into JavaScript files and place them in the dist/ directory.

After building the project, run the production server:

```bash
npm run prod
```

This will start the server using the compiled server.js file from the dist/ folder.

## Deploy to Vercel

Once your project is ready and you want to deploy it to Vercel, simply use the following command. This will deploy your project to Vercel and make it live:

```bash
npm run deploy
```
