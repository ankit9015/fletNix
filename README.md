# FletNix - Your Personal Netflix Recommendation App

FletNix is a MEAN stack application that allows users to search and filter TV shows and movies available on Netflix. This project was built to provide a better browsing experience by offering search and filtering capabilities based on title, cast, and genre. It also implements basic authentication with age-based content restrictions.

## Features

*   **Authentication:** User registration and login with secured password hashing.
*   **Paginated List:** Display of all TV shows/movies
*   **Search Functionality:** Search by movie/TV show title and cast members.
*   **Age Restriction:** Users under 18 years old are restricted from viewing items rated "R."
*   **Filter by Type:** Allows users to filter between Movies and TV Shows.
*   **Detail Page:** Detail page for each show with all the relevant information.
*   **Testing:** E2E test cases using Playwright.

## Setup Instructions

Before you begin, ensure your system meets the following requirements:

*   **Node.js:** (v16 or higher recommended) - [https://nodejs.org/](https://nodejs.org/)
    *   Node.js is required to run both the backend and frontend development servers.
*   **npm:** (usually comes with Node.js)
    *   npm is used to install project dependencies.
*   **Angular CLI:** (v12 or higher) - `npm install -g @angular/cli`
    *   The Angular CLI is required for building and serving the front-end application.
    *   Install it globally for convenient use from any directory.
*   **MongoDB:** (Community Edition) - [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
    *   You must have a MongoDB server instance running locally or remotely. The application will connect to this database. Ensure the MongoDB server is running before starting the backend.
*   **Playwright:** - `npm install -D @playwright/test`
    *  Playwright is used for end-to-end testing. After installing it you should run `npx playwright install` to install the browsers.

**Once these system-level requirements are met, follow these steps to set up and run the FletNix application locally:**

Follow these steps to set up and run the FletNix application locally:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/ankit9015/fletNix.git
    cd fletnix
    ```

2.  **Backend Setup (Node.js/Express):**

    *   Navigate to the backend directory:

        ```bash
        cd backend
        ```

    *   Install dependencies:

        ```bash
        npm install
        ```

    *   Create a `.env` file in the `backend` directory and configure the following environment variables:

        ```
        PORT=3000
        MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/fletnixdb?retryWrites=true&w=majority  # Replace with your MongoDB connection string
        JWT_SECRET=your_secret_key  # Replace with a strong, random secret
        BCRYPT_SALT_ROUNDS=10 # You can adjust based on your security requirements vs. performance
        ```

    *   Import the [Data](https://drive.google.com/file/d/1a9S-Qfs1Mc_SutljdvOEAnJ5QJLEAebB/view?usp=share_link) and upload it to your Mongo db server (if needed):

    *   Start the backend server:

        ```bash
        npm run start
        ```

3.  **Frontend Setup (Angular):**

    *   Open a new terminal window and navigate to the frontend directory:

        ```bash
        cd ../frontend
        ```

    *   Install dependencies:

        ```bash
        npm install
        ```

    *   Configure the API URL:
        *   Open `frontend/src/environments/environment.ts` and `frontend/src/environments/environment.prod.ts`.
        *   Update the `apiUrl` property to match the URL of your backend server (e.g., `http://localhost:3000/api`):

            ```typescript
            export const environment = {
              production: false,
              apiUrl: 'http://localhost:3000/api'
            };
            ```

    *   Start the Angular development server:

        ```bash
        ng serve
        ```
        or
        ```bash
        npm run start
        ```

        This will typically run the frontend on `http://localhost:4200`.

4.  **Access the Application:**

    Open your web browser and navigate to `http://localhost:4200` (or the address shown in your terminal for the Angular development server).

## Running e2e Tests (Playwright)

*   Ensure the backend is running.
*   Navigate to the frontend directory:

  ```bash
  cd frontend
  ```

*   Run the Playwright tests:

  ```bash
  npx playwright test
  ```

*   To run the tests in headed mode (with a browser window) and see the UI interactions, use:

  ```bash
  npx playwright test --ui
  ```
