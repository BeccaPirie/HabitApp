import styled from "styled-components"

export const StyledHabitList = styled.div`
    width: 100%;
    padding: 0;
    margin: auto;

    ul {
        margin: 0;
        list-style-type: none;
    }

    li {
        padding: 30px;
        margin: 0 0 5px -40px;
    }

    li:hover {
        background-color: rgb(248, 248, 248);
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

    // ::-webkit-scrollbar {
    //     width: 10px;
    // }
    
    // ::-webkit-scrollbar-track {
    // background-color: #f1f1f1;
    // }
    
    // ::-webkit-scrollbar-thumb {
    // background-color: rgb(179, 179, 179);
    // }

    @media (min-width: 660px) {
        width: 90%;
        background-color: #ade0c9;
        // box-shadow: 10px 10px 60px 20px #f1f1f1;
                
        ul {
            height: 400px;
            overflow-y: scroll;

            ::-webkit-scrollbar {
                width: 10px;
            }
            
            ::-webkit-scrollbar-track {
            background-color: #f1f1f1;
            }
            
            ::-webkit-scrollbar-thumb {
            background-color: rgb(179, 179, 179);
            }
        }

        .addBtn {
            left: 180px;
            right: 0;
        }
    }

    // @media (min-width: 800px) {
    //     width: 450px;
    // }

    // @media (min-width: 992px) {
    //     .addBtn {
    //         left: 210px;
    //     }
    // }

    // @media (min-width: 1080px) {
    //     width: 580px;
    // }

    // @media (min-width: 1200px) {
    //     width: 650px;
    // }
`