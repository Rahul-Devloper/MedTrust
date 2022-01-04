import styled from "styled-components";

export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  position: relative;
  font-size: 13px;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  background-color: #fff;

  /* On hover, border blue */
  &:hover {
    /* Transition smooth */
    transition: all 0.5s ease-in-out;
    border: 1px solid #0010f7;
  }

  img {
    width: 12.5%;
    height: 100%;
    object-fit: contain;
    border-radius: 3px;
    position: absolute;
    margin-right: 10px;
  }
  p {
    margin: 0 0 0 0;
    font-size: 14px;
    margin-left: 8px;
    font-weight: 500;

    /* On hover, text blue */
    &:hover {
      transition: all 0.5s ease-in-out;
      color: #0010f7;
    }
  }
`;
