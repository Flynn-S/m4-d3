import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import CommentListItem from "./CommentListItem";

class CommentArea extends React.Component {
  state = {};

  render() {
    return (
      <div>
        {/* <img src={props.img} alt="Book Image" />
        <ListGroup as="ul">
            {/* <ListGroup.Item as="li" active>
                First Comment
            </ListGroup.Item>
            <ListGroup.Item as="li">Second Comment</ListGroup.Item>
            <ListGroup.Item as="li">Third Comment</ListGroup.Item>
            <ListGroup.Item as="li">Fourth Comment</ListGroup.Item>
            <Button variant="primary">Add Comment</Button>
             */}
        {/* {this.props.comment}
          <CommentListItem />
        </ListGroup> */}
        <ul>
          {this.props.comments &&
            this.props.comments.map((comment) => (
              <CommentListItem comment={comment} />
            ))}
        </ul>
      </div>
    );
  }
}

export default CommentArea;
