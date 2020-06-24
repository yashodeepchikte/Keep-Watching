const passport = require("passport")
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy
const keys = require("./passport-config")

const User = require("./models/user.model")

//  Serialize Cookie
passport.serializeUser( (user, done) => {
    done(null, user.id)                 // the first argument are the errors
})

// Deserialize cookie
passport.deserializeUser( async (id, done) => {       // now in serialize we gave done only id thus deser.. will take id
    const currentUser = await User.findById(id)
    console.log("the deserialized user = ", currentUser)
    done(null, currentUser)                 // the first argument are the errors
})

passport.use(
    new GoogleStrategy(
        {
            //  options for the strategy
            callbackURL: "/auth/google/redirect",
            clientID : keys.google.clientID,
            clientSecret: keys.google.clientSecret
        },
        async (accessToken, refreshToken, profile, done) => {
            //  passport callback function
            //  this is called when the control returns with the 
            //    console.log(profile)
            const foundUser = await User.findOne({ providerID: profile.id })
            if (!foundUser)
           {
                await new User({
                    username: profile.displayName,
                    provider: profile.provider,
                    profile_pic_url: profile.picture,
                    name: profile.name,
                    providerID: profile.id,
                    email: profile.email
                 })
                .save()
                .then( newUser =>{
                    console.log("New user was saved \n", newUser)
                    done(null, newUser)
                })

                
            }else{
                console.log("USer already exists:", foundUser)
                await done(null, foundUser )
            }
        })
)
