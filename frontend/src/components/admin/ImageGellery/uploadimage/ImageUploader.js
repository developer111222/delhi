import React from "react";
import { Aside } from "../../aside/Aside";
import { NavLink } from "react-router-dom";
import { ImageUploaderForm } from "./ImageUploaderForm";
const ImageUploader = () => {
  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                <div className="all-img-cont">
                  <div className="admin-img-title">
                    <div className="gallery-header">
                      <div className="page-title-action">
                        <div className="all-post-heading">
                          <h1>
                            Upload Image
                            <span>
                              <NavLink to={"/admin/upload/library"}>
                                Open Image Gallery
                              </NavLink>
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <ImageUploaderForm />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
