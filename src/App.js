import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { refresh } from "./redux/actions/userActions.js";

import "./styles/App.scss";

import { Header, NotFound, Footer } from "./components";
import { CreateArticle, EditArticle, BlogFullText, BlogWrapper, AdminAuth, RegisterAuth } from "./modules";
import { BlogService } from "./services/index.js";
 
function ArticlesToModerate() {
  const [articlesToModerate, setArticlesToModerate] = useState(null);

  const isAdmin = useSelector((state) => state.userReducer.isAdmin);

  useEffect(() => {
    (async function() {
      const articles = await BlogService.showArticlestoModerate();
      console.log({articles});
    })();
  }, []);

  if (!isAdmin) {
    return <div>Forbidden</div>
  }

  return (
    <div>
      TODOS
    </div>
  )
}

export const AdminView = ({children}) => {
  const isAdmin = useSelector((state) => state.userReducer.isAdmin);
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  if(isAdmin && isAuth) {
    return children;
  }

  return null;
}

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
  }, []);

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
          <Route exact path="/articles-to-moderate"><ArticlesToModerate /></Route>
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
