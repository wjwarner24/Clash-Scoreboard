# Clash Royale API for NPM

![NPM Downloads](https://img.shields.io/npm/dm/%40natoune%2Froyale-api)
![NPM License](https://img.shields.io/npm/l/%40natoune%2Froyale-api)

A wrapper for the [Clash Royale API](https://developer.clashroyale.com).  
This package is not affiliated with [Supercell](https://supercell.com/) or [RoyaleAPI](https://royaleapi.com/).

## Getting a token

To use Clash Royale API for NPM, you need to get an API token from the [Clash Royale Developer Portal](https://developer.clashroyale.com).  
You can also use another API provider like [RoyaleAPI](https://docs.royaleapi.com/).

## Usage

First, install the package using NPM or your favorite package manager:

```bash
npm install @natoune/royale-api
```

Usage example:

```javascript
const RoyaleAPI = require("@natoune/royale-api");

const cr = new RoyaleAPI("token");

cr.getPlayer("#AAAAAAAA").then((player) => {
	console.log(player);
});
```

## Methods

There is one method for each endpoint of the Clash Royale API (see [documentation](https://developer.clashroyale.com/#/documentation)):

### Clans

-   `getClanWarLog(clanTag: string, options?: object): Promise<object>`
-   `getClans(options?: object): Promise<object>`
-   `getClanRiverRaceLog(clanTag: string, options?: object): Promise<object>`
-   `getClanCurrentWar(clanTag: string): Promise<object>`
-   `getClan(clanTag: string): Promise<object>`
-   `getClanMembers(clanTag: string, options?: object): Promise<object>`
-   `getClanCurrentRiverRace(clanTag: string): Promise<object>`

### Players

-   `getPlayer(playerTag: string): Promise<object>`
-   `getPlayerUpcomingChests(playerTag: string): Promise<object>`
-   `getPlayerBattleLog(playerTag: string): Promise<object>`

### Cards

-   `getCards(options?: object): Promise<object>`

### Tournaments

-   `getTournaments(options?: object): Promise<object>`
-   `getTournament(tournamentTag: string): Promise<object>`

### Locations

-   `getLocationClanRankings(locationId: number, options?: object): Promise<object>`
-   `getLocationPlayerRankings(locationId: number, options?: object): Promise<object>`
-   `getLocationClanWarRankings(locationId: number, options?: object): Promise<object>`
-   `getSeasonPathOfLegends(seasonId: string, options?: object): Promise<object>`
-   `getSeason(seasonId: string): Promise<object>`
-   `getSeasonPlayerRankings(seasonId: string, options?: object): Promise<object>`
-   `getSeasons(): Promise<object>`
-   `getLocations(options?: object): Promise<object>`
-   `getSeasonsV2(): Promise<object>`
-   `getLocation(locationId: number): Promise<object>`
-   `getGlobalTournamentRankings(tournamentTag: string, options?: object): Promise<object>`
-   `getLocationPathOfLegends(locationId: number, options?: object): Promise<object>`

### Challenges

-   `getChallenges(): Promise<object>`

### Global Tournaments

-   `getGlobalTournaments(): Promise<object>`

## Contributing

Contributions to the "royale-api" project are welcome. To contribute, follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Make your changes and commit them: `git commit -m "Add my feature"`
4. Push your changes to the branch: `git push origin feature/my-feature`
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE.md).
