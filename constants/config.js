import Constants from 'expo-constants'

const baseURL = {
    dev: 'dev',
    prod: 'prod'
}[Constants.manifest.extra.ENV];

const isDev = Constants.manifest.extra.ENV === 'dev';

export { baseURL, isDev }