import styled from "styled-components"

export const EditProfileStyled = styled.div`
width: 90%;
margin: 15px auto;
// padding: 10px;
// padding-top: 40px;
// overflow: auto;
// background-color: #f7f7f7;
// box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
// border-radius: 10px;

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
    width: 90%;
    margin: 20px auto 10px;
    overflow: auto;

    button {
        // width: 100px;
        background-color: #9ed6f0;
        margin: 10px 0 10px;
        float: right
        
        :hover {
            background-color: #91c4db;
        }
    }
}

input {
    display: block;
    // width: 96%;
    // margin: auto;
    // padding: 10px 5px;
    // border: none;
    // border-radius: 10px;
    // border: 1px solid gray;

    // :focus {
    //     outline: none;
    //     border:3px solid #d4f08c;
    // }
}

.delete-acc {
    width: 95%;

    button {
        background-color: #f08ca2;
        float: right;

        :hover {
            background-color: #de8397;
        }
    }
}

.notif-form {
    padding: 10px;    
}


.notif-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 29px;
    margin-left: 10px;
    top: 10px;

    input {
        width: 0;
        height: 0;
        opacity: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        border-radius: 29px;
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
            height: 21px;
            width: 21px;
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