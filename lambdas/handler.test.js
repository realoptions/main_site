const {
    createApiKeyAndSubscribe, 
    getUsagePlans,
    getUsage,
    apigateway
}=require('./handler')

describe('createApiKeyAndSubscribe', ()=>{
    it('creates api key if no api key exists', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb(null, {items:[]}))
        apigateway.createApiKey=jest.fn((_a1, cb)=>cb(null, {id:'hello', value:'value'}))
        apigateway.createUsagePlanKey=jest.fn((_a1, cb)=>cb(null, {}))
        apigateway.getUsagePlans=jest.fn((_a1, cb)=>cb(null, ['plan']))
        const event={
            body:JSON.stringify({
                customerId:'123',
                usagePlanId:'345'
            })         
        }
        createApiKeyAndSubscribe(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            const {keyId, keyValue}=pr
            expect(keyId).toEqual('hello')
            expect(keyValue).toEqual('value')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.createApiKey.mock.calls.length).toEqual(1)
            expect(apigateway.createUsagePlanKey.mock.calls.length).toEqual(1)
            expect(apigateway.getUsagePlans.mock.calls.length).toEqual(0)
            done()
        })
        
    })
    it('returns api key if api key exists and already subscribed', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb(null, {items:[{id:'hello', value:'value'}]}))
        apigateway.createApiKey=jest.fn((_a1, cb)=>cb(null, {id:'hello', value:'value'}))
        apigateway.createUsagePlanKey=jest.fn((_a1, cb)=>cb(null, {}))
        apigateway.getUsagePlans=jest.fn((_a1, cb)=>cb(null, ['plan']))
        const event={
            body:JSON.stringify({
                customerId:'123',
                usagePlanId:'345'
            })         
        }
        createApiKeyAndSubscribe(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            const {keyId, keyValue}=pr
            expect(keyId).toEqual('hello')
            expect(keyValue).toEqual('value')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.createApiKey.mock.calls.length).toEqual(0)
            expect(apigateway.createUsagePlanKey.mock.calls.length).toEqual(0)
            expect(apigateway.getUsagePlans.mock.calls.length).toEqual(1)
            done()
        })
        
    })
    it('returns api key if api key exists and not subscribed', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb(null, {items:[{id:'hello', value:'value'}]}))
        apigateway.createApiKey=jest.fn((_a1, cb)=>cb(null, {id:'hello', value:'value'}))
        apigateway.createUsagePlanKey=jest.fn((_a1, cb)=>cb(null, {}))
        apigateway.getUsagePlans=jest.fn((_a1, cb)=>cb(null, []))
        const event={
            body:JSON.stringify({
                customerId:'123',
                usagePlanId:'345'
            })         
        }
        createApiKeyAndSubscribe(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            const {keyId, keyValue}=pr
            expect(keyId).toEqual('hello')
            expect(keyValue).toEqual('value')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.createApiKey.mock.calls.length).toEqual(0)
            expect(apigateway.createUsagePlanKey.mock.calls.length).toEqual(1)
            expect(apigateway.getUsagePlans.mock.calls.length).toEqual(1)
            done()
        })
        
    })
    it('handles error at first function', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb('error', null))
        apigateway.createApiKey=jest.fn((_a1, cb)=>cb(null, {id:'hello', value:'value'}))
        apigateway.createUsagePlanKey=jest.fn((_a1, cb)=>cb(null, {}))
        apigateway.getUsagePlans=jest.fn((_a1, cb)=>cb(null, []))

        const event={
            body:JSON.stringify({
                customerId:'123',
                usagePlanId:'345'
            })         
        }
        createApiKeyAndSubscribe(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            expect(pr.err).toEqual('error')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.createApiKey.mock.calls.length).toEqual(0)
            expect(apigateway.createUsagePlanKey.mock.calls.length).toEqual(0)
            expect(apigateway.getUsagePlans.mock.calls.length).toEqual(0)
            done()
        })
        
    })
    it('handles error at second function', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb(null, {items:[]}))
        apigateway.createApiKey=jest.fn((_a1, cb)=>cb('error', null))
        apigateway.createUsagePlanKey=jest.fn((_a1, cb)=>cb(null, {}))
        apigateway.getUsagePlans=jest.fn((_a1, cb)=>cb(null, []))

        const event={
            body:JSON.stringify({
                customerId:'123',
                usagePlanId:'345'
            })         
        }
        createApiKeyAndSubscribe(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            expect(pr.err).toEqual('error')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.createApiKey.mock.calls.length).toEqual(1)
            expect(apigateway.createUsagePlanKey.mock.calls.length).toEqual(0)
            expect(apigateway.getUsagePlans.mock.calls.length).toEqual(0)
            done()
        })
        
    })
    it('handles error at third function', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb(null, {items:[]}))
        apigateway.createApiKey=jest.fn((_a1, cb)=>cb(null, {id:'hello', value:'value'}))
        apigateway.createUsagePlanKey=jest.fn((_a1, cb)=>cb('error', {}))        
        apigateway.getUsagePlans=jest.fn((_a1, cb)=>cb(null, []))

        const event={
            body:JSON.stringify({
                customerId:'123',
                usagePlanId:'345'
            })         
        }
        createApiKeyAndSubscribe(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            expect(pr.err).toEqual('error')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.createApiKey.mock.calls.length).toEqual(1)
            expect(apigateway.createUsagePlanKey.mock.calls.length).toEqual(1)
            expect(apigateway.getUsagePlans.mock.calls.length).toEqual(0)
            done()
        })
        
    })
    it('handles error at third function when api key exists', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb(null, {items:[{id:'hello', value:'value'}]}))
        apigateway.createApiKey=jest.fn((_a1, cb)=>cb(null, {id:'hello', value:'value'}))
        apigateway.createUsagePlanKey=jest.fn((_a1, cb)=>cb('error', {}))
        apigateway.getUsagePlans=jest.fn((_a1, cb)=>cb(null, []))

        const event={
            body:JSON.stringify({
                customerId:'123',
                usagePlanId:'345'
            })         
        }
        createApiKeyAndSubscribe(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            expect(pr.err).toEqual('error')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.createApiKey.mock.calls.length).toEqual(0)
            expect(apigateway.createUsagePlanKey.mock.calls.length).toEqual(1)
            expect(apigateway.getUsagePlans.mock.calls.length).toEqual(1)
            done()
        })
        
    })
    it('handles error at fourth function', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb(null, {items:[{id:'hello', value:'value'}]}))
        apigateway.createApiKey=jest.fn((_a1, cb)=>cb(null, {id:'hello', value:'value'}))
        apigateway.createUsagePlanKey=jest.fn((_a1, cb)=>cb(null, {}))
        apigateway.getUsagePlans=jest.fn((_a1, cb)=>cb('error', ))

        const event={
            body:JSON.stringify({
                customerId:'123',
                usagePlanId:'345'
            })         
        }
        createApiKeyAndSubscribe(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            expect(pr.err).toEqual('error')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.createApiKey.mock.calls.length).toEqual(0)
            expect(apigateway.createUsagePlanKey.mock.calls.length).toEqual(0)
            expect(apigateway.getUsagePlans.mock.calls.length).toEqual(1)
            done()
        })
        
    })
})

describe('getUsagePlans', ()=>{
    it('returns usage plans', done=>{
        apigateway.getUsagePlans=jest.fn((_a1, cb)=>cb(null, 'hello'))
        getUsagePlans(null, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            expect(pr).toEqual('hello')
            expect(apigateway.getUsagePlans.mock.calls.length).toEqual(1)
            done()
        })
    })
    it('handles error', done=>{
        apigateway.getUsagePlans=jest.fn((_a1, cb)=>cb('error', null))
        getUsagePlans(null, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            expect(pr.err).toEqual('error')
            expect(apigateway.getUsagePlans.mock.calls.length).toEqual(1)
            done()
        })
    })
    
})

describe('getUsage', ()=>{
    it('returns usageData if api key exists', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb(null, {items:[{id:'hello', value:'value'}]}))
        apigateway.getUsage=jest.fn((_a1, cb)=>cb(null, 'hello'))        
        const event={
            pathParameters:{
                customerId:'123',
                usagePlanId:'456'
            },
            queryStringParameters:{
                end:123, //timestamp
                start:456 //timestamp
            }
        }
        getUsage(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            expect(pr).toEqual('hello')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.getUsage.mock.calls.length).toEqual(1)
            done()
        })
    })
    it('errors if api key does not exist', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb(null, {items:[]}))
        apigateway.getUsage=jest.fn((_a1, cb)=>cb(null, 'hello')) 
        const event={
            pathParameters:{
                customerId:'123',
                usagePlanId:'456'
            },
            queryStringParameters:{
                end:123, //timestamp
                start:456 //timestamp
            }
        }
        getUsage(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            const {err}=pr
            expect(err).toEqual('No API Key!')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.getUsage.mock.calls.length).toEqual(0)
            done()
        })
    })
    it('handles error in first function', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb('error', null))
        apigateway.getUsage=jest.fn((_a1, cb)=>cb(null, 'hello')) 
        const event={
            pathParameters:{
                customerId:'123',
                usagePlanId:'456'
            },
            queryStringParameters:{
                end:123, //timestamp
                start:456 //timestamp
            }
        }
        getUsage(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            const {err}=pr
            expect(err).toEqual('error')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.getUsage.mock.calls.length).toEqual(0)
            done()
        })
    })
    it('handles error in second function', done=>{
        apigateway.getApiKeys=jest.fn((_a1, cb)=>cb(null, {items:[{id:'hello', value:'value'}]}))
        apigateway.getUsage=jest.fn((_a1, cb)=>cb('error', null)) 
        const event={
            pathParameters:{
                customerId:'123',
                usagePlanId:'456'
            },
            queryStringParameters:{
                end:123, //timestamp
                start:456 //timestamp
            }
        }
        getUsage(event, null, (_err, result)=>{
            const pr=JSON.parse(result.body)
            const {err}=pr
            expect(err).toEqual('error')
            expect(apigateway.getApiKeys.mock.calls.length).toEqual(1)
            expect(apigateway.getUsage.mock.calls.length).toEqual(1)
            done()
        })
    })
})