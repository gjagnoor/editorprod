import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { connect } from "react-redux";
import { fetchUserAsync, logoutAsync } from "./features/user/userSlice.js";
import "./App.css";

// I'm sleepy as hell - to set up state to make api calls, get result, and pass it along -- passport
const location = window.location.hostname;
function App({ user, logout, fetchUser }) {
    React.useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    console.log("user: ", user);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
                {user.info.id ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <a
                        href={
                            location === "localhost"
                                ? "http://localhost:7000/api/google"
                                : `https://codebasev1.herokuapp.com/api/google`
                        }
                    >
                        Login
                    </a>
                )}

                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <span>
                    <span>Learn </span>
                    <a
                        className="App-link"
                        href="https://reactjs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React
                    </a>
                    <span>, </span>
                    <a
                        className="App-link"
                        href="https://redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux
                    </a>
                    <span>, </span>
                    <a
                        className="App-link"
                        href="https://redux-toolkit.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux Toolkit
                    </a>
                    ,<span> and </span>
                    <a
                        className="App-link"
                        href="https://react-redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React Redux
                    </a>
                </span>
            </header>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutAsync()),
        fetchUser: () => dispatch(fetchUserAsync())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
