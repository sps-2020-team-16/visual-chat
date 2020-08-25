const express = require('express')
const app = express()

const port = 8080

app.use( express.static('./') )

app.listen( port ,()=>{
    console.log(`listen on port:${ port }`)
})