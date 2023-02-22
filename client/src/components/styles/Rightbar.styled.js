import styled from "styled-components"

export const StyledRightbar = styled.div`
background-color: #e8ffaf;
// background-color: #fff;
height: fit-content;
min-height: 25vh;
width: 200px;
padding: 20px;
border-radius: 40px;
position: -webkit-sticky;
position: sticky;
top: 20px;
right: 10px;

.item {
    display: flex;    
}

.item:hover {
    background-color: rgb(248, 248, 248);
}

a {
    flex: 6;
    color: black;
    text-decoration: none;
}

.btn-div {
    flex: 6;
}

@media (min-width: 972px) {
    width: 260px;
}
`