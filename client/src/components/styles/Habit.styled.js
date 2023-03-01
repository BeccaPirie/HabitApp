import styled from "styled-components"

export const StyledHabit = styled.div`
width: 90%;
margin: 15px auto;
padding: 10px;
overflow: auto;
background-color: #fff;
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
    }
}

.calendar-btns {
    margin-top: 20px;
    margin-bottom: 30px;
    text-align: center;

    button {
        display: inline-block;
        margin: 8px;
    }

    #Completed {
        background-color: #d1ed8a;
    }
    
    #Skipped {
        background-color: #78cbe4;
    }
    
    #Missed {
        background-color: #f08ca2;
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

        :focus {
            outline: 3px solid #d1ed8a;
        }
    }
}

.details-btn {
    float: right;

    :hover {
        cursor: pointer;
    }
}
`