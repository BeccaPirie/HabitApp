import styled from "styled-components"

export const StyledNavbar = styled.div`
display: block;
width: 100vw;
height: 70px;
display: flex;
align-items: center;

.left {
    flex: 10;
    align-items: center;
    padding-left: 20px;

    h2 {
        display: none;
    }
}

.right {
    flex: 2;

    ul {
        list-style-type: none;
        display: flex;
        padding-left: 0;
        // padding-right: 50px;
        margin: 0;
    }

    a li {
        align-items: center;
        height: 35px;
        width: 60px;
        margin: 10px;
        line-height: 35px;
        padding: 0 15px;
        border-radius: 20px;
        border: 3px solid #d1ed8a;
        text-align: center;
        // color: #d1ed8a;
        font-weight: bold;
        background-color: #d1ed8a;
        color: white;

        :hover {
            // background-color: #d1ed8a;
            // color: white;
            // background-color: ;
        }
    }
}

a {
    text-decoration: none;
}

@media (min-width: 500px) {
    ul {
        padding-right: 50px;
    }
}

@media (min-width: 660px) {
    width: calc(100vw - 293px);

    .left {
        padding-left: 50px;
    }
}

@media (min-width: 992px) {
    width: calc(100vw - 318px);
}

@media (min-width: 400px) {
    .left h2 {
        display: block;
    }
}

@media (min-width: 660px) {
    .left h2 {
        display: none;
    }
}

@media (min-width: 780px) {
    .left h2 {
        display: block;
    }
}
`