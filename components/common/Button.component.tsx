import { IPage, useMoveToPage } from "../../hooks/useRouter";
import * as Button from "../../styles/common/Button.styles";

interface IPropsButton {
  name: string;
  page: IPage;
}

export const Button1 = (props: IPropsButton) => {
  const { moveToPage } = useMoveToPage();
  return (
    <Button.Button1Button onClick={moveToPage(props.page)}>
      {props.name}
    </Button.Button1Button>
  );
};

export const Button2 = (props: IPropsButton) => {
  const { moveToPage } = useMoveToPage();
  return (
    <Button.Button2Button onClick={moveToPage(props.page)}>
      {props.name}
    </Button.Button2Button>
  );
};
