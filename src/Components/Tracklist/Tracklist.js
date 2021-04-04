import React from 'react';
import {Track} from '../Track/Track';
import './Tracklist.css'


export class Tracklist extends React.Component {
	render(){
		return (
			<div className="TrackList">			
			{this.props.tracks.map((element) => <Track onRemove={this.props.onRemove} onAdd={this.props.onAdd} track={element} key={element.id} isRemoval={this.props.isRemoval}/>)}			
			{/* You will add a map method that renders a set of Track components */}
			</div>
		)
	}
}