import React from "react";
import { Form, Container, Button } from "react-bootstrap";

class AddComment extends React.Component {
  state = {
    comment: {
      commentText: "",
      rate: 1,
      elementId: this.props.id,
    },
  };

  handleComment = (e) => {
    this.setState({
      comment: { ...this.state.comment, commentText: e.currentTarget.value },
    });
  };

  handleRating = (e) => {
    this.setState({
      comment: { ...this.state.comment, rate: e.currentTarget.value },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + this.props.id,
        {
          method: "POST",
          body: JSON.stringify(this.state.comment),
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDYzNjlkNDcwNDYyZTAwMTUyMTkwMjAiLCJpYXQiOjE2MTcxMjc4OTMsImV4cCI6MTYxODMzNzQ5M30.8XfR2lYUrCQiEkE_ZvFn607RccvX-hjjwuWfVnaXQaU",
          },
        }
      );
      if (response === 200) {
        alert("Your Comment has been saved");
        this.setState({
          comment: {
            commentText: "",
            rate: 1,
            elementId: "",
          },
        });
      } else {
        alert("there was a problem");
      }
      let commentData = await response.json();
      console.log(commentData);
      this.setState({
        isLoading: false,
        isError: false,
        comments: commentData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container fluid>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="forBasicText">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              value={this.state.comment.commentText}
              onChange={this.handleComment}
              type="text"
              placeholder="Leave a Comment"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Rate this Book</Form.Label>
            <Form.Control
              value={this.state.comment.rate}
              onChange={this.handleRating}
              as="select"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label>Book Id or Asin</Form.Label>
            <Form.Control value={this.state.comment.elementId} type="text" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default AddComment;
