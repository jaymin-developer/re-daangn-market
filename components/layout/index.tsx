import styled from "@emotion/styled";
import React from "react";
import LayoutHeaderComponent from "./Hedaer.component";

interface IProps {
  children: React.ReactNode;
}

const LayoutComponent = (props: IProps) => {
  // const HIDDEN = ["/useditems"]
  // const isHidden = HIDDEN.includes(router.asPath)

  return (
    <LayoutWrapperDiv>
      <LayoutHeaderComponent />
      <BodyWrapperMain>{props.children}</BodyWrapperMain>
      {/* {isHidden || <LayoutFooter />} */}
    </LayoutWrapperDiv>
  );
};

const LayoutWrapperDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const BodyWrapperMain = styled.main`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export default LayoutComponent;
