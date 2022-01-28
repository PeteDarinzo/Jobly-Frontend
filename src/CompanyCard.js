import React from "react";
import "./CompanyCard.css";


const CompanyCard = ({ name, description }) => {

  return (
    <div className="CompanyCard">
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );

}

export default CompanyCard;