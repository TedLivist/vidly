import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: []
  }

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()]
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
    this.setState({ currentPage: page })
  }

  handleGenreSelect = genre => {
    this.setState({selectedGenre: genre, currentPage: 1})
  }

  render() {
    const { length: moviesCount } = this.state.movies
    const { pageSize, currentPage, selectedGenre, movies: allMovies } = this.state

    if (moviesCount === 0) return <p>There are no movies in the database</p>
    
    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => 
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}/>
                  </td>
                  <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
                )}
              </tbody>
            </table>
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