import styled from 'styled-components';

export const StyledHeader = styled.div`
  background: #1c1c1c;
  padding: 0 2px;
  box-sizing: border-box;
  height: 10vh;
  padding: 1vh 0;

  a{
    color:white;
    font-size: 1rem;
    margin: 0.2rem;
    border-radius: 5px;
  }

  .logo{
    background:#1c1c1c;
  }
  .signinButtons{
    
    font-family: 'Abel', sans-serif;
    border: 1px solid white;
    border-radius: 10px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .loginInfo{
   font-size: 0.8rem;
    padding: 0 10px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 50px;
    flex-wrap:wrap;
    h1{
      margin: 0;
    }

  }

  .loginInfo-container{
    cursor:pointer;
    margin-right: 10px;
  }
  .loginInfo{
    
  }


  .header-content {
    max-width: 1280px;
    ${'' /* padding: 20px 0px; */}
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
`;

export const StyledRMDBLogo = styled.img`
  ${'' /* margin-top: 20px; */}
  ${'' /* border: 1px solid red; */}
  width: 35vh;

  
  @media screen and (max-width: 500px) {
    ${'' /* width: 150px; */}
    margin-top: 5px;
  }
`;

export const StyledTMDBLogo = styled.img`
  width: 122px;
  margin-top: 25px;
  float: right;

  @media screen and (max-width: 500px) {
    display: inline-block;
    width: 80px;
    margin-top: 0px;
  }
`;
