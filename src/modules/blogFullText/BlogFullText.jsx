import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

import { Button, NotFound } from '../../components';

import { getIdByUrl, randomGradient } from '../../services';
import { getArticleById } from '../../redux/actions/blogActions';
import { setErrorClear } from '../../redux/actions/errorActions';

import './BlogFullText.scss';
import spinner from '../../assets/img/spinner.gif';
import eyeIcon from '../../assets/img/eye-icon.svg';

function BlogFullText() {
  const dispatch = useDispatch();

  const {id} = useParams();

  React.useEffect(() => {
    dispatch(setErrorClear());
  }, []);

  React.useEffect(() => {
    dispatch(getArticleById(id));
  }, [id]);

  const isAdmin = useSelector((state) => state.userReducer.isAdmin);

  const { title, text, updatedAt, avatar, article, isLoaded, error, isVisible, viewsCount } = useSelector(
    (state) => {
      return {
        title: state.blogReducer.currentArticle.article.title,
        text: state.blogReducer.currentArticle.article.text,
        updatedAt: state.blogReducer.currentArticle.article.updatedAt,
        avatar: state.blogReducer.currentArticle.article.avatar,
        article: state.blogReducer.currentArticle.article,
        isLoaded: state.blogReducer.currentArticle.isLoaded,
        viewsCount: state.blogReducer.currentArticle.article.viewsCount,
        isVisible: state.blogReducer.currentArticle.article.isVisible,
        error: state.errorReducer.error,
      };
    },
  );

  return (
    <div className="blog-fulltext">
      {article && isLoaded === false && Object.values(error).length < 1 ? (
        <div className="blog-fulltext__loading">
          <img src={spinner} />
        </div>
      ) : Object.values(error).length > 0 ? (
        <NotFound />
      ) : (!isVisible && !isAdmin) ? <NotFound /> : (
        <div className="blog-fulltext__wrapper">
          {avatar ? (
            <div
              style={{
                background: `linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, 0.5)), no-repeat center url(${avatar})`,
                backgroundSize: 'cover',
              }}
              className="blog-fulltext__main">
              <h1 className="blog-fulltext__main-title">{title}</h1>
            </div>
          ) : (
            <div
              style={{
                background: randomGradient(),
              }}
              className="blog-fulltext__main">
              <h1 className="blog-fulltext__main-title">{title}</h1>
            </div>
          )}
          <div className="blog-fulltext__options">
            <div className="blog-fulltext__options-createddate">
              Создано: {updatedAt && format(new Date(updatedAt), 'MM/dd/yyyy')}
            </div>
            <div className="blog-fulltext__options-viewcounter">
              <svg
                width="20"
                height="20"
                viewBox="0 0 37 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path
                    d="M23.506 18.4978C23.506 21.3577 21.0861 23.6761 18.1009 23.6761C15.1158 23.6761 12.6959 21.3577 12.6959 18.4978C12.6959 15.6378 15.1158 13.3194 18.1009 13.3194C21.0861 13.3194 23.506 15.6378 23.506 18.4978ZM18.1107 7.71564C15.02 7.72935 11.8163 8.48178 8.7836 9.92235C6.53186 11.036 4.33742 12.6072 2.43254 14.5466C1.49696 15.5365 0.303648 16.97 0.110718 18.4994C0.133518 19.8243 1.55462 21.4595 2.43254 22.4523C4.21883 24.3155 6.35612 25.8429 8.7836 27.0777C11.6117 28.4502 14.7421 29.2405 18.1107 29.2844C21.2044 29.2705 24.4074 28.5094 27.4367 27.0777C29.6884 25.964 31.884 24.3917 33.7889 22.4523C34.7244 21.4624 35.9178 20.0289 36.1107 18.4994C36.0879 17.1746 34.6668 15.5393 33.7889 14.5465C32.0026 12.6833 29.8642 11.1571 27.4367 9.92229C24.61 8.55081 21.472 7.76601 18.1107 7.71564ZM18.1084 10.3931C22.792 10.3931 26.5887 14.0229 26.5887 18.5006C26.5887 22.9783 22.792 26.6081 18.1084 26.6081C13.4249 26.6081 9.62819 22.9783 9.62819 18.5006C9.62819 14.0229 13.4249 10.3931 18.1084 10.3931Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="36" height="36" fill="white" transform="translate(0.110718 0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <div className="blog-fulltext__options-text">{viewsCount}</div>
            </div>
          </div>
          <div className="blog-fulltext__content">
            <div className="blog-fulltext__content-text">
              {text && (
                <ReactMarkdown className="blog-fulltext__content-markdown">{text}</ReactMarkdown>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogFullText;
