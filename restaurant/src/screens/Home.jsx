import axios from "axios";
import React, { useEffect, useState, createRef } from "react";
import Select from "react-select";
import Category from "../components/Category";
import Loading from "../components/loading/Loading";
import { getSelectOptions } from "../helpers/functions";
import { getCategories } from "../network/network";
import "./Home.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getDataIndexes = () => {
    let arr = [];
    data?.map((item, index) => arr.push(index));

    return arr;
  };

  const getCategoriesIndex = id => {
    let res = null;
    data?.forEach((item, index) => {
      if (id === item?._id) {
        res = index;
      }
    });

    return res;
  };

  const refs = getDataIndexes().reduce((acc, value) => {
    acc[value] = createRef();
    return acc;
  }, {});

  //
  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  //scroll to the index of selected category whenever the selectedOption variable changes
  useEffect(() => {
    let i = getCategoriesIndex(selectedOption);
    refs[i]?.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [selectedOption]);

  const handleChange = selected => {
    setSelectedOption(selected.value);
  };
  const fetchData = () => {
    getCategories()
    .then(res => {
      setData(res.data.data);
      setIsLoading(false);
    })
    .catch(err => {
      setIsLoading(false);
      console.log(err);
    });
  };
  return (
    <div className="home-section">
      {console.log(refs)}
      <div className="home-section-inner">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="home-section-header">
              <div className="home-section-header-title">Choose Category</div>
              <div>
                <Select
                  onChange={handleChange}
                  options={getSelectOptions(data)}
                />
              </div>
            </div>
            <div className="home-section-data">
              {data?.length > 0 &&
                data?.map((cat, index) => (
                  <Category ref={refs[index]} cat={cat} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
