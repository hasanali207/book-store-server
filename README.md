# Book-store-Server






## API Endpoints

### Product Endpoints
- **GET** `/` - Retrieve all products.
- **GET** `/:productId` - Retrieve a specific product by ID.
- **POST** `/` - Add a new product.
- **PUT** `/:productId` - Update an existing product.
- **DELETE** `/:productId` - Delete a product by ID.



---



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
