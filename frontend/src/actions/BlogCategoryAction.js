import axios from "axios";
import {
  BLOG_CATEGORY_REQUEST,
  BLOG_CATEGORY_SUCCESS,
  BLOG_CATEGORY_FAILED,
  CATEGORY_CLEAR_ERROR,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILED,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_FAILED,
  DELETE_CATEGORY_RESET,
  BLOG_SINGLE_CATEGORY_REQUEST,
  BLOG_SINGLE_CATEGORY_SUCCESS,
  BLOG_SINGLE_CATEGORY_FAILED,
} from "../constants/BlogCategoryConstant";
import {
  UPDATE_BLOG_POST_FAILED,
  UPDATE_BLOG_POST_SUCCESS,
} from "../constants/BlogPostConstants";

export const GetBlogCategory = () => async (dispatch) => {
  try {
    console.log("call");

    dispatch({ type: BLOG_CATEGORY_REQUEST });
    const { data } = await axios.get("/api/v1/blog/all-categore");

    dispatch({
      type: BLOG_CATEGORY_SUCCESS,
      payload: data.allCategores,
    });
  } catch (error) {
    dispatch({
      type: BLOG_CATEGORY_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const GetBlogSingleCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_SINGLE_CATEGORY_REQUEST });
    const { data } = await axios.get(`/api/v1/blog/single-categore/${id}`);

    dispatch({
      type: BLOG_SINGLE_CATEGORY_SUCCESS,
      payload: data.Category,
    });
  } catch (error) {
    dispatch({
      type: BLOG_SINGLE_CATEGORY_FAILED,
      payload: error.response.data.message,
    });
  }
};

// create category

export const CreatePostCategory =
  (
    name,
    title,
    description,
    slug,
    seotitle,
    keyword,
    metadec
    // metalink
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_CATEGORY_REQUEST });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("seotitle", seotitle);
      formData.append("keyword", keyword);
      formData.append("metadec", metadec);
      // formData.append("metalink", metalink);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/blog/create/categore",
        formData,
        config
      );
      console.log(data);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_CATEGORY_FAILED,
        payload: error.response.data.message,
      });
    }
  };

// DELETE CATEGORY

export const DeletePostCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    const { data } = await axios.delete(`/api/v1/blog/update/categore/${id}`);
    console.log(data);
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAILED,
      payload: error.response.data.message,
    });
  }
};

//UPDATE BLOG CATEGORY

export const UpdateBlogCategory =
  (id,name, slug, title, description, seotitle, keyword, metadec) => async (dispatch) => {
   
    try {  
      dispatch({ type: DELETE_CATEGORY_REQUEST });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("seotitle", seotitle);
      formData.append("keyword", keyword);
      formData.append("metadec", metadec);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/v1/blog/update/categore/${id}`,
        formData,
        config
      );
      dispatch({ type: UPDATE_BLOG_POST_SUCCESS, payload: data.updatedCategory
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BLOG_POST_FAILED,
        payload: error.response.data.message,
      });
    }
  };

export const ClearError = () => async (dispatch) => {
  dispatch({ type: CATEGORY_CLEAR_ERROR });
};
