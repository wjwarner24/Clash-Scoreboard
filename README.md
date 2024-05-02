# Clash Royale Scoreboard

Welcome to the **Clash Royale Scoreboard**! 
This application is designed to help you keep track of your scores in Clash Royale games against your friends and clan members. Whether you're competing in friendly matches or serious clan battles, this tool will automatically record and manage your scores, providing you with up-to-date statistics and performance insights.

## Features

- **Automatic Score Tracking**: Enter your player tag, and the application will automatically track your battles, logging each game's outcome against your friends or clan members.
- **Player Tag Management**: You can add any Clash Royale player tags to monitor and compare scores across different players in the game.
- **Persistent Battle Logs**: All battle data retrieved from the Clash Royale API is stored in a MongoDB database, ensuring that your game history is preserved and easily accessible.
- **Future Battle Monitoring**: Once your player tag is entered, the application continues to track and update your battle logs, so your scores are always current.

## Upcoming Features

- **Automated Updates**: We are currently developing a script that will automatically update player battle logs without the need for manual refresh.
- **Friend Group Leaderboards**: We are currently developing functionality to display a leaderboard for you and your friends that ranks
all players based on their records against other players in the group.

## Getting Started

To get started with the Clash Royale Scoreboard, follow these simple setup instructions:

1. **Clone the Repository**:
- **git clone https://github.com/wjwarner24/Clash-Scoreboard.git**

2. **Install Dependencies**:
```bash
    npm install express
    npm install mongoose
    npm install cors
    npm install royale-api
    npm install dotenv
```

3. **Set Up Environment Variables**:
- **Make sure you have mongoDB installed and can create a valid mongo uri**
- **Visit https://developer.clashroyale.com/#/ and create an api key**

- **Create a `.env` file in the root directory and add the following:**
```bash
    MONGO_URI=your_mongodb_uri_here
    CLASH_ROYALE_API_KEY=your_clash_royale_api_key_here
```

4. **Run the Application**:
- **In one terminal:**
```bash
    cd backend
    npm start
```

- **In another terminal:**
```bash
    cd frontend
    npm start
```