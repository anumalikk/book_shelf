import "./App.css";
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";

function ListBooks() {
  const [books, setBooks] = useState([]);
  // const intialCurrentlyReading = books.filter(book => book.shelf === "read");
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    setCurrentlyReadingBooks(
      books.filter((book) => book.shelf === "currentlyReading")
    );
  }, [books]);

  useEffect(() => {
    setWantToReadBooks(books.filter((book) => book.shelf === "wantToRead"));
  }, [books]);

  useEffect(() => {
    setReadBooks(books.filter((book) => book.shelf === "read"));
  }, [books]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);
  

  const handleShelfChange = (book, currentShelfName, newShelfName) => {
    BooksAPI.update(book, newShelfName);

    if (
      currentShelfName === "Currently Reading" ||
      currentShelfName === "currentlyReading"
    ) {
      setCurrentlyReadingBooks(
        currentlyReadingBooks.filter((c) => c.id !== book.id)
      );
      if (newShelfName === "wantToRead")
        setWantToReadBooks([...wantToReadBooks, book]);
      if (newShelfName === "read") setReadBooks([...readBooks, book]);
    }
    if (
      currentShelfName === "Want to Read" ||
      currentShelfName === "wantToRead"
    ) {
      setWantToReadBooks(wantToReadBooks.filter((c) => c.id !== book.id));
      if (newShelfName === "currentlyReading")
        setCurrentlyReadingBooks([...currentlyReadingBooks, book]);
      if (newShelfName === "read") setReadBooks([...readBooks, book]);
    }
    if (currentShelfName === "Read" || currentShelfName === "read") {
      setReadBooks(readBooks.filter((c) => c.id !== book.id));
      if (newShelfName === "wantToRead")
        setWantToReadBooks([...wantToReadBooks, book]);
      if (newShelfName === "currentlyReading")
        setCurrentlyReadingBooks([...currentlyReadingBooks, book]);
    }
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf
            shelfName={"Currently Reading"}
            booksinThatShef={currentlyReadingBooks}
            handleShelfChange={handleShelfChange}
          ></Shelf>
          <Shelf
            shelfName={"Want to Read"}
            booksinThatShef={wantToReadBooks}
            handleShelfChange={handleShelfChange}
          ></Shelf>
          <Shelf
            shelfName={"Read"}
            booksinThatShef={readBooks}
            handleShelfChange={handleShelfChange}
          ></Shelf>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default ListBooks;
