import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Modules";
import { setContentWrapFadeOut, setMenu } from "../Modules/Client";

export function Navigation() {
  const Client = useSelector((state: RootState) => state.Client);
  const dispatch = useDispatch();

  const navigationFadeAway = (num: number) => {
    dispatch(setContentWrapFadeOut(true));
    setTimeout(() => {
      dispatch(setMenu(num));
      dispatch(setContentWrapFadeOut(false));
    }, 250);
  };
  const onHomeClick = () => {
    if (Client.menu !== 0) navigationFadeAway(0);
  };
  const onCoinClick = () => {
    if (Client.menu !== 1) navigationFadeAway(1);
  };
  const onOrderClick = () => {
    if (Client.menu !== 2) navigationFadeAway(2);
  };
  const onAboutClick = () => {
    if (Client.menu !== 3) navigationFadeAway(3);
  };
  return (
    <div className="Navigation">
      <div className="Menu">
        <button
          className={"m-button Home" + (Client.menu === 0 ? "" : " inActive")}
          onClick={onHomeClick}
        >
          <i className="fas fa-home" />
          <p>Home</p>
        </button>
        <button
          className={"m-button Coin" + (Client.menu === 1 ? "" : " inActive")}
          onClick={onCoinClick}
        >
          <i className="fas fa-chart-line" />
          <p>Coin</p>
        </button>
        <button
          className={"m-button Order" + (Client.menu === 2 ? "" : " inActive")}
          onClick={onOrderClick}
        >
          <i className="fas fa-file-invoice-dollar" />
          <p>Order</p>
        </button>
        <button
          className={"m-button About" + (Client.menu === 3 ? "" : " inActive")}
          onClick={onAboutClick}
        >
          <i className="far fa-smile" />
          <p>About</p>
        </button>
      </div>
    </div>
  );
}
