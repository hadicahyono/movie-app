import styled from "styled-components";

// Card untuk daftar film
const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;

const MovieTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #121212;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  text-transform: capitalize;
`;
const Movie = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  return (
    <MovieContainer onClick={() => props.onMovieSelect(imdbID)}>
      <CoverImage src={Poster} />
      <MovieTitle>{Title}</MovieTitle>
      <InfoColumn>
        <MovieInfo>Year: {Year}</MovieInfo>
        <MovieInfo>Type: {Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};

export default Movie;
