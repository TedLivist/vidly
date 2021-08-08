import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: 'title', order: 'asc' }
  }

  componentDidMount() {
    const genres = [{ _id: "", name: 'All Genres' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres })
  }
  
  handleDelete = (movie) => {
    const newMovies = [...this.state.movies]
    const movies = newMovies.filter(m => m._id !== movie._id)
    this.setState({ movies })
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index] = { ...movies[index] }
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
  }

  // Whenever the state of a component is changed
  // The component and its children are re-rendered
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  }

  handleGenreSelect = genre => {
    this.setState({selectedGenre: genre, currentPage: 1});
  };

  handleSort = path => {
    const sortColumn = {...this.state.sortColumn}

    if (sortColumn.path === path) {
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc'
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc'
    }
    this.setState({ sortColumn });
  }

  render() {
    const { length: moviesCount } = this.state.movies
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies
    } = this.state

    if (moviesCount === 0) return <p>There are no movies in the database</p>
    
    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;
    
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}/>
          </div>
          <div className="col">
            <p>Showing {filtered.length} movies from the database</p>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}/>
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange} />
          </div>
        </div>
      </React.Fragment>
     );
  }
}
 
export default Movies;