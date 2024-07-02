![Opis alternatywny](public/images/Banner.png)

## Navigation

- [FlexFlow: Gym Achievement Tracker](#flexflow-gym-achievement-tracker)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Development Dependencies](#development-dependencies)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

# FlexFlow: Gym Achievement Tracker

FlexFlow is a web application designed to help users track their gym achievements and manage their workout plans efficiently. Built using Next.js for the frontend and MongoDB for the backend database, FlexFlow utilizes server actions for data fetching and management.

## Key Features

- **Training History**: View and track past workout sessions to monitor progress over time.
- **Custom Workout Plans**: Create personalized workout plans tailored to individual fitness goals.
- **Plan Management**: Easily edit, delete, and manage existing workout plans and sessions.
- **Exercise Catalog**: Explore a catalog of exercises available for inclusion in workout plans.
- **Sample Workout Plans**: Access pre-defined workout plans for inspiration and quick start.
- **Authentication**: Secure login and authentication powered by Clerk to manage user access.

FlexFlow aims to provide users with a comprehensive toolset for effective workout planning, tracking, and achievement management, enhancing their fitness journey with structured and customizable workout routines.

## Technologies Used

- **Frontend**: Next.js, TailwindCSS, React Hook Form
- **Backend**: MongoDB, Clerk for Authentication
- **Other Libraries**: Zustand for state management, SWR for data fetching

# FlexFlow Project Installation

## Prerequisites

Ensure you have the following software installed:

1. [Node.js](https://nodejs.org/) (recommended version 14.x or later)
2. [npm](https://www.npmjs.com/) (usually installed with Node.js)

## Installation Steps

1. **Clone the repository:**

   First, clone your repository to your local machine. Open your terminal and run:

       
       git clone https://github.com/Engarr/FlexFlow
       cd <REPOSITORY_NAME>

   Replace <REPOSITORY_NAME> with the name of the directory that will be created.

3. **Install dependencies:**

   After navigating to the project directory, install all required dependencies by running:

       npm install

4. **Create a .env configuration file:**

   Create a .env file in the root directory of the project and add all required environment variables. Example:
   
       DATABASE_URL=<YOUR_DATABASE_URL>
       NEXT_PUBLIC_API_KEY=<YOUR_API_KEY>
   
5. **Run the application in development mode:**

   To start the application in development mode, use the command:

       npm run dev
   
   The application will be available at http://localhost:3000.

6. **Build the application:**

   To build the application for production deployment, run:**

       npm run build

   The built application will be located in the /.next directory.

7. **Run the built application:**

   To start the built application, use the command:

       npm start

8. **Lint the code:**

   To check the code for errors and standard compliance, run:

       npm run lint

## Available Scripts

- **`npm run dev`** - Runs the application in development mode.
- **`npm run build`** - Builds the application for production.
- **`npm start`** - Starts the built application.
- **`npm run lint`** - Checks the code for errors and standard compliance.

## Dependencies

The project uses various libraries, including:

- **Framework:** Next.js
- **Styling:** TailwindCSS, Radix UI
- **Form Handling:** React Hook Form, Zod
- **State Management:** Zustand
- **Others:** Clerk, MongoDB, Mongoose, SWR

## Development Dependencies

The project also uses development tools such as:

- TypeScript
- ESLint
- Autoprefixer

These instructions should help you correctly install and run the FlexFlow project on your local machine.

## Contributing
Contributions are welcome! If you'd like to contribute to FlexFlow, please fork the repository and create a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
- Thanks to the open source community for their valuable contributions.
- Inspiration and initial setup guidance from similar fitness tracking applications.





