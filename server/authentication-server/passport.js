const passport = require("passport")
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy
const keys = require("./passport-config")

const User = require("./models/user.model")


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
                .then( newUser => console.log("New user was saved \n", newUser))
            }else{
                console.log("USer already exists:", foundUser)
            }
        })
)
