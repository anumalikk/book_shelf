import "./App.css";
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";

function ShelfChanger({
  book,
  currentShelfName,
  handleShelfChange,
  isSearchedBooks,
}) {
  const toCamelCase = (inputString) =>
    inputString
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());

  const [selectedValue, setSelectedValue] = useState("");

  const shelves = [
    "Move to...",
    "Currently Reading",
    "Want to Read",
    "Read",
    "None",
  ];

  // useEffect(() => {
  //   console.log("This is the side effect.");
  //   return () => {
  //     console.log(
  //       "The component re-rendered. This is part of the cleanup before the next effect."
  //     );
  //   };
  // });

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let mounted = true;
    const getBooks = async () => {
      const res = await BooksAPI.get(book.id);
      if (mounted) setSelectedValue(res.shelf === undefined || res.shelf=== "none" ? "moveTo.": res.shelf);
    };

    getBooks();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    handleShelfChange(book, currentShelfName, event.target.value); //to do: note you are passing wantToRead here instead of Want to RRead
  };

  return (
    <div className="book-shelf-changer">
      <select value={selectedValue} onChange={handleSelectChange}>
        {shelves.map((shelf) =>
          shelf === "Move to..." ? (
            <option key={shelf} disabled value={toCamelCase(shelf)}>
              {shelf}
            </option>
          ) : (
            <option key={shelf} value={toCamelCase(shelf)}>
              {shelf}
            </option>
          )
        )}
      </select>
    </div>
  );
}

export default ShelfChanger;
