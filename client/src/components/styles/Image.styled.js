import styled from 'styled-components'

export const ImageStyled = styled.img`
display: none;
height: 100vh;  
object-fit: cover;

@media(min-width: 915px) {
    display: block;
    width: 50vw;
}
`