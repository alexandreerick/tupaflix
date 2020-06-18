import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import CreateSuggestion from "./pages/CreateSuggestion";
import SuggestionsList from "./pages/SuggestionsList";
import WatchedMovies from "./pages/WatchedMovies";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreateSuggestion} path="/suggestion" />
      <Route component={SuggestionsList} path="/suggestions-list" />
      <Route component={WatchedMovies} path="/watched" />
    </BrowserRouter>
  );
};

export default Routes;
