
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require("./database/db_config");


passport.use(new GoogleStrategy({
    clientID: '826619648819-g0l750a2lhmq7uei1fr1er94g0i62e8n.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
  },
 async function(accessToken, refreshToken, profile, done) {

  

    db.connect(async function(err) {
        if (err) throw err;
        
        // let sql = `SELECT * FROM users WHERE uid='${profile.id}'`;


        //  db.query(sql, function (err, result) {
        //     console.log(result)


        //     try {
        //       if(result){
        //         console.log('ada')
        //         return done(null, profile)
        //       }
        //     } catch {
        //       console.log('tdk ada')
        //     }

             
            
        //   });

   

        let sql1 = `INSERT INTO users (uid, nama, provider, avatar) 
        VALUES (${profile.id}, '${profile.displayName}', '${profile.provider}', '${profile.photos[0].value}')`;

        await  db.query(sql1, function (err, result) {
          if (err) throw err;
          return done(null, profile)
        });


    });




    
  }
));

passport.serializeUser(function(user, cb) {
  
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});




