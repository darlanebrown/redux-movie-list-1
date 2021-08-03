import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [title, setTitle] = useState();

  const onFormSubmit = (e) => {
    e.preventDefault();

    onSearch(title);
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" visuallyHidden>Search</Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="Search for a Movie or TV Series!"
            />
        </Col>
        <Col xs="auto">
          <Form.Label
            className="me-sm-2"
            htmlFor="inlineFormCustomSelect"
            visuallyHidden
          >
            Type
          </Form.Label>
          <Form.Select className="me-sm-2" id="inlineFormCustomSelect">
            <option value="0">Movie</option>
            <option value="1">Series</option>
            <option value="2">Episode</option>
          </Form.Select>
        </Col>
        <Col className="my-1" xs="auto">
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
    // <form onSubmit={onFormSubmit}>
    //     <div className="form-group">
    //         <label htmlFor="title">Title</label>
    //         <input
    //             type="text"
    //             onChange={(e) => setTitle(e.target.value)}    
    //         />
    //     </div>
    //     <button type="submit">Search</button>
    // </form>
  )
}

export default SearchBar;