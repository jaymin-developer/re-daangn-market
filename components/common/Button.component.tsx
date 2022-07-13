import { MouseEvent, MouseEventHandler } from "react";
import { useMoveToPage } from "../../hooks/useRouter";
import { FormValues } from "../../src/types/market/write/MarketWrite.types";
import * as Button from "../../src/styles/common/Button.styles";

interface IPropsMoveButton {
  name: string;
  page: string;
  type?: "button" | "submit" | "reset";
}

interface IPropsFuncButton {
  name: string;
  type?: "button" | "submit" | "reset";
  func?: any;
}

export const MoveButtonMain = (props: IPropsMoveButton) => {
  const { moveToPage } = useMoveToPage();
  return (
    <Button.MainColorButton onClick={moveToPage(props.page)}>
      {props.name}
    </Button.MainColorButton>
  );
};

export const MoveButtonSub = (props: IPropsMoveButton) => {
  const { moveToPage } = useMoveToPage();
  return (
    <Button.SubColorButton type={props.type} onClick={moveToPage(props.page)}>
      {props.name}
    </Button.SubColorButton>
  );
};

export const FuncButtonMain = (props: IPropsFuncButton) => {
  return (
    <Button.MainColorButton onClick={props.func}>
      {props.name}
    </Button.MainColorButton>
  );
};

export const FuncButtonSub = (props: IPropsFuncButton) => {
  return (
    <Button.SubColorButton type={props.type} onClick={props.func}>
      {props.name}
    </Button.SubColorButton>
  );
};
