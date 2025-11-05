import Config from "react-native-config"

export const API_ROUTES = {
    AUTH : {
        LOGIN : '/login',
        LOG_OUT : '/logout'
    }
} as const;

export const API_URL = Config.BASE_URL;