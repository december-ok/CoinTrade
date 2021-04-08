import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { About } from "./Components/About/About";
import { CoinComponent } from "./Components/Coin/CoinComponent";
import { Home } from "./Components/Home/Home";
import { Navigation } from "./Components/Navigation";
import { Order } from "./Components/Order/Order";
import {
  getRealTimeMarket,
  getSimpleMarket,
} from "./Controller/CoinController";
import { decrypt, encrypt } from "./Controller/Crypto";
import { RootState } from "./Modules";
import {
  initialUpdate,
  initialState,
  AssetType,
  UserState,
} from "./Modules/User";

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
    })();
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [dispatch]);
  return (
    <div className="App">
      <div className="ContentWrap">
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
    saveUserData(initialState);
  }
};

export const saveUserData = (data: UserState) => {
  localStorage.setItem("userData", encrypt(JSON.stringify(data)));
};
