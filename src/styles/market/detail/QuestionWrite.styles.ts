import styled from "@emotion/styled";

export const WrapperDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 20px 20px 10px;

  gap: 10px;
`;

export const NameP = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

export const ContentsBoxDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 10px;
`;

export const ContentsTextArea = styled.textarea`
  width: 100%;
  height: 50px;

  padding: 10px;

  border: 1px solid #e9ecef;
  border-radius: 8px;

  resize: none;
`;
