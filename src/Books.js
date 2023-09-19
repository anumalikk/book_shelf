import "./App.css";
import ShelfChanger from "./ShelfChanger";

function Books({ books, shelfName, handleShelfChange, isSearchedBooks }) {
  return (
    <ol className="books-grid">
      {books.hasOwnProperty("error")
        ? books.error === "empty query"
          ? "No results found."
          : books.error
        : books.map((book) => {
            const imageLink = book.imageLinks ?? "";
            const imageUrl = imageLink !== "" ? book.imageLinks.thumbnail : "";
            const backgroundImageUrl = `url(${imageUrl})`;

            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: backgroundImageUrl,
                      }}
                    ></div>
                    <ShelfChanger
                      book={book}
                      currentShelfName={book.shelf ?? shelfName}
                      handleShelfChange={handleShelfChange}
                      isSearchedBooks={isSearchedBooks}
                    ></ShelfChanger>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors &&
                    book.authors.map((author) => {
                      return (
                        <div key={author} className="book-authors">
                          {author}
                        </div>
                      );
                    })}
                </div>
              </li>
            );
          })}
    </ol>
  );
}

export default Books;
