import { MovieDto } from "./movies.model";

export type LibraryMovieDto = {
    movie: MovieDto;
    watched: boolean;
    rating: number;
}

export type LibraryDto = {
    id: string;
    movies: LibraryMovieDto[];
}