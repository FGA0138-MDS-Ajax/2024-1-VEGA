import React from "react";

export default function Reply({ props }) {
  return (
    <ol className="children">
      <li className="comment">
        <div className="comment-body">
          <div className="comment-author vcard">
            <img className="avatar" src={props.authorImg} alt="Author" />
            <a href="#" className="url">
              {props.name}
            </a>
          </div>
          <div className="comment-meta">
            <a href="#"> {props.commentmeta}</a>
          </div>
          <p>{props.replytext}</p>
          <div className="reply">
            <a className="comment-reply-link" href="#">
              Reply
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.74707H8.5C10.0913 5.74707 11.6174 6.37921 12.7426 7.50443C13.8679 8.62965 14.5 10.1558 14.5 11.7471V13.2471M1 5.74707L5.5 10.2471M1 5.74707L5.5 1.24707"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </li>
    </ol>
  );
}
