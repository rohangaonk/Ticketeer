import { useState, useEffect } from "react";

function useDebounce(val: string, timeout = 500) {
  const [debouncedVal, setDebouncedVal] = useState(val);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(val);
    }, timeout);

    return () => clearTimeout(timer);
  });

  return debouncedVal;
}

export default useDebounce;
