import { Skeleton } from "@mui/material";
import React from "react";

const CompoLoading = () => {
  return (
    <div className="flex justify-between items-center p-8">
      <Skeleton
        className=" bg-gray-300 bg-opacity-50 min-w-full"
        variant="rectangular"
        width={700}
        height={300}
      ></Skeleton>
    </div>
  );
};

export default CompoLoading;
