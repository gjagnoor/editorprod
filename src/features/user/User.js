import React from "react";
import { connect } from "react-redux";
import { fetchUserAsync, logoutAsync } from "./userSlice.js";

function User({ user, logout, fetchUser }) {
    React.useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <div>
            {user.info.id ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <a
                    href={
                        process.env.NODE_ENV === "development"
                            ? "http://localhost:7000/api/google"
                            : `https://codebasev1.herokuapp.com/api/google`
                    }
                >
                    Login
                </a>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
