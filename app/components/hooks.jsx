"use client";
import { useEffect, useState } from "react";

const useDebounce = (value) => {
  const [debounceValue, setdebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setdebounceValue(value);
    }, 2000);


    return () => clearTimeout(timeout);

    
  }, [value]);

  return debounceValue;
};

export default useDebounce;
