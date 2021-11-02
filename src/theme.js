import { createTheme } from '@mui/material/styles';
const createAppTheme = () => {
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
                        textAlign: 'left',

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
            },
        }
    })
    
    return theme;
}
export default createAppTheme;