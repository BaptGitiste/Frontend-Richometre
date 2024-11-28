import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { Button, Input, Label, SearchField } from "react-aria-components";

import { MovieDto } from "../models/movies.model";
import { OmdbGetItemResponse, OmdbSearchResponseItem } from "../models/external.model";
import { useRegisterMovieMutation } from "../store/api/movies.api";

import Card from "./card/Card";
import MovieDetailModal from "./modal/MovieDetailModal";
import { useLazyGetItemByIdQuery, useLazySearchQuery } from "../store/api/external.api";

import "./SearchMovieComponent.css";

const SearchMovieComponent: FunctionComponent = () => {
  
  const [dataMovie, setDataMovie] = useState<OmdbSearchResponseItem[] | undefined>(undefined);
  const [isOpen, setOpen] = useState(false);

  const [search] = useLazySearchQuery();
  const [getItemById] = useLazyGetItemByIdQuery();
  const [registerMovie] = useRegisterMovieMutation();

  const [data, setData] = useState<OmdbGetItemResponse | undefined>();

  const dataForCard = useMemo(() => {
    return dataMovie?.map((d) => {
      return {
        id: d.imdbID,
        title: d.Title,
        image: d.Poster,
      };
    });
  }, [dataMovie]);

  const onSubmit = useCallback(async (value: string) => {
    await search({ search: value })
      .then((res) => {
        if (res.data) {
          setDataMovie(res.data);
        } else {
          setDataMovie([])
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [search]);

  const onClick = useCallback(async (id: string) => {
    await getItemById({ id })
      .then((res) => {
        if (res.data) {
          setData(res.data);
          setOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [getItemById]);

  const onValid = useCallback(() => {
    setOpen(false);
    if (!data) return;

    const d: MovieDto = {
      name: data.Title,
      year: data.Year,
      plot: data.Plot,
      posterUrl: data.Poster,
      imDbId: data.imdbID,
      genre: data.Genre
    }
    try {
      registerMovie(d);
    } catch (error) {
      console.log(error);
    }
  }, [registerMovie, data]);

  return (
    <div className="search-movie-component">
      <MovieDetailModal data={data} isOpen={isOpen} setOpen={setOpen} onValid={onValid} />

      <div className="search-movie-form">
        <SearchField onSubmit={(e) => onSubmit(e)}>
          <Label>Search</Label>
          <Input name="search-movie" type="search"/>
          <Button type="reset">✕</Button>
        </SearchField>
      </div>

      <div className="movie-list">
        {dataForCard?.map((d) => (
          <Card key={d.id} title={d.title} image={d.image} onClick={() => onClick(d.id)} />
        ))}
        {dataForCard && dataForCard.length === 0 && "Aucun résult"}
      </div>
    </div>
  );
};

export default SearchMovieComponent;
