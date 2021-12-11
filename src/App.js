import React, { useEffect, useState } from "react";
import Poster from "./Poster/Poster";
import { getApiCall } from "./APICall";
import classes from "./App.module.css";
import NavBarHeader from "./Nav/NavBarHeader";
import ModalMovie from "./Modal/ModalMovie";
import Banner from "./Banner/Banner";

let randomMovie;

function App() {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [movieId, setMovieId] = useState("");

  useEffect(() => {
    (async () => {
      await getApiCall()
        .then((item) => {
          setMovies(item);
        })
        .catch((e) => console.log(e));
    })();
  }, []);

  function showModalHandler() {
    setShowModal(true);
  }

  function hideModalHandler() {
    setShowModal(false);
  }

  function movieIDHandler(id) {
    setMovieId(id);
  }

  let showBanner =
    movies.length > 0 &&
    movies[1].data.results.length > 0 &&
    (
    sessionStorage.getItem("randomMovieIndex") === null &&
      sessionStorage.setItem(
        "randomMovieIndex",
        Math.floor(Math.random() * (movies[1].data.results.length -1 + 1) + 0)
      ) + 0,
      randomMovie = sessionStorage.getItem("randomMovieIndex"),
    (
      <Banner
        inComingMovies={movies[1].data.results[randomMovie]}
        onOpenModal={showModalHandler}
        onCloseModal={hideModalHandler}
        movieID={movieIDHandler}
      />
    ));

  let showPopularCarousel = movies.length > 0 &&
    movies[1].data.results.length > 0 && (
      <div className={classes.poster__div}>
        <h2 className={classes.movieHeader}>Popular</h2>
        <Poster
          inComingMovies={movies[1].data.results}
          onOpenModal={showModalHandler}
          onCloseModal={hideModalHandler}
          movieID={movieIDHandler}
        />
      </div>
    );

  let showLatestCarousel = movies.length > 0 &&
    movies[1].data.results.length > 0 && (
      <div className={classes.poster__div}>
        <h2 className={classes.movieHeader}>Top Rated</h2>
        <Poster
          inComingMovies={movies[0].data.results}
          onOpenModal={showModalHandler}
          onCloseModal={hideModalHandler}
          movieID={movieIDHandler}
        />
      </div>
    );
  let showUpcomingCarousel;
  if (movies.length > 0) {
    showUpcomingCarousel = (
      <div className={classes.poster__div}>
        <h2 className={`${classes.movieHeader} ${classes.topHeader}`}>
          Upcoming
        </h2>
        <Poster
          inComingMovies={movies[2].data.results}
          onOpenModal={showModalHandler}
          onCloseModal={hideModalHandler}
          movieID={movieIDHandler}
        />
      </div>
    );
  }

  return (
    <React.Fragment>
      {showModal && (
        <ModalMovie
          onClose={hideModalHandler}
          movieId={movieId}
          key={movieId}
        />
      )}
      <NavBarHeader />
      {movies.length > 0 && showBanner}
      <div className={classes.page_movie_div}>
        {movies.length > 0 && showUpcomingCarousel}
        {movies.length > 0 && showPopularCarousel}
        {movies.length > 0 && showLatestCarousel}
      </div>
      {/* {showPopularCarousel}
      {showLatestCarousel} */}
    </React.Fragment>
  );
}

export default App;
