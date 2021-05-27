import { CoinType } from "../../types/CommonType";
import { getCommaNumber } from "./../../lib/coinController";
import { AssetBlock } from "./AssetBlock";
import { CoinState } from "../../modules/Coin";
import { AccountState } from "../../modules/Account";

interface MyAssetListProps {
  Coin: CoinState;
  User: AccountState;
}

export default function MyAssetList({ Coin, User }: MyAssetListProps) {
  return (
    <div className="MyAssetList">
      {Boolean(User.won) && (
        <div className="Won">
          <img
            className="WonImg"
            alt="SimSaImDang"
            src={
              "https://www.choicenews.co.kr/news/photo/201904/49676_27900_144.jpg"
            }
          />
          <div className="Info">
            <p className="WonLabel">Korean Won</p>
            <p className="WonTicker">KRW</p>
          </div>
          <p className="WonPrice">{getCommaNumber(User.won)}</p>
        </div>
      )}
      {User.assetsList
        .sort(
          (b, a) =>
            a.quantity * (Coin.get(a.market) as CoinType).trade_price -
            b.quantity * (Coin.get(b.market) as CoinType).trade_price
        )
        .map((item) => (
          <AssetBlock
            coin={Coin.get(item.market) as CoinType}
            asset={item}
            key={item.market}
          />
        ))}
    </div>
  );
}
