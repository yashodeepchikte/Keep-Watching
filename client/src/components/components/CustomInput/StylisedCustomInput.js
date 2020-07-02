import styled from 'styled-components';


export const StylisedCustomInput = styled.tr`
	${'' /* display: flex; */}
	border: 1px solid orange;
	margin:auto;
	font-size: 1.5rem;
	text-align: left;

	border: 1px solid purple;
	margin: auto;

	td{
		border: 1px solid yellow;
		box-sizing: border-box;
	}
	input{
		box-sizing: border-box;

		border: none;
		border-bottom: 1px solid black;
		margin: 0 10px 0 10px;
	}
	input: focus{
		box-sizing: border-box;

		outline: none;
		margin: 0 10px 0 10px;

	}
	input[type="submit"] {
		color:white;
		width: 200px;
		background-color: black;
		transition: 1s;
		border: none;
		height: 50px;
		border-radius: 25px;
	 }
	 input[type="submit"]:hover {
		color:white;
		width: 200px;
		background-color: gray;
		border: none;
		height: 50px;
		border-radius: 25px;
		transition: 0.5;
	 }



`;