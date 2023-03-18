import styled from "styled-components"

export const StyledHabit = styled.div`
width: 90%;
margin: 15px auto;

.habit-top {
    width: 80%;
    display: flex;
    padding: 10px;
    margin: 10px auto;

    .title-div {
        flex: 9;
        display: flex;
        align-items: center;

        h2{
            float: left;
            margin: 5px;
        }
    }

    .title-form {
        flex: 9;
        margin-right: 10px;
        display: flex;
        align-items: center;
    }

    #habit-completed-btn {
        width: 80px;
        background-color: #d1ed8a;
        border-radius: 7px;
        height: 50px;
        display: flex;

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
        margin: 8px;
        width: 95px;
        border-radius: 7px;
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
    margin: 20px auto 50px;
    padding: 0;

    // #journal {
    //     width: 100%;
    //     margin-bottom: 10px;
    //     background-color: #f5f5f5;
    //     padding: 10px;
    //     border: none;
    //     border-radius:12px;
    //     -webkit-border-radius:12px;
    //     resize: none;
    //     outline: 3px solid #d4f08c;
    // }

    button {
        background-color: #9ed6f0;
        margin-top: 10px;

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