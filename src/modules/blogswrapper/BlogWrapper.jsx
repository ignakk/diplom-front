import React from 'react';
import { clearArticleById, getAllArticles, nextPage, setArticleLoaded } from '../../redux/actions/blogActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { BlogItem, Button } from '../../components/index.js';
import debounce from 'lodash.debounce';

import './BlogWrapper.scss';
import spinner from '../../assets/img/spinner.gif';
import Filter from './components/filter.jsx';
import { useState } from 'react';
import { Searchbar } from './components/searchbar.jsx';
import { useRef } from 'react';

const LOCAL_STORAGE_FILTERS_KEY = 'filters';

function BlogWrapper({ isAuth }) {
  const [filters, setFilters] = useState({
    order: 'desc',
    filter: ''
  });

  const debouncedRequestForArticles = useRef(debounce((page, articles) => {
    dispatch(getAllArticles(page, articles));
  }, 300)).current;

  const dispatch = useDispatch();

  const { articles, isLoaded, page } = useSelector(({ blogReducer }) => {
    return {
      articles: blogReducer.articles,
      isLoaded: blogReducer.isLoaded,
      page: blogReducer.page,
    };
  });

  React.useEffect(() => {
    dispatch(clearArticleById());
  }, []);

  const fetchAllArticles = () => {
    dispatch(setArticleLoaded(false));
    debouncedRequestForArticles(page, filters);
  }
  
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);

  React.useEffect(() => {
    fetchAllArticles();
  }, [filters, page])


  const PaginationFunc = (action) => {
    dispatch(nextPage(action));
  };

  const setFiltersValue = (key, val) => {
    localStorage.setItem(LOCAL_STORAGE_FILTERS_KEY, JSON.stringify(filters));
    setFilters((prev) => ({...prev, [key]: val}));
  }

  return (
    <div>
      <div style={{margin: '30px 0px'}}>

        <div style={{fontSize: '18px', color: '#fff', fontWeight: 'bold', marginBottom: '15px'}}>Фильтры:</div>
         <div style={{display: 'flex',alignItems: 'center'}}>
          <Filter selected={filters.order} onChange={(e) => setFiltersValue('order', e.target.value)} data={[{id: 1, label: 'сначала новые', value: 'desc'}, {id: 2, label: 'сначала старые', value: 'asc'}]} />
          <Searchbar controlled value={filters.filter} onChange={(value) => setFiltersValue('filter', value)} />
        </div>

      </div>

      <div className="blog-wrapper">
        {articles.length > 0 && isLoaded ? (
          articles.map((article) => <BlogItem isAuth={isAuth} key={article._id} {...article} />)
        ) : articles.length === 0 && isLoaded ? (
          <div className="blog-wrapper__loading">
            <h1 style={{ color: '#fff' }}>Здесь пока ничего нет</h1>
            {isAuth === true && (
              <Link to="/create">
                <Button className="blog-wrapper__loading-btn">Создать новую статью</Button>
              </Link>
            )}
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
            <Button onClick={() => PaginationFunc()} className="blog-wrapper__loadmorebtn-btn">
              Предыдущая страница
            </Button>
          )}
          {articles.length < 8 ? null : (
            <Button
              onClick={() => PaginationFunc('plus')}
              className="blog-wrapper__loadmorebtn-btn">
              Следующая страница
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogWrapper;
