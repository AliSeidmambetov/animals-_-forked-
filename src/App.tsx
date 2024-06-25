import React, { useState, useEffect } from "react";
import "./App.css";

const mockApiResponse = [
  { type: "Cat", amount: 11 },
  { type: "Dog", amount: 7 },
  { type: "Panda", amount: 2 },
  { type: "Bear", amount: 1 },
  { type: "Horse", amount: 10 },
  { type: "Elephant", amount: 3 },
  { type: "Rabbit", amount: 18 },
  { type: "Lion", amount: 6 },
  { type: "Flamingo", amount: 5 },
  { type: "Tiger", amount: 4 },
  { type: "Fox", amount: 9 },
  { type: "Kangaroo", amount: 16 },
];

function App() {
  const [animal, setAnimal] = useState("");
  const [amount, setAmount] = useState("");
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [animal, amount]);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      const results = mockApiResponse.filter((item) => {
        return (
          (!animal || item.type.toLowerCase().includes(animal.toLowerCase())) &&
          (!amount || item.amount === Number(amount))
        );
      });

      setTotalPages(Math.ceil(results.length / limit));

      const offset = (currentPage - 1) * limit;
      setFilteredResults(results.slice(offset, offset + limit));
      setIsLoading(false);
    }, 1000);
  }, [animal, amount, limit, currentPage]);

  return (
    <div className="container">
      <div>
        <input
          className="filter-input"
          type="text"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
          placeholder="Animal"
        />
        <input
          className="filter-input"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>
      <div className="option-block">
        <div className="limit-block">
          By page:
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
        </div>
        <div className="pagination-block">
          <div className="prev-btn">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              prev
            </button>
          </div>
          page: <span>{currentPage}</span>
          <div className="next-btn">
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              next
            </button>
          </div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : filteredResults.length > 0 ? (
          filteredResults.map((animal, index) => (
            <div key={index}>{`${animal.type}, ${animal.amount}`}</div>
          ))
        ) : (
          <div>Animals not found</div>
        )}
      </div>
    </div>
  );
}

export default App;
