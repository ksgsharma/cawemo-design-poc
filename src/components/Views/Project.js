import React, { useState, useContext } from "react";
import MyContext from '../Context/MyContext'
import { Table, Button, Menu, Dropdown, Layout, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";



const columns = [
  {
    title: "",
    dataIndex: "icon",
    width: "30px",
  },
  {
    title: "Name",
    dataIndex: "title",
    width: "43%",
    sorter: {
      compare: (a, b) => a.name - b.name,
      multiple: 1,
    },
  },
  {
    title: "Content",
    dataIndex: "chinese",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Last Changed",
    dataIndex: "math",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: "Collaborators",
    dataIndex: "english",
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



function Project({ match }) {


  const [state, setstate] = useState({
    selected: [],
  });

  const { mstate, setMstate } = useContext(MyContext)
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setstate({ ...state, selected: selectedRows });
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const filtered = mstate.projects.filter((v)=>{
    return window.location.pathname.slice(9) === v.id
  })

  React.useEffect(() => {
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear + " " + hours + ":" + minutes;

    if(filtered.length === 0){
      const filteredData = mstate.projects.filter((v) => {
        return 'New Value' === v.name;
      });
      if (filteredData.length === 0) {
      setMstate({ ...mstate, projects: [...mstate.projects, {key:Math.random(), id: match.params.id, name: 'New Value', diagram: [], length: mstate.projects.length !== 0 ? mstate.projects[mstate.projects.length - 1].diagram.length : 0, date: dateString, collaborator: <Avatar>A</Avatar> }] })
      }
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item onClick={() => setMstate({ ...mstate, addFile: true })} key="1">
        BPMN Diagram
      </Menu.Item>
      <Menu.Item onClick={() => setMstate({ ...mstate, addFile: true })} key="2">
        DMN Diagram
      </Menu.Item>
      <Menu.Item onClick={() => setMstate({ ...mstate, addFile: true })} key="3">
        Upload Files
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="project-table">
      <div className="table-main">
        <h2 className="table-header pb-5">
          {folderIcon} {filtered.length > 0 && filtered[0].name}
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
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                type="primary"
                size="large"
              >
                New
                <DownOutlined />
              </Button>
            </Dropdown>
          </span>
        </h2>
        <Table
          size="small"
          showSorterTooltip={false}
          columns={columns}
          rowSelection={{
            ...rowSelection,
          }}
          dataSource={mstate.projects.length > 0 && mstate.projects[mstate.projects.length - 1].diagram}

        />
      </div>
    </Layout>
  );
}

export default Project
