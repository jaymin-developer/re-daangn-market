import styled from "@emotion/styled";

export const WrapperDiv = styled.div`
  max-width: 960px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 96px 0 16px;

  gap: 16px;
`;

export const HeaderBoxDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  gap: 10px;
`;

export const InputBoxDiv = styled.div`
  width: 100%;
`;

export const BaseInput = styled.input`
  width: 100%;

  padding: 20px 10px;

  border: none;
  border-top: 1px solid #d2d2d2;

  outline: none;
`;

export const TitleInput = styled(BaseInput)``;

export const RemarksInput = styled(BaseInput)``;

export const PriceInput = styled(BaseInput)``;

export const TagsInput = styled(BaseInput)`
  border-bottom: 1px solid #d2d2d2;
`;

export const ToastEditorBoxDiv = styled.div`
  width: 100%;
`;
