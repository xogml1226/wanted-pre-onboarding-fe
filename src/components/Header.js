import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/Instagram_logo.png';

const Header = () => {
  return (
    <div className="header">
      <img src={logo} className="header-button-left" />
      <div className="search">
        <input
          type="text"
          className="search-input"
          name="search"
          placeholder="검색"
        />
      </div>
      <ul className="header-button-right">
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
