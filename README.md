# Saasy Games Prototype
<img src="public/images/logos/saasy-games-1.png" width="200" />

A live demo of the Saasy Games prototype can be found [here](https://game-platform-poc.vercel.app/)

## Running locally
1. Run `npm install` to install dependencies
2. Create a .env.local file at the root of the project
3. Copy .env.local.example into .env.local and add the project keys provided to you
4. Run `npm run dev` to start the local development server
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Instructions on how to use the platform (to showcase what was implemented)
1. Click the Login/Sign Up link in the top right of the page.
2. If you have not created an account yet, click the "Create an account" link at the bottom of the login form.
3. Enter the required information and click "Sign Up".
4. Once redirected to the dashboard, click the "Play A New Game" button in the top left tile to launch the New Game modal.
5. Click the "Start Game" button (don't make any changes to game or opponent selection).
6. Play Tic Tac Toe against the AI.
7. Once the game is complete, navigate back to the dashboard (click SG logo in top left). See your personal stats updated to reflect the game outcome. 

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

## Alternative Approaches for Realtime Communication/Updates
It is worth noting that there are some alternatives to SocketIO that could be leveraged in order to achieve a similar multiplayer experience but with less overall engineering work/maintanence:
* [Replicache](https://replicache.dev/) - Really intereseting framework designed for Javascript applications (support for React and Next.js). Offline support, syncs with databases on the backend, and provides super fast updates.
* [Pusher](https://pusher.com/channels) - Hosted websocket service that takes care of all the hard stuff involved with scaling websocket infrastucture.
* [Supabase Database Events](https://supabase.com/docs/reference/javascript/subscribe) A client can subscribe to database changes, so in theory, when a move is made, that move could update the database and then be sent to other clients (players) in order to update the UI accordingly. Didn't have time to fully research this, I suspect latency may be a problem.

## App Pages: 
* Home/Dashboard with different views for authenticated vs. unauthenticated (`/`)
* Login/Register (`/login` and `/register`)
* Waiting Room (`/waiting-room/{GAME_ID}`) - this is a protected route and cannot be accessed unless user is authenticated
* Play Game (`/play-game/{GAME_TYPE}/{GAME_ID}`) - this is a protected route and cannot be accessed unless user is authenticated
* Watch Game (`/watch-game/{GAME_TYPE}/{GAME_ID}`) - "read only" view of a game currently in play

## Database Design:
* users - used for auth
    ```
    id: uuid
    username: text
    password: text
    email: text
    ...
    ```
* games - each game available on the platorm, e.g. tic tac toe, chess, etc. 
    ```
    id: uuid
    type: text
    name: text
    description: text
    number_of_players_required: int
    ```

* game_record - keeps track of the state of each game that is initiated
    ```
    id: uuid
    game_id: uuid (foriegn key relation to games)
    status: text ('waiting', 'in_progress', 'completed')
    players: uuid[]
    created_at: timestamp
    completed_at: timestamp
    game_state: json
    room_id: varchar (short id representing websocket room)
    ```    
* user_game_record - a new record is created for each user when they start playing a game, keep record of their peronal moves made, outcome, etc. 
    ```
    id: uuid
    game_record_id: uuid (foriegn key relation to game_record)
    user_id: uuid (foriegn key relation to users)
    outcome: text ('won', 'lost', 'tied')
    moves: json
    ```
## Client - Server communication
As mentioned, realtime communication happens via websockets. Database CRUD currently is implemented within react pages/components directly, using Supabase's provided client. This removes unnecessary network calls however API endpoints could be created to handle CRUD operations if an API is needed in the future. 

## How Game Play Works (or should work)
### AI opponent
Each game component has it's own internal logic in place to simulate an AI player. Game state and player moves are recorded within the database.

### Human opponent (not fully implemented)
When a game is initiated, a new game_record row is created. Each game is assigned a unique short ID (using `nanoid`), which is used within the URL for the game or waiting room. Once a player lands on the waiting room page, this ID is used to establish a websocket connection to a unique websocket room. When the required number of users have joined the same websocket room, the server will broadcast to the client that all players should be redirected to the game's hosting page. The game_record state is updated to reflect that the game is now in progress. Once on the game's hosting page, the users can begin to play against each other. Each move they make is sent over the websocket connection to the server, and then to the opposite player. The game state is preserved within the database. By keeping track of game state within the game_record table, the server can implement logic to prevent things like a player playing against themselves, a player playing more than one game at a given time, too many players joining the same game, a player trying to join a game that has already completed, etc. 

## Next Steps/Milestones
1. Add comprehensive unit and e2e tests.
2. Create a separate microservice to handle the websocket communication.
3. Add API endpoints for things like canceling games and banning users.
4. Add caching for user and game data to reduce DB calls and improve performance.
5. Create a CMS for adding/managing games, and make game routes more dynamic so that there are less/no code changes required to add new games to the platform. 
 