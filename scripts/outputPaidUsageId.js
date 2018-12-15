const {items}=require('./catalog.json')
console.log(items.find(({name})=>name.includes("Paid")).id)