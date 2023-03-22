import styled from 'styled-components'

export const LoginStyled = styled.div`
margin: auto;
margin-top: 0;
width: 100vw;
height: 100vh;
text-align: center;
background-color: #e8ffaf;
display: flex;
align-content: center;

.alert {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;

    button {
        margin-right: 40px;
    }
}

form {
    margin: auto;
    vertical-align: middle;
    width: 350px;
}

h3 {
    font-size: 32px;
    margin-top: 0;
}

.loginInput {
    display: block;
    width: 100%;
    margin: 20px auto;
}

.submit-btn {
    width: 350px;
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
    width: 45vw;
    border-top-left-radius: 90px;
}
`