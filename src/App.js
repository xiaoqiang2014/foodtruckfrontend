import React, { useState } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`localhost:3000/users/search?term=${searchTerm}`);
      const data = await response.json();
      setFoodTrucks(data);
    } catch (error) {
      console.error('Error fetching food trucks:', error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Food Truck Search</h1>

      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {foodTrucks.length > 0 ? (
        <ul>
          {foodTrucks.map((foodTruck) => (
            <li key={foodTruck.id}>{foodTruck.name}</li>
          ))}
        </ul>
      ) : (
        <p>No food trucks found.</p>
      )}
    </div>
  );
};

export default App;