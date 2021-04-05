import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class DisplayBook extends React.Component {
  state = {
    selectedImg: false,
    isError: false,
    isLoading: true,
    imageId: null,
    comments: [],
  };

  handleClick = () => {
    this.setState({ selectedImg: !this.state.selectedImg });
  };

  // handleImageId = (id) => {
  //   this.setState({ imageId: e.target.value });
  // };

  render() {
    return (
      <Col xs={12} md={3} className="px-2">
        <Card className={this.state.selectedImg ? "toggled-image" : ""}>
          <Card.Img
            className="img-fluid"
            variant="top"
            src={this.props.book.img}
            onClick={() => this.props.handleBookClick(this.props.book.asin)}
          />
          <Card.Body>
            <Card.Title>{this.props.book.title}</Card.Title>
            {/*<Button variant="primary">Go somewhere</Button>*/}
            <Card.Text>
              {this.props.book.category} - Price: {this.props.book.price}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  // END OF RENDER
}

export default DisplayBook;
