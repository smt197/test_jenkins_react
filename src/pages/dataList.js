import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

const DataList = ({ tableName }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          setError(null);
          
          try {
              const { data: fetchedData, error: fetchError } = await supabase
              .from(tableName)
              .select("*"); 

              console.log("Fetched Data:", fetchedData);
              console.log("Fetch Error:", fetchError);

        if (fetchError) {
          throw fetchError;
        }

        setData(fetchedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Data from {tableName}</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
            {item.title} - {item.description} - {item.position}
          </li>
          ))}
        </ul>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default DataList;
