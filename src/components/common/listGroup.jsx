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

const ListGroup = (props) => {

  const { items, valueProperty, textProperty, selectedItem, onItemSelect } = props

  return (
    <ul className="list-group">
      { items.map(item =>
        <li className={item === selectedItem ? 'list-group-item active' : 'list-group-item'}
          onClick={() => onItemSelect(item)}
          style={ {cursor: 'pointer'} }
          key={item[valueProperty]}>
            {item[textProperty]}
        </li>
      ) }
    </ul>
  )
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
}

export default ListGroup;