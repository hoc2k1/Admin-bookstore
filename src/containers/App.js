import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeContainer from "./home.container";
import AddressesContainer from "./addresses.container";
import Authors from "./authors.container";
import BillsContainer from "./bills.container";
import CategoriesContainer from "./categories.container";
import LayoutBanner from "./layout.banner.container";
import LayoutHome from "./layout.home.container";
import ProductsContainer from "./products.container";
import PublishersContainer from "./publishers.container";
import UsersContainer from "./users.container";
import LoginContainer from "./login.container";
import { Toaster } from 'react-hot-toast';
class App extends Component {
  render() {
    return (
      <div className="w-100 h-100">
        <Toaster position="top-center" toastOptions={{duration: 5000}}/>
        <Router>
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/addresses" component={AddressesContainer} />
            <Route exact path="/authors" component={Authors} />
            <Route exact path="/bills" component={BillsContainer} />
            <Route exact path="/categories" component={CategoriesContainer} />
            <Route exact path="/layoutbanner" component={LayoutBanner} />
            <Route exact path="/layouthome" component={LayoutHome} />
            <Route exact path="/products" component={ProductsContainer} />
            <Route exact path="/publishers" component={PublishersContainer} />
            <Route exact path="/user" component={UsersContainer} />
            <Route exact path="/login" component={LoginContainer} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
