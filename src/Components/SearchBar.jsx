import react from 'react';
import './SerachBar.css';

function SearchBar ({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for delicious meals"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className = "search-input"
      />
      <button className="search-button">search</button>

    </div>
  );
}
export default SearchBar;