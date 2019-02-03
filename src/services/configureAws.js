import {
  cognitoIdentityPoolId as identityPoolId,
  awsRegion as region,
  cognitoUserPoolId as userPoolId,
  url as endpoint,
  cognitoClientId as userPoolWebClientId
} from './aws'
export const API_NAME = 'DevPortal'
export default {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId,

    // REQUIRED - Amazon Cognito Region
    region,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_SRP_AUTH',
    userPoolWebClientId
  },
  API: {
    endpoints: [
      {
        name: API_NAME,
        endpoint
      }
    ]
  }
}
