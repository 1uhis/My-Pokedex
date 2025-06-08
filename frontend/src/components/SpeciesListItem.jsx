import styles from "./SpeciesListItem.module.css";

/**
 * Displays info about a particular species in a <li>.
 */
export default function SpeciesListItem({ species }) {
  const { name, dexNumber, dexEntry, image } = species;

  return (
    <li className={styles.speciesListItem}>
      <img src={image} alt={name} />
      <div className={styles.speciesInfo}>
        <h3>
          {name} <em>(#{dexNumber})</em>
        </h3>
        <p>{dexEntry}</p>
      </div>
    </li>
  );
}
