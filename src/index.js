import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fdbf5a'
    },
    secondary: {
      main: '#FFA842'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: '353px',
          padding: '16px 0',
          color: '#000',
          fontSize: 'inherit',
          fontWeight: '400',
          lineHeight: 'normal',
          letterSpacing: 'normal',
          textTransform: 'none',
          borderRadius: '70px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#FFA842',
          }
        },

      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: '#000',
          fontSize: '1.8rem',
          
          '&:before': {
            borderBottom: '2px solid #E4E4E4'
          },
          '&:after': {
            borderColor: '#2D7EF7'
          }
        },
        input: {
          padding: '12px 0 8px 0',
        }
      }
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
