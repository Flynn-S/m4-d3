import React from "react";
import SingleBook from "./SingleBook";
import { Form, Row, Container, Modal, Button } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends React.Component {
  state = {
    books: this.props.category,
    selectedBook: null,
    showModal: false,
  };

  filterBooks = (query) => {
    const filteredBooks = this.props.category.filter((book) =>
      book.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    this.setState({ books: filteredBooks });
    // const filter = this.props.
  };

  handleBookClick = (asin) => {
    this.setState({ selectedBook: asin, showModal: true });
  };
  handleModalOpen = (isOpen) => {
    this.setState({ showModal: isOpen });
  };

  render() {
    // const { books} = this.state
    console.log(this.state.selectedBook);
    return (
      <div>
        <Form.Group>
          {/* <FormControl onKeyPress={filtering()} id="search" type="text" placeholder="Search" className="mr-sm-2" /> */}
          <Form.Control
            id="searchBox"
            type="text"
            placeholder="search books"
            onChange={(e) => this.filterBooks(e.target.value)}
            // value=""
          ></Form.Control>
        </Form.Group>

        <Container>
          <Row className="justify-content-center mt-2 mb-3 noGutters={true}">
            {this.state.books.map((book) => (
              <SingleBook
                key={book.asin}
                book={book}
                handleBookClick={this.handleBookClick}
              />
            ))}
          </Row>
        </Container>
        <CommentArea
          selectedBook={this.state.selectedBook}
          showModal={this.state.showModal}
          handleModalOpen={this.handleModalOpen}
        />
      </div>
    );
  }
}
// const BookList = (props) =>(
//   <div>
//     <Form inline>
//       <FormControl onKeyPress={filtering()} id="search" type="text" placeholder="Search" className="mr-sm-2" />
//     </Form>

//     <SingleBook id="books"  category={props.category} />

//   </div>
// )
// const filtering = () =>{
//     let search = document.querySelector("#search")
//     let data = document.querySelector("#books")
//     console.log(search);
//     console.log(data);

// }

export default BookList;
