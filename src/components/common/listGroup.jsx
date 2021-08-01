// My Solution

// import React, { Component } from 'react';
// import { getGenres } from '../../services/fakeGenreService';

// class ListGenre extends Component {
//   state = {  }
//   render() {
//     const currentGenre = this.props.currentMovies.map(m => m.genre.name)

//     return (
//       <React.Fragment>
//         <li
//           className={(currentGenre.includes("Action") && currentGenre.includes("Thriller") ? "list-group-item active" : "list-group-item")}
//           style={{cursor: 'pointer'}}
//           onClick={() => this.props.onListGenre()}>
//           <a>All Movies</a>
//         </li>
//         <ul className="list-group">
//           {getGenres().map(genre =>
//             <li className={currentGenre.every(g => g === genre.name) ? "list-group-item active" : "list-group-item" }
//               onClick={() => this.props.onListGenre(genre)}
//               style={{cursor: 'pointer'}}
//               key={genre._id}>
//               <a>{genre.name}</a>
//             </li>
//           )}
//         </ul>
//       </React.Fragment>
//     );
//   }
// }

// export default ListGenre;

import React from 'react';

const ListGroup = () => {
  return null
}
 
export default ListGroup;