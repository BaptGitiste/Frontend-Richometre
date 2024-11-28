import { OmdbGetItemResponse } from "../../models/external.model";
import { FunctionComponent } from "react";

import { Button, Dialog, DialogTrigger, Heading, Modal, ModalOverlay } from "react-aria-components";

import './MovieDetailModal.css';

interface PostMovieModalProps {
  data?: OmdbGetItemResponse;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  onValid: () => void;
}

export const MovieDetailModal: FunctionComponent<PostMovieModalProps> = ({ data, isOpen, setOpen, onValid }) => {

  return (
    <DialogTrigger isOpen={isOpen}>
      {isOpen && data && (
        <ModalOverlay>
          <Modal>
            <Dialog>
              <Heading>Ajouter un film</Heading>
              <hr />
              <div className="movie-detail-body">
                <div className="movie-detail-poster">
                  <img
                    alt=""
                    src={data.Poster}
                    width="100%"
                  />
                </div>
                <div className="movie-detail-info">
                  <dl>
                    <dt>Title</dt>
                    <dd>{data.Title}</dd>
                    <dt></dt>
                    <dd>{data.Year}</dd>
                    <dt>Genre</dt>
                    <dd>{data.Genre}</dd>
                    <dt>Director</dt>
                    <dd>{data.Director}</dd>
                    <dt>Plot</dt>
                    <dd>{data.Plot}</dd>
                  </dl>
                </div>
              </div>
              <div className="movie-detail-actions">
                  <Button onPress={() => setOpen(false)}>Annuler</Button>
                  <Button onPress={onValid} autoFocus>Ajouter</Button>
              </div>
            </Dialog>
          </Modal>
        </ModalOverlay>
      )}
    </DialogTrigger>
  );
};

export default MovieDetailModal;