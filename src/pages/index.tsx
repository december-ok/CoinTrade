import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { Navigation } from "../components/Navigation";
import {
  AccountState,
  AssetType,
  initialState,
  initialUpdate,
} from "../modules/Account";
import { setContentWrapFadeOut } from "../modules/Client";
import dynamic from "next/dynamic";
import { saveAccountData, loadAccountData } from "../lib/storage";
import { getRealTimeMarket, getSimpleMarket } from "../lib/coinController";

const HomePage = dynamic(() => import("../components/Home"), { ssr: false });
const CoinPage = dynamic(() => import("../components/CoinPage"), { ssr: false });
const OrderPage = dynamic(() => import("../components/Order"), { ssr: false });
const AboutPage = dynamic(() => import("../components/About"), { ssr: false });

export default function MainPage() {
  const dispatch = useDispatch();
  const socket = useRef<WebSocket | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const Client = useSelector((state: RootState) => state.Client);

  useEffect(() => {
    setIsClient(true);
    let isCancelled = false;

    (async () => {
      try {
        const { marketList, marketListString } = await getSimpleMarket();
        if (isCancelled) return;
        socket.current = await getRealTimeMarket(marketListString);
        setUserData(dispatch, marketList);
        setLoaded(true);
        dispatch(setContentWrapFadeOut(false));
      } catch (err) {
        console.error("Failed to initialize market data:", err);
      }
    })();

    return () => {
      isCancelled = true;
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [dispatch]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="App">
      <div
        className={
          "ContentWrap" + (Client.contentWrapFadeOut ? " fadeAway" : "")
        }
      >
        {loaded && Client.menu === 0 && <HomePage />}
        {loaded && Client.menu === 1 && <CoinPage />}
        {loaded && Client.menu === 2 && <OrderPage />}
        {loaded && Client.menu === 3 && <AboutPage />}
      </div>
      <Navigation />
    </div>
  );
}

const setUserData = (dispatch: Function, marketList: string[]) => {
  const userDataString = loadAccountData();
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    dispatch(
      initialUpdate({
        ...userData,
        assetsList: userData.assetsList.filter((item: AssetType) => {
          return marketList.includes(item.market);
        }),
      })
    );
  } else {
    saveAccountData(initialState);
  }
};

export { saveAccountData };
