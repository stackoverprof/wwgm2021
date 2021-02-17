const RoutePath = {
    home: '/',
    dashboard: '/dashboard',
    adminArea: '/area-admin',
    tryOut: '/tryout',
    contact: '/kontak',
    aboutUs: '/tentang-kami'
}

const RouteSet = {
    dashboard: ({action}) => `/dashboard?action=${action}`,
    get: param => `/get/${param}`
}

export { 
    RoutePath as to,
    RouteSet as set 
}