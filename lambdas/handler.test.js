const AWS = require('aws-sdk-mock')
const {
    createApiKeyAndSubscribe, 
    getUsagePlans,
    getApiKey,
    getUsage
}=require('./handler')

describe('createApiKeyAndSubscrible', ()=>{
    it('creates api if no api exists', done=>{
        AWS.mock('APIGateway','getApiKeys', ()=>({items:[]}))
        AWS.mock('APIGateway','createApiKey', ()=>({id:'hello', key:'value'}))
        AWS.mock('APIGateway','createUsagePlanKey', ()=>{})
        const event={
            body:JSON.stringify({
                customerId:'123',
                usagePlanId:'345'
            })         
        }
        createApiKeyAndSubscribe(event, null, ({keyId, keyValue})=>{
            expect(keyId).toEqual('hello')
            expect(keyValue).toEqual('value')
            done()
        })

    })
})