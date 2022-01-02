import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;1,600&display=swap');
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        text-decoration: none;
        box-sizing: border-box;
        font-family: 'Nunito Sans', sans-serif;
    }

    body {
        font-size: 16px;
        font-family: 'Nunito Sans', sans-serif;
        overflow-x: hidden;
        
    }

`;
