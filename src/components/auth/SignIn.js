import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const dispatchSignIn = useCallback(
    (creds) => {
      dispatch(signIn(creds));
    },
    [dispatch]
  );

  // local state
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // this.props.signIn(this.state);
    dispatchSignIn(state);
  };

  const { authError, auth } = props;
  if (auth.uid) return <Redirect to="/" />;

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Login</button>
          <div className="center red-text">
            {authError ? <p>{authError}</p> : null}
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signIn: (creds) => dispatch(signIn(creds)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
export default connect(mapStateToProps, null)(SignIn);
