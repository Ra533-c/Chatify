import dotenv from "dotenv";
dotenv.config();
import passport from "passport"
import { Strategy as googleStrategy } from "passport-google-oauth20"
// GoogleStrategy = Google OAuth ke liye helper class
// "Strategy as GoogleStrategy" = Strategy class ko rename kar rahe hain

import { User } from "../models/userModel.js"

// STRUCTURE:
// passport.use(new GoogleStrategy(CONFIG_OBJECT, CALLBACK_FUNCTION));
//                                      ↑               ↑
//                            Settings dena      Data aane pe kya karna

passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: Jab Google verify kar le, data KAHAN bhejna hai
    // Google user ko is URL pe redirect karega with code
    callbackURL: '/api/v1/user/auth/google/callback',
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    // 4 PARAMETERS:
    // ─────────────
    // accessToken  = Google API key (ignore for just login)
    // refreshToken = Long-term key (ignore)
    // profile      = ★ USER DATA ★ (naam, email, photo)
    // done         = Function to signal "ho gaya"

    try {
        console.log('=== GOOGLE PROFILE DATA ===');
        console.log('ID:', profile.id);
        console.log('Name:', profile.displayName);
        console.log('Email:', profile.emails[0].value);
        console.log('Photo:', profile.photos[0]?.value);
        console.log('===========================');

        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            console.log("user already exists : ", user.email);
            return done(null, user);
        }

        // STEP 2: Check - Kya is email se koi normal account hai?
        // Action: Accounts ko LINK kar do
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            user.googleId = profile.id;
            user.authProvider = "google";

            if (!user.profilePhoto) {
                user.profilePhoto = profile.photos[0]?.value || '';
            }

            await user.save();
            return done(null, user);
        }

        // STEP 3: Bilkul NAYA user hai
        // Action: Naya account CREATE karo

        // Username generate karo (unique banana hai)
        const emailUsername = profile.emails[0].value.split('@')[0];
        const uniqueUsername = emailUsername + "_" + profile.id;
        // "rahul" + "_" + 1706859823456 = "rahul_1706859823456"


        const newUser = await User.create({
            fullName: profile.displayName,
            username: uniqueUsername,
            email: profile.emails[0].value,
            profilePhoto: profile.photos[0]?.value || '',
            authProvider: "google",
            googleId: profile.id
        });
        return done(null, newUser);
    } catch (err) {
        console.log(err);
        return done(err, null);
    }
}));


// Passport sets req.user = user/newUser;

export default passport;