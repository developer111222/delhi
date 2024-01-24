import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Blog.css";
import Loader from "../../layout/loader/Loader";

const BlogCategory = ({ setCatId }) => {
  const { loading, category } = useSelector((state) => state.allBlogCategore);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {category &&
            category.map((item, i) => (
              <div className="right-category" key={i}>
                <NavLink
                  onClick={() => setCatId(item._id)}
                  to={`/blog/category/${item.slug}`}
                >
                  <p>{item.name}</p>
                </NavLink>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default BlogCategory;
