	
const clientID = '8e38a010550b4b2eba7b4a8e232536a3';

const redirectURI = 'http://localhost:3000';

let accessToken;

const Spotify = {
	testFunc(){
		console.log('testfunc')
	},
	
	getAccessToken(){
		if (accessToken){
			return accessToken;
		}
		
		// check for access token match
		
	const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
	const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
	
	if (accessTokenMatch && expiresInMatch){
		accessToken = accessTokenMatch[1];
		const expiresIn = Number(expiresInMatch[1]);
		
		//clear parameters and get new accessToken
		
		window.setTimeout(()=> accessToken = '', expiresIn * 1000);
		window.history.pushState('Access Token', null, '/');
		
		return accessToken;	
	} else {
		const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
		window.location = accessURL;
		}
	},
	
	search(term){
		const accessToken = Spotify.getAccessToken();
	
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: 	`Bearer ${accessToken}`
				}
		}).then(response => {
			console.log(response);
			return response.json();
		}).then(jsonResponse => {
			if(!jsonResponse.tracks){
				return [];
			}
				
			return jsonResponse.tracks.items.map(track => ({
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				uri: track.uri
			}));
		});	
	},
	
	savePlaylist(name,trackURIs){
		console.log('starting');
		if(!name || !trackURIs.length){
			console.log('next');
			return	
		}
		const accessToken = Spotify.getAccessToken();
		console.log(accessToken);
		const headers = { Authorization: `Bearer ${accessToken}` };
		let userID;
	
		return fetch('https://api.spotify.com/v1/me', {headers: headers}
		).then(
		response => {console.log(response);
		return response.json();
		}
		).then(jsonResponse => {
			console.log(jsonResponse);
			userID = jsonResponse.id;
			console.log(userID);
			return fetch(`https://api.spotify.com/v1/users/{userID}/playlists`,
			{
				headers: headers,
				method: 'POST',
				body: JSON.stringify({name: name})
			}
			)
		}).then(response => response.json()
		).then(jsonResponse => {
			const playlistID = jsonResponse.id;
			return fetch(`https://api.spotify.com/v1/users/{userID}/playlists/{playlistID}/tracks`,
			{
				headers: headers,
				method: 'POST',
				body: JSON.stringify({uris: trackURIs})
			})
		})
	}
}


export default Spotify;