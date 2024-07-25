import React, { useEffect, useState } from "react";
import "./Read.style.css"; // Ensure this matches the actual file name
import { useNavigate, Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState("");

  const Navigate = useNavigate()

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:4000");
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (error) {
      setError("Failed to fetch data: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return; // Exit if the user cancels

    try {
      const response = await fetch(`http://localhost:4000/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setData((prevData) => prevData.filter((ele) => ele._id !== id)); // Remove the deleted item from the state
        setError("Deleted successfully");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      setError("Failed to delete item: " + error.message);
    }
  };

const handleAdd  = () =>{
  Navigate("/")
}

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-5">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {data.length > 0 ? ( // Check if data has items
        <>
          <div className="card-container">
            {data.map((ele) => (
              <div className="card" key={ele._id}>
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-text">{ele.age}</p>
                  <Link to = {`/${ele._id}`} className="card-link">
                    Edit
                  </Link>
                  <a
                    href="#"
                    className="card-link"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default anchor behavior
                      handleDelete(ele._id);
                    }}
                  >
                    Delete
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button type="button" className="button" onClick={handleAdd}>
              <span className="button__text">Add Item</span>
              <span className="button__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="currentColor"
                  height="24"
                  fill="none"
                  className="svg"
                >
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Read;
