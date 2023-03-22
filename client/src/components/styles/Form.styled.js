import styled from "styled-components"

export const Form = styled.form`
width: 90%;
margin: 15px auto;

.container {
    padding: 20px 20px 10px;
}

.nameContainer {
    width: calc(90% - 65px);
}

.ideasBtn {
    color: #87b512;
}

.daysOfWeek {
    list-style-type: none;

    li {
        margin-left: -30px;
        padding: 8px;
    }
}

.submit-div {
    overflow: auto;
    margin: 10px 0;

    #save-btn {
        float: right;
        width: 100px;
    }    
}

#add-btn, #save-btn {
    background-color: #9ed6f0;

    :hover {
        background-color: #91c4db;
    }
}

#add-btn {
    float: right;
    margin: 10px 0;
}

#delete-btn {
    background-color: #f08ca2;
    margin-bottom: 10px;

    :hover {
        background-color: #de8397;
    }
}
`