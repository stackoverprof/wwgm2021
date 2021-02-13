const RouteSet = {
    dashboard: ({action}) => `/dashboard?action=${action}`,
    get: param => `/get/${param}`
}

export default RouteSet