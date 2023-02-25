import "./style.css";
import { Filters } from "/store";
import { motion } from "framer-motion";
import { useState } from "react";
function Swatch({ click, name }) {
  let [g, s] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <div
      onClick={(e) => {
        s((x) => !x);
        click(e, name);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "all .35s ease",
        color: isHover ? "limegreen" : "white",
        borderColor: g ? "limegreen" : "coral"
      }}
    >
      {name}
    </div>
  );
}

function Filter(props): any {
  let filters = Filters.filters();
  let filter = Filters.filter();
  let setFilter = Filters.setFilter();

  const name = props.variant || "color";
  const items = filters[name];
  const setter = (value) => setFilter({ name, value });
  const getter = filter[name];

  const click = ({ target }, value) => {
    let result = [...getter];
    if (getter.includes(value)) {
      result = result.filter((x) => x != value);
    } else {
      result.push(value);
    }
    setter(result);
  };

  let selected = getter.map((x) => `${x} `);

  return (
    <div>
      <div>
        {name} : [{" "}
        <span style={{ color: "coral" }}>
          {selected.length ? selected : "all "}
        </span>
        ]
      </div>
      <div>
        {items.map((item) => (
          <Swatch key={item} click={click} name={item} />
        ))}
      </div>
    </div>
  );
}
Filter.defaultProps = {
  variant: "color"
};
export default Filter;
