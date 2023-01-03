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
* **Authentication/Authorization** (Supabase Auth)

## Technologies Used
* [Next.js](https://nextjs.org/) - React framework that provides a serverless Node.js backend built on top of Express, for building interactive, dynamic, and highly performant web applications. Out of the box, Next.js solves many common challenges including routing, data fetching, server-side rendering, and more. This project was initialized using `create-next-app`.
* [Typescript](https://www.typescriptlang.org/) - Strongly typed language on top of Javascript to improve code predictablility, readability, and improve the overall developer experience. 
* [Material UI](https://mui.com/material-ui/getting-started/overview/) - Open source React component library implementing Google's Material Design. Provides many standard components like layouts, buttons, inputs, and typeography. 
* [Supabase](https://supabase.com/) - Open source database built on top of Postres with many handy features including Authentication, Storage, and Edge Functions. The data for this project is largely relational and unlikely to change much in structure, so a realational database made a lot of sense here. We could potentially run into problems with scaling in the future though (not easy to horizonatally scale), so something to keep an eye on. Supabase also provides Authentication and Authorization out of the box, so this was a huge benefit as well and opens up the opportunity to support third-party OAuth providers seemlessly.
* [Socket.io](https://socket.io/) - Library built on top of the WebSocket protocol.


## App Pages: 
* Home/Dashboard with different views for authenticated vs. unauthenticated (`/`)
* Login/Register (`/login` and `/register`)
* Waiting Room (`/waiting-room/{GAME_ID}`) - this is a protected route and cannot be accessed unless user is authenticated
* Play Game (`/play-game/{GAME_TYPE}/{GAME_ID}`) - this is a protected route and cannot be accessed unless user is authenticated
* Watch Game (`/watch-game/{GAME_TYPE}/{GAME_ID}`) - "read only" view of a game currently in play

## Database Tables:
* users - used for auth
    ```
    id: uuid
    username: text
    password: text
    email: text
    ...
    ```
* users_meta - rows should be created at the time of user signup and used to keep record of user information like preferences, total games won, user avatar, etc.
    ```
    id: uuid (foriegn key relation to users)
    profile_avatar: text
    total_games_won: int
    total_games_lost: int
    total_games_tied: int
    total_time_played: int
    ```
* games - each game available on the platorm, e.g. tic tac toe, chess, etc. 
    ```
    id: uuid
    type: text
    name: text
    description: text
    number_of_players: int
    ```
* game_meta - a new record is created for each user when they start playing a game, keep record of their opponent, their moves made, outcome of game, etc. 
    ```
    id: uuid
    game_id: uuid (foriegn key relation to games)
    user_id: uuid (foriegn key relation to users)
    created_at: timestamp
    completed_at: timestamp
    outcome: text ('won', 'lost', 'tied')
    moves: json
    opponent_username: text
    opponent_id: uuid (foriegn key relation to users)
    room_id: varchar (short id representing websocket room)
    ```

## How playing a game works
### AI opponent
Each game type has it's own logic in place to simulate an AI player. Each move as well as the overall game result is recorded in the game_meta table. 

### Human opponent (not implemented)
Each game that is initiated is assigned a unique short ID (using `nanoid`), which is used within the URL for the game or waiting room. Once a player lands on the waiting room page, this ID is used to establish a websocket connection to a unique websocket room. When two unique users (or whatever the game's neccessary user count is) have joined the same websocket room, the server will broadcast to the client that all players in the waiting room should be redirected to the game's hosting page. Once on the game's hosting page, the users can play against each other. Each move they make is sent over the websocket connection to the server, and then to the opposite player. Every move is also recorded within the database (game_meta table). If an additional player attempts to join a game that is already in play, the websocket room logic on the server will prevent them from joining as a player, and instead redirect them to the relating Watch Game page.


## Alternative Approaches for Realtime Communication/Updates
It is worth noting that there are some alternatives to SocketIO that could be leveraged in order to achieve a similar multiplayer experience but with less overall engineering work/maintanence:
* [Replicache](https://replicache.dev/) - Really intereseting framework designed for Javascript applications (support for React and Next.js). Offline support, syncs with databases on the backend, and provides super fast updates.
* [Pusher](https://pusher.com/channels) - Hosted websocket service that takes care of all the hard stuff involved with scaling websocket infrastucture
* [Supabase Database Events](https://supabase.com/docs/reference/javascript/subscribe) A client can subscribe to database changes, so in theory, when a move is made, that move could update the database and then be sent to other clients (players) in order to update the UI accordingly. Didn't have time to fully research this, I suspect latency may be a problem.