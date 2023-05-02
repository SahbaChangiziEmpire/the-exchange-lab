# Organization Web Application

This is a web application that manages organizations, employees, and positions.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Building and Running the Application Locally](#building-and-running-the-application-locally)
  - [Prerequisites](#prerequisites)
  - [Dependencies](#dependencies)
- [Architecture Diagram](#architecture-diagram)
- [Deployment](#deployment)
  - [Hosting Service Requirements](#hosting-service-requirements)
  - [Deployment Steps](#deployment-steps)
- [API Usage](#api-usage)
- [Automated Testing](#automated-testing)
- [Design Decisions](#design-decisions)
- [Trade-offs](#trade-offs)
- [Assumptions](#assumptions)
- [Lessons Learned](#lessons-learned)

## Overview

This web application provides a platform for organizations to manage their employees and positions. The backend component is built using Node.js and the Express framework, while the frontend component is built using React.

## Getting Started

### Building and Running the Application Locally

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project in the terminal.

To build and run the organization-backend and organization-front components of this application locally, follow the steps below.

Prerequisites
Before you begin, ensure that you have the following software installed on your machine:

Node.js v14.x or later
npm v7.x or later
MySQL v8.x or later
Environment Variables
To connect to your local MySQL instance, you'll need to set up the following environment variables:

    DB_HOST=localhost
    DB_USER=<your MySQL username>
    DB_PASSWORD=<your MySQL password>
    DB_NAME=organization

You can either set these variables in a .env file in the root directory of the organization-backend project or export them in your terminal session.

Restore database from `organization-backend/test/test-database.sql` file. This file contains database schema with sample data inserted.

        cd organization-front
		npm install
        npm run start

Install dependencies of the back-end api on your hosting service:

        cd organization-backend
        npm instal

Start the backend server:

        npm start

You should be able to browse the first page of front-end app by navigating to `http://localhost:3000/` via your browser.

### Prerequisites

- Node.js (v12.16.3 or later)
- npm (v6.14.4 or later)
- MySQL (v8.0.23 or later)

### Dependencies

The following dependencies are used in the backend component of this application:

- @emotion/react: ^11.10.8
- @emotion/styled: ^11.10.8
- @mui/icons-material: ^5.11.16
- @mui/lab: ^5.0.0-alpha.128
- @mui/material: ^5.12.2
- @testing-library/jest-dom: ^5.16.5
- @testing-library/react: ^13.4.0
- @testing-library/user-event: ^13.5.0
- axios: ^1.4.0
- dotenv: ^16.0.3
- eslint-scope: ^5.1.1
- notistack: ^3.0.1
- prop-types: ^15.8.1
- react: ^18.2.0
- react-dom: ^18.2.0
- react-scripts: 5.0.1
- web-vitals: ^2.1.4

The following dependencies are used in the frontend component of this application:

- body-parser: ^1.20.2
- cors: ^2.8.5
- dotenv: ^16.0.3
- express: ^4.18.2
- mysql2: ^3.2.4

## Architecture Diagram

![](https://raw.githubusercontent.com/sahba-changizi/the-exchange-lab/main/Blank%20diagram%20(1).png)

The web application consists of a backend component built using Node.js and the Express framework, and a frontend component built using React. The backend component communicates with a MySQL database to manage the data, while the frontend component provides a user interface for interacting with the data.

## Deployment

### Hosting Service Requirements

The following services/subscriptions are required to deploy the application:

- Hosting service (e.g. AWS Elastic Beanstalk, Heroku, Google Cloud Platform)
- MySQL database service (e.g. Amazon RDS, Google Cloud SQL)

### Deployment Steps

1. Create a MySQL database on your hosting service.
2. Restore database from `organization-backend/test/test-database.sql` file. This file contains database schema with sample data inserted.

        cd organization-front
        npm run build


1. Upload the build directory to your hosting service and run the following commands in built content.

    	npm install -g serve
    	REACT_APP_NODE_ENVIROMENT=production_serve -s build

3. Copy the backend component to your hosting service.

5. Install dependencies of the back-end api on your hosting service:

        cd organization-backend
        npm instal

1. Start the backend server:

        npm start

# API Usage
The backend component provides the following API endpoints:

- PUT /api/employees/:employeeId: Update the name of an employee
- PATCH /api/employees/:employeeId/remove: Remove an employee from a position
- POST /api/employees/create-and-assign: Create a new employee and assign them to a position
- GET /api/organization: Fetches the organization hierarchy from the database
- POST /employees/positions: Add a new manager position to the organization hierarchy

Here is an example of how to use the `/api/employees/:employeeId` API endpoint to update an employee's name:

Request:

    PUT /api/employees/1 HTTP/1.1
    Host: example.com
    Content-Type: application/json
    
    {
        "firstName": "John",
        "lastName": "Doe"
    }
In this example, we are sending a PUT request to the `/api/employees/1` endpoint with a JSON payload containing the firstName and lastName of the employee we want to update.

Response:

    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "message": "Employee name updated successfully"
    }
This response indicates that the update was successful.

Similarly, here is an example of how to use the `/api/employees/:employeeId/remove` API endpoint to remove an employee from their position:

Request:


    PATCH /api/employees/1/remove HTTP/1.1
    Host: example.com
In this example, we are sending a PATCH request to the `/api/employees/1/remove` endpoint to remove the employee with an ID of 1 from their position.

Response:


    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "message": "Employee removed from position successfully"
    }
This response indicates that the removal was successful.

Finally, here is an example of how to use the `/api/employees/create-and-assign` API endpoint to create and assign a new employee:

Request:

    POST /api/employees/create-and-assign HTTP/1.1
    Host: example.com
    Content-Type: application/json
    
    {
        "firstName": "John",
        "lastName": "Doe",
        "positionId": 1,
        "employeeNumber": "1234"
    }
In this example, we are sending a POST request to the `/api/employees/create-and-assign` endpoint with a JSON payload containing the firstName, lastName, positionId, and employeeNumber of the new employee.

Response:


    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "message": "Employee assigned successfully"
    }
This response indicates that the creation and assignment were successful.

# Automated Testing
The testing approach for the application involved the use of the Supertest library, which provides a high-level abstraction for testing HTTP applications. The testing suite includes unit tests for the API endpoints, and each test case makes a request to the API and verifies that the expected response is received. The tests ensure that the application meets the specified requirements and that it can handle errors and edge cases.

To run the tests, simply navigate to the root directory of the project and run the following command:


    npm test
This command will execute the test suite, and the results will be displayed in the console. Alternatively, you can run individual test files by specifying the path to the file:


    npm test test/employees.test.js
The test results are displayed in a clear and concise format, indicating whether each test passed or failed. Additionally, the tests generate reports that provide more detailed information about the test results, including the number of tests run, the number of tests passed, and the time taken to run the tests.

Before running each test suite, we set up a test database and insert sample data into the database that is specific to each test suite. This ensures that each test is run on a clean and consistent data set. We use the beforeAll hook to run this setup code.

After each test suite is executed, we tear down the test database using the afterAll hook to ensure that any changes made to the database during the test run are discarded.

We use the supertest library to send HTTP requests to our application and make assertions about the responses. Each test suite includes multiple test cases, each of which tests a specific functionality of the API endpoint being tested. We use the it function to define each test case.

We also make use of the expect function provided by the Jest testing framework to make assertions about the response received from the API. These assertions ensure that the API behaves as expected in different scenarios. We test both successful and error cases to ensure that the API handles errors correctly.

Overall, the testing approach was effective in ensuring the quality and reliability of the application. The tests provide a high level of confidence that the application is functioning as expected and that it is capable of handling a variety of inputs and scenarios.

Below is the sample output of test execution:

    -----------------------------|---------|----------|---------|---------|-------------------
    File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
    -----------------------------|---------|----------|---------|---------|-------------------
    All files                    |   94.54 |      100 |     100 |   94.54 |                   
     organization-backend        |     100 |      100 |     100 |     100 |                   
      app.js                     |     100 |      100 |     100 |     100 |                   
      db.js                      |     100 |      100 |     100 |     100 |                   
     organization-backend/routes |   91.42 |      100 |     100 |   91.42 |                   
      employee.js                |   88.57 |      100 |     100 |   88.57 | 28-29,55-56       
      organization.js            |    90.9 |      100 |     100 |    90.9 | 31-32             
      position.js                |     100 |      100 |     100 |     100 |                   
     organization-backend/test   |     100 |      100 |     100 |     100 |                   
      testUtils.js               |     100 |      100 |     100 |     100 |                   
    -----------------------------|---------|----------|---------|---------|-------------------
    
    Test Suites: 3 passed, 3 total
    Tests:       9 passed, 9 total
    Snapshots:   0 total
    Time:        0.771 s, estimated 1 s
    

# Design Decisions
The following design decisions were made when building this application:

The frontend component was built using the `Material-UI` library to provide a consistent and modern look and feel.
The backend component was built using Express to provide a lightweight and flexible framework for building RESTful APIs.
A PostgreSQL database was chosen for storing the organization hierarchy data, due to its strong data modeling capabilities and support for complex queries.
The API was designed to be simple and easy to use, with clear and concise endpoints that map to specific actions in the application.

# Trade-offs

One potential trade-off in the design of this application is the choice between scalability and complexity.

On one hand, the current design of the application is relatively simple and easy to understand, making it easy to develop and maintain. However, as the application scales and more features are added, this simplicity may become a limitation.

To maintain scalability while keeping the application simple, it may be necessary to introduce more advanced technologies and architectural patterns, which could increase the complexity of the application.

Another trade-off to consider is the balance between performance and data consistency. For example, the current implementation of the API may prioritize consistency by requiring more database operations for certain requests. This may impact performance, particularly when handling large volumes of requests. Alternatively, a more performant implementation may prioritize speed over consistency, potentially leading to data inconsistencies under certain conditions.

Ultimately, the design choices made for this application depend on the specific needs of the organization and its users. By carefully weighing the trade-offs of each design decision, the application can be optimized for the best possible user experience while also ensuring long-term scalability and maintainability.

# Lessons Learned

During the development of this application, several important lessons were learned. These lessons can be summarized as follows:

1. The importance of clear and well-defined requirements: It is critical to have a clear understanding of the business requirements before starting the development process. This helps ensure that the application meets the needs of the users and the organization.

1. The value of modular and scalable architecture: Using a modular and scalable architecture helps improve the maintainability and flexibility of the application. This allows for easier updates and enhancements in the future.

1. The need for thorough testing: Testing is a crucial part of the development process, and it is important to thoroughly test all aspects of the application. This helps ensure that the application is stable, reliable, and performs as expected.

1. The importance of error handling and logging: Error handling and logging are essential components of any application. These features help to identify and diagnose issues quickly, allowing for faster resolution and better overall application performance.

