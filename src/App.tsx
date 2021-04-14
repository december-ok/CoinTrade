import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { About } from "./page/About";
import { CoinComponent } from "./page/CoinComponent";
import { Home } from "./page/Home";
import { Navigation } from "./components/Navigation";
import { Order } from "./page/Order";
import { getRealTimeMarket, getSimpleMarket } from "./lib/CoinController";
import { decrypt, encrypt } from "./lib/Crypto";
import { RootState } from "./modules";
import {
  initialUpdate,
  initialState,
  AssetType,
  AccountState,
} from "./modules/Account";
import { setContentWrapFadeOut } from "./modules/Client";

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
        {loaded && Client.menu === 0 && <Home />}
        {loaded && Client.menu === 1 && <CoinComponent />}
        {loaded && Client.menu === 2 && <Order />}
        {loaded && Client.menu === 3 && <About />}
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
