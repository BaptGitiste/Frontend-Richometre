import { MovieDto } from "../../models/movies.model";
import baseApi from "./base.api";

export const movieApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      registerMovie: builder.mutation<MovieDto, MovieDto>({
        query: (movie) => ({
          method: "POST",
          url: `/movies`,
          body: movie,
        }),
      }),
      getMovies: builder.query<MovieDto, void>({
        query: () => ({
          url: `/movies`,
        }),
      }),
    }),
    overrideExisting: false,
  });
  
  
  export const { 
    useRegisterMovieMutation,
    useGetMoviesQuery,
  } = movieApi;