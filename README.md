# Budget Journal

The goal of this software is to bridge the gap between goal setting and budgeting. It will allow users to set their available funds within the software and create a user's desirable goals while journaling along the way. 

# Usage
A user will be able to create goals while logging their anticipated expenses. They will be given the ability to view three primary goals on an overview page and choose which goal they want to apply the funds towards. The individual's funds will vary depending on which goal they choose. Upon selecting, users will be prompted to reflect via a journal entry. If a user chooses a specific goal, the card containing the set information will be conditionally rendered depending on whether or not enough funds are available to fulfill the goal. The main goal is for an individual to be able to reflect and truly appreciate the decisions, progress and their thinking as the work towards accomplishing their goals entailed with budgeting.

# Installation

- Create a database named budget_journal
- The queries in the database.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries
- Open up your editor of choice and run an npm install
- Run npm run server in your terminal
- Run npm run client in your terminal
- The npm run client command will open up a new browser tab for you!

# Built With
- Javascript
- React 
- Redux 
- Postgresql 
- Node 
- Material UI 
- Express 
- Sagas