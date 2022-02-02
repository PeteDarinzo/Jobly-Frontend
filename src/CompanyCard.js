import React from "react";
import "./Card.css";


const CompanyCard = ({ name, description }) => {

  return (
    <div className="Card shadow p-3">
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );

}

export default CompanyCard;