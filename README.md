![image](https://github.com/TechShreyash/GuessThatPoke/assets/82265247/e6529c2c-e462-49aa-832d-deeaab933f19)

# 🔰 Guess That Poke

**Guess That Poke** is a fun, multiplayer game where players test their Pokémon knowledge by guessing the Pokémon displayed on the screen. Gather your friends and compete to become the ultimate Pokémon master!

### 🌟 How to Play:
1. **Join the Game:** Enter your username to join the game. The game is multiplayer, so share the link with friends to compete together.
2. **Guess the Pokémon:** When a Pokémon appears, type its name in the input box and submit your guess.
3. **Earn Points:** Each correct guess awards **10 points**.
4. **Compete for the Top Spot:** The top 10 players are displayed on the ranking board. Aim for the highest score and claim the #1 spot!

### 🔥 Features:
- **Real-Time Multiplayer:** Multiple players can join and compete simultaneously, making it an engaging and competitive experience.
- **Random Pokémon Generation:** Every 30 seconds, a new random Pokémon is displayed for players to guess.
- **Ranking System:** A dynamic leaderboard updates with each correct guess, showing the top 10 players based on their scores.
- **Seamless Gameplay:** If a player guesses correctly, the current Pokémon changes immediately, resetting the countdown for a new challenge.
- **Persistent User Data:** Your username and score persist locally, so you can rejoin without losing progress.

### 🚀 Getting Started

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/TechShreyash/GuessThatPoke.git
    cd GuessThatPoke
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Run the Application:**
    ```bash
    npm start
    ```
    The server will run at `http://localhost:3000`.

4. **Play the Game:**
    Open your browser and visit `http://localhost:3000`. Share the link with friends to start playing!

### 🛠️ Technologies Used:
- **Frontend:** HTML, CSS, JavaScript (Socket.IO for real-time communication)
- **Backend:** Node.js, Express.js
- **Pokémon API:** A custom script (`pokeapi.js`) that fetches random Pokémon data for the game.

### 🌐 Live Demo:
Check out the live version of the game here: [Guess That Poke](https://guessthatpoke-ux67.onrender.com)

#### ⚠️ Warning:
This live demo is hosted on **Render.com**, a free hosting platform. The website may experience interruptions due to the following:
- The app automatically shuts down when it is inactive or idle.
- If the site has been idle for a while, it may take some time to wake up when you first open it.

If the game gets interrupted, try **reloading the page** to resume. Please be patient while the server wakes up!

### 🏆 Ranking and Leaderboard:
- Players can see the top 10 rankings based on their scores.
- The leaderboard updates live, and each player’s score is displayed alongside their username.

### 🎮 Game Flow:
1. **New Player Joins:** Each player enters a unique username. If the username already exists, they must choose another.
2. **Random Pokémon:** A random Pokémon is displayed every 30 seconds.
3. **Correct Guess:** If a player guesses correctly, the leaderboard is updated, and a new Pokémon is shown.
4. **Leaderboard Updates:** After every correct guess, the player's score increases by 10 points, and the leaderboard is refreshed.
