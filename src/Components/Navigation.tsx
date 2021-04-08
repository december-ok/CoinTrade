export function Navigation({ menu, setMenu }: any) {
  const navigationFadeAway = (num: number) => {
    document.querySelector(".ContentWrap")?.classList.add("fadeAway");
    setTimeout(() => {
      setMenu(num);
      document.querySelector(".ContentWrap")?.classList.remove("fadeAway");
    }, 250);
  };

  const onHomeClick = () => {
    if (menu !== 0) {
      document.querySelectorAll(".m-button").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".m-button.Home")?.classList.remove("inActive");
      navigationFadeAway(0);
    }
  };
  const onCoinClick = () => {
    if (menu !== 1) {
      document.querySelectorAll(".m-button").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".m-button.Coin")?.classList.remove("inActive");
      navigationFadeAway(1);
    }
  };
  const onOrderClick = () => {
    if (menu !== 2) {
      document.querySelectorAll(".m-button").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".m-button.Order")?.classList.remove("inActive");
      navigationFadeAway(2);
    }
  };
  const onAboutClick = () => {
    if (menu !== 3) {
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
