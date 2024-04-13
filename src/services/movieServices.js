const key = import.meta.env.VITE_TMDB_KEY;

const baseUrl = "https://api.themoviedb.org/3";

const endpoints = {
  popular: `${baseUrl}/movie/popular?api_key=${key}`,

  topRated: `${baseUrl}/movie/top_rated?api_key=${key}`,

  trending: `${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=2`,

  comedy: `${baseUrl}/search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,

  upcoming: `${baseUrl}/movie/upcoming?api_key=${key}`,
};

export default endpoints;

export function createImagUrl(filename, size) {
  return `https://image.tmdb.org/t/p/${size}/${filename}`;
}

// https://developer-themoviedb-org.translate.goog/reference/movie-popular-list?_x_tr_sl=en&_x_tr_tl=pl&_x_tr_hl=pl&_x_tr_pto=sc&_x_tr_hist=true

// https://developer.themoviedb.org/reference/movie-top-rated-list

// https://developer.themoviedb.org/reference/movie-popular-list

// https://developer.themoviedb.org/reference/search-movie

// https://developer.themoviedb.org/reference/movie-upcoming-list

/*✅

 const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated",
          {
            params: { 
              language: "en-US",
              page: 1,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmQ4ZTJmMzgxZTU2OTE0YjhiZTRhODE0Y2UxNGFjYiIsInN1YiI6IjY2MTEzNDNiMWYzMzE5MDE3ZGMyMDA0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TSNEGa-b8VHCpaz-_EHwfZwzIN2GA0OIQhfl6kvnsHg",
            },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopRatedMovies();

*/
