import styled from "styled-components"

export const EditProfileStyled = styled.div`
background-color: #ECF4F3;
overflow: auto;
min-height: calc(100vh - 75px);

.header {
    width: 60%;
    margin: auto;
}

form {
    width: 60%;
    margin: auto;
    overflow: auto;
}

button {
    float: right;
    margin-top: 10px;
}

input {
    display: block;
    width: 97%;
    margin: auto;
    padding: 10px 5px;
    border: none;
    border-radius: 10px;
    border: 1px solid gray;

    :focus {
        outline: none;
    }
}

.delete-acc {
    width: 80%;
}

.notif-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;

    input {
        width: 0;
        height: 0;
        opacity: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        border-radius: 34px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;

        :before {
            position: absolute;
            border-radius: 50%;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
          }
    }
    input:checked + .slider {
        background-color: #2196F3;
    }
    
    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
}

`