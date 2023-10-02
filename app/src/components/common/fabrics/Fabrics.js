import React from "react";
import Fabrics from "./fabrics.json";

function fabrics() {
  return (
    <div>
      {Fabrics &&
        Fabrics.map((fabric) => {
          return (
            <div>
              <img src={fabric.image} />
            </div>
          );
        })}
    </div>
  );
}

export default fabrics;
