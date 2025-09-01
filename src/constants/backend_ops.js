const BASE_URL = 'http://localhost:8080';

const API_ENDPOINTS = {

    DEVICE: {
        GET_DATAMAP_BY_PARAMS: '/api/images/{region}/{date}/{hour}/{filename}',
        GET_TEST_CONNECTION: '/api/test/connection',
        GET_LAST_DATAMAP:"/api/datamaps/latest/{pollutant}",
        START_SIMULATION:"/api/simulations",
        TEST_CONNECTION:"/api/test/connection/processor",
        GET_LAST_HEALTH_MAP:"/api/health-simulation/datamap/latest",
        START_HEALTH_SIMULATION:"/api/health-simulation/datamap",
        GET_HEALTH_MAP_BY_NAME: "/api/images/health/{filename}",
        DELETE_HEALTH_MAP: "/api/images/health/delete/{filename}",
        GET_DATA_GRAPHIC: "/api/reports/{pollutant}/{start_date}/{finish_date}",
    },

    INDEXER:{
        TEST_CONNECTION:"/api/test/connection/indexer",
        GET_ALL_DEVICES:"/api/devices",
        DISCONNECT_DEVICE:"/api/devices/{device_id}"
    },

    HEALTH_CHECK_API: {
        TEST_CONNECTION_USER: "/api/test/connection/userService",
        TEST_CONNECTION_NOTIFICATION: "/api/test/connection/notificationsService"
    },

    REGISTRATION: {
        REGISTRATION_USER: '/api/registration/user',
        VERIFY_EMAIL: '/api/registration/verify',
        RESEND_VERIFICATION: '/api/registration/resend-email',
    },

    AUTH: {
        LOGIN: '/api/authenticate/',
        FORGOT_PASSWORD: '/api/authenticate/forgot-password',
        RESET_PASSWORD: '/api/authenticate/reset-password',
    },

    USER: {
        GET_ALL_USERS: '/api/users/',
        GET_USER_PROFILE: '/api/users/{id}',
        GET_USER_FROM_EMAIL: '/api/users/search-email',
        GET_USERS_FROM_DOMAIN: '/api/users/search-domain',
        UPDATE_USER_PROFILE: '/api/users/{id}/update',
        CHANGE_PASSWORD: '/api/users/{id}/change-password',
        DELETE_USER: '/api/users/{id}',
        GET_USERS_RESEARCHERS: '/api/users/researcher',
        GET_USERS_REGULAR: '/api/users/regular',
    },

    ADMIN: {
        GET_ALL_ADMINS: '/api/admins/',
        GET_ADMIN_PROFILE: '/api/admins/{id}',
        ADD_DOMAIN: '/api/add-domain',
        GET_DOMAINS: '/api/domains',
        DELETE_DOMAIN: '/api/delete-domain',
    },

};


export {
    BASE_URL,
    API_ENDPOINTS,
}