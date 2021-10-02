import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY } from "../App";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 352px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MovieTitle = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: #121212;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MovieDetails = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;

const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;
  useEffect(() => {
    // console.log(selectedMovie);
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);
  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} />
          <InfoColumn>
            <MovieTitle>{movieInfo?.Title}</MovieTitle>
            <MovieDetails>
              IMDb Rating: <span>{movieInfo?.imdbRating}</span>
            </MovieDetails>
            <MovieDetails>
              Year: <span>{movieInfo?.Year}</span>
            </MovieDetails>
            <MovieDetails>
              Plot: <span>{movieInfo?.Plot}</span>
            </MovieDetails>
            <MovieDetails>
              Director: <span>{movieInfo?.Director}</span>
            </MovieDetails>
            <MovieDetails>
              Writers: <span>{movieInfo?.Writer}</span>
            </MovieDetails>
            <MovieDetails>
              Stars: <span>{movieInfo?.Actors}</span>
            </MovieDetails>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>X</Close>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};

export default MovieInfoComponent;
