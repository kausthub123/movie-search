Movie Searching App
===================

This is a movie searching app built with React on the frontend and FastAPI on the backend. It allows users to search for TV shows and view detailed information about the shows.

Deployment
----------

The React app is deployed on GitHub Pages at <http://kausthub123.github.io/movie-search>, and the FastAPI backend is deployed on Deta Space. You can visit [Deta Space](https://deta.space/) for more information about the hosting platform.

You can use the following credentials to log in to the app:

-   Username: <user@test.com>
-   Password: password

These credentials are used for the login functionality in the app.

Frontend
--------

The frontend of the app is built with React and Material-UI. It consists of the following pages:

### Home Page

-   The home page displays a material toolbar with "Home" text on the left and a login button on the right.
-   Clicking on the login button navigates to the `/login` page.

### Login Page

-   The login page features a login form with fields for email and password.
-   The email field has form validation to ensure a valid email format.
-   The password field has form validation to accept passwords between 8 and 16 characters, containing only alphanumeric characters.
-   After successful login, the user is redirected to the search page. If the login fails, a snack bar notification is shown.

### Search Page

-   The search page provides an input field to search for TV show titles.
-   Clicking the "Search" button triggers a search for the entered title.
-   The search results are displayed as material cards, showing the TV show poster, name, summary, type, language, genres, status, and schedule.
-   If no results are found, a snack bar notification is displayed.

Backend
-------

The backend of the app is built with FastAPI. It provides the following API routes:

### Login Page

-   `POST /api/login`: This endpoint is used for user authentication.
    -   It accepts a username (email) and password in the request body.
    -   It uses static credentials for login validation.
    -   If the login is successful, it returns a JWT token based on the user's authentication status.

### Search Page

-   `GET /api/search`: This endpoint is used to search for TV shows.
    -   It accepts a `title` query parameter for the TV show title to search for.
    -   It requires a JWT token in the authorization header for authentication.
    -   If the JWT token is authenticated, it uses the TV Shows API (<https://api.tvmaze.com/search/shows?q=query>) to query the TV show results.
    -   The endpoint fetches the results from the TV Shows API and returns them to the frontend with a status code of 200.
    -   If the JWT token is missing or invalid, it returns an error with the appropriate status code.

Running the App Locally
-----------------------

To run the app locally, follow these steps:

### Frontend (React)

1.  Make sure you have Node.js installed on your machine.
2.  Clone the repository from GitHub.
3.  Open a terminal and navigate to the project directory.
4.  Install the dependencies by running the following command:

    Copy code

    `npm install`

5.  Start the development server with the following command:

    sqlCopy code

    `npm start`

6.  The app should now be running locally on `http://localhost:3000`.

### Backend (FastAPI)

1.  Create a virtual environment for the project (optional but recommended).
2.  Activate the virtual environment. In the terminal, run the appropriate command based on your operating system:
    -   For Windows:

        phpCopy code

        `<name_of_project>\Scripts\activate `

    -   For macOS/Linux:

        bashCopy code

        `source <name_of_project>/bin/activate`

        Replace `<name_of_project>` with the desired name for your virtual environment.
3.  Install the required packages by running the following command:

    Copy code

    `pip install -r requirements.txt`

4.  Run the FastAPI server with the following command:

    cssCopy code

    `uvicorn main:app --reload`

5.  The backend server should now be running locally on `http://localhost:8000`.

Please note that you may need to update the backend API endpoint URLs in the frontend code if you're running the backend on a different host/port.