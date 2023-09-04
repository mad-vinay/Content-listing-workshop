import React, { useState, useEffect } from "react";
import axios from "axios";
import LazyLoadList from "../components/LazyLoadList";
import Header from "../components/Header";

export default function ListView() {
  const apiUrl = "https://test.create.diagnal.com";
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [enableFilter, setFilter] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  async function fetchData() {
    if (page > 3) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiUrl}/data/page${page}.json`);
      const newData = response.data.page["content-items"].content;
      setData((prevData) => [...prevData, ...newData]);
      setPage(page + 1);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);

      if (!isLoading && !enableFilter) {
        // Load more data when the user is near the bottom of the page
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200
        ) {
          fetchData();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, isLoading, enableFilter]);

  useEffect(() => {
    // Load initial data when the component mounts
    fetchData();
  }, []);

  // handle filter
  function handleInputChange(value) {
    let filteredArray = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredArray);
  }

  function handleCloseBtnClick() {
    setFilter(false);
    setFilteredData(null);
  }
  return (
    <div>
      <div className={`${enableFilter ? "containerWithFilter" : ""} container`}>
        <Header
          enableFilter={enableFilter}
          hasScrolled={hasScrolled}
          handleInputChange={handleInputChange}
          handleFilter={() => setFilter(true)}
          handleCloseBtnClick={handleCloseBtnClick}
        />
        <LazyLoadList
          listData={data}
          isLoading={isLoading}
          filteredData={filteredData}
        />
      </div>
    </div>
  );
}
