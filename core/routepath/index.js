const RoutePath = {
    home: '/',
    dashboard: '/dashboard',
    history: '/dashboard/riwayat',
    adminArea: '/area-admin',
    manageUsers: '/area-admin/manage-users',
    manageExams: '/area-admin/manage-exams',
    _404: '/404'
}

const RouteSet = {
    dashboard: ({action}) => `/dashboard?action=${action}`,
    overviewTO: ({examId}) => `/try-out/${examId}`,
    startTO: ({examId}) => `/try-out/${examId}/start`,
    resultTO: ({examId}) => `/try-out/${examId}/result`,
    examParticipants: ({examId}) => `/area-admin/manage-exams/${examId}/participants`,
    examEdit: ({examId}) => `/area-admin/manage-exams/${examId}/edit`,
    examUploadIRT: ({examId}) => `/area-admin/manage-exams/${examId}/upload-irt`
}

const ReachOut = {
    ig: 'https://instagram.com/areksgm',
    waTech: 'https://wa.me/6281373368875'
}

export { 
    RoutePath as to,
    RouteSet as set,
    ReachOut as out
}