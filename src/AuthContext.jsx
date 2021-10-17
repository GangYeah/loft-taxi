import React from 'react'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const login = (email, password) => {
        if (email !== "correct email" || password !== "correct password") {
            return;
        }

        setIsLoggedIn(true);
    }

    const logout = () => {
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export const withAuth = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return (
                <AuthContext.Consumer>
                    {
                        (value) => {
                            return <WrappedComponent {...value} {...this.props} />;
                        }
                    }
                </AuthContext.Consumer>
            );
        }
    }
}