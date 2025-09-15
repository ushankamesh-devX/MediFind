import { useState, useCallback } from 'react';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const sessionToken = localStorage.getItem('sessionToken');

      const defaultHeaders = {
        'Content-Type': 'application/json',
      };

      if (sessionToken) {
        defaultHeaders.Authorization = `Bearer ${sessionToken}`;
      }

      const response = await fetch(`http://localhost:4000${url}`, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return { success: true, data };
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((url) => makeRequest(url), [makeRequest]);

  const post = useCallback((url, data) =>
    makeRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    }), [makeRequest]);

  const put = useCallback((url, data) =>
    makeRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    }), [makeRequest]);

  const del = useCallback((url) =>
    makeRequest(url, {
      method: 'DELETE',
    }), [makeRequest]);

  return {
    loading,
    error,
    get,
    post,
    put,
    delete: del,
  };
};

export default useApi;