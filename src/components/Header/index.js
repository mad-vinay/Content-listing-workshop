import React from "react";
import closeImage from "../../assets/close.png";
import "./style.css";

export default function Header({
  enableFilter,
  hasScrolled,
  handleCloseBtnClick,
  handleFilter,
  handleInputChange,
}) {
  const apiUrl = "https://test.create.diagnal.com";
  return (
    <section
      className={`${enableFilter ? "filterEnabled" : ""} ${
        hasScrolled > 0 ? "hasScroll" : ""
      } outer-wrapper`}
    >
      <div className="w-100 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={`${apiUrl}/images/Back.png`}
            className="backIcon"
            alt="back icon"
            style={{ width: "20px" }}
          />
          <span className="headingStyle">Romantic Comedy</span>
        </div>
        {enableFilter ? (
          <img
            src={closeImage}
            className="closeIcon"
            alt="close icon"
            style={{ width: "18px", cursor: "pointer" }}
            onClick={handleCloseBtnClick}
          />
        ) : (
          <img
            src={`${apiUrl}/images/search.png`}
            className="searchIcon"
            alt="search icon"
            style={{ width: "25px", cursor: "pointer" }}
            onClick={handleFilter}
          />
        )}
      </div>
      {enableFilter && (
        <input
          type="text"
          className="inputStyle w-100 mt-2"
          placeholder="Enter your search term..."
          onChange={(e) => handleInputChange(e.target.value)}
        />
      )}
    </section>
  );
}
