import styled from "styled-components"

export const StyledRightbar = styled.div`
background-color: #fff;
height: 80vh;
width: 200px;
padding: 20px;
margin-top: 15px;
border-radius: 10px;
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
// position: -webkit-sticky;
// position: sticky;
position: relative;
top: 70px;
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
    width: 270px;
}
`