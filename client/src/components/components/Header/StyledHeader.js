import styled from 'styled-components';

export const StyledHeader = styled.div`
  background: #1c1c1c;
  padding: 0 2px;
  box-sizing: border-box;
  height: 10vh;
  padding: 1vh 1vw;

  .header-content {
    max-width: 1280px;
    height: 8vh;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 500px) {
      max-width: 1280px;
      min-height: 0px;
    }
  }


  .logo{
    backgroundColor:white;
    width: 50px;
    height: 8vh;
  }
  .signinButtons{
    
    font-family: 'Abel', sans-serif;
    border-radius: 10px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
`;



