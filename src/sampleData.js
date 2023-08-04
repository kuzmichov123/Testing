const today = new Date()

const at = (hours) => today.setHours(hours, 0)

export const sampleAppointments = [
    { startsAt: at(9), customer: { firstName: 'Charlie'} },
    { startsAt: at(10), customer: { firstName: 'Vanya'} },
    { startsAt: at(11), customer: { firstName: 'Anton'} },
    { startsAt: at(12), customer: { firstName: 'Alexandr'} },
    { startsAt: at(13), customer: { firstName: 'Ilya'} },
    { startsAt: at(14), customer: { firstName: 'Victor'} },
    { startsAt: at(15), customer: { firstName: 'Vasya'} },
    { startsAt: at(16), customer: { firstName: 'Gleb'} },
    { startsAt: at(17), customer: { firstName: 'Nigger'} },
]

