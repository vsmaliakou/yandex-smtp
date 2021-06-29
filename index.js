const express = require('express')
const nodemailer = require("nodemailer");
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
let port = process.env.PORT || 3010
let smtp_login = process.env.SMTP_LOGIN || "---"
let smtp_password = process.env.SMTP_PASSWORD || "---"

let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
        user: smtp_login,
        pass: smtp_password,
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {

    let {message, contacts, name} = req.body

    let info = await transporter.sendMail({
        from: "vsmaliakou@yandex.by",
        to: "vsmaliakou@yandex.by",
        subject: "HR WANTS ME",
        html: `<b>Сообщение с Personal Portfolio</b>
            <div>
                name: ${name}
            </div>
            <div>
                contacts: ${contacts}
            </div>
            <div>
                ${message}
            </div>`,
    });
    res.send('ok')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})