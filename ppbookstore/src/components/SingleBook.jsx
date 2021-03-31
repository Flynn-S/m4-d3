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

  // componentDidUpdate = async (previousProps) => {
  //   // we'll enter here if there's a change in the PROPS or in the STATE

  //   // we're entering here TWO times every time we select a new movie:
  //   // 1) when we receive a new movie from the props (when this.props.movie changes)
  //   // -- when this happens, we'll set a new state into this component, and we'll enter....
  //   // 2) when we just set a new state, and this time we want to STOP, because we don't need to fetch new data

  //   console.log("I've just updated");
  //   console.log(previousProps); // are the props immediately before
  //   console.log(this.props); // the current props
  //   // we want to fetch new movie info just when we clicked on a DIFFERENT movie
  //   // we don't want to fetch the same movie over and over again

  //   if (previousProps !== this.props.book) {
  //     // this is preventing an infinite loop
  //     // we need to know if this refresh happened because we change the dropdown,
  //     // so we're getting a new movie, OR if this refresh happened because we
  //     // fetched the movie info and we set the state
  //     this.fetchBookComments();
  //   }
  // };

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
            // onClick={this.handleBookClick(this.props.book.asin)}
          />
          <Card.Body>
            <Card.Title>{this.props.book.title}</Card.Title>
            {/*<Button variant="primary">Go somewhere</Button>*/}
            <Card.Text>
              {this.props.book.category} - Price: {this.props.book.price}
            </Card.Text>
            <CommentArea />
          </Card.Body>
        </Card>
      </Col>
    );
  }

  // END OF RENDER

  fetchBookComments = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.book.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDYzNjlkNDcwNDYyZTAwMTUyMTkwMjAiLCJpYXQiOjE2MTcxMjc4OTMsImV4cCI6MTYxODMzNzQ5M30.8XfR2lYUrCQiEkE_ZvFn607RccvX-hjjwuWfVnaXQaU",
          },
        }
      );
      let commentData = await response.json();

      if (commentData.Response === "True") {
        console.log(commentData);
        this.setState({
          isLoading: false,
          isError: false,
          comments: commentData,
        });
      } else {
        this.setState({
          isError: true,
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    console.log("componentDidMount in Book");

    this.fetchBookComments();
  };
}

export default DisplayBook;
