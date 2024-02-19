# WebPOS Backend

This repository contains the backend code for the WebPOS (Web Point of Sale) application. The backend is built using Node.js and TypeScript and interacts with the MUNERO Global API Documentation.

## Features

The backend implements various APIs to interact with the MUNERO Global API Documentation:

- **Authentication APIs**:
  - Login API
  - Check token

- **Order APIs**:
  - Get Orders
  - Place Orders
  - Get Order Status

- **Catalogue APIs**:
  - Items Download
  - Catalog Images

- **Account-related APIs**:
  - Logo
  - Query Users

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/muneer-ahmed-khan/web-pos/backend.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following configuration:
   ```dotenv
   APP_PORT=3000
   APP_NAME=backend
   NODE_ENV=local

   GIFTLOV_SECRET=
   GIFTLOV_BASE_URL=https://staging.giftlov.com/api/Base/

   CURRENT_TIMEZONE=5
   ```

   Make sure to replace `GIFTLOV_SECRET` with your actual secret.

4. Start the server:
   ```
   npm run dev
   ```

## Contact

If you have any questions or need assistance, feel free to reach out.

**Kindest regards,**