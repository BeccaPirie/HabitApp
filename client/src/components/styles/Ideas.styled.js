import styled from "styled-components";

export const Ideas = styled.div`
height: 180px;
overflow-y: scroll;
margin-top: 5px;

li {
    cursor: pointer;  

    :nth-child(odd) {
    background-color: lightgreen;

        :hover {
            background-color: green;
        }
    }
    
    :nth-child(even) {
        background-color: #d4f08c;

        :hover {
            background-color: green;
        }
    }
}
`