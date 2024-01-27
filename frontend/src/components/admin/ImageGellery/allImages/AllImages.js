import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllImages } from "../../../../actions/imageGelleryAction";
import MetaData from "../../../layout/metaData/MetaData";
import { Aside } from "../../aside/Aside";
import "./allImage.css";
import { NavLink } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import ImageAside from "./ImageAside";

const AllImages = () => {
  const dispatch = useDispatch();
  const { loading, images, error } = useSelector(
    (state) => state.selectedImages
  );

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch]);

  return (
    <>
      <MetaData
        title={"Admin all images"}
        content={"Admin all images"}
        keywords={"Admin all images"}
      />

      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <div className="all-img-cont-containor">
                <section className="ad-section">
                  <div className="all-img-cont">
                    <div className="admin-img-title">
                      <div className="gallery-header">
                        <div className="page-title-action">
                          <div className="all-post-heading">
                            <h1>
                              Image Gallery
                              <span>
                                <NavLink to={"/admin/upload/media-new"}>
                                  Add New Media File
                                </NavLink>
                              </span>
                            </h1>
                          </div>
                        </div>
                      </div>
                      {/* <p>No of media {images && images.length}</p> */}
<br></br>
                      <div className="gallery-containor">
                        <ImageGallery />
                      </div>
                    </div>
                  </div>
                </section>
                {images && images.length > 0 ? (
                  <ImageAside images={images} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllImages;
