import styled from "styled-components";

export const MainContainer = styled.div`
    display: block;
    // width: calc(100vw - 100px);

    @media (min-width: 660px) {
        width: calc(100vw - 480px);
    }

    @media (min-width: 992px) {
        width: calc(100vw - 570px);
    }
`