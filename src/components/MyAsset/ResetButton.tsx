import { useDispatch } from "react-redux";
import { saveAccountData } from "../../App";
import { initialState, initialUpdate } from "../../modules/Account";

export default function ResetButton() {
  const dispatch = useDispatch();

  const onResetAsset = () => {
    const randNumber = Math.random().toString(10).substr(2, 4);
    if (
      randNumber === prompt(`If you want to RESET ASSET, enter ${randNumber}.`)
    ) {
      dispatch(initialUpdate(initialState));
      saveAccountData(initialState);
      alert("Asset has been RESET!");
    }
  };

  return (
    <p className="MyAssetReset" onClick={onResetAsset}>
      🔄Reset Asset
    </p>
  );
}
