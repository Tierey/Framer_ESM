import "./style.css";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
export const Product = (props) => {
  const {
    model,
    color,
    //id, link, photo, tags,
    alive
  } = props;
  const { count, size, brand, price, rating, gender } = props;

  let data = { brand, price, rating, gender, size };
  let table = (
    <table
      className="table table-bordered table-hover table-condensed"
      style={{
        border: "1px solid coral",
        width: "100%",
        fontSize: "14px"
      }}
    >
      <thead>
        <tr>
          {Object.keys(data).map((k, i) => (
            <th
              key={k}
              style={{
                border: "1px solid coral",
                textAlign: "center",
                padding: "3px 5px"
              }}
              title={`Field #${i + 1}`}
            >
              {k}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {Object.entries(data).map(([k, v], i) => (
            <td
              key={k}
              style={{
                border: "1px solid coral",
                textAlign: "center",
                padding: "3px 5px"
              }}
              title={`Field #${i + 1}`}
            >
              {k === "gender"
                ? v.length > 1
                  ? "all"
                  : v.toString()
                : v.toString()}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );

  const controls = useAnimationControls();
  useEffect(() => {
    (async (alive) => {
      if (!alive) {
        await controls.start({
          opacity: 0,
          rotateX: 90,
          transition: {
            type: "easeOut"
          }
        });
        await controls.start({
          height: 0,
          transition: {
            type: "easeOut"
          }
        });
      } else {
        await controls.start({
          height: "auto",
          transition: {
            type: "easeIn"
          }
        });
        await controls.start({
          opacity: 1,
          rotateX: 0,
          transition: {
            type: "easeIn"
          }
        });
      }
    })(alive);
  }, [controls, alive]);
  return (
    <motion.div animate={controls}>
      <div className="topline">
        {model}
        <div className="topline2">
          {color.map((c, i) => {
            let exist = true;
            count.forEach(({ color, count }) => {
              if (color === c && !count) exist = false;
            });
            return (
              <span className="swatch" key={i} style={{ background: c }}>
                {exist ? "" : "x"}
              </span>
            );
          })}
        </div>
      </div>
      <div>{table}</div>
    </motion.div>
  );
};
