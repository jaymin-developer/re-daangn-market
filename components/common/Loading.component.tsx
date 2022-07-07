import styled from "@emotion/styled";
import { Spin } from "antd";

interface IpropsLoading {
  content?: string;
}

const LoadingComponent = (props: IpropsLoading) => {
  return (
    <LoadingWrapperDiv>
      <Spin size="large" />
      <div>{props.content}</div>
    </LoadingWrapperDiv>
  );
};

export default LoadingComponent;

const LoadingWrapperDiv = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
`;
