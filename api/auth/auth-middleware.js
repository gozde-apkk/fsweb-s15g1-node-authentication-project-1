


const UserModel = require("../users/users-model");

/*
  Kullanıcının sunucuda kayıtlı bir oturumu yoksa

  status: 401
  {
    "message": "Geçemezsiniz!"
  }
*/
async  function sinirli(req,res,next) {
  try{
    if(req.session.user){
      next();
    }else{
      next({
        status : 401,
        message:"Geçemezsiniz!"
      })
    }

  }catch(error){
    next(error);
  }

}

/*
  req.body de verilen username halihazırda veritabanında varsa

  status: 422
  {
    "message": "Username kullaniliyor"
  }
*/
async function usernameBostami(req,res,next) {
     try{
      const {username} = req.body;
      const existUser = await UserModel.goreBul({username: req.body.username})
      if(existUser.length > 0){
        res.status(422).json({message:"Username kullaniliyor"})
      }else{
        next()
      }
    }catch(error){
      next(error);  
    }

  

}

/*
  req.body de verilen username veritabanında yoksa

  status: 401
  {
    "message": "Geçersiz kriter"
  }
*/
function usernameVarmi() {

}

/*
  req.body de şifre yoksa veya 3 karakterden azsa

  status: 422
  {
    "message": "Şifre 3 karakterden fazla olmalı"
  }
*/
function sifreGecerlimi() {
    const {password} = req.body;
    if(!password || password.length <3){
      res.status(422).json({message:"Şifre 3 karakterden fazla olmamlı"})
    }else{
      const hashedPassword = bcrypt.hashedPassword
    }
}

// Diğer modüllerde kullanılabilmesi için fonksiyonları "exports" nesnesine eklemeyi unutmayın.
