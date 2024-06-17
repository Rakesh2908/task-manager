import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const ViewTaskModal = ({ showViewModal, handleViewModalClose, id }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/task/single/${id}`, {
          withCredentials: true,
        });
        setTask(res.data.task);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred while fetching the task.");
      }
    };

    if (id) {
      getSingleTask();
    }
  }, [id]);

  return (
    <Modal show={showViewModal} onHide={handleViewModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack>
          <p className="fw-bold mb-0">Title</p>
          <p>{task?.title}</p>
        </Stack>
        <Stack>
          <p className="fw-bold mb-0">Description</p>
          <p>{task?.description}</p>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleViewModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ViewTaskModal.propTypes = {
  showViewModal: PropTypes.bool.isRequired,
  handleViewModalClose: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default ViewTaskModal;
