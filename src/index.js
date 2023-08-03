import { AppointmentsDayView } from "./AppointmentsDayView.";
import { sampleAppointments } from "./sampleData";
import ReactDOM from "react-dom/client";
import React from "react";
import { CustomerForm } from "./CustomerForm";

ReactDOM.createRoot(
    document.getElementById('root')
).render(
    // <AppointmentsDayView appointments={sampleAppointments}/>
    <CustomerForm original={{}} onSubmit={() => {}} />
)