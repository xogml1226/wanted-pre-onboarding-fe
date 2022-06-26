import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Feed from '../components/Feed';
import Header from '../components/Header';

const Home = () => {
  const [loginYn, setLoginYn] = useState(
    window.localStorage.getItem('loginId')
  );
  const [feedDatas, setFeedDatas] = useState();

  // 초기 문제 세팅
  useEffect(() => {
    axios.get('/data/feedData.json').then((res) => {
      console.log(res);
      setFeedDatas(res.data);
    });
  }, []);

  return (
    <>
      {!loginYn && <Navigate to="/login" />}
      <Header />
      <div id="app">
        {feedDatas?.map((feedData) => (
          <Feed key={feedData.id} feedData={feedData} />
        ))}
      </div>
    </>
  );
};

export default Home;
