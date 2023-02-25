import "./style.css";
import { useState } from "react";
import { Product } from "./Product";
import { Products, Filters } from "/store";

export default function ProductList(props): any {
  const [name, setInputNmae] = useState("");
  let Filter = Products.Filter();
  let isRender = Products.isRender();
  let filter = Filters.filter();
  let products1 = [];
  let products = Filter({ filter, name });

  console.log(isRender);

  products = products.map((product: any) => {
    return (
      <li key={product.id}>
        <Product {...product} />
      </li>
    );
  });

  return (
    <div style={{ color: "white", paddingTop: "5px" }}>
      <input
        placeholder="Nmae"
        style={{ width: "100%", fontSize: "20px" }}
        onChange={({ target: { value } }) => setInputNmae(value)}
        value={name}
      />
      <hr />
      <ul>
        {products}
        <div style={{ textAlign: "center" }}>
          {" "}
          {isRender() ? "" : "No results"}{" "}
        </div>
      </ul>
    </div>
  );
}
