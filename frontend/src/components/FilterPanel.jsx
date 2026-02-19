const FilterPanel = ({ setCategory }) => {
  return (
    <div>
      <h3>Filters</h3>

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="ALL">All</option>
        <option value="Collision Alert">Collision Alert</option>
      </select>
    </div>
  );
};

export default FilterPanel;
