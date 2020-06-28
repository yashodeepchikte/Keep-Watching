import styled from 'styled-components';

export const StylisedCustomInput = styled.div`
div{
display: flex;
border: 1px solid orange;
margin:auto;
font-size: 1.5rem;
text-align: left;
.input-content{
  border: 1px solid purple;
  margin: auto;
  input{
    border: none;
    border-bottom: 1px solid black;
    margin-left: 10px;
  }
  input: focus{
    outline: none;
    margin-left: 10px;

  }
}
}
  
`;