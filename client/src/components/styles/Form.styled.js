import styled from "styled-components"

export const Form = styled.form`
width: 90%;
margin: 15px auto;
// background-color: #f7f7f7;
// box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
// border-radius: 10px;
// overflow: auto;

.container {
    padding: 0 20px;
}

// .nameContainer {
//     display: flex;

//     input[type="text"] {
        // width: calc(70% - 65px);
//         padding-right: 65px;
//         background-color: #f7f7f7;
//     }
    
//     .ideasBtn {
//         margin-left: -60px;
//         background: none;
//         padding: none;
//         color: #87b512;
//     }
// }

.nameContainer {
    width: calc(90% - 65px);
}

.ideasBtn {
    color: #87b512;
}

// input[type="text"] {
//     width: 70%;
// }

// label:not(li label) {
//     display: block;
//     margin-top: 20px;
// }

// input:not(li input) {
//     width: 100%;
//     padding: 5px 0;
//     border: none;
// 	border-bottom:3px solid #000;

//     :focus {
//         outline: none;
//         border-bottom:3px solid #d4f08c;
//     }
// }

// textarea {
//     width: 95%;
//     background-color: #f1f1f1;
// 	padding: 10px;
//     border: none;
//     border-radius:12px;
// 	-webkit-border-radius:12px;
//     resize: none;

//     :focus {
//         outline: 3px solid #d4f08c;
//     }
// }

.daysOfWeek {
    list-style-type: none;

    li {
        margin-left: -30px;
        padding: 8px;
    }
}

.submit-div {
    overflow: auto;
    margin: 10px 25px;

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
    margin: 10px;
}

#delete-btn {
    background-color: #f08ca2;
    margin-bottom: 10px;

    :hover {
        background-color: #de8397;
    }
}
`