import React from "react";
import "./Card.css";
import { Button } from "reactstrap";


const JobCard = ({ id, title, salary, equity, companyName, apply, applied }) => {


  const handleClick = (e) => {
    e.preventDefault();
    apply(id);
    e.target.innerText = "Applied";
    e.target.disabled = true;
  }

  return (
    <div className="Card shadow p-3">
      <h2>{title}</h2>
      <p>{companyName}</p>
      {salary && <p>Salary: {salary}</p>}
      {equity && <p>Equity: {equity}</p>}
      {applied
        ? <Button color="danger" className="btn-lg m-2" disabled>
          Applied
        </Button>
        : <Button onClick={handleClick} color="danger" className="btn-lg m-2">
          Apply
        </Button>}
    </div>
  );
}

export default JobCard;