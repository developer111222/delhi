import React, { useEffect, useMemo, useState } from "react";
import { Aside } from "../../../aside/Aside";
import PostCategoryForm from "../assets/PostCategoryForm";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useActionData, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  UpdateBlogCategory,
  ClearError,
  GetBlogCategory,
  GetBlogSingleCategory,
} from "../../../../../actions/BlogCategoryAction";
import CreateSeo from "../../../seo/create/CreateSeo";
import { UPDATE_CATEGORY_RESET } from "../../../../../constants/BlogCategoryConstant";

const UpdatePostCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();
  const { isUpdate, error: updateError } = useSelector(
    (state) => state.adminUpdateBlogCategory
  );
  const { loading, blogcat, error } = useSelector(
    (state) => state.singleblogcategory
  );
  const [inputValue, setInputValue] = useState({
    name: "",
    slug: "",
    title: "",
    description: "",
  });

  const [seoInputValue, setSeoInputValue] = useState({
    seotitle: "",
    keyword: "",
    metadec: "",
    metalink: "",
  });

  const seoHandler = (e) => {
    const { name, value } = e.target;

    setSeoInputValue({ ...seoInputValue, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!seoInputValue) {
      return alert.error("seoInputValue is undefined or null");
    }
    const { name, slug, title, description } = inputValue;
    const { seotitle, keyword, metadec, metalink } = seoInputValue;
    if (
      // selectedCategoryId.trim() === "" ||
      title.trim() === "" ||
      description.trim() === "" ||
      slug.trim() === "" ||
      seotitle.trim() === "" ||
    //   keyword.trim() === "" ||
      metadec.trim() === ""
      // metalink.trim() === ""
    ) {
      return alert.error("Please fill out all required fields.");
    }

    dispatch(
      UpdateBlogCategory(
        id,
        name,
        slug,
        title,
        description,
        seotitle,
        keyword,
        metadec
      )
    );
  };

  const handelInputValue = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  useMemo(() => {
    dispatch(GetBlogSingleCategory(id));
  }, []);

  useEffect(() => {
    if (blogcat) {
      setInputValue({
        name: blogcat && blogcat.name,
        slug: blogcat && blogcat.slug,
        title: blogcat && blogcat.title,
        description: blogcat && blogcat.description,
      });
      setSeoInputValue({
        seotitle: blogcat.seo && blogcat.seo.metatitle,
        keyword: blogcat.seo && blogcat.seo.keyword,
        metadec: blogcat.seo && blogcat.seo.metadec,
        metalink: blogcat.seo && blogcat.seo.metalink,
      });
    }
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(ClearError());
    }
    if (isUpdate) {
      alert.success("Blog Category Updated successfully");
      navigate("/admin/post/post-category");
      dispatch({ type: UPDATE_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, isUpdate, blogcat, updateError]);

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                <h1>Update PostCategory</h1>
                <div className="form-div">
                  <form onSubmit={submitHandler}>
                    <div className="input-field-area">
                      <label>Name</label>
                      <input
                        type="text"
                        value={inputValue.name}
                        name="name"
                        onChange={handelInputValue}
                      />
                    </div>
                    <div className="input-field-area">
                      <label>Slug</label>
                      <input
                        type="text"
                        value={inputValue.slug}
                        name="slug"
                        onChange={handelInputValue}
                      />
                    </div>

                    <div className="input-field-area">
                      <label>Title</label>
                      <input
                        type="text"
                        value={inputValue.title}
                        name="title"
                        onChange={handelInputValue}
                      />
                    </div>
                    <div className="input-field-area">
                      <label>Description</label>
                      <input
                        type="text"
                        value={inputValue.description}
                        name="description"
                        onChange={handelInputValue}
                      />
                    </div>
                    <div>
                      <h2>SEO</h2>
                      <CreateSeo
                        seoInputValue={seoInputValue}
                        seoHandler={seoHandler}
                        submitHandler={submitHandler}
                      />
                    </div>
                    <div>
                      <Button type="submit">Submit</Button>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePostCategory;
