import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRealTimeMarket, getSimpleMarket } from "./lib/CoinController";
import { decrypt, encrypt } from "./lib/Crypto";
import { RootState } from "./Modules";
import { CoinComponent } from "./page/CoinComponent";
import { Order } from "./page/Order";
import { About } from "./page/About";
import { Navigation } from "./Components/Navigation";

import {
  AccountState,
  AssetType,
  initialState,
  initialUpdate,
} from "./Modules/Account";
import { setContentWrapFadeOut } from "./Modules/Client";
import { Home } from "./page/Home";

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
