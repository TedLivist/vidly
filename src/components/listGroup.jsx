import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';

class ListGenre extends Component {
  state = {  }
  render() {
    return (
      <ul className="list-group">
        {getGenres().map(genre =>
          <li className={genre.name === this.props.currentGenre ? "list-group-item active" : "list-group-item" }
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