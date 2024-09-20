import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { logOut } from "../../../redux/actions/userActions";
const AdminProductPageComponent = ({ getProducts, deleteProduct }) => {
  const [products, setProducts] = useState([]);
  const [productDeleted, setProductDeleted] = useState(false);
  // const dispatch = useDispatch();
  // TO delete a product:
  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      const deleted = await deleteProduct(userId);
      if (deleted === "product deleted") {
        setProductDeleted(!productDeleted);
      }
    }
  };

  useEffect(() => {
    const abortcontrol = new AbortController();
    getProducts(abortcontrol)
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        // note that:abort ki vje se req cancel hogi hi hogi or vo ik error throw krega hi krega is liye is error ko hum show ni krayenge,hum dusra error show krenge jo backend se ayega in case of error occur
        // kyunki hume sirf page leave krte smay req abort krni hai ,isse jo error throw hoga us se hume kuj lena dena ni hai
        err.name === "AxiosError" && console.log(err.response.data.message);
        // dispatch(logOut());
      });
    return () => abortcontrol.abort();
  }, [productDeleted]);
  // return statement:
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>
          Product List{" "}
          <LinkContainer to="/admin/create-new-product">
            <Button variant="primary" size="lg">
              {" "}
              Create new
            </Button>
          </LinkContainer>
        </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <LinkContainer to="/admin/edit-product">
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className="bi bi-archive-fill"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default AdminProductPageComponent;
