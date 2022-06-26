import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/Instagram_logo.png';

const pwdCheck = (value) => {
  const num = value.search(/[0-9]/g);
  const bigEng = value.search(/[A-Z]/g);
  const spe = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if (value.length >= 8 && num >= 0 && bigEng >= 0 && spe >= 0) {
    return true;
  }

  return false;
};

const emailCheck = (value) => {
  const regExpEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
  if (regExpEmail.test(value)) {
    return true;
  }

  return false;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.removeItem('loginId');
  }, []);

  useEffect(() => {
    if (emailCheck(email) && pwdCheck(password)) {
      submitRef.current.disabled = false;
    } else {
      submitRef.current.disabled = true;
    }
  }, [email, password]);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = () => {
    window.localStorage.setItem('loginId', email);
    navigate('/');
  };

  return (
    <div className="container">
      <div className="box">
        <div>
          <img src={logo} className="heading" />
        </div>
        <form className="login-form">
          <div className="field">
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="전화번호, 사용자 이름 또는 이메일"
              value={email}
              onChange={onChange}
              style={email && !emailCheck(email) ? { borderColor: 'red' } : {}}
            />
            <label htmlFor="email">전화번호, 사용자 이름 또는 이메일</label>
          </div>
          <div className="field">
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="비밀번호"
              value={password}
              onChange={onChange}
              style={
                password && !pwdCheck(password) ? { borderColor: 'red' } : {}
              }
            />
            <label htmlFor="password">비밀번호</label>
          </div>
          <button
            onClick={onSubmit}
            ref={submitRef}
            className="login-button"
            title="login"
          >
            로그인
          </button>
          <div className="separator">
            <div className="line"></div>
            <p>또는</p>
            <div className="line"></div>
          </div>
          <div className="other">
            <button className="fb-login-btn" type="button">
              <i className="fa fa-facebook-official fb-icon"></i>
              <span className="">Facebook으로 로그인</span>
            </button>
            <a className="forgot-password" href="#">
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </form>
      </div>
      <div className="box">
        <p>
          계정이 없으신가요?{' '}
          <a className="signup" href="#">
            가입하기
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
