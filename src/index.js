import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Client from './Apollo/client';
import { ApolloProvider } from '@apollo/client';
import {ThemeProvider} from '@material-ui/core/styles'
import reportWebVitals from './reportWebVitals';
import theme from './Theme/Default';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <ApolloProvider client={Client}>
      <App/>
    </ApolloProvider>
    </ThemeProvider>
    
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
