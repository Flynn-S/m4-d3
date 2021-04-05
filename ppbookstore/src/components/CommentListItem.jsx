import React from "react";
import { ListGroup } from "react-bootstrap";

class CommentListItem extends React.Component {
  render() {
    // console(this.props.comments);
    return (
      <>
        <ListGroup.Item className="d-flex justify-content-between">
          {this.props.comment} <span>{this.props.rating}/5</span>
        </ListGroup.Item>
      </>
    );
  }
}
export default CommentListItem;
