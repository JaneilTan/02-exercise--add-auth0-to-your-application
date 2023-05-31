import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AddProperty.css";

const Create = () => {
  const [askingPrice, setAskingPrice] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const property = {
      askingPrice: Number(askingPrice),
      description,
      address,
      title,
      img,
    };

    const response = await fetch("http://localhost:5001/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    });

    if (!response.ok) {
      setIsError(true);
      setErrorStatus(response.status);
    } else {
      setIsLoading(false);
      navigate("/");
    }
  };

  if (isError) {
    return (
      <>
        <p className="no-properties">
          Error creating a property (error status {errorStatus})
        </p>
        <Link to="/" className="button">
          Return to properties
        </Link>
      </>
    );
  }

  return (
    <>
      <h1>Add a new property</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            className="form-input"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            required
          />
        </p>
        <p>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            className="form-input"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            required
          />
        </p>
        <p>
          <label htmlFor="askingPrice">Asking price</label>
          <input
            type="number"
            id="askingPrice"
            className="form-input"
            value={askingPrice}
            onChange={(event) => {
              setAskingPrice(event.target.value);
            }}
            required
          />
        </p>
        <p>
          <label htmlFor="img">Image url</label>
          <input
            type="text"
            id="img"
            className="form-input"
            value={img}
            placeholder="https://placekitten.com/500/500"
            onChange={(event) => {
              setImg(event.target.value);
            }}
            required
          />
        </p>
        <button className="submit-btn" disabled={isLoading}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Create;
