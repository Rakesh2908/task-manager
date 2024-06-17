// import React from "react";
import { Container, Stack } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const Profile = ({ user, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container className="my-4">
      <h1 className="mb-3">PROFILE</h1>
      {user && (
        <Stack style={{ width: "fit-content", margin: "0 auto" }} gap={3}>
          <Stack direction="horizontal" gap={3}>
            <img
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "100%",
                marginBottom: "20px",
              }}
              src={user.avatar?.url}
              alt="avatar"
            />
          </Stack>
          <Stack direction="horizontal" gap={3}>
            <p className="fw-bold">NAME:</p>
            <p>{user.name}</p>
          </Stack>
          <Stack direction="horizontal" gap={3}>
            <p className="fw-bold">EMAIL:</p>
            <p>{user.email}</p>
          </Stack>
          <Stack direction="horizontal" gap={3}>
            <p className="fw-bold">PHONE:</p>
            <p>{user.phone}</p>
          </Stack>
        </Stack>
      )}
    </Container>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Profile;
