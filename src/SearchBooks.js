import "./App.css";
import { useState } from "react";
import Books from "./Books";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

function SearchBooks() {
  const [searchedBooks, setSearchedBooks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [searchedText, setSearchedText] = useState("");

  const handleSearchedTextChange = (event) => {
    setSearchedText(event.target.value);

    const getSeachedBooks = async () => {
      const res = await BooksAPI.search(event.target.value, 20);
      setSearchedBooks(res ?? []);
    };

    getSeachedBooks();
  };

  const handleShelfChange = (book, currentShelfName, newShelfName) => {
    BooksAPI.update(book, newShelfName);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/"></Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={handleSearchedTextChange}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <Books
          books={searchedBooks}
          shelfName={"Move to..."}
          handleShelfChange={handleShelfChange}
          isSearchedBooks={true}
        ></Books>
      </div>
    </div>
  );
}

export default SearchBooks;
