import styled from "styled-components"

export const StyledSidebar = styled.div`
    background-color: lightblue;
    width: 100px;
    ul {
        list-style-type: none;
    }

    li {
        padding: 30px;
        margin-left: -40px;
        text-align: right;
    }

    a {
        text-decoration: none;
        color: black;
    }

    @media (min-width: 660px) {
        width: 160px;
        height: 100vh;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
    }

    @media (min-width: 992px) {
        width: 220px;
    }
`