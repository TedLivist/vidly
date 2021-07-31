import React, { Component } from 'react';
import { genres } from '../services/fakeGenreService';

class ListGenre extends Component {
  state = {  }
  render() { 
    return (
      <ul className="list-group">
        {genres.map(genre =>
          <li className="list-group-item"
            onClick={() => this.props.onListGenre(genre)}
            style={{cursor: 'pointer'}}
            key={genre._id}>
            <a>{genre.name}</a>
          </li>
        )}
      </ul>
    );
  }
}
 
export default ListGenre;