import React from "react";
import { NavLink } from "react-router-dom";
import LazyLoadImages from "../../../layout/lazyload/LazyLoadImages";
import Currency from "../../../layout/currency/Currency";
import { Rating } from "@material-ui/lab";

const Cards2 = ({ product }) => {
  const options = {
    value: product.ratings,
    precision: 0.5,
    size: "medium",
    readOnly: true,
  };

  return (
    <div className="card-containor">
      <div className="product-list-sm">
        <div className="list-sm-img">
          <LazyLoadImages
            product={product && product.imageId && product.imageId[0]}
          />
        </div>
        <div className="list-sm-title">
          <h3>
            <NavLink to={"/"}> {product.name}</NavLink>
          </h3>
          <div className="list-sm-price">
            <p>
              <span>
                <Currency price={product.price} />
              </span>
              -
              <span>
                <Currency price={product.maxprice} />
              </span>
            </p>
          </div>
          <div className="list-sm-rev">
            <Rating {...options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards2;
