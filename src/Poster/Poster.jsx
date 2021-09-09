import classes from "./Poster.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1440 },
    items: 10,
  },
  desktop2: {
    breakpoint: { max: 1440, min: 1206 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1206, min: 894 },
    items: 6,
  },
  tablet2: {
    breakpoint: { max: 894, min: 726 },
    items: 5,
  },
  tablet3: {
    breakpoint: { max: 726, min: 574 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 574, min: 432 },
    items: 3,
  },
  mobile2: {
    breakpoint: { max: 432, min: 300 },
    items: 2,
  },
  mobile3: {
    breakpoint: { max: 300, min: 0 },
    items: 1,
  },
};

const Poster = (props) => {
  console.log(props.inComingMovies);

  return (
    <Carousel responsive={responsive} swipeable={false} draggable={false} className={classes.container}>
      {props.inComingMovies.map((movie) => {
        return (
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.original_title}
              className={`${classes.image}`}
              key={movie.id}
            />
        );
      })}
    </Carousel>
  );
};

export default Poster;
