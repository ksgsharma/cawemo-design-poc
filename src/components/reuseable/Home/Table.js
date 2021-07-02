import React, { useState, useContext } from "react";
import { Table, Button, Menu, Dropdown } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import MyContext from "../../Context/MyContext";
import { useHistory } from "react-router-dom";

const columns = [
  {
    key: 1,
    title: "",
    dataIndex: "icon",
    width: "30px",
  },
  {
    key: 2,
    title: "Name",
    dataIndex: "name",
    width: "43%",
    sorter: {
      compare: (a, b) => a.name - b.name,
      multiple: 1,
    },
  },
  {
    key: 3,
    title: "Content",
    dataIndex: "length",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    key: 4,
    title: "Last Changed",
    dataIndex: "date",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    key: 5,
    title: "Collaborators",
    dataIndex: "collaborator",
  },
];

const folderIcon = (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 6H4c-1.1 0-1.99.9-1.99 2L2 19c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-7l-3-2zM21 6h-7.5l-3-2H4a2 2 0 012-2h5l3 2h6a1 1 0 011 1v1z"
      fill="var(--grey-darken-33)"
    ></path>
  </svg>
);

export default function TableComponent() {
  const [state, setstate] = useState({
    selected: [],
  });
  const { mstate, setMstate } = useContext(MyContext);

  const history = useHistory();

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setstate({ ...state, selected: selectedRowKeys });
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const menu = (
    <Menu>
      <Menu.Item key="4">Delete</Menu.Item>
      <Menu.Item disabled key="5">
        Leave
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="table-main">
      <h2 className="table-header pb-5">
        Projects
        <span className="ml-auto">
          <Button
            type="primary"
            className="icon-button"
            shape="circle"
            icon={<SearchOutlined />}
            size="large"
          />
          {state.selected.length > 0 && (
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                onClick={(e) => e.preventDefault()}
                type="primary"
                size="large"
              >
                {state.selected.length} item
                {state.selected.length > 1 ? "s" : " "} Selected{" "}
                <DownOutlined />
              </Button>
            </Dropdown>
          )}
          <Button
            onClick={() => {
              setMstate({ ...mstate, rename: true });
              return history.push(`/project/${Math.random()}`);
            }}
            type={state.selected.length > 0 ? "secondary" : "primary"}
            size="large"
          >
            Add project
          </Button>
        </span>
      </h2>
      <Table
        size="small"
        showSorterTooltip={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => history.push(`project/${record.id}`),
          };
        }}
        columns={columns}
        rowSelection={{
          ...rowSelection,
        }}
        dataSource={mstate.projects}
      />
    </div>
  );
}
