import styled from "styled-components";
import { Link } from "react-router-dom";

export const EntryPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fbfbfb;
`;

export const PageHeader = styled(Link)`
  font-size: 2rem;
  font-weight: 600;
  margin: 40px 0;
  color: inherit;
`;

export const GoogleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 50px;
  background: #4385f4;
  position: relative;
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  cursor: pointer;
  margin: 10px;
  border-radius: 5px;

  img {
    width: 12.5%;
    height: 100%;
    object-fit: contain;
    left: 10px;
    border-radius: 3px;
    position: absolute;
  }
  p {
    font-size: 20px;
  }
`;

export const GithubContainer = styled(GoogleContainer)`
  background: rgb(56, 56, 56);
`;

export const TwitterContainer = styled(GoogleContainer)`
  background: #00a2f4;

  img {
    width: 15%;
    left: 8px;
  }
`;
