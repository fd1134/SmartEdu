const nodemailer = require("nodemailer");

exports.getIndexPage=(req,res)=>{
  console.log(req.session.userID) 
    res.status(200).render("index",{
        page_name:"index"
    });
};
exports.getAboutPage=(req,res)=>{
    res.status(200).render("about",{
        page_name:"about"
    });
};

exports.getRegisterPage=(req,res)=>{
    res.status(200).render("register",{
        page_name:"register"
    });
};

exports.getLoginPage=(req,res)=>{
    res.status(200).render("login",{
        page_name:"login"
    });
};

exports.getContactPage=(req,res)=>{
    res.status(200).render("contact",{
        page_name:"contact"
    });
};

exports.sendEmail=async (req,res)=>{
    const aoutputMessage=`

        <h1> Mail Details </h1>
        <ul>
        <li>Name  :${req.body.name}  </li>
        <li>Email :${req.body.email}  </li>
        </ul>
        <h1> Message </h1>
        <p>${req.body.message}</p>
    
    `;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "fd1134@gmail.com",           //gmail acount
          pass: "iwtp rukj ibmz dwwx",       // gmail password
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Smart EDU Conatct Form " <fd1134@gmail.com>', // sender address
          to: "fd1134@hotmail.com", // list of receivers
          subject: "Smart EDU Conatct Form New Message ✔", // Subject line
         
          html: aoutputMessage, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

    } 

   await main();
    res.status(200).redirect("/contact");
};