import React from "react";

const movingText = [
  {
    white: "Embark on a gastronomic adventure ",
    yellow: "guided our by exquisite dishes",
  },
  {
    white: "Embark on a gastronomic adventure ",
    yellow: "guided our by exquisite dishes",
  },
];

export default function MovingText() {
  return (
    <div className="ak-moving-section-wrap ak-normal text-uppercase">
      <div className="ak-moving-section-in">
        {movingText?.map((text, i) => (
          <div className="ak-moving-section" key={i}>
            <h2>
              {text.white} <span>{text.yellow}</span>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
