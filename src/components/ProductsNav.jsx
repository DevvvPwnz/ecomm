import React from "react";
import { Link } from "react-router-dom";

function ProductsNav({ sortBy, activeSort, sortCategory }) {
  const [sortActive, setsortActive] = React.useState(false);
  const [brandsCategory,setBrandsCategory] = React.useState([])
  const sortRef = React.useRef();

  React.useEffect(()=>{
    const brands = sortBy.map((item) => item.brand)
    setBrandsCategory([...new Set(brands)]) 
   

  },[sortBy])
  
  const openPopup = () => {
    setsortActive(!sortActive);
  };

  const onActive = (name) => {
    sortCategory(name);
    setsortActive(false);
  };

  const showAll = () => {
    sortCategory(null);
    setsortActive(false);
  };

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(sortRef.current)) {
      setsortActive(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="products__nav">
      <Link to="/add_item">
        <div className="products__btn">
          Add New Item <i className="bx bx-plus"></i>
        </div>
      </Link>
      <div className="products__sort" ref={sortRef}>
        <div className="products__sort-btn" onClick={openPopup}>
          Sort:
          <i
            className={
              sortActive
                ? "bx bxs-chevron-down products__sort-icon active"
                : "bx bxs-chevron-down products__sort-icon"
            }
          ></i>
          <div className="products__select">
            {activeSort ? activeSort : "SELECT"}
          </div>
        </div>

        <div className="products__body">
          <ul
            className={
              sortActive
                ? "products__sort-items active"
                : "products__sort-items"
            }
          >
            <li
              className={
                !activeSort
                  ? "products__sort-item active"
                  : "products__sort-item"
              }
              onClick={showAll}
            >
              All
            </li>
            {brandsCategory &&
              brandsCategory.map((item,index) => (
                <li
                  className={
                    activeSort === item
                      ? "products__sort-item active"
                      : "products__sort-item"
                  }
                  key={index}
                  onClick={() => onActive(item)}
                >
                  {item}
                  <div className="products__sort-icon"></div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductsNav;
