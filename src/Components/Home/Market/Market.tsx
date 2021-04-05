import { useState } from "react";
import { MarketListArea } from "./MarketListArea";

export function Market() {
  //0 = Volume, 1=Rise, 2=Fall 3=All
  const [sort, setSort] = useState(0);

  const marketListFadeAway = (num: number) => {
    document.querySelector(".MarketListArea")?.classList.add("fadeAway");
    setTimeout(() => {
      setSort(num);
      document.querySelector(".MarketListArea")?.classList.remove("fadeAway");
    }, 250);
  };

  const onVolume = () => {
    if (sort !== 0) {
      document.querySelectorAll(".MarketSorter p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".VolumeP")?.classList.remove("inActive");

      marketListFadeAway(0);
    }
  };
  const onRise = () => {
    if (sort !== 1) {
      document.querySelectorAll(".MarketSorter p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".RiseP")?.classList.remove("inActive");

      marketListFadeAway(1);
    }
  };
  const onFall = () => {
    if (sort !== 2) {
      document.querySelectorAll(".MarketSorter p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".FallP")?.classList.remove("inActive");

      marketListFadeAway(2);
    }
  };
  const onAll = () => {
    if (sort !== 3) {
      document.querySelectorAll(".MarketSorter p").forEach((element) => {
        element.classList.add("inActive");
      });
      document.querySelector(".AllP")?.classList.remove("inActive");

      marketListFadeAway(3);
    }
  };

  return (
    <div className="Market">
      <div className="MarketSorter">
        <button onClick={onVolume}>
          <p className="VolumeP">Volume</p>
        </button>
        <button onClick={onRise}>
          <p className="RiseP inActive">Rise</p>
        </button>
        <button onClick={onFall}>
          <p className="FallP inActive">Fall</p>
        </button>
        <button onClick={onAll}>
          <p className="AllP inActive">Search</p>
        </button>
      </div>
      <MarketListArea sortType={sort} />
    </div>
  );
}
