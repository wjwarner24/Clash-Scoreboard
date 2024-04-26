const fetch = require('node-fetch-commonjs');

async function apiRequest(globalOptions, url, query) {
	if (query) {
		const queryArray = Object.keys(query).map(key => `${key}=${query[key]}`);
		url += `?${queryArray.join('&')}`;
	}
	return fetch(`${globalOptions.apiUrl}/${url}`, {
		headers: globalOptions.headers
	}).then(async response => {
		return {
			status: response.status,
			data: await response.json()
		}
	});
}

module.exports = {
	apiRequest
};
