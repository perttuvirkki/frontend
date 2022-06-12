import React, { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  BarChart,
  Tooltip,
  CartesianGrid,
  Bar,
  Legend,
  Label,
} from "recharts";
import { _ } from "lodash";

export default function Charts() {
  const [training, setTraining] = useState([]);
  const _ = require("lodash");
  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((res) => res.json())
      .then((rawData) => setTraining(rawData));
  };

  useEffect(() => fetchData(), []);

  const data = _(training)
    .groupBy("activity")
    .map((training, i) => ({
      name: i,
      training: _.sumBy(training, "duration"),
    }))
    .value();

  return (
    <div
      className="ag-theme-material"
      style={{
        height: "700px",
        width: "80%",
        margin: "auto",
      }}
    >
      <BarChart
        style={{ margin: "auto" }}
        width={500}
        height={350}
        margin={{ top: 15 }}
        data={data}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis>
          <Label
            style={{
              textAnchor: "middle",
              fontSize: "100%",
            }}
            angle={270}
            value={"Total minutes"}
          />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="training" />
      </BarChart>
    </div>
  );
}
