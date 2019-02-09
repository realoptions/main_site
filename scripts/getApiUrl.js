const yaml = require('js-yaml')
const fs   = require('fs')
const { exec } = require('child_process')
// Get document, or throw exception on error
const doc = yaml.safeLoad(fs.readFileSync('./serverless.yml', 'utf8'))
const {service, provider:{stage}}=doc
const stackName=`${service}-${stage}`
exec(`aws cloudformation describe-stacks --stack-name "${stackName}"`, (err, stdout, stderr)=>{
    const error=err||stderr
    if(error){
        return console.error(error)
    }
    const result=JSON.parse(stdout).Stacks.find(({StackName})=>StackName===stackName)
    console.log(result.Outputs.find(({OutputKey})=>OutputKey==="ServiceEndpoint").OutputValue)
})