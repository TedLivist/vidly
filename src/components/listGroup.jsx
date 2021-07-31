import React, { Component } from 'react';
import { genres } from '../services/fakeGenreService';

class ListGenre extends Component {
  state = {  }
  render() { 
    return (

      <ul class="list-group">
        {genres.map(genre =>
          <li class="list-group-item">{genre.name}</li>
        )}
      </ul>
     );
  }
}
 
export default ListGenre;