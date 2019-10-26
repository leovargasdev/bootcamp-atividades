import React from 'react';
import Comment from './Comment';

function Post({ author, date, content, comments }){
  return (
    <div className="post">
      <div className="post-author">
        <img className="avatar" src={author.avatar} alt="User avatar"/>
        <div className="info">
          <strong>{author.name}</strong>
          <span>{date}</span>
        </div>
      </div>
      <div className="post-content">
        <p>{content}</p>
        {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
};

export default Post;