import SpeciesListItem from "./SpeciesListItem";
import styles from "./SpeciesList.module.css";

/**
 * Displays the given array of species as an <ul> with a number of <SpeciesListItem>s.
 */
export default function SpeciesList({ species }) {
  return (
    <ul>
      {species.map((s) => (
        <SpeciesListItem key={s.dexNumber} species={s} />
      ))}
    </ul>
  );
}
