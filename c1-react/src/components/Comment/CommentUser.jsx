import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import Reply from "./Reply";
import Comment from "./Comment";

export default function CommentUser({ props }) {
  return (
    <div>
      <SectionTitle animTwo={true} textWhite={"Comment (1)"} />
      <p>Comment Yet! Comment post comment box</p>
      <ol className="comment-list">
        <li className="comment">
          {props.comment.map((comm, i) => {
            return <Comment props={comm} key={i} />;
          })}
          {props.reply.map((rep, i) => {
            return <Reply props={rep} key={i} />;
          })}
        </li>
      </ol>
    </div>
  );
}
