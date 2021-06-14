import React from "react";
import ShopIcon from "@material-ui/icons/Shop";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

import useFetchFirestore from "../hooks/useFetchFirestore";

import Graph from "../components/Chart";

function Main() {
  const { totalMoney, totalOrders, items } = useFetchFirestore("orders");
  const brands = items.map((item) => item.item);
  const [statisticItems, setStatisticItems] = React.useState({});

  React.useEffect(() => {
    let counts = {};
    for (let i = 0; i < brands.length; i++) {
      if (counts[brands[i]]) {
        counts[brands[i]] += 1;
      } else {
        counts[brands[i]] = 1;
      }
    }
    setStatisticItems(counts);
  }, [items]);

  return (
    <section className="cards">
      <div className="card">
        <div className="card__title">Total Orders</div>
        <ShopIcon />
        <div className="card__subtitle">{totalOrders}</div>
        <div className="card__decor"></div>
      </div>

      <div className="card">
        <div className="card__title">Total Sum($)</div>
        <LocalAtmIcon />
        <div className="card__subtitle">{totalMoney}$</div>
        <div className="card__decor"></div>
      </div>

      <Graph items={statisticItems} />
    </section>
  );
}

export default Main;
