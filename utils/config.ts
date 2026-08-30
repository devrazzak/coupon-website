const branch: string = 'dev';
export const maintenance = false;

type Environment = 'dev' | 'qa' | 'stage' | 'live' | 'local';

interface EnvironmentConfig {
    web_base_url: string;
    api_base_url: string;
    booking_api_base_url: string;
    business_base_url: string;
    social_api_base_url: string;
    bucket_base_url: string;
    cognitoUserPoolId: string;
    identityPoolId: string;
    bucket: string;
    region: string;
    cognito_app_client_id: string;
    GOOGLE_CLIENT_ID: string;
    ENCRYPTION_KEY: string;
}

const environmentConfigs: Record<Environment, EnvironmentConfig> = {
    local: {
        web_base_url: '',
        api_base_url: '',
        booking_api_base_url: '',
        business_base_url: '',
        social_api_base_url: '',
        bucket_base_url: '',
        cognitoUserPoolId: '',
        identityPoolId: '',
        bucket: '',
        region: '',
        cognito_app_client_id: '',
        GOOGLE_CLIENT_ID: '',
        ENCRYPTION_KEY: '',
    },
    dev: {
        web_base_url: '',
        api_base_url: 'https://coupon-finder-api-dev.assetvila.com',
        booking_api_base_url: '',
        business_base_url: '',
        social_api_base_url: '',
        bucket_base_url: 'https://coupon-finder-api-dev.assetvila.com/public/storage/',
        cognitoUserPoolId: '',
        identityPoolId: '',
        bucket: '',
        region: '',
        cognito_app_client_id: '',
        GOOGLE_CLIENT_ID: '',
        ENCRYPTION_KEY: '',
    },
    qa: {
        web_base_url: '',
        api_base_url: '',
        booking_api_base_url: '',
        business_base_url: '',
        social_api_base_url: '',
        bucket_base_url: '',
        cognitoUserPoolId: '',
        identityPoolId: '',
        bucket: '',
        region: '',
        cognito_app_client_id: '',
        GOOGLE_CLIENT_ID: '',
        ENCRYPTION_KEY: '',
    },
    stage: {
        web_base_url: '',
        api_base_url: '',
        booking_api_base_url: '',
        business_base_url: '',
        social_api_base_url: '',
        bucket_base_url: '',
        cognitoUserPoolId: '',
        identityPoolId: '',
        bucket: '',
        region: '',
        cognito_app_client_id: '',
        GOOGLE_CLIENT_ID: '',
        ENCRYPTION_KEY: '',
    },
    live: {
        web_base_url: '',
        api_base_url: '',
        booking_api_base_url: '',
        business_base_url: '',
        social_api_base_url: '',
        bucket_base_url: '',
        cognitoUserPoolId: '',
        identityPoolId: '',
        bucket: '',
        region: '',
        cognito_app_client_id: '',
        GOOGLE_CLIENT_ID: '',
        ENCRYPTION_KEY: '',
    },
};

// Get current environment config
const currentConfig = environmentConfigs[branch as Environment] || environmentConfigs.dev;

// Export all configuration values
export const web_base_url = currentConfig.web_base_url;
export const api_base_url = currentConfig.api_base_url;
export const booking_api_base_url = currentConfig.booking_api_base_url;
export const business_base_url = currentConfig.business_base_url;
export const social_api_base_url = currentConfig.social_api_base_url;
export const bucket_base_url = currentConfig.bucket_base_url;
export const file_base_url = currentConfig.bucket_base_url;
export const cognitoUserPoolId = currentConfig.cognitoUserPoolId;
export const identityPoolId = currentConfig.identityPoolId;
export const bucket = currentConfig.bucket;
export const region = currentConfig.region;
export const cognito_app_client_id = currentConfig.cognito_app_client_id;
export const GOOGLE_CLIENT_ID = currentConfig.GOOGLE_CLIENT_ID;
export const ENCRYPTION_KEY = currentConfig.ENCRYPTION_KEY;

// Constants that don't vary by environment
export const cookie_url_endpoint = '';
export const auth0_redirected_endpoint = '';
export const cloudfront_base_url = '';
export const auth0_app_client_id = '';
export const DEFAULT_LANGUAGE = 'en';
export const messengerChatId = '';
export const payment_currency_type = 'USD';
