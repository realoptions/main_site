// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

'use strict'
//const AWS = require('aws-sdk')

//const apigateway = new AWS.APIGateway()

module.exports.createApiKey=(apigateway, cognitoIdentityId, error, callback)=>{
    console.log(`Creating API Key for customer ${cognitoIdentityId}`)

    // set the name to the cognito identity ID so we can query API Key for the cognito identity
    const params = {
        description: `Dev Portal API Key for ${cognitoIdentityId}`,
        enabled: true,
        generateDistinctId: true,
        name: cognitoIdentityId
    }

    apigateway.createApiKey(params, (err, data) => {
        if (err) {
            console.log('createApiKey error', error)
            error(err)
        } else {
            callback(data)
        }
    })
}

module.exports.createUsagePlanKey=(apigateway, keyId, usagePlanId, error, callback)=>{
    console.log(`Creating usage plan key for key id ${keyId} and usagePlanId ${usagePlanId}`)

    const params = {
        keyId,
        keyType: 'API_KEY',
        usagePlanId
    }
    apigateway.createUsagePlanKey(params, (err, data) => {
        if (err) error(err)
        else callback(data)
    })
}

const getApiKeyForCustomer=(apigateway, cognitoIdentityId, error, callback)=>{
    console.log(`Getting API Key for customer  ${cognitoIdentityId}`)
    const params = {
        limit: 1,
        includeValues: true,
        nameQuery: cognitoIdentityId
    }
    apigateway.getApiKeys(params, (err, data) => {
        if (err) error(err)
        else callback(data)
    })
}
module.exports.getApiKeyForCustomer=getApiKeyForCustomer
module.exports.getUsagePlansForCustomer=(apigateway, cognitoIdentityId, error, callback)=>{
    console.log(`Getting API Key for customer ${cognitoIdentityId}`)

    getApiKeyForCustomer(apigateway, cognitoIdentityId, error, (data) => {
        if (data.items.length === 0) {
            callback({data : {}})
        } else {
            const keyId = data.items[0].id
            const params = {
                keyId,
                limit: 1000
            }
            apigateway.getUsagePlans(params, (err, usagePlansData) => {
                if (err) error(err)
                else callback(usagePlansData)
            })
        }
    })
}