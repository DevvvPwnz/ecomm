import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./components/main";
import Products from "./components/products";
import Header from "./components/header";
import SideBar from "./components/sidebar";
import Orders from "./components/Orders.jsx";
import AddItem from "./components/AddItem";
import EditItem from "./components/EditItem";
import Msg from "./components/Msg";

function App() {
  const [currentItem, setCurrentItem] = React.useState(null);

  return (
    <Router>
      <Header />
      <Msg />
      <div className="wrapper">
        <SideBar />

        <div className="main">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <Route path="/products" exact>
              <Products setItem={setCurrentItem} />
            </Route>

            <Route path="/orders" exact>
              <Orders />
            </Route>

            <Route path="/add_item" exact>
              <AddItem />
            </Route>

            <Route path="/edit_item" exact>
              <EditItem id={currentItem} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
