const RoutePath = {
    home: '/',
    dashboard: '/dashboard',
    adminArea: '/area-admin',
    manageUsers: '/area-admin/manage-users',
    manageExams: '/area-admin/manage-exams',
    _404: '/404'
}

const RouteSet = {
    dashboard: ({action}) => `/dashboard?action=${action}`,
    examParticipants: ({examId}) => `/area-admin/manage-exams/${examId}/participants`,
    get: param => `/get/${param}`
}

export { 
    RoutePath as to,
    RouteSet as set 
}