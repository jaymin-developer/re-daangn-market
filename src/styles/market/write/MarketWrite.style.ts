import styled from "@emotion/styled";
import { Color } from "../../theme";

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

export const ImageInput = styled.input`
  display: none;
`;

export const ImagesBoxDiv = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  padding: 20px 10px;

  border: none;

  overflow: scroll;
`;

export const ItemImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

export const TitleInput = styled(BaseInput)``;

export const RemarksInput = styled(BaseInput)``;

export const PriceInput = styled(BaseInput)``;

export const TagsInputBox = styled.div`
  width: 100%;

  display: flex;

  align-items: center;
  border-top: 1px solid #d2d2d2;
  border-bottom: 1px solid #d2d2d2;

  gap: 10px;
`;

export const TagDiv = styled.div`
  width: max-content;
  padding: 10px;

  color: #ffffff;
  background-color: ${Color.Main};

  border-radius: 8px;
`;

export const TagsInput = styled(BaseInput)`
  max-width: 100%;
  width: 50%;
  border: none;
`;

export const ToastEditorBoxDiv = styled.div`
  width: 100%;

  .youtube {
    background: url("/youtube.png") no-repeat;
    background-size: contain;
  }

  .youtube-div {
    width: auto;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .youtube-input {
    width: 80%;
    border: 1px solid #e1e3e9;

    padding: 0 10px;
  }

  .youtube-button {
    width: 63px;
    height: 32px;

    color: white;
    background-color: ${Color.Main};
  }
`;
