import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Card, CardHeader } from "@material-ui/core";

const JoinRoomListSkeleton = () => {
  return (
    <Card style={{ width: "100%", margin: 20, boxShadow: "none" }}>
      <CardHeader
        avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />}
        title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
    </Card>
  );
};

export default JoinRoomListSkeleton;
