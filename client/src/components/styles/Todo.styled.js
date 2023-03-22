import styled from "styled-components"

export const TodoList = styled.div`
width: 80%;
margin: auto;
overflow: auto;
padding: 12px;
background-color: #f1f1f1;
border-radius: 7px;

.todo-add {
    float: right;
    background-color: #d1ed8a;

    :hover {
        background-color: #c2db7f;
    }
}
`