import { useEffect, useState } from "react";
import styles from "./App.module.css";
import SearchForm from "./components/SearchForm";
import axios from "axios";
import SpeciesList from "./components/SpeciesList";
import InfiniteScroll from "react-infinite-scroll-component";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/species`;

export default function App() {
  // State variables to manage species data, current page, and loading status
  const [species, setSpecies] = useState([]); // Holds the list of species
  const [page, setPage] = useState(0); // Tracks the current page number
  const [hasMore, setHasMore] = useState(true); // Indicates whether there are more species to load
  const [textSearch, setTextSearch] = useState(''); // Holds the text search query
  const [typeSearch, setTypeSearch] = useState(''); // Holds the type search query

  useEffect(() => {
    // Fetch species data whenever the page or search parameters change
    fetchSpecies(textSearch, typeSearch, page);
  }, [page, textSearch, typeSearch]);

  async function fetchSpecies(textSearch, typeSearch, page) {
    try {
      // Constructing query parameters
      const params = {
        page: page,
        resultsPerPage: 10,
      };

      // Adding search parameters if provided
      if (textSearch) {
        params.text = textSearch;
      }
      if (typeSearch) {
        params.type = typeSearch;
      }

      // Fetching species data from the API
      const response = await axios.get(BASE_URL, { params });

      // Handling species data based on whether it's the first page or subsequent pages
      if (page === 0) {
        // Resetting species list if it's the first page
        setSpecies(response.data);
      } else {
        // Appending new species to the existing list
        setSpecies((prevSpecies) => [...prevSpecies, ...response.data]);
      }

      // Updating the 'hasMore' state based on whether there are more results
      setHasMore(response.data.length > 0);
    } catch (error) {
      // Handling errors if any occur during fetching
      console.error("Error fetching species:", error);
    }
  }

  function handleSearch(textSearch, typeSearch) {
    // Update search parameters
    setTextSearch(textSearch);
    setTypeSearch(typeSearch);

    // Resetting species list and page number
    setSpecies([]);
    setPage(0); // Resetting the page number will trigger a fetch for the new search parameters
  }

  function loadMoreSpecies() {
    // Incrementing the page number to load the next page of species
    setPage(prevPage => prevPage + 1);
  }

  // JSX structure for the main application
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Pokedex</h1>
      <h2 className={styles.sectionTitle}>Search</h2>
      {/* Rendering the search form component */}
      <SearchForm onSearch={handleSearch} />
      <h2 className={styles.sectionTitle}>Matches (scroll to load more)</h2>
      {/* Infinite scroll component to dynamically load more species */}
      <InfiniteScroll
        dataLength={species.length} // Current length of the species list
        next={loadMoreSpecies} // Function to call when reaching the bottom
        hasMore={hasMore} // Boolean indicating whether there are more species to load
        scrollThreshold={0.99} // Trigger loading when the user scrolls to 99% of the bottom
      >
        {/* Rendering the species list component */}
        <SpeciesList species={species} />
      </InfiniteScroll>
    </div>
  );
}
