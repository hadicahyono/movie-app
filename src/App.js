import { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import axios from "axios";
const API_KEY = "42f28d8";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #121212;
  color: white;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  align-items: center;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: #121212;
  font-size: 16px;
  font-weight: normal;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;

function App() {
  const [searchQuery, setSearchQuery] = useState();
  const [timeOutId, setTimeOutId] = useState();
  const [movieList, setMovieList] = useState([]);

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    setMovieList(response.data.Search);
  };
  const onTextChange = (event) => {
    clearTimeout(timeOutId);
    setSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    setTimeOutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>Movie App</AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput
            placeholder="Search movie titles"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <MovieListContainer>
        {movieList?.length
          ? movieList.map((movie, index) => (
              <MovieComponent key={index} movie={movie} />
            ))
          : "No movies found"}
      </MovieListContainer>
    </Container>
  );
}

export default App;
