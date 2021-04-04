import React from 'react';
import {Tracklist} from '../Tracklist/Tracklist';
import './Playlist.css'


export class Playlist extends React.Component {
	constructor(props){
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}
	
	handleNameChange(e){
		this.props.onNameChange(e.target.value)
	}
	
	render(){
		return (
			<div className="Playlist">
				<input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
				{/* Add a TrackList component */}
				<Tracklist onRemove={this.props.onRemove} tracks={this.props.playlistTracks} isRemoval={true} />
				<button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
			</div>
		)
	}
}