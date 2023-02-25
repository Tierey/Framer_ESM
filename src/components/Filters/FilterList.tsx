import "./style.css";
import Filter from "./Filter";
import { Filters } from "/store";
function FilterList(props) {
  let filter = Filters.filter();
  return (
    <div className="div">
      {Object.keys(filter).map((variant) => {
        return (
          <div key={variant}>
            <Filter variant={variant} />
          </div>
        );
      })}
    </div>
  );
}

export default FilterList;
