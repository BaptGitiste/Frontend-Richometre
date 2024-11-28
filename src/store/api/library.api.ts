import { LibraryDto } from "../../models/library.model";
import baseApi from "./base.api";


export const libraryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLibrary: builder.query<LibraryDto, string>({
            query: (id) => ({
                method: "GET",
                url: `/library/${id}`
            })
        })
    }),
})