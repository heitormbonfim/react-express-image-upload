# Image Upload System

This is a simple image upload and compression system built with modern web technologies.

## Technologies Used

### Client Side

- **ReactJS**
- **TypeScript**
- **TailwindCSS**

### Server Side

- **ExpressJS**
- **Multer**
- **Sharp**
- **TypeScript**

## Getting Started

### Running the Client

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install the dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```

The client should now be running at `http://localhost:5173` (default).

### Running the Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install the dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```

The server should now be running at `http://localhost:5000` (default).

## Usage

1. Open the client URL in your browser.
2. Navigate to the upload page to upload images.
3. The uploaded images will be displayed on the home page.

## Configuration

- **Image Compression**: You can adjust the image scale by modifying the `defaultImageWidthSize` variable in the server code to compress the images to your desired size.

## Next Steps

1. Open the client URL.
2. Upload images through the upload page.
3. View the uploaded images on the home page.
4. Adjust the `defaultImageWidthSize` variable as needed to change the compression scale.

## Folder Structure

```plaintext
root
├── client
│   ├── public
│   ├── src
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── ...
├── server
│   ├── src
│   │   ├── modules
│   │   │   ├── uploads
│   │   │   │   ├── functions.ts
│   │   │   │   ├── routes.ts
│   │   ├── index.ts
│   ├── uploads
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── ...
├── README.md
└── ...
```

## Notes

- Ensure you have `pnpm` installed globally. If not, you can install it via npm:
  ```bash
  npm install -g pnpm
  ```
- The server uses memory storage for images before resizing them to avoid saving unnecessary large files.
- Adjust the server's image compression settings in `functions.ts` where the `sharp` library is configured.

## Troubleshooting

- If you encounter any issues with image uploads or viewing, check the console logs for detailed error messages.
- Ensure both the client and server are running and accessible via their respective URLs.

Feel free to contribute to the project by submitting pull requests or opening issues for any bugs or feature requests.
