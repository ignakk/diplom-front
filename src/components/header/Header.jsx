import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Button } from '../';
import { AdminView } from '../../App';

import './Header.scss';

export default React.memo(function Header({ isAuth }) {

  const isAuthed = useSelector((state) => state.userReducer.isAuth);

  const logout = () => {
  }

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/">
          <div className="header__inner-logo">ignatiqq blog</div>
        </Link>

        <div className='header-wrap' style={{display: 'flex', alignItems: 'center'}}>
          <AdminView>
              <div className="header__inner-createarticle">
                <Link to="/articles-to-moderate">
                  <Button className="header__inner-btn">Модерация постов</Button>
                </Link>
              </div>
          </AdminView>

          {isAuth === true && (
            <div className="header__inner-createarticle">
              <Link to="/create">
                <Button className="header__inner-btn">Новая статья</Button>
              </Link>
            </div>
          )}

          <div className="header__inner-createarticle">
              {isAuthed ? 
                <Button onClick={logout} className="header__inner-btn">Выйти</Button>
              :
              <Link to="/auth">
                <Button className="header__inner-btn">Войти</Button>
              </Link>}
          </div>
        
        </div>    

      </div>
    </header>
  );
});
