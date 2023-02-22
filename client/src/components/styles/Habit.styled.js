import styled from "styled-components"

export const StyledHabit = styled.div`
width: 70%;
margin: auto;

.habit-top {
    display: flex;
    padding: 20px;

    h2 {
        flex: 9;
    }

    button {
        flex: 2;
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
        background-color: #d4f08c;
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

#journal {
    width: 100%;
    margin-bottom: 30px;
    background-color: #f5f5f5;
    padding: 10px;
    border: none;
    border-radius:12px;
    -webkit-border-radius:12px;
    resize: none;

    :focus {
        outline: 3px solid #d4f08c;
    }
}

.details-btn {
    float: right;

    :hover {
        cursor: pointer;
    }
}
`