/**
  tüm kullanıcıları içeren bir DİZİ ye çözümlenir, tüm kullanıcılar { user_id, username } içerir
 */

const db = require("../../data/db-config");


function bul() {
    return db("users");
}

/**
  verilen filtreye sahip tüm kullanıcıları içeren bir DİZİ ye çözümlenir
 */
function goreBul(filtre) {
    return db("users").where(filtre);
}

/**
  verilen user_id li kullanıcıya çözümlenir, kullanıcı { user_id, username } içerir
 */
async function idyeGoreBul(user_id) {
      let user = await db("users").where({user_id}).first();
      return {user_id: user.user_id , username : user.username};
}

/**
  yeni eklenen kullanıcıya çözümlenir { user_id, username }
 */
async  function ekle(user) {
const ids = await db("users").insert(user);
return idyeGoreBul(ids[0]);
}

// Diğer modüllerde kullanılabilmesi için fonksiyonları "exports" nesnesine eklemeyi unutmayın.


module.exports={
  bul,
  ekle,idyeGoreBul,goreBul
}