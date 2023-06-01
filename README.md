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

## Setup

1. Clone the repo
2. Open a terminal (Linux/Mac) or command prompt/PowerShell (Windows).
3. You'll need Node Package Manager for the next step so if you don't have it here is a link how to install it: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
4. Navigate into the backend folder and from there Run `npm install`
5. Do steps 2 and 3 for the frontend folder as well
6. You going to need an SQL server running on your PC, if you don't know how to install one, here is a tutorial video: https://youtu.be/OM4aZJW_Ojs
7. After installing MySQL you need to create a .env file in the backend directory. Inside the file, you need to create 3 variables: `SEQUELIZE_User = "user"`,
   `SEQUELIZE_PW = "password"` and `JWT_SECRET_KEY = "uXNcmPKD4subB2hCIStMpkKfCaukkkdYKicK3FF1x0kGPJ5br7Ism4M2mx4xtbZ"`
8. Replace the user & password (keeping the quotation marks) with your MySQL server username and password
9. Create an assets folder in the src directory (../frontend/src/assets/)
10. Run `npm run watch` in the backend directory.
11. Run `npm run dev` in the frontend directory.
12. Now all you need to do is CTRL + Left click on the live server that's just popped up (Local: http://localhost:5173/) to access the web app
