import Constants from 'expo-constants'

const baseURL = {
    dev: 'https://alphacashapi.tangbull.com',
    prod: 'prod'
}[Constants.manifest.extra.ENV];

const isDev = Constants.manifest.extra.ENV === 'dev';

export { baseURL, isDev }