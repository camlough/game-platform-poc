# Saasy Games Prototype

## Running locally
1. Run `npm install` to install dependencies
2. Create a .env.local file at the root of the project
3. Copy .env.local.example into .env.local and add the project keys provided to you
4. Run `npm run dev` to start the local development server
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Core Architectual Components
* **Database** (PostgreSQL)
* **Realtime client/server communication** (Websockets)
* **Frontend** (React App)
* **Backend** (Node.js Server) 
* **Authentication/Authorization** (Supabase)

## Technologies Used
* [Next.js](https://nextjs.org/) - React framework that provides a serverless Node.js backend built on top of Express, for building interactive, dynamic, and highly performant web applications. Out of the box, Next.js solves many common challenges including routing, data fetching, server-side rendering, and more. This project was initialized using `create-next-app`.
* [Typescript](https://www.typescriptlang.org/) - Strongly typed language on top of Javascript to improve code predictablility, readability, and improve the overall developer experience. 
* [Material UI](https://mui.com/material-ui/getting-started/overview/) - Open source React component library implementing Google's Material Design. Provides many standard components like layouts, buttons, inputs, and typeography. 
* [Supabase](https://supabase.com/) - Open source database built on top of Postres with many handy features including Authentication, Storage, and Edge Functions. The data for this project is largely relational and unlikely to change much in structure, so a realational database made a lot of sense here. We could potentially run into problems with scaling in the future though, so something to keep an eye on. Supabase also provides Authentication and Authorization out of the box, so this was a huge benefit as well and opens up the opportunity to support third-party OAuth providers seemlessly.
* [Socket.io](https://socket.io/) - Library built on top of the WebSocket protocol.


## App Pages: 
* Login/Register
* Home/Dashboard with different views for authenticated vs. unauthenticate
* Waiting Room (`/waiting-room/{GAME_ID}`)
* Play Game (`/play-game/{GAME_TYPE}/{GAME_ID}`)
* Watch Game (`watch-game/{GAME_TYPE}/{GAME_ID}`)

## Database Tables:
* users - used primarily for auth
* users_meta - should be populated at the time of signup, used to keep record of user information like total games won, user avatar, etc.
* games - each game available on the platorm, e.g. tic tac toe, chess, etc. 
* game_results - a new record is created for every user when they start playing a game, keep record of moves made, outcome of game, etc. 

## How a game works
### AI 
Each game that is initiated is assigned a unique 6 character ID (using nanoid), you can see this ID in the url of the game or waiting room. This ID is used to establish a websocket connection to a unique websocket room. When two users have joined the same websocket room, the server will broadcast to the client that they should be redirected to the game's hosting page. Once on the game's hosting page, the two users can play against each other. Each move they make is sent over websockets to the server, and then to the opposite player. Every move is also recorded within the database. If an additional player attempts to join a game that is already in play, the websocket logic on the server will prevent them from joining as a player, and instead take them to a view

When a user starts playing a game, a new record is created within the games table. This table is used to keep record of every move the player makes, the total time taken, and the outcome of the game for that user. This table can later be queried to get game stats for specific users, overall platform stats, etc. A slight improvement to my implementation would be to create an additional table that keeps record of user metadata, e.g. number or games won, lost, tied, etc. This would improve performance as only a single DB query would be needed to provide quick stats. 

The main idea is that a unique websocket channel/room will be established when a user chooses to play a new game against a human. That user is directed to a waiting room. Once another user joins the websocket room via navigating to the waiting lounge
