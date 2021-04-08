import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Modules";
import { setMenu } from "../Modules/Client";

export function Navigation() {
  const Client = useSelector((state: RootState) => state.Client);
  const dispatch = useDispatch();

  const navigationFadeAway = (num: number) => {
    document.querySelector(".ContentWrap")?.classList.add("fadeAway");
    setTimeout(() => {
      dispatch(setMenu(num));
      document.querySelector(".ContentWrap")?.classList.remove("fadeAway");
    }, 250);
  };

  const onHomeClick = () => {
    if (Client.menu !== 0) {
      document.querySelectorAll(".m-button").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".m-button.Home")?.classList.remove("inActive");
      navigationFadeAway(0);
    }
  };
  const onCoinClick = () => {
    if (Client.menu !== 1) {
      document.querySelectorAll(".m-button").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".m-button.Coin")?.classList.remove("inActive");
      navigationFadeAway(1);
    }
  };
  const onOrderClick = () => {
    if (Client.menu !== 2) {
      document.querySelectorAll(".m-button").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".m-button.Order")?.classList.remove("inActive");
      navigationFadeAway(2);
    }
  };
  const onAboutClick = () => {
    if (Client.menu !== 3) {
      document.querySelectorAll(".m-button").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".m-button.About")?.classList.remove("inActive");
      navigationFadeAway(3);
    }
  };
  return (
    <div className="Navigation">
      <div className="Menu">
        <button className="m-button Home" onClick={onHomeClick}>
          <i className="fas fa-home" />
          <p>Home</p>
        </button>
        <button className="m-button Coin inActive" onClick={onCoinClick}>
          <i className="fas fa-chart-line" />
          <p>Coin</p>
        </button>
        <button className="m-button Order inActive" onClick={onOrderClick}>
          <i className="fas fa-file-invoice-dollar" />
          <p>Order</p>
        </button>
        <button className="m-button About inActive" onClick={onAboutClick}>
          <i className="far fa-smile" />
          <p>About</p>
        </button>
      </div>
    </div>
  );
}
