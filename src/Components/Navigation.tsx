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
      </div>
    </div>
  );
}
