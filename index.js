const express = require('express')
const app = express()
const fs = require('fs')
const options = {
    key: fs.readFileSync("/root/.acme.sh/limbotech.top/limbotech.top.key"),
    cert: fs.readFileSync("/root/.acme.sh/limbotech.top/limbotech.top.cer")
}
const httpsServer = require('https').createServer(options, app)

const httpServer = require('http').createServer(app)

app.use('/static', express.static(__dirname + '/static'))

//设置使用views文件夹下的pug模板
app.set('view engine', 'pug')

app.get('/', (req, res, next) => {
    if(req.protocol === 'http') {
        res.redirect("https://limbotech.top")
    }
    res.render('index.pug', {title: 'Limbo'})

})



httpsServer.listen(443)
httpServer.listen(80)