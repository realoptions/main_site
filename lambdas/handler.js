const customersController = require('./customers-controller.js')
const AWS = require('aws-sdk')
const apigateway = new AWS.APIGateway()
module.exports.apigateway=apigateway
const getBodyFromEvent=event=>JSON.parse(event.body)
const {OAuth2Client} = require('google-auth-library')
const {GoogleAppID:GOOGLE_APP_ID}=require('./clientInfo.json')
const https=require('https')
const corsHeaders={
    'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
    'Access-Control-Allow-Credentials' : true, // Required for cookies, authorization headers with HTTPS 
    'Content-Type': 'application/json',
}
const successResponse=(body={})=>({
    statusCode: 200,
    body: JSON.stringify(body),
    headers: corsHeaders
})
const errResponse=err=>{
    console.log(`Error! ${err}`)
    return ({
        statusCode: 500,
        body: JSON.stringify({err}),
        headers:corsHeaders
    })
}
const client = new OAuth2Client(GOOGLE_APP_ID)
const googleProvider=authorization=>{
    return client.verifyIdToken({
        idToken: authorization,
        audience: GOOGLE_APP_ID
    }).then(ticket=>ticket.getPayload())
}
//this won't check whether the token was generated on the website,
//but I don't care...I just want to make sure that people
//aren't spoofing email addresses
const facebookProvider=authorization=>new Promise((resolve, rej)=>{
    https.get(`https://graph.facebook.com/me?access_token=${authorization}`, res=>{
        res.on('data', (d) => {
            const results=JSON.parse(d)
            if(results.error){
                return rej(results.error.message)
            }
            return resolve(results)
        })
    }).on('error', (e) => {
        rej(e)
    })
})

const generatePolicy=(provider, effect)=>({
    "principalId": provider, // The principal user identification associated with the token sent by the client.
    "policyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": [
              "apigateway:*",
              "execute-api:*",
              "lambda:*"
          ],
          "Effect": effect,//"Allow|Deny",
          "Resource": "*"
        }
      ]
    },
    /*"context": {
      "stringKey": "value",
      "numberKey": "1",
      "booleanKey": "true"
    },*/
    //"usageIdentifierKey": "{api-key}"
})

const authorize=(authorization, provider)=>{
    switch(provider){
        case 'google':{
            return googleProvider(authorization)
        }
        case 'facebook':{
            return facebookProvider(authorization)
        }
        default:{
            return Promise.reject('No Authorization strategy')
        }
    }
}
module.exports.authorize=(event, _context, callback)=>{
    const {authorizationToken}=event
    const [provider, authorization]=authorizationToken.split(" ")
    return authorize(authorization, provider)
        .then(()=>{
            console.log('Request is authorized')
            callback(null, generatePolicy(provider, 'Allow'))
        })
        .catch(err=>{
            console.log(`Authorize has the following error: ${err}`)
            callback("Unauthorized")
            //callback(null, generatePolicy(provider, event.methodArn, 'Deny'))
        })
}

module.exports.createApiKeyAndSubscribe = (event, _context, callback) =>{
    const {customerId, usagePlanId}=getBodyFromEvent(event)
    const errHoc=err=>callback(null, errResponse(err))
    const successHoc=body=>callback(null, successResponse(body))
    customersController.getApiKeyForCustomer(apigateway, customerId, errHoc, (data) => {
        console.log(`Get Api Key data ${JSON.stringify(data)}`)
        if (data.items.length === 0) {
            console.log(`No API Key found for customer ${customerId}`)
            customersController.createApiKey(apigateway, customerId, errHoc, (createData) => {
                const {id:keyId, value:keyValue} = createData
                console.log(`Got key ID ${keyId}`)
                console.log(`Got key value ${keyValue}`)
                customersController.createUsagePlanKey(apigateway, keyId, usagePlanId, errHoc, ()=>{
                    successHoc({keyId, keyValue})
                })
            })
        } else {
            const {id:keyId, value:keyValue}  = data.items[0]
            apigateway.getUsagePlans({limit:500, keyId}, (err, subscribedPlans)=>{
                if(err){
                    return callback(null, errResponse(err))
                }
                if(subscribedPlans.length===0){
                    return customersController.createUsagePlanKey(apigateway, keyId, usagePlanId, errHoc, ()=>{
                        successHoc({keyId, keyValue})
                    })
                }
                return successHoc({keyId, keyValue})
            })
            
        }
    })
}
module.exports.getUsagePlans = (_event, _context, callback) =>{
    apigateway.getUsagePlans({limit:500}, (err, catalog)=>{
        if(err){
            return callback(null, errResponse(err))
        }
        console.log('Success!')
        return callback(null, successResponse(catalog))
    })
}

module.exports.getUsage = (event, _context, callback) =>{
    const {usagePlanId}=event.pathParameters
    const {customerId, end, start}=event.queryStringParameters
    const errHoc=err=>callback(null, errResponse(err))
    const successHoc=body=>callback(null, successResponse(body))
    customersController.getApiKeyForCustomer(apigateway, customerId, errHoc, (data) => {
        if (data.items.length === 0) {
            return errHoc('No API Key!')
        }
        const keyId = data.items[0].id
        const params = {
            endDate: end,
            startDate: start,
            usagePlanId,
            keyId,
            limit: 1000
        }
        apigateway.getUsage(params, (err, usageData) => {
            if (err) {
                errHoc(err)
            } else {
                successHoc(usageData)
            }
        })
    })    
}