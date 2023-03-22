import styled from "styled-components";

export const Ideas = styled.div`
height: 180px;
overflow-y: scroll;
margin-top: 5px;

li {
    cursor: pointer;  

    :nth-child(odd) {
    background-color: #e0fa9d;

        :hover {
            background-color: #d1ed8a;
        }
    }
    
    :nth-child(even) {
        background-color: #e8fab6;

        :hover {
            background-color: #d1ed8a;
        }
    }
}
`