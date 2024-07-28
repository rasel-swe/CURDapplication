import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Update.style.css";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [data, setData] = useState({ name: "", email: "", age: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/${id}`);
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

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setSuccess("Updated successfully");
        setTimeout(() => {
          setSuccess("");
          navigate("/read"); // Navigate to home page after successful update
        }, 2000);
      }
    } catch (error) {
      setError("Failed to update item: " + error.message);
    }
  };

  return (
    <div className="container2 my-5">
      <h2 className="text-center">Update The Data</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={data.age}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
