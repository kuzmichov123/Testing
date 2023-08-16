import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { AppointmentsDayViewLoader } from './AppointmentsDayViewLoader'
import { CustomerForm } from './CustomerForm'
import { AppointmentFormLoader } from './AppointmentFormLoader'

const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
}
const blankAppointment = {
    service: "",
    stylist: "",
    startsAt: null,
}

export const App = () => {

    const [customer, setCustomer] = useState()
    const [view, setView] = useState('dayView')
    const transitionToAddCustomer = useCallback(
        () => setView('addCustomer'),
        []
    )
    const transitionToAddAppointment = useCallback(
        (customer) => {
            setCustomer(customer)
            setView("addAppointment")
        }, [])
    const transitionToDayView = useCallback(
        () => setView('dayView'),
        []
    )
    switch (view) {
        case 'addCustomer':
            return (
                <CustomerForm
                    original={blankCustomer}
                    onSave={transitionToAddAppointment}
                />
            )
        case 'addAppointment':
            return (
                <AppointmentFormLoader
                    original={{
                        ...blankAppointment,
                        customer: customer.id,
                    }}
                    onSave={transitionToDayView}
                />
            )
        default:
            return (
                <>
                    <menu>
                        <li>
                            <button
                                type='button'
                                onClick={transitionToAddCustomer}
                            >
                                Add Customer and appointment
                            </button>
                        </li>
                    </menu>
                    <AppointmentsDayViewLoader />
                </>
            )
    }
}