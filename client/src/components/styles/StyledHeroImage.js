import styled from 'styled-components';

export const StyledHeroImage = styled.div`
  background: ${props =>
    `linear-gradient(
      to bottom, rgba(0,0,0,0)
      39%,rgba(0,0,0,0)
      41%,rgba(0,0,0,0.65)
      100%
    ),
    url('${props.image}'), #1c1c1c`};
  background-size: 100%, cover !important;
  background-position: center, center !important;
  width: 100%;
  height: 600px;
  position: relative;
  animation: animateHeroimage 1s;

  .heroimage-content {
    max-width: 1280px;
    padding: 20px;
    margin: 0 auto;
  }

  .heroimage-text {
    z-index: 100;
    max-width: 700px;
    position: absolute;
    bottom: 40px;
    margin-right: 20px;
    min-height: 100px;
    background: rgba(0, 0, 0, 0);
    color: #fff;

    h1 {
      font-family: 'Abel', sans-serif;
      font-size: 48px;
      color: #fff;

      @media screen and (max-width: 720px) {
        font-size: 38px;
        color: #fff;
      }
    }

    p {
      font-family: 'Abel', sans-serif;
      font-size: 22px;
      line-height: 26px;
      color: #fff;

      @media screen and (max-width: 720px) {
        font-size: 16px;
        line-height: 20px;
        color: #fff;
      }
    }

    @media screen and (max-width: 720px) {
      max-width: 100%;
    }
  }

  @keyframes animateHeroimage {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
