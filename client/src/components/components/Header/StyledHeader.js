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
  .logOutButton{
    font-family: 'Abel', sans-serif;
    border-radius: 10px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }
  .loginInfo-container{
    ${'' /* display: flex; */}
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 220px;
    overflow: wrap;
    text-align:right;
    irems-align: right;
    align-items: end;

    position: relative;
    box-sizing: border-box;
    z-index: 200;
  }
  .loginInfo{
    ${'' /* border-radius: 10px; */}
    transition: 0.5s;
    ${'' /* height: 200px; */}
    width: 220px;
    overflow: hidden;
    position: absolute;
    top: 6vh;
    left: -10px;
    z-index:201;
    background: #1f2735;

    h1{
    font-size: 16px;
    margin: 0;
    }
  }
  .hidden{
    height: 0;
    transition: 0.5s;
  }
  .menu-hidden{
    color: white;
    cursor: pointer;
  }
  .menu-shown{
    color: #316aff;
    corsor: pointer;
  }
  .logininfo-item{
    overflow:visible;
    height: 40px;
    font-size: 13px;
    display: flex;
    font-family: arial;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-bottom: 1px solid white;
    transition: 0.3s;
  }
  .logininfo-item:hover{
    transition: 0.3s;
    color: white;
    background-color: #316aff;
    cursor: pointer;
    border-bottom: 1px solid white;
  }
  .logininfo-item{
    background-color: black;

    button{
      border: none;
      width: 100%;
      height: 100%;
    }
    button:hover{
      border: none;
      border-radius: none;
      background-color: #316aff;
      color: white;


    }
  }
`;



