import MarketWriteComponent from "../../../components/market/write/MarketWrite.component";
import { useAuth } from "../../../hocs/useAuth";

const MarketWritePage = () => {
  return <MarketWriteComponent isEdit={false} />;
};

export default useAuth(MarketWritePage);
