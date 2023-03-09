import styled from "styled-components"

export const AboutStyled = styled.div`
background-color: #ECF4F3;
min-height: calc(100vh - 70px);
display: flex;
justify-content: center;

.main-container {
    background-color: #fff;
    width: 100%;
    margin: 40px 5px;
    padding: 50px;
    border-radius: 15px;
}

@media (min-width: 768px) {
    .main-container {
        width: 60vw;
    }
}
`