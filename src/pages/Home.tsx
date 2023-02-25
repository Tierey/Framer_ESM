import "./style.css";
import ProductList from "/src/components/Products/ProductList.tsx";
import FilterList from "/src/components/Filters/FilterList.tsx";
export default function Home() {
  return (
    <div className="App">
      <div className="page products-page">
        <div className="filters">
          <h3>Filters</h3>
          <FilterList />
        </div>
        <div className="products">
          <h3>Products</h3>
          <ProductList />
        </div>
      </div>
    </div>
  );
}
