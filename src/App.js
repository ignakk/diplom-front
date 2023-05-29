import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { refresh } from "./redux/actions/userActions.js";

import "./styles/App.scss";

import { Header, NotFound, Footer } from "./components";
import { CreateArticle, EditArticle, BlogFullText, BlogWrapper, AdminAuth, RegisterAuth } from "./modules";
 

function App() {
  const dispatch = useDispatch();

  const { isAuth } = useSelector(({userReducer}) => {
    return {
      isAuth: userReducer.isAuth
    }
  })

  React.useEffect(() => {
    if(localStorage.getItem("token")) {
      dispatch(refresh());
    }
  }, [])

  return (
    <div className="blog">
      <div className="container">
        <Header isAuth={isAuth} />
        <Switch>
          <Route exact path="/"><BlogWrapper isAuth={isAuth} /></Route>
          <Route exact path="/change/:id">{isAuth === true ? <EditArticle /> : <NotFound />}</Route>
          <Route exact path="/create">{isAuth === true ? <CreateArticle /> : <NotFound />}</Route>
          <Route exact path="/articles/:id"><BlogFullText /></Route>
          <Route exact path="/auth"><AdminAuth /></Route>
          <Route exact path="/register"><RegisterAuth /></Route>
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
