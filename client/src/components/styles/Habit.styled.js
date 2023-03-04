import styled from "styled-components"

export const StyledHabit = styled.div`
width: 90%;
margin: 15px auto;
padding: 10px;
overflow: auto;
background-color: #f7f7f7;
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
border-radius: 10px;

.habit-top {
    width: 80%;
    display: flex;
    padding: 10px;
    margin: 10px auto;

    h2 {
        flex: 9;
    }

    button {
        width: 130px;
        background-color: #d1ed8a;

        :hover {
            background-color: #c2db7f;
        }
    }
}

.calendar-btns {
    margin-top: 20px;
    margin-bottom: 30px;
    text-align: center;

    button {
        display: inline-block;
        margin: 8px;
        width: 95px;
    }

    #Completed {
        background-color: #d1ed8a;

        :hover {
            background-color: #c2db7f;
        }
    }
    
    #Skipped {
        background-color: #78cbe4;

        :hover {
            background-color: #74c1d6;
        }
    }
    
    #Missed {
        background-color: #f08ca2;

        :hover {
            background-color: #de8397;
        }
    }
}

label {
    display: block;
}

form {
    width: 85%;
    margin: 30px auto;
    padding: 0;

    #journal {
        width: 100%;
        margin-bottom: 10px;
        background-color: #f5f5f5;
        padding: 10px;
        border: none;
        border-radius:12px;
        -webkit-border-radius:12px;
        resize: none;
        outline: 3px solid #d4f08c;
    }

    button {
        background-color: #9ed6f0;

        :hover {
            background-color: #91c4db;
        }
    }
}

.details-btn {
    float: right;
    background-color: #d1ed8a;
    width: 100px;

    :hover {
        cursor: pointer;
        background-color: #c2db7f;
    }
}
`