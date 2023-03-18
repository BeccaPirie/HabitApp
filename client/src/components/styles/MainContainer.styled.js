import styled from "styled-components";

export const MainContainer = styled.div`
    display: block;

    .paper {
        width: 100%;
        padding: 10px;
        overflow: auto;
        min-height: 83vh;
    }
    
    @media (min-width: 660px) {
        width: calc(100vw - 310px);
    }

    @media (min-width: 1100px) {
        width: calc(100vw - 620px);
    }

    // @media (min-width: 1500px) {
    //     width: calc(100vw - 620px);
    // }
`