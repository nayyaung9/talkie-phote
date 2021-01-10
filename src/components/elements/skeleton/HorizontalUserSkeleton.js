import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const HorizontalUserSkeleton = () => {
  return (
    <div
      style={{
        flex: "0 0 auto",
        padding: "0 8px 0 8px",
      }}>
      <Skeleton animation="wave" variant="circle" width={40} height={40} />
      <Skeleton animation="wave" height={10} width="80%" />
    </div>
  );
};

export default HorizontalUserSkeleton;
