# Groupomania Web Application

This is an OpenClassrooms student repo for project 7 by EDH.

## Project Description

The project was to build the initial functional version of an internal social network app for Groupomania's employees.

### Requirements

- The presentation of the features must be simple
- Account creation must be simple and possible from a mobile phone
- A user profile must include very little information for it to be quick to complete
- Account deletion must be possible
- The tool should include an open forum where employees can publish multimedia content
- The tool should include an open forum where employees can publish written content
- Users should be able to easily identify unread posts written by other employees

Also specified that the web app should have high standards of security and accessibility.

## Technologies Used

NodeJS for runtime with ExpressJS and Vite. React library with Bootstrap(React-Bootstrap) as CSS framework for front-end development.
MySQL with Sequelize for database while storing data securely using Bcrypt, JSON Web Token for managing user sessions and data validation for back-end development.
Ensured accessibility according to WCAG2.1 standards using WAVE tool and manual checking.

## Setup for Windows

1. Clone the repo
2. You'll need Node Package Manager for the next step so if you don't have it here is a link how to install it: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
3. Here you can use Node.js Command Prompt or (my preferred way) follow this guide to make your npm commands globally available: https://dev.to/supritha/npm-is-not-recognized-as-internal-or-external-command-solution-o1n
4. Using Node.js Command Prompt - or a normal Command Prompt/PowerShell if you did the second option - navigate into the backend folder and from there run `npm install`
5. Do step 4 for the frontend folder as well
6. You going to need an SQL server running on your PC, if you don't know how to install one, here is a tutorial video: https://youtu.be/OM4aZJW_Ojs (you only need the server, so you can do a Server only installation at "choosing a setup type" section)
7. After installing MySQL you need to create a .env file in the backend directory. Inside the file, you need to create 3 variables: `SEQUELIZE_User = "user"`, `SEQUELIZE_PW = "password"` and `JWT_SECRET_KEY = "uXNcmPKD4subB2hCIStMpkKfCaukkkdYKicK3FF1x0kGPJ5br7Ism4M2mx4xtbZ"`
8. Replace the user & password (keeping the quotation marks) with your MySQL server username(by default it's "root") and password
9. Create an assets folder in the backend directory (../backend/assets/)
10. Same way as in step 4 run `npm run dev` in the backend directory
11. Do step 10 in the frontend directory
12. Now all you need to do is open the http://localhost:5173/ address to access the web app
