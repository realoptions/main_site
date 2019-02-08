const customersController = require('./customers-controller.js')
const AWS = require('aws-sdk')
const apigateway = new AWS.APIGateway()
const getBodyFromEvent=event=>JSON.parse(event.body)

const successResponse=(body={})=>({
    statusCode: 200,
    body: JSON.stringify(body)
})
const errResponse=err=>({
    statusCode: 500,
    body: JSON.stringify({err})
})

module.exports.createApiKeyAndSubscribe = (event, _context, callback) =>{
    const {customerId, usagePlanId}=getBodyFromEvent(event)
    const errHoc=err=>callback(null, errResponse(err))
    const successHoc=body=>callback(null, successResponse(body))
    customersController.getApiKeyForCustomer(customerId, errHoc, (data) => {
        console.log(`Get Api Key data ${JSON.stringify(data)}`)
        if (data.items.length === 0) {
            console.log(`No API Key found for customer ${customerId}`)
            customersController.createApiKey(customerId, errHoc, (createData) => {
                console.log(`Create API Key data: ${createData}`)
                const {id:keyId, value:keyValue} = createData
                console.log(`Got key ID ${keyId}`)
                customersController.createUsagePlanKey(keyId, usagePlanId, errHoc, ()=>{
                    successHoc({keyId, keyValue})
                })
            })
        } else {
            const {id:keyId, value:keyValue}  = data.items[0]
            customersController.createUsagePlanKey(keyId, usagePlanId, errHoc, ()=>{
                successHoc({keyId, keyValue})
            })
        }
    })
}
module.exports.getUsagePlans = (_event, _context, callback) =>{
    apigateway.getUsagePlans({limit:500}, (err, catalog)=>{
        if(err){
            return callback(null, errResponse(err))
        }
        return callback(null, successResponse(catalog))
    })
}
module.exports.getApiKey = (event, _context, callback) =>{
    const {customerId}=event.pathParameters
    const errHoc=err=>callback(null, errResponse(err))
    const successHoc=body=>callback(null, successResponse(body))
    customersController.getApiKeyForCustomer(customerId, errFunc, (data) => {
        if (data.items.length === 0) {
            errHoc('No API Key!')
        } else {
            const {value:keyValue, id:keyId}  = data.items[0]
            successHoc({keyId, keyValue})
        }
    })
}
module.exports.getUsage = (event, _context, callback) =>{
    const {customerId, usagePlanId}=event.pathParameters
    const {end, start}=event.queryStringParameters
    const errHoc=err=>callback(null, errResponse(err))
    const successHoc=body=>callback(null, successResponse(body))
    customersController.getApiKeyForCustomer(customerId, errHoc, (data) => {
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
                errHoc(ee)
            } else {
                successHoc(usageData)
            }
        })
    })
    
}
