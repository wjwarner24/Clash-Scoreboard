type Response = Promise<{
	status: number;
	data: object;
}>;

type GlobalOptions = {
	apiUrl?: string;
	headers?: object;
};

type LimitOptions = {
	limit: number;
	after: string;
	before: string;
};

type SearchOptions = LimitOptions & {
	name: string;
};

type ClanSearchOptions = SearchOptions & {
	locationId: number;
	minMembers: number;
	maxMembers: number;
	minScore: number;
};

/**
 * @class RoyaleAPI
 * @param {string} auth - Your API key
 * @param {object} options - Options for the API
 * @example
 * const cr = new RoyaleAPI('your-api-key', {apiUrl: 'https://api.clashroyale.com/v1', headers: {'User-Agent': 'RoyaleAPI'}});
 * let clanExists = await cr.getClan('clan-tag').status === 200;
 * let members = cr.getClanMembers('clan-tag', {limit: 10}).data;
 */
declare class RoyaleAPI {
	/**
	 * @param {string} auth - Your API key
	 * @param {object} options - Options for the API
	 * @example
	 * const cr = new RoyaleAPI('your-api-key', {apiUrl: 'https://api.clashroyale.com/v1', headers: {'User-Agent': 'RoyaleAPI'}});
	 */
	constructor(auth: string, options?: GlobalOptions);
	/**
	 * @param {string} clanTag - The clan tag
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getClanWarLog('#AAAAAAA', {limit: 10});
	 * @returns {object} - The response from the API
	 */
	getClanWarLog(clanTag: string, options?: LimitOptions): Response;
	/**
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getClans({name: 'clan-name', locationId: 57000087, minMembers: 10, maxMembers: 50, minScore: 5000});
	 * @returns {object} - The response from the API
	 */
	getClans(options?: ClanSearchOptions): Response;
	/**
	 * @param {string} clanTag - The clan tag
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getClanRiverRaceLog('#AAAAAAA', {limit: 10});
	 * @returns {object} - The response from the API
	 */
	getClanRiverRaceLog(clanTag: string, options?: LimitOptions): Response;
	/**
	 * @param {string} clanTag - The clan tag
	 * @example
	 * cr.getClanCurrentWar('#AAAAAAA');
	 * @returns {object} - The response from the API
	 */
	getClanCurrentWar(clanTag: string): Response;
	/**
	 * @param {string} clanTag - The clan tag
	 * @example
	 * cr.getClan('#AAAAAAA');
	 * @returns {object} - The response from the API
	 */
	getClan(clanTag: string): Response;
	/**
	 * @param {string} clanTag - The clan tag
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getClanMembers('#AAAAAAA', {limit: 10});
	 * @returns {object} - The response from the API
	 */
	getClanMembers(clanTag: string, options?: LimitOptions): Response;
	/**
	 * @param {string} clanTag - The clan tag
	 * @example
	 * cr.getClanCurrentRiverRace('#AAAAAAA');
	 * @returns {object} - The response from the API
	 */
	getClanCurrentRiverRace(clanTag: string): Response;
	/**
	 * @param {string} playerTag - The player tag
	 * @example
	 * cr.getPlayer('#AAAAAAA');
	 * @returns {object} - The response from the API
	 */
	getPlayer(playerTag: string): Response;
	/**
	 * @param {string} playerTag - The player tag
	 * @example
	 * cr.getPlayerUpcomingChests('#AAAAAAA');
	 * @returns {object} - The response from the API
	 */
	getPlayerUpcomingChests(playerTag: string): Response;
	/**
	 * @param {string} playerTag - The player tag
	 * @example
	 * cr.getPlayerBattleLog('#AAAAAAA');
	 * @returns {object} - The response from the API
	 */
	getPlayerBattleLog(playerTag: string): Response;
	/**
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getCards({limit: 10});
	 * @returns {object} - The response from the API
	 */
	getCards(options?: LimitOptions): Response;
	/**
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getTournaments({name: 'tournament-name', limit: 10});
	 * @returns {object} - The response from the API
	 */
	getTournaments(options?: SearchOptions): Response;
	/**
	 * @param {string} tournamentTag - The tournament tag
	 * @example
	 * cr.getTournament('#AAAAAAA');
	 * @returns {object} - The response from the API
	 */
	getTournament(tournamentTag: string): Response;
	/**
	 * @param {number} locationId - The location id
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getLocationClanRankings(57000087, {limit: 10});
	 * @returns {object} - The response from the API
	 */
	getLocationClanRankings(
		locationId: number,
		options?: LimitOptions
	): Response;
	/**
	 * @param {number} locationId - The location id
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getLocationPlayerRankings(57000087, {limit: 10});
	 * @returns {object} - The response from the API
	 */
	getLocationPlayerRankings(
		locationId: number,
		options?: LimitOptions
	): Response;
	/**
	 * @param {number} locationId - The location id
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getLocationClanWarRankings(57000087, {limit: 10});
	 * @returns {object} - The response from the API
	 */
	getLocationClanWarRankings(
		locationId: number,
		options?: LimitOptions
	): Response;
	/**
	 * @param {string} seasonId - The season id
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getSeasonPathOfLegends('2024-01', {limit: 10});
	 * @returns {object} - The response from the API
	 */
	getSeasonPathOfLegends(seasonId: string, options?: LimitOptions): Response;
	/**
	 * @param {string} seasonId - The season id
	 * @example
	 * cr.getSeason('2024-01');
	 * @returns {object} - The response from the API
	 */
	getSeason(seasonId: string): Response;
	/**
	 * @param {string} seasonId - The season id
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getSeasonPlayerRankings('2024-01', {limit: 10});
	 * @returns {object} - The response from the API
	 */
	getSeasonPlayerRankings(seasonId: string, options?: LimitOptions): Response;
	/**
	 * @example
	 * cr.getSeasons();
	 * @returns {object} - The response from the API
	 */
	getSeasons(): Response;
	/**
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getLocations({limit: 10});
	 * @returns {object} - The response from the API
	 */
	getLocations(options?: LimitOptions): Response;
	/**
	 * @example
	 * cr.getSeasonsV2();
	 * @returns {object} - The response from the API
	 */
	getSeasonsV2(): Response;
	/**
	 * @param {number} locationId - The location id
	 * @example
	 * cr.getLocation(locationId);
	 * @returns {object} - The response from the API
	 */
	getLocation(locationId: number): Response;
	/**
	 * @param {string} tournamentTag - The tournament tag
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getGlobalTournamentRankings('#AAAAAAA', {limit: 10});
	 * @returns {object} - The response from the API
	 */
	getGlobalTournamentRankings(
		tournamentTag: string,
		options?: LimitOptions
	): Response;
	/**
	 * @param {number} locationId - The location id
	 * @param {object} options - Options for the API
	 * @example
	 * cr.getLocationPathOfLegends(57000087, {limit: 10});
	 * @returns {object} - The response from the API
	 */
	getLocationPathOfLegends(
		locationId: number,
		options?: LimitOptions
	): Response;
	/**
	 * @example
	 * cr.getChallenges();
	 * @returns {object} - The response from the API
	 */
	getChallenges(): Response;
	/**
	 * @example
	 * cr.getGlobalTournaments();
	 * @returns {object} - The response from the API
	 */
	getGlobalTournaments(): Response;
}

export = RoyaleAPI;
