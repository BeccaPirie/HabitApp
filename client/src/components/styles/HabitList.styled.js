import styled from "styled-components"

export const StyledHabitList = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 0;
    margin: 0;

    .list-header {
        margin-left: 20px;
    }

    ul {
        margin: 0;
        list-style-type: none;
    }

    li {
        padding: 30px;
        margin-left: -40px;
        border-bottom: 1px solid #ccc;
    }

    li:hover {
        background-color: rgb(248, 248, 248);
    }

    .habitListItem-true {
        background-color: rgb(248, 248, 248);
        text-decoration: line-through;
    }

    a {
        text-decoration: none;
        color: black;
    }

    .addBtn {
        background-color: lightblue;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        position: -webkit-sticky;
        position: sticky;
        bottom: 40px;
        left: calc(100vw - 100px);

        span {
        font-size: 50px;
        font-weight: bold;
        color: #fff;
        }
    }

    @media (min-width: 660px) {
        width: 280px;
        height: 100vh;
        overflow-y: scroll;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        
        ::-webkit-scrollbar {
            width: 10px;
        }
        
        ::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
        background-color: rgb(179, 179, 179);
        }

        .addBtn {
            left: 180px;
            right: 0;
        }
    }

    @media (min-width: 992px) {
        width: 310px;

        .addBtn {
            left: 210px;
        }
    }
`