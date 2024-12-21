import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";

function RatingFilter({ onFilter, reset }) {
  const [value, setValue] = useState(5);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    if (reset === null) {
      setValue(5);
    }

  }, [reset])

  return (
    <div>
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        onChange={(_, newValue) => {
          setValue(newValue);
          onFilter(newValue);
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
