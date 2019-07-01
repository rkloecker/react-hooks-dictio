import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";

function PostForm({ addPost, editingPost }) {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    german: "",
    english: "",
    description: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setPost(editingPost);
  }, [editingPost]);

  const onChange = event => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  function validateForm() {
    const tempErrors = {};
    if (post.german.toString().trim() === "") {
      tempErrors.german = "german must not be empty";
    }
    if (post.english.trim() === "") {
      tempErrors.english = "english must not be empty";
    }
    if (post.description.trim() === "") {
      tempErrors.description = "description must not be empty";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return false;
    }
    return true;
  }

  const onSubmit = event => {
    event.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    setErrors({});

    if (post._id) {
      fetchData(`/words/${post._id}`, "put", post);
    } else {
      fetchData("/words", "post", post);
    }
  };

  // helper method to Send a POST or put request
  // dont use the online deploy heroku version, findoneandupdate returns old (!) document
  // use the localhost version instead
  const fetchData = (url, method, data) => {
    axios({
      url,
      method,
      data
    })
      .then(res => {
        // console.log("res:data", res.data);
        addPost(res.data);
        setPost({ german: "", english: "", description: "" });
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <Fragment>
      {!loading ? (
        <form className="" onSubmit={onSubmit}>
          <div className="input-field">
            <label htmlFor="english" className="actiff">
              english
            </label>
            <input
              type="text"
              name="english"
              value={post.english}
              onChange={onChange}
              className={errors.english && "invalid"}
            />
            <span className="helper-text">{errors.english}</span>
          </div>
          <div className="input-field">
            <label htmlFor="german" className="actiff">
              german
            </label>
            <input
              type="text"
              name="german"
              value={post.german}
              onChange={onChange}
              className={errors.german && "invalid"}
            />
            <span className="helper-text">{errors.german}</span>
          </div>
          <div className="input-field">
            <label htmlFor="description" className="actiff">
              description
            </label>
            <input
              type="text"
              name="description"
              value={post.description}
              onChange={onChange}
              className={errors.description && "invalid"}
            />
            <span className="helper-text">{errors.description}</span>
          </div>
          <button type="submit" className="waves-effect waves-light btn mb-2">
            {post._id ? "Update" : "Add"}
          </button>
        </form>
      ) : (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      )}
    </Fragment>
  );
}

export default PostForm;
