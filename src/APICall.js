import axios from "axios";
import env from "react-dotenv";
function getTopRated() {
  return axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${env.API_KEY}&language=en-US&page=1`
  );
}

function getPopular() {
  return axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${env.API_KEY}&language=en-US&page=1`
  );
}

function getUpcoming() {
  return axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${env.API_KEY}&language=en-US&page=1`
  );
}

function getMovieKey(movieId){
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${env.API_KEY}&language=en-US`)
}

export default async function getSearchMovie(query){
  let data ;
   try{
    data = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${env.API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
   }catch(e){
     console.log(e);
   }
  //  console.log(data.data);
  console.log(query);
   return data ? data.data : null
}

function getMovieCast(movieId){
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${env.API_KEY}&append_to_response=credits`)
}

export async function getApiCall() {
  let data ;
  try{
   data = await Promise.all([getTopRated(), getPopular(), getUpcoming()])
  }catch(e){
    console.log(e);
  }
  // console.log(data);
  return data ? data : null
}

export async function getModalApi(movieId){
  let data;
  try{
    data = await Promise.all([getMovieKey(movieId),getMovieCast(movieId)])
  }catch(e){
    console.log(e);
  }
  return data? data : null
}

// export const address = fetch("https://jsonplaceholder.typicode.com/users/1")
//   .then((response) => response.json())
//   .then((user) => {
//     return user.address;
//   });
