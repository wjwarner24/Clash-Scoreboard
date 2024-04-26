const {
	apiRequest
} = require('./lib');

const fetch = require('node-fetch-commonjs');

class RoyaleAPI {
	constructor(auth, options) {
		let headers = {
			...options.headers,
			'Authorization': `Bearer ${auth}`
		};

		let apiUrl = options.apiUrl || 'https://api.clashroyale.com/v1';

		fetch(`${apiUrl}/players/%23AAAAAAAA`, {
			headers
		}).then(response => response.json()).then(data => {
			if (data.reason && data.reason !== "notFound") {
				if (data.message) {
					throw new Error(data.message);
				} else {
					throw new Error('Authentication token is wrong.');
				}
			}
		}).catch(err => {
			if (err.message) {
				throw new Error(err.message);
			} else {
				throw new Error('Authentication token is wrong.');
			}
		});

		this.options = {
			...options,
			apiUrl,
			headers
		};
	}

	// CLANS
	async getClanWarLog(clanTag, options) {
		return await apiRequest(this.options, `clans/${encodeURIComponent(clanTag)}/warlog`, options);
	}

	async getClans(options) {
		return await apiRequest(this.options, `clans`, options);
	}

	async getClanRiverRaceLog(clanTag, options) {
		return await apiRequest(this.options, `clans/${encodeURIComponent(clanTag)}/riverracelog`, options);
	}

	async getClanCurrentWar(clanTag) {
		return await apiRequest(this.options, `clans/${encodeURIComponent(clanTag)}/currentwar`);
	}

	async getClan(clanTag) {
		return await apiRequest(this.options, `clans/${encodeURIComponent(clanTag)}`);
	}

	async getClanMembers(clanTag, options) {
		return await apiRequest(this.options, `clans/${encodeURIComponent(clanTag)}/members`, options);
	}

	async getClanCurrentRiverRace(clanTag) {
		return await apiRequest(this.options, `clans/${encodeURIComponent(clanTag)}/currentriverrace`);
	}

	// PLAYERS
	async getPlayer(playerTag) {
		return await apiRequest(this.options, `players/${encodeURIComponent(playerTag)}`);
	}

	async getPlayerUpcomingChests(playerTag) {
		return await apiRequest(this.options, `players/${encodeURIComponent(playerTag)}/upcomingchests`);
	}

	async getPlayerBattleLog(playerTag) {
		return await apiRequest(this.options, `players/${encodeURIComponent(playerTag)}/battlelog`);
	}

	// CARDS
	async getCards(options) {
		return await apiRequest(this.options, `cards`, options);
	}

	// TOURNAMENTS
	async getTournaments(options) {
		return await apiRequest(this.options, `tournaments`, options);
	}

	async getTournament(tournamentTag) {
		return await apiRequest(this.options, `tournaments/${encodeURIComponent(tournamentTag)}`);
	}

	// LOCATIONS
	async getLocationClanRankings(locationId, options) {
		return await apiRequest(this.options, `locations/${locationId}/rankings/clans`, options);
	}

	async getLocationPlayerRankings(locationId, options) {
		return await apiRequest(this.options, `locations/${locationId}/rankings/players`, options);
	}

	async getLocationClanWarRankings(locationId, options) {
		return await apiRequest(this.options, `locations/${locationId}/rankings/clanwars`, options);
	}

	async getSeasonPathOfLegends(seasonId, options) {
		return await apiRequest(this.options, `locations/global/pathoflegend/${seasonId}/rankings/players`, options);
	}

	async getSeason(seasonId) {
		return await apiRequest(this.options, `locations/global/seasons/${seasonId}`);
	}

	async getSeasonPlayerRankings(seasonId, options) {
		return await apiRequest(this.options, `locations/global/seasons/${seasonId}/rankings/players`, options);
	}

	async getSeasons() {
		return await apiRequest(this.options, `locations/global/seasons`);
	}

	async getLocations(options) {
		return await apiRequest(this.options, `locations`, options);
	}

	async getSeasonsV2() {
		return await apiRequest(this.options, `locations/global/seasonsV2`);
	}

	async getLocation(locationId) {
		return await apiRequest(this.options, `locations/${locationId}`);
	}

	async getGlobalTournamentRankings(tournamentTag, options) {
		return await apiRequest(this.options, `locations/global/rankings/tournaments/${encodeURIComponent(tournamentTag)}`, options);
	}

	async getLocationPathOfLegends(locationId, options) {
		return await apiRequest(this.options, `locations/${locationId}/pathoflegend/players`, options);
	}

	// CHALLENGES
	async getChallenges() {
		return await apiRequest(this.options, `challenges`);
	}

	// GLOBAL TOURNAMENTS
	async getGlobalTournaments() {
		return await apiRequest(this.options, `globaltournaments`);
	}
}

module.exports = RoyaleAPI;
