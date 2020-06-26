
import styled from 'styled-components';

export const StyledFooter = styled.div`
  background: #1c1c1c;
  padding: 0 20px;
  box-sizing: border-box;
  font-family: 'Abel', sans-serif;  
//   border: 1px solid yellow;
  a{
      color: white;
      text-decoration: none;
      font-size:2rem;

  }
  .footer-content {
    // border: 1px solid white;
    max-width: 1280px;
    min-height: 30px;
    padding: 20px  0;
    
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




