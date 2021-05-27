import MyAssetValueArea from "./MyAsset/MyAssetValueArea";
import MyAssetList from "./MyAsset/MyAssetList";
import { useSelector } from "react-redux";
import { RootState } from "../modules";

export default function MyAsset() {
  const { Coin, Account: User } = useSelector((state: RootState) => state);

  return (
    <div className="MyAsset">
      <MyAssetValueArea Coin={Coin} User={User} />
      <div className="MyAssetListArea">
        <p className="MyAssetListLabel">My Asset List</p>
        <MyAssetList Coin={Coin} User={User} />
      </div>
    </div>
  );
}
