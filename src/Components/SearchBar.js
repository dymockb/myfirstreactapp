import React from 'react';


export class SearchBar extends React.Component {
	test(){
		return <h1>test</h1>
	}
	
	render(){
		return (
			<div className="SearchBar">
				<input placeholder="Enter A Song, Album, or Artist" />
				<button className="SearchButton">SEARCH</button>
			</div>
		)
	}
}

export function test(){
	return <h1>how</h1>
};

export const word = "theword";
