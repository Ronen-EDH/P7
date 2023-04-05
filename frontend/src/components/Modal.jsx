import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { TokenContext } from "../App";
import { useNavigate } from "react-router-dom";

export function ProfileModal() {
  const { token, clearToken } = useContext(TokenContext);
  const [smShow, setSmShow] = useState(false);
  const navigate = useNavigate();

  function logOut() {
    clearToken();
    navigate("/signin");
  }

  function DeleteAccount() {
    const options = {
      method: "DELETE",
      headers: { authorization: token, "Content-Type": "application/json" },
    };

    fetch(`http://localhost:3000/api/auth/`, options)
      .then((response) => response.json())
      .then((data) => {
        logOut();
      })
      .catch((err) => {
        console.log("Error: ", err);
        alert("503 - Service Unavailable");
      });
  }

  return (
    <>
      <Button onClick={() => setSmShow(true)} className="me-2" variant="danger">
        Delete account
      </Button>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Delete your account?</Modal.Body>
        <Modal.Footer>
          <Button onClick={DeleteAccount} variant="danger">
            Delete account
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
