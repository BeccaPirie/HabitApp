import styled from "styled-components"

export const Form = styled.form`
margin: 30px auto;
padding: 20px;

label:not(li label) {
    display: block;
}

input:not(li input) {
    width: 100%;
    padding: 5px 0;
    border: none;
	border-bottom:3px solid #000;

    :focus {
        outline: none;
        border-bottom:3px solid #d4f08c;
    }
}

textarea {
    width: 95%;
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

ul {
    list-style-type: none;
}

li {
    margin-left: -30px;
    padding: 8px;
}
`