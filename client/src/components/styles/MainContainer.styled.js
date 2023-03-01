import styled from "styled-components";

export const MainContainer = styled.div`
    display: block;

    @media (min-width: 660px) {
        width: calc(100vw - 530px);
    }

    @media (min-width: 992px) {
        width: calc(100vw - 620px);
    }
`