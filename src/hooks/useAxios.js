import { useState } from "react";
import uuid from "uuid";
import axios from "axios";

const useAxios = (baseURL, filterFunc) => {
    const [dataArr, setData] = useState([]);
    const addToDataArr = async (endpoint) => {
      const response = await axios.get(
         endpoint ? baseURL + endpoint : baseURL
      );
      const cleanData = filterFunc(response.data)
      setData(data => {
        return [...data, { ...cleanData, id: uuid() }]});
    };
    const clearDataArr = () => {
        setData([]);
    }

    return [dataArr, addToDataArr, clearDataArr]
}

export default useAxios;