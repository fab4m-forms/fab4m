import React from "react";
import Widgets from "./Widgets";
import Validators from "./Validators";
import Multiple from "./Multiple";
import Rules from "./Rules";
import Schema from "./Schema";

import "@fab4m/fab4m/css/basic/basic.css";

export default function Complex() {
  return (
    <div className="container">
      <Widgets />
      <Multiple />
      <Validators />
      <Rules />
      <Schema />
    </div>
  );
}
