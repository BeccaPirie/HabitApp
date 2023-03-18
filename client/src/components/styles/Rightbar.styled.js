import styled from "styled-components"

export const StyledRightbar = styled.div`
height: 80vh;
margin-top: 15px;
position: relative;
top: 70px;
right: 10px;
display: none;

.paper {
    height: 100%;
    width: 270px;
    padding: 20px;
    overflow: auto;
}

.item {
    display: flex;
    height: 40px;
    padding: 5px 2px;
    align-items: center;
}

.item:hover {
    background-color: #f4f4f4;
}

a {
    flex: 5;
    color: black;
    text-decoration: none;
    margin-left: 3px;
}

.btn-div {
    flex: 6;
}

button {
    border: none;
    margin-right: 3px;
    padding: 5px;
    cursor: pointer;
    width: 40px;
    border-radius: 7px;
}

#Completed {
    background-color: #d1ed8a;

    :hover {
        background-color: #c2db7f;
    }
}

#Skipped {
    background-color: #78cbe4;

    :hover {
        background-color: #74c1d6;
    }
}

#Missed {
    background-color: #f08ca2;

    :hover {
        background-color: #de8397;
    }
}
@media (min-width: 1100px) {
    display: block;
}

// @media (min-width: 1500px) {
//     width: 270px;
// }
`