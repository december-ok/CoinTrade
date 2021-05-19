import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./modules";
import { Navigation } from "./components/Navigation";
import {
  AccountState,
  AssetType,
  initialState,
  initialUpdate,
} from "./modules/Account";
import { setContentWrapFadeOut } from "./modules/Client";
import loadable from "@loadable/component";
import { decrypt, encrypt } from "./lib/crypto";
import { getRealTimeMarket, getSimpleMarket } from "./lib/coinController";

const HomePage = loadable(() => import("./components/Home"));
const CoinPage = loadable(() => import("./components/CoinComponent"));
const OrderPage = loadable(() => import("./components/Order"));
const AboutPage = loadable(() => import("./components/About"));

function App() {
  const dispatch = useDispatch();
  let socket = useRef<WebSocket | null>(null);
  const [loaded, setLoaded] = useState(false);
  const Client = useSelector((state: RootState) => state.Client);

  useEffect(() => {
    (async () => {
      const { marketList, marketListString } = await getSimpleMarket();
      socket.current = await getRealTimeMarket(marketListString);
      setUserData(dispatch, marketList);
      setLoaded(true);
      dispatch(setContentWrapFadeOut(false));
    })();
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [dispatch]);
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

export default App;

const setUserData = (dispatch: Function, marketList: string[]) => {
  let userDataString;
  try {
    userDataString = decrypt(localStorage.getItem("userData"));
  } catch (error) {
    userDataString = "";
  }
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

export const saveAccountData = (data: AccountState) => {
  localStorage.setItem("userData", encrypt(JSON.stringify(data)));
};
