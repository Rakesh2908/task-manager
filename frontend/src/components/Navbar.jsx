import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Header({ setTasks, setIsAuthenticated, isAuthenticated, setTaskTitle }) {
  const [allTasks, setAllTasks] = useState([]);

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/task/mytask", { withCredentials: true });
      setAllTasks(response.data.tasks);
      setTasks(response.data.tasks); // Update tasks with fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: true });
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const filterTasks = (filterType) => {
    let filteredTasks = [];

    switch (filterType) {
      case "completed":
        filteredTasks = allTasks.filter((task) => task.status === "completed");
        setTaskTitle("Completed Tasks");
        break;
      case "incomplete":
        filteredTasks = allTasks.filter((task) => task.status === "incomplete");
        setTaskTitle("Incomplete Tasks");
        break;
      case "archived":
        filteredTasks = allTasks.filter((task) => task.archived === true);
        setTaskTitle("Archived Tasks");
        break;
      case "all":
      default:
        filteredTasks = allTasks;
        setTaskTitle("Tasks");
        break;
    }
    setTasks(filteredTasks);
  };

  if (!isAuthenticated) return null;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">TASK MANAGER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="text-decoration-none d-flex align-items-center link-dark">
              Home
            </Link>
            <NavDropdown title="Filter Tasks" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => filterTasks("all")}>All Tasks</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("completed")}>Completed Tasks</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("incomplete")}>Incomplete Tasks</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("archived")}>Archived Tasks</NavDropdown.Item>
            </NavDropdown>
            <Link to="/profile" className="text-decoration-none d-flex align-items-center link-dark">
              Profile
            </Link>
            <Button className="bg-transparent border-0" style={{ width: "fit-content" }} onClick={handleLogout}>
              LOGOUT
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  setTasks: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setTaskTitle: PropTypes.func.isRequired,
};

export default Header;
