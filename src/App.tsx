import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Home } from "./Components/Home/Home";
import { Navigation } from "./Components/Navigation";
import {
  getRealTimeMarket,
  getSimpleMarket,
} from "./Controller/CoinController";
import { decrypt, encrypt } from "./Controller/Crypto";
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
      <div className="ContentWrap">{loaded && <Home />}</div>
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
