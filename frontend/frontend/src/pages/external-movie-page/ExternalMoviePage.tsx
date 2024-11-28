import { FunctionComponent } from "react";
import SearchMovieComponent from "../../components/SearchMovieComponent";

import "./ExternalMoviePage.css";

const ExternalMoviePage: FunctionComponent = () => {


    return (
        <div className="external-movie-page">
            <SearchMovieComponent />
        </div>
    );
};

export default ExternalMoviePage;