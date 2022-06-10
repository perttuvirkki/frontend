import { Scheduler } from "@aldabil/react-scheduler";
import React, { useState, useEffect } from "react";
export default function Calendar() {
  const [rowData, setRowData] = useState([]);
  const [events, setEvents] = useState([
    {
      title: "Event 1",
      start: new Date("2021 5 2 09:30"),
      end: new Date("2021 5 2 10:30"),
    },
  ]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((rowData) => setRowData(rowData));
  };

  //   setEvents({ title: rowData[0].activity, start: rowData[0].date });

  console.log(rowData[0]);

  return (
    <Scheduler
      height="500"
      view="month"
      month={{
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 6,
        startHour: 9,
        endHour: 17,
      }}
      events={[
        {
          title: "Event 1",
          start: new Date("2022/6/9 09:30"),
          end: new Date("2022/6/9 10:30"),
        },
        {
          title: "Event 2",
          start: new Date("2022/6/4 10:00"),
          end: new Date("2022/6/4 11:00"),
        },
      ]}
    />
  );
}
