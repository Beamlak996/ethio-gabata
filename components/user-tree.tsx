import React from "react";
import { Card, CardTitle } from "./ui/card";

const UserTree = ({ data }: any) => {
  const renderUsers = (users: any) => {
    return users.map((user: any) => (
      <Card key={user.id} className="w-[100px] gap-4 flex items-center justify-center">
        <p>{user.name}</p>
        {data[user.id] && (
          <div style={{ marginLeft: "20px" }} className="flex items-center flex-col gap-4 justify-center" >{renderUsers(data[user.id])}</div>
        )}
      </Card>
    ));
  };

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(data).map(([parentId, users], index) => (
        <Card
          key={parentId}
          className="flex items-center justify-between gap-4 pl-20 pr-20 pt-10 pb-10"
        >
          <div className="text-lg text-muted-foreground">
            {index + 1} Generation
          </div>
          <CardTitle>{parentId}</CardTitle>
          <div
            style={{ marginLeft: "20px" }}
            className="flex flex-col items-center justify-center gap-4"
          >
            {renderUsers(users)}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UserTree;
