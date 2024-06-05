import React, { useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { SubmitButton } from "../Button/Button";

export default function CommentConatctFrom() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Data send successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="from-input d-flex gap-2">
        <input
          placeholder="Name"
          className="w-50"
          type="text"
          name="fristname"
          value={inputs.fristname || ""}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          className="w-50"
          type="email"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-12">
        <textarea
          name="textarea"
          rows="5"
          value={inputs.textarea || ""}
          onChange={handleChange}
          className="col-12"
          placeholder="Comment text."
        />
      </div>
      <div className="ak-height-40 ak-height-lg-20"></div>
      <SubmitButton>Post Comment</SubmitButton>
    </form>
  );
}
