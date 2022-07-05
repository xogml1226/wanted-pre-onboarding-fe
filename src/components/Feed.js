import React, { useEffect, useState } from 'react';

const Feed = ({ feedData }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = feedData.imageUrl;
    image.onload = function () {
      setIsLoading(true);
    };
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setComment(event.target.value);
  };

  const onSubmit = () => {
    const userName = window.localStorage.getItem('loginId').split('@')[0];
    const userComment = comment;
    const newComment = {
      userName,
      userComment,
    };
    if (comment) setComments([newComment, ...comments]);

    setComment('');
  };

  const onKeyDown = (event) => {
    const { key } = event;
    if (key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <>
      {isLoading && (
        <div className="post">
          <div className="post-header">
            <div
              className="profile"
              style={{ backgroundImage: `url(${feedData.imageUrl})` }}
            ></div>
            <span className="profile-name">{feedData.profileName}</span>
          </div>
          <div
            className="post-body perpetua"
            style={{ backgroundImage: `url(${feedData.imageUrl})` }}
          ></div>
          <div className="post-content">
            <p>{feedData.likes} Likes</p>
            {comments?.map((c, i) => (
              <p key={i}>
                <strong>{c.userName}</strong>
                &nbsp;{c.userComment}
              </p>
            ))}
          </div>
          <div className="comment">
            <input
              className="input-comment"
              name="comment"
              type="text"
              placeholder="댓글 달기..."
              value={comment}
              onChange={onChange}
              onKeyDown={onKeyDown}
            />
            <button className="submit-comment" onClick={onSubmit}>
              게시
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Feed;
