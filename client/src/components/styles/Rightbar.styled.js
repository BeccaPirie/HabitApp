import styled from "styled-components"

export const StyledRightbar = styled.div`
.item {
    display: flex;    
}

.name {
    flex: 6;
}

.btn-div {
    flex: 6;
}

@media (min-width: 660px) {
    width: 200px;
    height: 100vh;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}

@media (min-width: 992px) {
    width: 260px;
}
`