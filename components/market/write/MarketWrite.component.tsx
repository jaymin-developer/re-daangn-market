import dynamic from "next/dynamic";
import * as Write from "../../../styles/market/write/MarketWrite.style";

const ToastEditor = dynamic(
  () => import("../../../components/common/ToastEditor.component"),
  { ssr: false }
);

const MarketWriteComponent = () => {
  return (
    <Write.WrapperDiv>
      <ToastEditor />
    </Write.WrapperDiv>
  );
};

export default MarketWriteComponent;
