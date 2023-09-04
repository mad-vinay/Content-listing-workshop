// LazyLoadList.js
import React from "react";
import "./style.css";

const LazyLoadList = ({ listData, isLoading, filteredData }) => {
  let data = filteredData ? filteredData : listData;
  function getImgUrl(item) {
    let posterImg = item["poster-image"];
    let imageUrl = "";
    if (posterImg === "posterthatismissing.jpg") {
      imageUrl = `https://test.create.diagnal.com/images/placeholder_for_missing_posters.png`;
    } else {
      imageUrl = `https://test.create.diagnal.com/images/${posterImg}`;
    }
    return imageUrl;
  }
  return (
    <div>
      <div className="row">
        {data.map((item, index) => (
          <div key={index} className="col-4">
            <img src={getImgUrl(item)} alt="Tile poster" />
            <p className="text-left">{item.name}</p>
          </div>
        ))}
      </div>
      {isLoading && <div className="loaderStyle">Loading...</div>}
    </div>
  );
};

export default LazyLoadList;
