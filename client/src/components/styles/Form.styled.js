import styled from "styled-components"

export const Form = styled.form`
margin: 30px auto;
padding: 20px;

label {
    display: block;
}

input, textarea {
    width: 100%;

    :focus {
        outline: none;
    }
}

input {
    padding: 5px 0;
    border: none;
	border-bottom:3px solid #000;
	// height:28px;
}

textarea {
    background-color: #f5f5f5;
	padding: 10px;
    border: none;
    border-radius:12px;
	-webkit-border-radius:12px;
    resize: none;
}
`