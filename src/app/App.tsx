import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import axios from 'axios';
// const express = require("express");
// var cors = require('cors')
// const app = express();
// app.use(cors());
// const { createProxyMiddleware } = require('http-proxy-middleware');
// app.use('/api', createProxyMiddleware({ 
//     target: 'http://localhost:3000/', //original url
//     changeOrigin: true, 
//     //secure: false,
//     onProxyRes: function (proxyRes: any, req: any, res: any) {
//        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//     }
// }));
// app.listen(5000);

// axios.get('http://localhost:3000/api/xxx', //proxy uri
// {
//    headers: {
//       authorization: ' xxxxxxxxxx' ,
//       'Content-Type': 'application/json'
//    } 
// }).then(function (response: any) {
//    console.log(response);
// });


const Auth = lazy(() => import('../features/auth/Auth'));
const Home = lazy(() => import('../features/home/Home'));

const App: FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Suspense fallback={<p>Loading...</p>}>

          {/* <Home /> */}
            {isLoggedIn ? <Home /> : <Auth />}
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;