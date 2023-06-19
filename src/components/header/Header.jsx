import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../';
import { AdminView } from '../../App';
import { setUnAuth } from '../../redux/actions/userActions';

import './Header.scss';

export default React.memo(function Header({ isAuth }) {

  const isAuthed = useSelector((state) => state.userReducer.isAuth);
  const dispatch = useDispatch();

  const history = useHistory();

  const logout = () => {
    Cookies.remove('refreshToken');
    localStorage.removeItem('token');
    history.push('/auth');
    dispatch(setUnAuth());
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
