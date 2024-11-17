# Restaurant

This project consists of two parts:

- **User (Menu UI)**: The user interface for browsing the app.
- **Admin (Dashboard)**: The admin dashboard for managing data.

The app uses **json-server** to provide dummy data for the backend.

## Prerequisites

- Node.js v20
- npm

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Run the Dummy Data Backend

   ```bash
   npx json-server db.json
   ```

2. Run the Angular App (Frontend)

   ```bash
   npm run start
   ```

   - This will launch the application at http://localhost:4200, where you can access the User (Menu UI).

   - The admin dashboard is accessible at http://localhost:4200/admin.

# Default Credentials

For logging into the admin dashboard, use the following dummy credentials:

- Username: `admin1`
- Password: `admin1234`

When prompted for an dummy OTP, use the default:

- OTP: `11111`

# Available Scripts

- npm run start: Starts the Angular app.
- npx json-server db.json: Starts the JSON server with dummy data.
