import React, { useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductSearch  () {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/searchByName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName: searchQuery }),
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-3">
        <img
          className='searchIcon'
          src="https://i.ibb.co/59Xb1DZ/Untitled-design.png"
          alt="Search Icon"
          onClick={toggleSearchVisibility}
          style={{ cursor: 'pointer' }}
        />
      </div>
      {isSearchVisible && (
        <div className="input-group-append mb-3 d-flex justify-content-center">
          <input
            type="text"
            id="productName"
            className="form-control"
            placeholder="Search Product"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            style={{ maxWidth: '300px' }} 
          />
          <div className="input-group-append">
            <button
              type="button"
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
              style={{ border: 'none', background: 'transparent', padding: 1 }}
            >
              <img
                className='searchIcon1'
                src="https://i.ibb.co/59Xb1DZ/Untitled-design.png"
                alt="Search Icon"
                onClick={toggleSearchVisibility}
                style={{ cursor: 'pointer' }}
              />
            </button>
          </div>
        </div>
      )}
      {searchResults.length > 0 && (
        <div>
          <h6 className='text-center'>Search Results:</h6>
          <ul className="list-unstyled d-flex justify-content-center">
            {searchResults.map((product) => (
              <ProductCard productProp={product} key={product.Id} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

