
import styled from 'styled-components';

export const StyledFooter = styled.div`
  background: #1c1c1c;
  padding: 0 20px;
  box-sizing: border-box;
  font-family: 'Abel', sans-serif;  
  min-height:10vh;
  a{
      color: white;
      text-decoration: none;
      font-size:22px;

  }
  .footer-content {
    max-width: 1280px;
    min-height: 30px;
    height: 10vh;
    padding: 0.5vh  0;
    
    a{
      font-size: 22px;;
    }
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 500px) {
      max-width: 1280px;
      min-height: 0px;
    }
  }
`;




