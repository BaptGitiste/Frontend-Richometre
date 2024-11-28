import { MyEntityDto } from "../../models/test.model";
import baseApi from "./base.api";

type HelloWorldResponse = {
  response: string;
};

export const helloWorldApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerEntity: builder.mutation<MyEntityDto, MyEntityDto>({
      query: (movie) => ({
        method: "POST",
        url: `/hello-world/entity`,
        body: movie,
      }),
    }),
    getHello: builder.query<HelloWorldResponse, void>({
      query: () => ({
        url: `/hello-world`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { 
    useRegisterEntityMutation,
    useLazyGetHelloQuery,
    useGetHelloQuery 
} = helloWorldApi;