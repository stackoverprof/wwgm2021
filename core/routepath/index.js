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
    tryOutOverview: ({examId, sesi = 1}) => `/try-out/${examId}?sesi=${sesi}`,
    tryOutStart: ({examId, sesi = 1}) => `/try-out/${examId}/start?sesi=${sesi}`,
    examParticipants: ({examId}) => `/area-admin/manage-exams/${examId}/participants`,
    examEdit: ({examId}) => `/area-admin/manage-exams/${examId}/edit`
}

export { 
    RoutePath as to,
    RouteSet as set 
}