import styled from "styled-components"

export const StyledSidebar = styled.div`
    background-color: pink;
    width: 100%;
    height: calc(100vh - 70px);
    overflow-y: auto;
    padding: 0;
    margin: 0;

    ul {
        list-style-type: none;
    }

    li {
        padding: 20px;
        margin-left: -40px;
    }

    a {
        text-decoration: none;
    }    

    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
    }

    @media (min-width: 660px) {
        width: 280px;
        overflow-y: scroll;
        position: sticky;
        top: 70px;
    }

    @media (min-width: 992px) {
        width: 310px;
    }
`