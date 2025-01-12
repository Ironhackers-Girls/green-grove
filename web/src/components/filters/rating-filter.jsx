import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import {useEffect, useState } from "react";

function RatingFilter({ onFilter, selected }) {
  const [hover, setHover] = useState(-1);


  return (
    <div className="border-t border-gray-200 px-4 py-6">
      <h3 className="-mx-2 -my-3 px-2 py-3 flow-root font-medium text-gray-900">
        Rating
      </h3>
      <div className="mt-3">
        <Rating
          name="hover-feedback"
          value={selected}
          precision={1}
          onChange={(_, newValue) => {
            onFilter(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
      </div>
    </div>

  );
}

export default RatingFilter;
