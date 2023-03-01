import styled from 'styled-components'

export const AlertStyled = styled.div`
background-color: rgba(156, 233, 156, 0.8);
width: 100%;
position: fixed;
text-align: center;
padding: 10px 0;
border-radius: 0 0 5px 5px;
top: 0;

@media (min-width: 660px) {
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 110px;
}

@media (min-width:768px) {width: 150px;}
@media (min-width:920px) {width: 350px;}
@media (min-width:1100px) {width: 450px;}
`