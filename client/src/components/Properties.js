import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Properties.css";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5001/properties");
      const data = await response.json();
      setProperties(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (properties.length < 1) {
    return (
      <>
        <p className="no-properties">No properties found</p>
        <Link to="/add" className="button">
          Add a new property
        </Link>
      </>
    );
  }

  return (
    <>
      <h1>Properties</h1>
      <ul className="property-list">
        {properties.map((property) => {
          const askingPrice = property.askingPrice.toLocaleString("en-NZ", {
            style: "currency",
            currency: "NZD",
          });
          return (
            <li className="property" key={property.id}>
              <img src={property.img} alt={property.address} />
              <div className="property-text-container">
                <h2 className="property-title">{property.title}</h2>
                <p className="property-address">{property.address}</p>
                <p className="property-price">{askingPrice}</p>
                <p className="property-description">{property.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Properties;
