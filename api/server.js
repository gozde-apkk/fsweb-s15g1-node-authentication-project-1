
/**
  Kullanıcı oturumlarını desteklemek için `express-session` paketini kullanın!
  Kullanıcıların gizliliğini ihlal etmemek için, kullanıcılar giriş yapana kadar onlara cookie göndermeyin. 
  'saveUninitialized' öğesini false yaparak bunu sağlayabilirsiniz
  ve `req.session` nesnesini, kullanıcı giriş yapana kadar değiştirmeyin.

  Kimlik doğrulaması yapan kullanıcıların sunucuda kalıcı bir oturumu ve istemci tarafında bir cookiesi olmalıdır,
  ips"Cookienin adı "cikolatac olmalıdır.

  Oturum memory'de tutulabilir (Production ortamı için uygun olmaz)
  veya "connect-session-knex" gibi bir oturum deposu kullanabilirsiniz.
 */
  const users = require("./users/users-router.js");
  const express = require("express");
  const helmet = require("helmet");
  const cors = require("cors");
  const session = require("express-session");
  const authRouter = require("./auth/auth-router");
  //SESSION ' A DAİR BİR STORE YARAT
  const Store = require("connect-session-knex")(session)
  const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//SESSION TANIMLAMA
server.use(session({
    name:"cikolotacips",
    secret:"cikolata_cips",
    cookie:{
      maxAge:1000*60*60,
      //HTTP REQUIEST ICIN :FALSE -- HTTPS REQUIEST ICIN :TRUE
      secure:false,
      httpOnly:true
    },
    //TEKRAR TEKRAR ÜSTÜNE YAZILMAMASI ICIN
    resave:false,
    //server ayaga kalktığında direk session oluşturmayacak
    saveUninitialized:false,
    store: new Store({
      
    })


}))

server.use("/api/auth", authRouter);
server.use("/api/users", users);
server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
