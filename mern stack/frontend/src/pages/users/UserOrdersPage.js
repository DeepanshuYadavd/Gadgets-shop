import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const UserOrdersPage = () => {
  return (
    <Row className="m-5">
      <Col md={12}>
        <h1>My Orders</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>user</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Oder details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>$999</td>
              <td>
                <i className="bi bi-check-lg text-success"></i>
              </td>
              <td>
                <Link to="/user/order-details">go to order</Link>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>$999</td>
              <td>
                <i className="bi bi-x-lg text-danger"></i>
              </td>
              <td>
                <Link to="/user/order-details">go to order</Link>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry </td>
              <td>the Bird</td>
              <td>$999</td>
              <td>
                <i className="bi bi-check-lg text-success"></i>
              </td>
              <td>
                <Link to="/user/order-details">go to order</Link>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Jack</td>
              <td>smith</td>
              <td>$999</td>
              <td>
                <i className="bi bi-x-lg text-danger"></i>
              </td>
              <td>
                <Link to="/user/order-details">go to order</Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UserOrdersPage;
