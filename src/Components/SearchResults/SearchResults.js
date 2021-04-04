import React from 'react';
import {Tracklist} from '../Tracklist/Tracklist';
import './SearchResults.css'


export class SearchResults extends React.Component {
	
	render(){
		return (
			<div className="SearchResults">
				<h2>Results</h2>
				{/* Add a Tracklist component */}
				<Tracklist tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval}/>
			</div>
		)
	}
}