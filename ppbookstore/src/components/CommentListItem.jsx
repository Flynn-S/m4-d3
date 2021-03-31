import React from "react";
import { ListGroup } from "react-bootstrap";

class CommentListItem extends React.Component {
  render() {
    return <li>{this.props.comment.comment}</li>;
  }
}
export default CommentListItem;
