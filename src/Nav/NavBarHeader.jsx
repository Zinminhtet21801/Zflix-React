import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import classes from "./NavBarHeader.module.css";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import getSearchMovie from "../APICall";
import ModalMovie from "../Modal/ModalMovie";
import _ from "lodash";


const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    color: "#ccc",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#ccc",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavBarHeader = (props) => {
  const [searchMovie, setSearchMovie] = useState("");
  const [movieResult, setMovieResult] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [movieId, setMovieId] = useState(0);
  const searchClass = useStyles();

  useEffect(() => {
    if (searchMovie.trim()) {
      getSearchMovie(searchMovie).then(
        (data) => data && setMovieResult(data.results)
      );
    } else {
      setMovieResult([]);
    }
  }, [searchMovie]);

  function searchHandler(event) {
    setSearchMovie(event.target.value);
  }

  function showModalHandler(id) {
    setMovieId(id);
    setShowModal(true);
  }

  function hideModalHandler() {
    setShowModal(false);
  }

  // function onOpenModal(){
  //   console.log("OK");
  // }

  let searchBar = (
    <div className={searchClass.root}>
      <div className={searchClass.search}>
        <div className={searchClass.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: searchClass.inputRoot,
            input: searchClass.inputInput,
          }}
          onChange={searchHandler}
          value={searchMovie}
          inputProps={{ "aria-label": "search" }}
        />
        {/* <button onClick={()=> setSearchMovie("")}>X</button> */}
      </div>
    </div>
  );
  return (
    <React.Fragment>
      {showModal && (
        <ModalMovie
          movieId={movieId}
          key={movieId}
          onClose={hideModalHandler}
        />
      )}
      <Navbar
        expand="lg"
        variant="dark"
        sticky="top"
        className={classes.navbar}
        style={{ zIndex: "5" }}
      >
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="img\Zflix.png"
              width="150"
              height="50"
              className={`d-inline-block align-top ${classes["brand-image"]}`}
              alt="Zflix"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={`ms-auto ${classes.search_bar_container}`}
              style={{ padding: "10px 0" }}
            >
              <div className={`${classes.search_bar}`}>
                {searchBar}
                <div className={`${classes.suggestions}`}>
                  <ul
                    className={
                      movieResult.length > 0
                        ? classes.suggestion_ul
                        : classes.suggestion_ul_one_height
                    }
                  >
                    {movieResult.map((item) => {
                      let truncatedTitle = _.truncate(item.original_title, {
                        length: 15,
                      });
                      let imageSource =
                        "https://image.tmdb.org/t/p/original/" +
                        item.poster_path;
                      let releaseYear =
                        item.release_date !== undefined
                          ? item.release_date.split("-")[0]
                          : "undefined";
                      return (
                        <li
                          key={item.id}
                          onClick={() => {
                            showModalHandler(item.id);
                            console.log(showModal);
                          }}
                        >
                          <div className={`${classes.suggestion_list}`}>
                            <img
                              src={imageSource}
                              alt="fallback"
                              className={`${classes.suggestion_img}`}
                            />
                            <span className={`${classes.suggestion_title}`}>
                              {truncatedTitle}
                            </span>
                            <p className={`${classes.suggestion_year}`}>
                              {releaseYear}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">My List</Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default React.memo(NavBarHeader);
