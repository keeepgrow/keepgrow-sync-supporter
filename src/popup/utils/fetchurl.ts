// export const env: string = "dev";
// export const env: string = "stage";
export const env: string = "prod";

let authUrl: string;
let adminUrl: string;
let keepgrowUrl: string;
let AICRM_PRODUCT_IDX: number;
let clientUrl: string;

switch (env) {
  case "dev":
    authUrl = "https://uaa.keepgrow.world/uaa";
    adminUrl = "https://gateway.keepgrow.world/app/api";
    keepgrowUrl = "https://app.keepgrow.world";
    clientUrl = "https://gateway.keepgrow.world";
    AICRM_PRODUCT_IDX = 218;
    break;

  case "stage":
    authUrl = "https://stage-uaa.keepgrow.com/uaa";
    adminUrl = "https://stage-gateway.keepgrow.com/app/api";
    keepgrowUrl = "https://stage.keepgrow.com";
    clientUrl = "https://stage-gateway.keepgrow.com";
    AICRM_PRODUCT_IDX = 414;

    break;

  case "prod":
    authUrl = "https://uaa.keepgrow.com/uaa";
    adminUrl = "https://gateway.keepgrow.com/app/api";
    keepgrowUrl = "https://app.keepgrow.com";
    clientUrl = "https://gateway.keepgrow.com";
    AICRM_PRODUCT_IDX = 414;

    break;
}

export { adminUrl, authUrl, keepgrowUrl, AICRM_PRODUCT_IDX, clientUrl };
