import {useState, useEffect, useRef} from 'react';

// Simple in-memory cache
const cache = new Map();

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  
  const { enableCache = true, cacheTime = 5 * 60 * 1000 } = options; // 5 minutes default

  useEffect(() => {
    if (!url) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check cache first
        if (enableCache && cache.has(url)) {
          const cachedData = cache.get(url);
          const isExpired = Date.now() - cachedData.timestamp > cacheTime;
          
          if (!isExpired) {
            setData(cachedData.data);
            setIsLoading(false);
            return;
          }
        }

        // Cancel previous request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        const response = await fetch(url, {
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        
        // Cache the response
        if (enableCache) {
          cache.set(url, {
            data: responseData,
            timestamp: Date.now(),
          });
        }
        
        setData(responseData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error);
          console.error('API fetch error:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, enableCache, cacheTime]);

  const refetch = () => {
    if (enableCache && cache.has(url)) {
      cache.delete(url);
    }
    setIsLoading(true);
    setError(null);
  };

  return { data, isLoading, error, refetch };
};

export default useApi;
