import React, { useState, useCallback } from "react";
import { createProject } from "../../store/actions/projectActions";
import { useDispatch, connect } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

const CreateProject = (props) => {
  // get a firestore instance
  const firestore = useFirestore();

  // Write to Firestore
  const dispatch = useDispatch();
  const dispatchCreateProject = useCallback(
    (proj) => dispatch(createProject(proj, { firestore })),
    [firestore]
  );

  // local state
  const [proj, setProj] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(proj);
    dispatchCreateProject(proj);
    props.history.push("/");
  };

  const handleChange = (e) => {
    setProj({
      ...proj,
      [e.target.id]: e.target.value,
    });
  };

  const { auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Create a New Project</h5>
        <div className="input-field">
          <input type="text" id="title" onChange={handleChange} />
          <label htmlFor="title">Project Title</label>
        </div>
        <div className="input-field">
          <textarea
            id="content"
            className="materialize-textarea"
            onChange={handleChange}
          ></textarea>
          <label htmlFor="content">Project Content</label>
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1">Create</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps)(CreateProject);
