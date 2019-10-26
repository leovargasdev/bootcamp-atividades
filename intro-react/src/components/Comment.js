import React from 'react';

function Comment({comment}) {
  return(
    <div className="comment">
      <img className="avatar" src={comment.author.avatar} alt=""/>
      <p>
        <strong>{comment.author.name}</strong>
        {comment.content}
      </p>
    </div>
  );
}

export default Comment;