import { React, Fragment, useState } from "react";
import { Toast, Button, Form } from "react-bootstrap";
const AdminChatRoomComponent = () => {
  const [toast1,closetoast1]=useState(true);
  const close1=()=> closetoast1(false);
  return (
    <>
      <Toast className="ms-4 mb-5" show={toast1}  onClose={close1}>
        <Toast.Header>
          <strong className="me-auto">chat with DY</strong>
        </Toast.Header>
        <Toast.Body>
          <div style={{ maxHeight: "300px", overflow: "auto" }}>
            {Array.from({ length: 20 }).map((_, idx) => (
              <Fragment key={idx}>
                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                  <b>user:</b>this is a chat message
                </p>
                <p>
                  <b>admin:</b>this is a chat message
                </p>
              </Fragment>
            ))}
          </div>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="example.form.ControlTextarea1"
            >
              <Form.Label>Write a message</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
            <Button variant="success" type="submit">send</Button>
          </Form>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default AdminChatRoomComponent;
