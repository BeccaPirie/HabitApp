import styled from "styled-components"

export const StyledNavbar = styled.div`
display: block;
width: 100%;
height: 70px;
display: flex;
align-items: center;

.left {
    flex: 10;
    align-items: center;
    padding-left: 50px;
}

.right {
    flex: 2;

    ul {
        list-style-type: none;
        display: flex;
        padding-left: 0;
        padding-right: 50px;
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
        color: #d1ed8a;
        font-weight: bold;

        :hover {
            background-color: #d1ed8a;
            color: white;
        }
    }
}

a {
    text-decoration: none;
}

@media (min-width: 660px) {
    width: calc(100vw - 280px);
}

@media (min-width: 992px) {
    width: calc(100vw - 310px);
}
`