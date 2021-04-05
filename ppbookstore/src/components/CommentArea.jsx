import React from "react";
import { Card, ListGroup, Button, Modal } from "react-bootstrap";
import AddComment from "./AddComment";
import CommentListItem from "./CommentListItem";

class CommentArea extends React.Component {
  state = {
    comments: [],
    isLoading: false,
    isError: false,
  };
  fetchBookComments = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.selectedBook,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDYzNjlkNDcwNDYyZTAwMTUyMTkwMjAiLCJpYXQiOjE2MTcxMjc4OTMsImV4cCI6MTYxODMzNzQ5M30.8XfR2lYUrCQiEkE_ZvFn607RccvX-hjjwuWfVnaXQaU",
          },
        }
      );
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
  componentDidMount = async () => {
    await this.fetchBookComments();
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.selectedBook !== this.props.selectedBook) {
      await this.fetchBookComments();
    }
  };
  render() {
    console.log(this.state.comments);
    return (
      <Modal
        show={this.props.showModal}
        onHide={() => this.props.handleModalOpen(false)}
        centered
      >
        <Modal.Header closeButton className="d-flex text-center">
          <Modal.Title className="modal-title text-center">
            Comments Section
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <ListGroup variant="primary">
              {this.state.comments.map((comment, idx) => (
                <CommentListItem
                  key={idx}
                  comment={comment.comment}
                  rating={comment.rate}
                />
              ))}
            </ListGroup>
            <AddComment id={this.props.selectedBook} />
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.props.handleModalOpen(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => this.props.handleModalOpen(false)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CommentArea;
