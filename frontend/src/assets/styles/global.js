import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`
    html, body {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        background-color: #f5f5f5;
        font-size: 14px;
    }

    h1, h2, h3, h4, h5, h6, p {
        margin: 0px;
        padding: 0px;
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
        background-color: #bbb;
    }

    *::-webkit-scrollbar-thumb {
        background-color: #df4723;
    }
`;

export default globalStyle;
