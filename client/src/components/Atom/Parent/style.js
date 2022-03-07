import styled from "styled-components";

export const ParentRightDiv = styled.div`
  flex: 1;
  margin: 35px 0 0 80px;
`;

export const ParentTable = styled.table`
  width: 100%;
  margin: 30px 0;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  overflow: hidden;
  th,
  td {
    padding: 8px;
  }
  th {
    text-align: left;
    font-weight: 500;
    color: #4a4a4a;
  }
`;

export const ParentTableHead = styled.thead`
  background-color: #f5f5f5;
  font-weight: normal;
  text-align: left;
  color: #4a4a4a;

  tr {
    border-bottom: 1px solid #e9e9e9;
  }
`;
