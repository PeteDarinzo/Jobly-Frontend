import { useState, useEffect } from "react";

const useLocalStorage = (key, data = {}) => {

  const [localData, setLocalData] = useState({});

  /** on mount, retreive data from local storage if present, otherwise establish stored obj */
  useEffect(() => {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      setLocalData(() => JSON.parse(localStorage.getItem(key)));
    }
  }, []);

  /** retrieve data from local storage */
  const getData = (key) => {
    setLocalData(() => JSON.parse(localStorage.getItem(key)));
  }

  /** set data in local storage */
  const setData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  }

  return [localData, getData, setData];
}

export default useLocalStorage;