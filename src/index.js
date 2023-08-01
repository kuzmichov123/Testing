import { AppointmentsDayView } from "./AppointmentsDayView.";
import { sampleAppointments } from "./sampleData";
import ReactDOM from "react-dom/client";
import React from "react";

ReactDOM.createRoot(
    document.getElementById('root')
).render(
    <AppointmentsDayView appointments={sampleAppointments}/>
)