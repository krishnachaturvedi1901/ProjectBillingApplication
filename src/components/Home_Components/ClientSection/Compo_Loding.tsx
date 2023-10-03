import { Skeleton } from "@mui/material";
import React from "react";

const Compo_Loding = () => {
  return (
    <div className="flex justify-between items-center p-8">
      <div>
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7, mb: "10px" }}
          variant="rectangular"
          width={150}
          height={50}
        />
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7 }}
          variant="text"
          width={220}
          height={20}
        />
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7 }}
          variant="text"
          width={220}
          height={20}
        />
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7 }}
          variant="text"
          width={220}
          height={20}
        />
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7 }}
          variant="text"
          width={220}
          height={20}
        />
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7 }}
          variant="text"
          width={220}
          height={20}
        />
      </div>
      <div>
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7, mb: "10px" }}
          variant="rectangular"
          width={150}
          height={50}
        />
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7 }}
          variant="text"
          width={220}
          height={20}
        />
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7 }}
          variant="text"
          width={220}
          height={20}
        />
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7 }}
          variant="text"
          width={220}
          height={20}
        />
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7 }}
          variant="text"
          width={220}
          height={20}
        />
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7 }}
          variant="text"
          width={220}
          height={20}
        />
        <Skeleton
          sx={{ bgcolor: "grey.700", opacity: 0.7 }}
          variant="text"
          width={220}
          height={20}
        />
      </div>
    </div>
  );
};

export default Compo_Loding;
