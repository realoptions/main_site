const { exec } = require('child_process')
const {writeFile} = require('fs') 
const stackName=process.argv[2]
const reactOutput=(key, value)=>`REACT_APP_${key}="${value}"`
exec(
    `aws cloudformation describe-stacks --stack-name "${stackName}"`, 
    (err, stdout, stderr)=>{
        const error=err||stderr
        if(error){
            return console.log(error)
        }
        const result=JSON.parse(stdout).Stacks.find(({StackName})=>StackName===stackName)
        const envArr1=result.Outputs.reduce(
            (aggr, {OutputKey, OutputValue})=>({
                ...aggr, [OutputKey]:OutputValue
            }), {})
        const envArr2=result.Parameters.reduce(
            (aggr, {ParameterValue, ParameterKey})=>({
                ...aggr, [ParameterKey]:ParameterValue
            }), {})
        const envStr1=Object.entries(envArr1).map(([key, value])=>reactOutput(key, value))
        const envStr2=Object.entries(envArr2).map(([key, value])=>reactOutput(key, value))

        //const envStr=[...envArr1, ...envArr2, ''].join('\n') //final array entry is to make the file have a new line
        writeFile('./.env', [...envStr1, ...envStr2, ''].join('\n'), err=>{
            if(err){
                console.log(err)
            }
        })
        writeFile(
            './scripts/awsInfrastructure.json', 
            JSON.stringify({...envArr1, ...envArr2}), 
            err=>{
                if(err){
                    console.log(err)
                }
            }
        )
    }
)