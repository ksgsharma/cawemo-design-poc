import React, { useContext } from "react";
import { Row, Col, Layout, Avatar } from "antd";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import MyContext from "../../Context/MyContext";
import { useLocation, withRouter } from "react-router-dom";

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/">
        user 1<p>ksgsharma@gmail.com</p>
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <a href="/">
        user 2<p>user2@gmail.com</p>
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <a href="/">Profile</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <a href="/">Settings</a>
    </Menu.Item>
  </Menu>
);

function Navbar(props) {
  const { mstate, setMstate } = useContext(MyContext);
  const location = useLocation();
  const handleChange = (e) => {
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const dateString =
      currentDayOfMonth +
      "-" +
      (currentMonth + 1) +
      "-" +
      currentYear +
      " " +
      hours +
      ":" +
      minutes;
    const filtered = mstate.projects.filter((v, i) => {
      return mstate.projects[i] !== mstate.projects[mstate.projects.length - 1];
    });
    if (e.type === "keypress") {
      let key = e.keyCode || e.which;
      if (key === 13) {
        const filteredData = mstate.projects.filter((v) => {
          return e.target.value === v.name;
        });
        if (filteredData.length === 0) {
          setMstate({
            ...mstate,
            projects: [
              ...filtered,
              {
                key: Math.random(),
                name: e.target.value,
                id: window.location.pathname.slice(9),
                diagram: [],
                length:
                  mstate.projects.length !== 0
                    ? mstate.projects[mstate.projects.length - 1].diagram.length
                    : 0,
                date: dateString,
                collaborator: <Avatar>A</Avatar>,
              },
            ],
            rename: false,
          });
        } else {
          setMstate({
            ...mstate,
            rename: false,
          });
          props.history.push("/");
        }
      }
    } else {
      const filteredData = mstate.projects.filter((v) => {
        return e.target.value === v.name;
      });
      if (filteredData.length === 0) {
        setMstate({
          ...mstate,
          projects: [
            ...filtered,
            {
              name: e.target.value,
              id: window.location.pathname.slice(9),
              diagram: [],
              length:
                mstate.projects.length !== 0
                  ? mstate.projects[mstate.projects.length - 1].diagram.length
                  : 0,
              date: dateString,
              collaborator: <Avatar>A</Avatar>,
            },
          ],
          rename: false,
        });
      } else {
        setMstate({
          ...mstate,
          rename: false,
        });
        props.history.push("/");
      }
    }
  };

  const record = mstate.projects.filter((v) => {
    return window.location.pathname.slice(9) === v.id;
  });
  const deleteRecord = mstate.projects.filter((v) => {
    return v.id !== window.location.pathname.slice(9);
  });

  const handleChangeFile = (e) => {
    const diagram = record[0].diagram;
    const added = [
      ...diagram,
      { title: e.target.value, type: "DMN Diagram", key: Math.random() },
    ];

    const updatedProject = {
      ...record[0],
      diagram: added,
    };

    const filtered = mstate.projects.filter((v) => {
      return v.id !== window.location.pathname.slice(9);
    });
    if (e.type === "keypress") {
      let key = e.keyCode || e.which;
      if (key === 13) {
        setMstate({
          ...mstate,
          projects: [...filtered, updatedProject],
          addFile: false,
        });
      }
    } else {
      setMstate({
        ...mstate,
        projects: [...filtered, updatedProject],
        addFile: false,
      });
    }
  };

  const projectMenu = (
    <Menu>
      <Menu.Item key="0">
        <p
          className="link"
          onClick={() => setMstate({ ...mstate, rename: true })}
        >
          Edit name
        </p>
      </Menu.Item>

      <Menu.Item key="1">
        <p
          className="link"
          onClick={() => {
            setMstate({ ...mstate, projects: deleteRecord });
            props.history.push("/");
          }}
        >
          Delete
        </p>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="layout px-2">
      <Header>
        <Row>
          <Col span={18}>
            <Link to="/" className="logo">
              Company Logo
            </Link>
            <Link to="/" className="home">
              Home
            </Link>
            {mstate.projects.length > 0 &&
              !mstate.rename &&
              location.pathname.split("/").includes("project") && (
                <Dropdown
                  overlay={projectMenu}
                  className="project-menu"
                  trigger={["click"]}
                >
                  <a
                    href="/"
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {record[record.length - 1].name} <DownOutlined />
                  </a>
                </Dropdown>
              )}
            {mstate.rename && (
              <Col
                span={6}
                className="inline-block"
                style={{ transform: "translateY(-2px)" }}
              >
                <Input
                  placeholder="Enter name here"
                  defaultValue={
                    record.length !== 0 ? record[0].name : "New Value"
                  }
                  onBlur={handleChange}
                  onKeyPress={handleChange}
                  className="ml-3"
                />
              </Col>
            )}
            {mstate.addFile && (
              <Col
                span={6}
                className="inline-block"
                style={{ transform: "translateY(-2px)" }}
              >
                <Input
                  placeholder="Enter name here"
                  defaultValue="New Value"
                  onBlur={handleChangeFile}
                  onKeyPress={handleChangeFile}
                  className="ml-3"
                />
              </Col>
            )}
          </Col>

          <Col span={6} className="line-48">
            <Dropdown overlay={menu} className="nav-menu" trigger={["click"]}>
              <a
                to="/"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Sarma <DownOutlined />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    </Layout>
  );
}
export default withRouter(Navbar);
