import React from "react";
import { Layout, Avatar } from "antd";
import Table from "../reuseable/Home/Table";
const { Content } = Layout;

export default function Home() {
  return (
    <>
      <Content className="user-section">
        {/* <h2>
            {" "}
            <Avatar size={44}>K</Avatar> Welcome, Sarma
          </h2> */}
      </Content>
      <Content className="user-project container pt-10">
        <Table />
      </Content>
    </>
  );
}
