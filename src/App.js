import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import { refresh } from "./redux/actions/userActions.js";

import "./styles/App.scss";

import spinner from './assets/img/spinner.gif';

import { Header, NotFound, Footer, Button, BlogItem } from "./components";
import { CreateArticle, EditArticle, BlogFullText, BlogWrapper, AdminAuth, RegisterAuth } from "./modules";
import { BlogService } from "./services/index.js";

export const AdminView = ({children, fallback = null}) => {
  const isAdmin = useSelector((state) => state.userReducer.isAdmin);
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  if(isAdmin && isAuth) {
    return children;
  }

  return fallback || null;
}
 
function ArticlesToModerate() {
  const [page, setPage] = useState(1);
  const [articlesToModerate, setArticlesToModerate] = useState(null);
  const [erorr, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    (async function() {
      try {
        setLoading(true);
        const articles = await BlogService.showArticlestoModerate(page);
        setArticlesToModerate(articles.data);
      } catch (error) {
        setError('Упс произошла ошибка при запросе постов');
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  const [changeVisibilityLoader, setChangeVisibilityLoader] = useState(false);
  const [changeErrorMessage, setChangeErrorMessage] = useState(null);

  const submitArticle = async (id) => {
    try {

      setChangeVisibilityLoader(true)
      const res = await BlogService.publicArticle(id);

      if(res.status === 200) {
        history.push('/')
      }

    } catch (error) {
      setChangeErrorMessage('Произошла ошибка при изменении видимости статьи');
    } finally {
      setChangeVisibilityLoader(false);
    }
  }

  const deleteArticle = async (id) => {
    try {

      setChangeVisibilityLoader(true)
      const res = await BlogService.declineArticle(id);

      if(res.status === 200) {
        history.push('/')
      }

    } catch (error) {
      setChangeErrorMessage('Произошла ошибка при изменении видимости статьи');
    } finally {
      setChangeVisibilityLoader(false);
    }
  }

  return (
    <AdminView fallback={<div style={{fontSize: '30px', color: 'white', textAlign: 'center', marginTop: '100px'}}>Упс, страница не найдена</div>}>
       <div>
        {changeVisibilityLoader}
        {changeErrorMessage}
        <div className="blog-wrapper">
          {articlesToModerate && articlesToModerate.length > 0 && !isLoading && !erorr ? (
            articlesToModerate.map((article) => (
              <div className="article">
              <Link to={`/articles/${article._id}`}>
                <div className="article__avatar">
                  {article.avatar ? (
                    <img src={article.avatar} alt="Фоновая картинка" />
                  ) : (
                    <div className="article__avatar-noavatar">{article.title}</div>
                  )}
                </div>
                </Link>
              <div className="article__wrapper">
                <div className="article__content">
                    <div className="article__content-title">{article.title}</div>
                  <div className="article__content-text">{article.text && article.text}</div>
                </div>
                <div className="article__edit">
                  <div className="article__edit-more">
                      <div onClick={() => submitArticle(article._id)} className="article__content-link">
                        Опубликовать
                      </div>
                  </div>
                  <div className="article__edit-more">
                    <div onClick={() => deleteArticle(article._id)} className="article__content-link">
                        Отменить
                      </div>
                  </div>
                </div>
              </div>
            </div>
            ))
          ) : articlesToModerate && articlesToModerate.length === 0 && !isLoading ? (
            <div className="blog-wrapper__loading">
              <h1 style={{ color: '#fff' }}>Здесь пока ничего нет</h1>
            </div>
          ) : (
            <div className="blog-wrapper__loading">
              <img src={spinner} />
            </div>
          )}
        </div>
        <div style={{marginBottom: '150px'}} className="blog-pagination">
          <div className="blog-wrapper__loadmorebtn">
            {page === 1 ? (
              <div></div>
            ) : (
              <Button onClick={() => setPage(prev => prev - 1)} className="blog-wrapper__loadmorebtn-btn">
                Предыдущая страница
              </Button>
            )}
            {articlesToModerate && articlesToModerate.length < 8 ? null : (
              <Button
                onClick={() => setPage(prev => prev + 1)}
                className="blog-wrapper__loadmorebtn-btn">
                Следующая страница
              </Button>
            )}
          </div>
        </div>
    </div>
    </AdminView>
  )
}

function App() {
  const dispatch = useDispatch();

  const { isAuth } = useSelector(({userReducer}) => {
    return {
      isAuth: userReducer.isAuth
    }
  })

  React.useEffect(() => {
    if(Cookies.get("refreshToken")) {
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
