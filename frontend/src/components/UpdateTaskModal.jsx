import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const UpdateTaskModal = ({
  showUpdateModal,
  handleUpdateModalClose,
  id,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");
  const [archived, setArchived] = useState(false);

  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/task/single/${id}`,
          {
            withCredentials: true,
          }
        );
        const task = res.data.task;
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setArchived(task.archived);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred while fetching the task.");
      }
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  const handleUpdateTask = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/task/update/${id}`,
        {
          title,
          description,
          status,
          archived,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id
            ? { ...task, title, description, status, archived }
            : task
        )
      );
      handleUpdateModalClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while updating the task.");
    }
  };

  return (
    <>
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={2}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="completed">COMPLETED</option>
              <option value="incomplete">INCOMPLETE</option>
            </select>
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Archived</label>
            <select
              value={archived}
              onChange={(e) => setArchived(e.target.value === "true")}
            >
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateTask}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UpdateTaskModal.propTypes = {
  showUpdateModal: PropTypes.bool.isRequired,
  handleUpdateModalClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default UpdateTaskModal;
