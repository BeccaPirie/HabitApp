import styled from "styled-components"

export const Form = styled.form`
margin: 30px auto;
padding: 20px;

label:not(li label) {
    display: block;
}

input, textarea {
    :focus {
        outline: none;
    }
}

textarea {
    width: 95%;
}

input:not(li input) {
    width: 100%;
    padding: 5px 0;
    border: none;
	border-bottom:3px solid #000;
}

textarea {
    background-color: #f5f5f5;
	padding: 10px;
    border: none;
    border-radius:12px;
	-webkit-border-radius:12px;
    resize: none;
}

ul {
    list-style-type: none;
}

li {
    margin-left: -30px;
    padding: 8px;
}
`