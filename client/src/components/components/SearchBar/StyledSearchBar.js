
import styled from 'styled-components';

export const StyledSearchBar = styled.div`
  width: 100%;
  height: 10vh;
  background: #1c1c1c;
  padding: 1.5vh 20px 1.5vh 20px;
  box-sizing: border-box;
  color: #fff;
`;

export const StyledSearchBarContent = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 7vh;
  background: #353535;
  margin: 0 auto;
  border-radius: 40px;
  position: relative;
  color: #fff;
  .search-content{
    border:1px solid red;
  }
  .fa-search {
    font-size: 3vh;
    position: absolute;
    left:30px;
    top: 2vh;
    color: #fff;
    z-index: 1000;
  }

  input {
    font-family: 'Abel', sans-serif;
    position: absolute;
    height: 7vh;
    left: 0px;
    ${'' /* margin: 8px 0; */}
    padding: 0 0 0 60px;
    border: 0;
    width: 95%;
    background: transparent;
    color: #fff;
    box-sizing: border-box;
    font-size:22px;

    :focus {
      outline: none;
    }

    @media screen and (max-width: 720px) {
      font-size: 28px;
    }
  }
`;
