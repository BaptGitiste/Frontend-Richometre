import { createSlice } from "@reduxjs/toolkit";
import { LibraryMovieDto } from "../../models/library.model";
import { libraryApi } from "../api/library.api";

type LibraryState = {
    id?: string;
    movies?: LibraryMovieDto[];
}

const initialState: LibraryState = {
    id: undefined,
    movies: []
}

const librarySlice = createSlice({
    name: "library",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(libraryApi.endpoints.getLibrary.matchFulfilled, (state, action) => {
                state.id = action.payload.id;
                state.movies = action.payload.movies;
            })
    }
});

export default librarySlice;