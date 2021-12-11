import React from "react"
import classes from "./Banner.module.css"
const Banner = (props) =>{
    let imageSrc = props.inComingMovies !== undefined && `https://image.tmdb.org/t/p/original${props.inComingMovies.backdrop_path}`
    return (
        <div className={classes.container}>
        <img
            src={imageSrc}
            alt={props.original_title}
            className={`${classes.image}`}
            key={props.id}
            onClick={() => {
              props.onOpenModal();
              props.movieID(props.inComingMovies.id);
            }}
          />
        </div>
    )
}

export default React.memo(Banner)