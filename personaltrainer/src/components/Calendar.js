import { Scheduler } from "@aldabil/react-scheduler";
import React, { useState, useEffect } from "react";
import moment from "moment";

export default function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((events) => setEvents(events));
  };

  return (
    <div style={{ height: 500, width: "80%", margin: "auto" }}>
      <Scheduler
        view="month"
        month={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 6,
          startHour: 9,
          endHour: 17,
        }}
        events={events.map((events, i) => ({
          event_id: i,
          title: events.activity,
          start: new Date(events.date),
          end: moment(events.date).add(events.duration, "minute")._d,
        }))}
      />
    </div>
  );
}
