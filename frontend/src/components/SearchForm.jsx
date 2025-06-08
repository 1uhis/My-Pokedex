import { useState, useEffect } from "react";
import styles from "./SearchForm.module.css";
import axios from "axios";

const URL = `${import.meta.env.VITE_API_BASE_URL}/types`;

/**
 * A search form allowing users to specify a text-search and type-search parameter. On submitting the
 * form, the onSearch event function will be called with these parameters (supplying null if the parameters
 * are empty strings).
 *
 * Loads the valid Pokemon types from the backend.
 */
export default function SearchForm({ onSearch }) {
  const [textSearch, setTextSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [types, setTypes] = useState([]);

  // Load types from the backend when the component first renders.
  useEffect(() => {
    axios.get(URL).then((response) => setTypes(response.data));
  }, []);

  /**
   * Handles form submission by calling onSearch with the textSearch and typeSearch values, unless they are
   * empty strings in which case null will be used instead.
   */
  function handleSubmit(e) {
    e.preventDefault();
    onSearch(textSearch.trim().length > 0 ? textSearch : null, typeSearch.trim().length > 0 ? typeSearch : null);
  }

  return (
    <div className={styles.searchFormContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="search">Text search:</label>
          <input className={styles.input} id="search" type="text" value={textSearch} onChange={(e) => setTextSearch(e.target.value)} placeholder="Search for Pokemon names or Pokedex text" />
        </div>
        <div className={styles.formRow}>
          <label className={styles.label} htmlFor="types">Type search:</label>
          <select className={styles.select} id="types" value={typeSearch} onChange={(e) => setTypeSearch(e.target.value)}>
            <option value={""}>Any</option>
            {types.map((t) => (
              <option key={t} value={t} className={styles.option}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <button className={styles.button} type="submit">Search</button>
      </form>
    </div>
  );
}
