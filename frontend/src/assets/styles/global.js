import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`
    html, body {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        background-color: #f5f5f5;
    }

    input {
        background-color: #f5f5f5;
    }

    * {
        font-family: "Oswald";
    }

    *::-webkit-scrollbar {
        width: 0.8em;
    }

    *::-webkit-scrollbar-track {
        background-color: rgba(158, 158, 158, 1);
    }

    *::-webkit-scrollbar-thumb {
        background-color: rgba(158, 158, 158, 0.5);
        border-radius: 2em;
    }
`;

export default globalStyle;
