const {
    createApiKeyAndSubscribe, 
    getUsagePlans,
    getApiKey,
    getUsage,
    apigateway
}=require('./handler')

describe('createApiKeyAndSubscrible', ()=>{
    it('creates api if no api exists', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb({items:[]}))
        apigateway.createApiKey=jest.fn((_a1, cb)=>cb({id:'hello', key:'value'}))
        apigateway.createUsagePlanKey=jest.fn((_a1, cb)=>cb({}))
        const event={
            body:JSON.stringify({
                customerId:'123',
                usagePlanId:'345'
            })         
        }
        createApiKeyAndSubscribe(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            console.log(pr)
            expect(keyId).toEqual('hello')
            expect(keyValue).toEqual('value')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.createApiKey.mock.calls.length).toEqual(1)
            expect(apigateway.createUsagePlanKey.mock.calls.length).toEqual(1)
            done()
        })
        
    })
})