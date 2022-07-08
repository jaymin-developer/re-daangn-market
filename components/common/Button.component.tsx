import { MouseEventHandler } from "react";
import { useMoveToPage } from "../../hooks/useRouter";
import * as Button from "../../styles/common/Button.styles";

interface IPropsMoveButton {
  name: string;
  page: string;
}

interface IPropsFuncButton {
  name: string;
  func: MouseEventHandler<HTMLButtonElement>;
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
    <Button.SubColorButton onClick={moveToPage(props.page)}>
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
    <Button.SubColorButton onClick={props.func}>
      {props.name}
    </Button.SubColorButton>
  );
};
