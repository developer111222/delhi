import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogPostCards from "../allblog/BlogPostCards";
import { GetBlogPost, ClearError } from "../../../actions/BlogPostAction";
import { GetBlogCategory } from "../../../actions/BlogCategoryAction";
import "../allblog/Blog.css";
import Loader from "../../layout/loader/Loader";
import BlogCategory from "../allblog/BlogCategory";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
    const alert = useAlert();
    const [catId,setCatId] = useState('');
  const { loading, blogCount, resultPerpage, blog, error } = useSelector(
    (state) => state.allBlog
  );


  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    dispatch(GetBlogPost(currentPage,catId));
    dispatch(GetBlogCategory());
  }, [dispatch, alert, error, currentPage,catId]);
  return (
    <>
      <div className="cont-area-h">
        <div className="cont-row">
          <div className="blog-left">
            <div id="blog-cards" className="blog-row">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {blog &&
                    blog.map((item, i) => (
                      <BlogPostCards key={i} item={item} />
                    ))}
                </>
              )}
            </div>
          </div>
          <div className="blog-right">
            <div className="right-row">
              <h2>Blog category</h2>
              <BlogCategory setCatId={setCatId}/>
            </div>
          </div>
        </div>
        {resultPerpage < blogCount && (
          <div className="pagination-box">
            <Pagination
              totalItemsCount={blogCount}
              activePage={currentPage}
              itemsCountPerPage={resultPerpage}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-items"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
