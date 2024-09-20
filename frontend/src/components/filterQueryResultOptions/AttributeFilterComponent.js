import React from "react";
import { Form } from "react-bootstrap";

const AttributeFilterComponent = () => {
  return (
    <>
      {[
        { RAM: ["1 TB", "2 TB", "3 TB"] },
        { Color: ["red", "blue", "green", "balck"] },
      ].map((item, idx) => (
        <div key={idx} className="mb-3">
          <Form.Label>
            <b>{Object.keys(item)}</b>
          </Form.Label>
          {item[Object.keys(item)].map((i, idx) => (
            <Form.Check key={idx} type="checkbox" label={i}/>
          ))}
        </div>
      ))}
    </>
  );
};

export default AttributeFilterComponent;
