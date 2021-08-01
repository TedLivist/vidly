import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import { isArguments } from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: []
  }

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() })
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

  // handleGenreList = (genre = "") => {
  //   const movies = getMovies()
    
  //   if (genre !== "") {
  //     const genreMovies = movies.filter(m => m.genre._id == genre._id)
  //     this.setState({ movies: genreMovies })
  //   } else {
  //     this.setState({ movies })
  //   }
  // }

  handleGenreSelect = genre => {
    console.log(genre)
  }

  render() {
    const { length: moviesCount } = this.state.movies
    const { pageSize, currentPage, movies: allMovies } = this.state

    if (moviesCount === 0) return <p>There are no movies in the database</p>
    
    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              textProperty="name"
              valueProperty="_id"
              onItemSelect={this.handleGenreSelect}/>
          </div>
          <div className="col">
            <p>Showing {moviesCount} movies from the database</p>
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
              itemsCount={moviesCount}
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