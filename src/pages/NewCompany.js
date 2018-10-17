import React from "react";
import NewCompany from './NewCompany';

export default ({ comps }) => (
  <div className="divTableBody"> 
    {comps.map(result => {
      return (
        <div className="divTableRow" key={result.compid}>
						<div className="divTableCell">
              <img src="https://placeimg.com/128/128/tech" className="h25 img-fluid rounded-circle" />
              &nbsp;&nbsp;&nbsp;&nbsp; 
              {result.name.substr(0, 1).toUpperCase()}{result.name.substr(1)}
						</div>
						<div className="divTableCell">
              <img src="https://placeimg.com/128/128/people" className="h25 img-fluid rounded-circle" />
              &nbsp;&nbsp;&nbsp;&nbsp;   
              {result.admin_firstname.substr(0, 1).toUpperCase()}{result.admin_firstname.substr(1)} {result.admin_lastname.substr(0, 1).toUpperCase()}{result.admin_lastname.substr(1)}
						</div>
						<div className="divTableCell">{result.admin_mobile}</div>
						<div className="divTableCell">{result.admin_email}</div>
						<div className="divTableCell text-center">
              <span className="fa fa-pencil text-warning addcompany" id={result.compid} onClick={this.handleClickOpenEdit('body')}></span>
						</div>
					</div>
      );
    })}
  </div>
);
