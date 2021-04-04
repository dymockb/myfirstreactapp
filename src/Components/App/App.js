import React from 'react';


import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {Playlist} from '../Playlist/Playlist';
import {SearchResults} from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			searchResults: [],
			playlistName: "THEplaylistName",
			playlistTracks: []
			};
							
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
	}
 
	addTrack(track){
		if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
			console.log(this.state.playlistTracks)
			return;
		} else {
			this.state.playlistTracks.push(track);
			this.setState({playlistTracks: this.state.playlistTracks});
			console.log(this.state.playlistTracks)
		}
	}
	
	removeTrack(track){
		const filteredTracks = this.state.playlistTracks.filter(element => element !== track);
		this.setState({playlistTracks: filteredTracks});
	}
	
	updatePlaylistName(name){
		this.setState({playlistName: name});
	}
	
	savePlaylist(){	
		const trackURIs = this.state.playlistTracks.map(element => element.uri);
		console.log(trackURIs, this.state.playlistName);
		Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
			this.setState({
				playlistName: 'New Playlist',
				playlistTracks: []
			})
		})
	}
	
	search(term){
		console.log(this.state.searchResults);
		Spotify.search(term).then(searchResults => {
			console.log(searchResults);
			this.setState({searchResults: searchResults})
		});
		console.log(this.state.searchResults);
	}

	render(){
					
	return (
		<div>
			<h1>Ja<span className="highlight">mmm</span>ing</h1>
			<div className="App">
			{/* Add a SearchBar component  */}
			<SearchBar 
			onSearch={this.search} />
				<div className="App-playlist">
			{	/*  Add a SearchResults component */}
			<SearchResults 
			searchResults={this.state.searchResults}
			onAdd={this.addTrack}
			isRemoval={false}/>
			{	/*  Add a Playlist component */}
			<Playlist 
			onSave={this.savePlaylist}
			onNameChange={this.updatePlaylistName}
			onRemove={this.removeTrack}
			playlistTracks={this.state.playlistTracks}
			playlistName={this.state.playlistName}/>
				</div>
			</div>
		</div>
	);
	}
}

export default App;
