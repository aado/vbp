import React from "react";
import "./ChatList.css";

export default ({ comps }) => (
  <ul>
    {comps.map(result => {
  console.log(result);
      return (
        <div>
          <div className="row show-grid">
            <div className="col-xs-12">
              
              <div className="chatMessage">
                <div key={result.id} className="box">
                  <p>
                    <strong>{result.name}</strong>
                  </p>
                  {/* <p>{result.firstname}</p> */}
                </div>
                {/* <div className="imageHolder">
                <img src={avatar} className="img-responsive avatar" alt="logo" />
              </div> */}
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </ul>
);
