# Employee Management System - Frontend

This project is the frontend of the Employee Management System built with React and TypeScript. It allows users to interact with the employee management system through a web interface.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

The project follows a standard structure for a React application with TypeScript.

```
├── public
│ ├── index.html
│ └── ...
├── src
│ ├── components
│ │ ├── EmployeeForm.tsx
│ │ ├── EmployeeList.tsx
│ │ └── ...
│ ├── context
│ │ ├── EmployeeContext.tsx
│ │ └── ...
│ ├── hooks
│ │ ├── useEmployees.ts
│ │ └── ...
│ ├── pages
│ │ ├── EmployeeDetail.tsx
│ │ ├── EmployeePage.tsx
│ │ └── ...
│ ├── services
│ │ ├── employeeService.ts
│ │ └── ...
│ ├── utils
│ │ ├── transformKeys.ts
│ │ └── ...
│ ├── App.tsx
│ ├── App.css
│ ├── index.tsx
│ └── ...
├── .env.example
├── README.md
├── package.json
├── tsconfig.json
└── ...
```

### Components

Reusable UI components for the application.

### Context

React context for managing global state.

### Hooks

Custom hooks for reusing stateful logic.

### Pages

Different pages/routes of the application.

### Services

Services for making API calls and handling business logic.

### Styles

CSS files for styling the application.

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://git.number8.com/ericson.hernandez/fullstack-assessment-frontend.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd fullstack-assessment-frontend
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Configure environment variables**:

   - Create a `.env` file in the root directory of the project and add your configuration:

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

   - If you don't have a configuration, you can use the `.env.example` file as a template:

   ```bash
   cp .env.example .env
   ```

5. **Start the development server**:

   ```bash
   npm start
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Configuration

The application requires the following environment variables:

- `REACT_APP_API_URL`: The base URL of the API server.

## Contributing

If you would like to contribute to this project, please fork the repository and create a pull request with your proposed changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
