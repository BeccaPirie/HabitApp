import styled from "styled-components"

export const StyledHabitList = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    padding: 0;
    margin: 0;
    background-color: #fff;
    overflow: auto;

    .header-div {
        display: flex;

        .list-header {
            margin: 20px;
            margin-top: 35px;
        }

        .help-btn {
            margin-top: 38px;
            margin-left: 250px;
            color: #c2db7f;
        }
    }

    ul {
        margin: 0;
        list-style-type: none;
    }

    li {
        padding: 30px;
    }

    li:hover {
        background-color: #d1ed8a;
    }

    .habitListItem-true {
        background-color: #eee;
        text-decoration: line-through;

        :hover {
            background-color: #c2db7f;
        }
    }

    a {
        text-decoration: none;
        color: black;
    }

    .addBtn {
        background-color: #d1ed8a;
        position: absolute;
        bottom: 40px;
        right: 30px;

        :hover {
            background-color: #c2db7f;
        }
    }

    @media (min-width: 660px) {
        width: 280px;
        height: 100vh;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        
        ::-webkit-scrollbar-thumb {
        background-color: rgb(179, 179, 179);
        }

        .header-div {
            .help-btn {
                margin-left: 70px;
            }
        }
        
        .addBtn {
            left: 200px;
        }
    }
`