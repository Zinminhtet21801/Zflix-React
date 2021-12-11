import Modal from "./Modal";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import classes from "./ModalMovie.module.css";
import { getModalApi } from "../APICall";
import _, { set } from "lodash";
import "./ModalMovie.module.css"

function timeConvert(minute){
  let hours = minute/60
  let rHours = Math.floor(hours)
  let minutes = (hours - rHours) *60
  let rMinutes = Math.round(minutes)
  let hourFinal ;
  let minuteFinal;
   if(rHours>0){
     if(rHours >1){
       hourFinal = rHours + "hrs"
     }else{
       hourFinal = rHours + "hr"
     }
  }else{
    hourFinal = ""
  }
  if(rMinutes>0){
    if(rMinutes > 1){
      minuteFinal = rMinutes + "mins"
    }else{
      minuteFinal = rMinutes + "min"
    }
  }else{
    console.log("LOL");
    minuteFinal = ""
  }
  return `${hourFinal} ${minuteFinal}`
}

const ModalMovie = (props) => {
  const [key, setKey] = useState(0);
  const [hasMovie, setHasMovie] = useState(true);
  const [movieCast, setMovieCast] = useState([]);
  const [genres, setGenres] = useState([]);
  const [seeMoreOverview, setSeeMoreOverview] = useState(false);
  const [overview, setOverview] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [movieRuntime, setMovieRuntime] = useState(0);
  const [movieLanguage, setMovieLanguage] = useState([]);

  useEffect(() => {
    (async () => {
      await getModalApi(props.movieId)
        .then((item) => {
          if (item.length > 0) {
            let trailer = item[0].data.results.filter(
              (movie) => movie.type === "Trailer"
            );
            let casts = item[1].data.credits.cast
              .map((casts) => casts.name)
              .slice(0, 5);
            let movieGenres = item[1].data.genres.map((data) => data.name);
            setHasMovie(true);
            setMovieCast(casts);
            setOverview(item[1].data.overview);
            setReleaseDate(item[1].data.release_date)
            setMovieRuntime(timeConvert(item[1].data.runtime))
            trailer[0] ? setKey(trailer[0].key) : setHasMovie(false);
            setGenres(movieGenres);
            setMovieLanguage(item[1].data.original_language)
          } else {
            setHasMovie(false);
          }
        })
        .catch((e) => console.log(e));
    })();
  }, [props.movieId]);
  let showMovieCast = movieCast.length > 0 && (
    <span className={classes.cast_name}>{movieCast.join(", ")}</span>
  );
  let showMovieGenres = genres.length > 0 && (
    <span className={classes.cast_name}>{genres.join(", ")}</span>
  );
  let truncatedOverview =
    overview.length > 150 ? (
      <span>
        {_.truncate(overview, { length: 150 })}
        <span onClick={() => setSeeMoreOverview(true)}>see more</span>
      </span>
    ) : (
      overview
    );
  let showSeeMoreOverview = seeMoreOverview ? overview : truncatedOverview;

  return (
    <Modal onClose={props.onClose}>
      {hasMovie ? (
        <ReactPlayer
          url={`https://youtu.be/${key}`}
          controls={true}
          playing={true}
          muted={true}
          width={"100%"}
          style={{ borderRadius: "25px" }}
          className={classes.media_player}
        />
      ) : (
        <div className={classes.no_movie_found_div}>
          <p>No Trailers Available 😟</p>
        </div>
      )}
      <div className={classes.movie_description_div}>
        <div className={`container ${classes.container}`}>
          <div className={`row ${classes.modalRow}`}>
            <div className="col col-lg-6 col-md-12 col-sm-12">
              <div className="row">
                <div
                  className={`col col-lg-6 col-md-12 col-sm-12 ${classes.released_detail} ${classes.movie_text_color}`}
                  style={{ width: "100%" }}
                >
                  <span className={`${classes.description_title}`}>
                    {releaseDate} {movieRuntime}  {movieLanguage}
                  </span>
                </div>
              </div>
              <div className="row">
                <div
                  className={`col col-lg-6 col-md-12 col-sm-12 ${classes.overview} ${classes.movie_text_color}`}
                  style={{ width: "100%" }}
                >
                  <span className={classes.description_title}>
                    {showSeeMoreOverview}
                  </span>
                </div>
              </div>
            </div>

            <div className="col col-lg-6 col-md-12 col-sm-12">
              <div className="row">
                <div
                  className={`col col-lg-6 col-md-12 col-sm-12 ${classes.movie_text_color}`}
                  style={{ width: "100%" }}
                >
                  <span className={classes.description_title}>Cast: </span>
                  {showMovieCast}
                </div>
              </div>
              <div className="row">
                <div
                  className={`col col-lg-6 col-md-12 col-sm-12 ${classes.movie_text_color}`}
                  style={{ width: "100%" }}
                >
                  <span className={classes.description_title}>Genres: </span>
                  {showMovieGenres}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalMovie;
