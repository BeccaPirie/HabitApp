import styled from 'styled-components'

export const LoginStyled = styled.div`
display: table;
margin: auto;
margin-top: 0;
width: 100vw;
height: 100vh;
text-align: center;
background-color: #e8ffaf;

form {
    display: table-cell;
    vertical-align: middle;
}

h3 {
    font-size: 32px;
    margin-top: 0;
}

input {
    display: block;
    width: 50%;
    margin: auto;
    padding: 10px 5px;
    margin-bottom: 35px;
    border: none;
    border-radius: 10px;
    border: 1px solid gray;

    :focus {
        outline: none;
    }
}

button {
    width: 40%;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: #a2e60b;
    color: white;
    font-size: 18px;
    cursor: pointer;
    margin-bottom: 10px;

    :hover {
        background-color: #9bdb0b;
    }
}

@media (min-width: 915px) {
    width: 50vw;
    border-top-left-radius: 90px;
}
`