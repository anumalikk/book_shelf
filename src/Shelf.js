import "./App.css";
import Books from "./Books";

function Shelf({ shelfName, booksinThatShef, handleShelfChange }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <Books
          books={booksinThatShef}
          shelfName={shelfName}
          handleShelfChange={handleShelfChange}
        ></Books>
      </div>
    </div>
  );
}

export default Shelf;
