import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';

class ListGenre extends Component {
  state = {  }
  render() {
    const currentGenre = this.props.currentMovies.map(m => m.genre.name)
    
    return (
      <ul className="list-group">
        {getGenres().map(genre =>
          <li className={currentGenre.every(g => g === genre.name) ? "list-group-item active" : "list-group-item" }
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