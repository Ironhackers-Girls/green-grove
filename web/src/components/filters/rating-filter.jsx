import Rating from "@mui/material/Rating";
import StarIcon from "@mui/";
import { useState } from "react";

const labels = {
  1: "Unpopular",
  2: "Somewhat Popular",
  3: "Popular",
  4: "Very Popular",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function RatingFilter() {
  const [value, setValue] = useState(5);
  const [hover, setHover] = useState(1);

  return (
    <div>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </div>
  );
}

export default RatingFilter;
