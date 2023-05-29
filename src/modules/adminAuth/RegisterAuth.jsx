import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from '../../components';

import { registration } from '../../redux/actions/userActions.js';

import './AdminAuth.scss';

export function AdminAuth() {
  const [errors, setErrors] = React.useState({
    email: '',
    password: ''
  });
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  const {userReducer} = useSelector((state) => ({
    userReducer: state.userReducer
  }))

  const auth = (e, email, password) => {
    e.preventDefault();
    if(email.length < 6) setErrors(prev => ({...prev,  email: 'Введите корректный email'}));
    else if(password.length < 6) setErrors(prev => ({...prev,  password: 'Пароль должен быть больше 6 символов'}))
    else dispatch(registration(email, password));
  };

  return (
    <div className="authorization">
      <form className="authorization__wrapper">
        <div className="authorization__wrapper-text">
          <h1>Зарегистрироваться</h1>
        </div>
        <div className="authorization__wrapper-inputs">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Электронная почта"
          />
          {errors.email && <div style={{textAlign: 'center', color: 'red', margin: '5px 0'}}>{errors.email}</div>}
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Пароль"
          />
          {errors.password && <div style={{textAlign: 'center', color: 'red', margin: '5px 0'}}>{errors.password}</div>}
        </div>
        <div className="authorization__wrapper-btnwrapper">
          <Button
                onClick={(e) => auth(e, email, password)}
                className="authorization__wrapper-btnwrapper-btn">
                Регистрация
          </Button>
        </div>
        {userReducer.error && <div style={{textAlign: 'center', color: 'red', margin: '10px 0'}}>Произошла ошибка при попытке зарегистрировать аккаунт</div>}
        <Link style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px'}} to="/auth">
            <Button className="header__inner-btn">Уже есть аккаунт?</Button>
        </Link>
      </form>
    </div>
  );
}

export default AdminAuth;
