import styled from "styled-components"

export const StyledNavbar = styled.div`
display: block;
width: 100vw;
height: 70px;
display: flex;
align-items: center;
margin: auto;

.left {
    flex: 10;
    align-items: center;
    padding-left: 20px;

    // h2 {
    //     display: none;
    // }
}

.right {
    flex: 2;

    ul {
        list-style-type: none;
        display: flex;
        padding-left: 0;
        margin: 0;
    }

    .notif-list {
        position: absolute;
        width: 300px;
        top: 45px;
        right: 70px;
        z-index: 100;
        min-height: 100px;
        max-height: 300px;
        overflow: auto;

        ul {
            display: block;
            padding: 0;
        }

        .no-msg {
            width: fit-content;
            height: 100px;
            margin: auto;
            line-height: 70px;
        }
    }

    .menu-list {
        position: absolute;
        top: 50px;
        right: 40px;
        z-index: 100;

        ul {
            display: block;
            padding: 0;
        }

        li {
            padding: 8px 40px;
        }
    }

    a {
        text-decoration: none;
        color: black;
    }
}

@media (min-width: 500px) {
    ul {
        padding-right: 50px;
    }
}

@media (min-width: 660px) {
    width: calc(100vw - 293px);

    .left {
        padding-left: 50px;
    }
}

@media (min-width: 992px) {
    width: calc(100vw - 318px);
}

// @media (min-width: 400px) {
//     .left h2 {
//         display: block;
//     }
// }

@media (min-width: 650px) {
    .left h2 {
        display: none;
    }
}

@media (min-width: 700px) {
    .left h2 {
        display: block;
    }
}
`