let mailer  = require('nodemailer');
let config = require('./config.js');

var mailOptions = {
    from: '2728474645@qq.com', // 发送者  
    to:config.targetMail,
    subject: '这是一个测试', // 标题  
    text: '你好吗'
    
};  

let transporter = mailer.createTransport(config.qqMail);

let sendMail = (text,title)=>{
    mailOptions.text=text;
    mailOptions.subject=title;
    return transporter.sendMail(mailOptions);
}

module.exports = {
    sendMail
}

// sendMail('1212','as');