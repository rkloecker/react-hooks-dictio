import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

import PostForm from "../components/PostForm";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [checked, setChecked] = useState(false); // ASC:false DESC:true
  const [editingPost, setEditingPost] = useState({
    german: "",
    english: "",
    description: ""
  });

  useEffect(() => {
    let order = checked ? "desc" : "asc";
    axios
      .get(`/words?sort=create_date:${order}&limit=${limit}`) //?sort=create_date:desc
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch(err => console.error(err));
  }, [checked, limit]);

  function editPost(post) {
    setEditingPost(post);
    console.log(post);
  }

  function handleCheckboxChange() {
    console.log("checked was: ", checked);
    let newchecked = !checked;
    setChecked(newchecked);
    console.log("checked is set to: ", newchecked);
  }

  function deletePost(_id) {
    axios.delete(`/words/${_id}`).then(() => {
      const postsUpdated = posts.filter(p => p._id !== _id);
      setPosts(postsUpdated);
    });
  }

  function addPost(post) {
    let postsUpdated = null;
    if (posts.find(p => p._id === post._id)) {
      // const index = posts.findIndex(p => p._id === post._id);
      // const postsUpdated = [...posts];
      // postsUpdated.splice(index, 1, post);
      postsUpdated = posts.map(el => (el._id === post._id ? post : el));
    } else {
      postsUpdated = [post, ...posts];
    }
    setPosts(postsUpdated);
  }

  const getNumberOfPosts = () => {
    axios
      .get(`/words/?sort=create_date:desc&limit=${limit}`)
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <div className="row">
        <div className="col s12 m6">
          <PostForm addPost={addPost} editingPost={editingPost} />
        </div>
        <h5 className="mt-2">Toggle Asc/Desc Order of Posts</h5>
        <div className="switch">
          <label>
            Asc
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheckboxChange}
            />
            <span className="lever" />
            Desc
          </label>
        </div>

        <div className="col 12 m6">
          <p>Limit number of posts fetched from db</p>
          <input
            type="number"
            value={limit}
            onChange={event => setLimit(event.target.value)}
          />
          <button
            onClick={getNumberOfPosts}
            className="waves-effect waves-light btn"
          >
            Set
          </button>
        </div>
      </div>
      <div className="xcontainer test">
        <div className="row no-ml mb-2 nogutters font-weight-bold valign-wrapper">
          <div className="col m3 s2"> English </div>
          <div className="col m3 s4"> German </div>
          <div className="col m1 s2"> Type </div>
          <div className="col m3 hide-on-small-only"> Create Date </div>
          <div className="col m1 s2"> Edit </div>
          <div className="col m1 s2"> Delete </div>
        </div>
        {posts.map(post => (
          <div
            className="row no-ml mb-2 nogutters valign-wrapper"
            key={post._id}
          >
            <div className="col m3 s2 pt-1"> {post.english} </div>
            <div className="col m3 s4 pt-1"> {post.german.join(",")} </div>
            <div className="col m1 s2 pt-1"> {post.description} </div>
            <div className="col m3 s3 pt-1 hide-on-small-only">
              {dayjs(post.create_date).format("D.M.YYYY HH:mm")}
            </div>
            <div className="col m1 s2">
              <button
                className="waves-effect waves-light btn-small blue darken-1 mr-1"
                onClick={editPost.bind(null, post)}
              >
                e
              </button>
            </div>

            <div className="col m1 s2">
              <button
                onClick={deletePost.bind(null, post._id)}
                className="waves-effect waves-light btn-small red darken-1"
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
