import { Avatar } from "keep-react";

export const AvatarComponent = () => {
  return (
    <>
      <Avatar
        shape="circle"
        size="xl"
        status="online"
        statusPosition="bottom-left"
        img="/images/avatar/avatar-4.png"
      />
      <Avatar
        shape="circle"
        size="xl"
        status="offline"
        statusPosition="bottom-right"
        img="/images/avatar/avatar-4.png"
      />
      <Avatar
        shape="circle"
        size="xl"
        status="busy"
        statusPosition="top-left"
        img="/images/avatar/avatar-4.png"
      />
      <Avatar
        shape="circle"
        size="xl"
        status="away"
        statusPosition="top-right"
        img="/images/avatar/avatar-4.png"
      />
    </>
  );
}
