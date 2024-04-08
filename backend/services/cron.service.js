const cron = require('cron')
const https = require('https')

const URL = "https://airpnd.onrender.com"

const job = new cron.CronJob("*/14 * * * *", function () {
    https.get(URL,(res) => {
        if(res.statusCode = 200) {
            console.log("Get request success")
        }else {
            console.log("Get request fail: ", res.statusCode)

        }

    }).on("error",(e) => {
        console.log("Error while sending request: ", e)
    })
})



module.exports = job
