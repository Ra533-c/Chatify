// Route 1: Google pe redirect karo
// Route 2: Google se data receive karo, process karo

import express from 'express';
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';
const router = express.Router();

// ═══════════════════════════════════════════════════════════════════════
// ROUTE 1: Start Google OAuth
// ═══════════════════════════════════════════════════════════════════════
// 
// URL: GET /api/v1/user/auth/google
// 
// FLOW:
// ─────
// 1. User "Login with Google" button click karta hai
// 2. Frontend is URL pe redirect karta hai
// 3. passport.authenticate('google') chalta hai
// 4. Passport ek Google URL banata hai
// 5. User ko Google login page pe redirect kar deta hai
// 
// NOTES:
// ──────
// - scope: ['profile', 'email'] = Google se kya data chahiye
//   - 'profile' = naam, photo
//   - 'email' = email address
// 
// - Is route ka koi response nahi hai (res.send nahi hai)
// - Ye sirf REDIRECT karta hai
// ═══════════════════════════════════════════════════════════════════════

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

/*
 * Ye internally kya karta hai:
 * 
 * 1. passport._strategies['google'] find karta hai
 * 2. GoogleStrategy.authenticate() call karta hai
 * 3. Ye URL banata hai:
 *    https://accounts.google.com/o/oauth2/v2/auth?
 *        client_id=YOUR_CLIENT_ID&
 *        redirect_uri=http://localhost:8000/api/v1/user/auth/google/callback&
 *        scope=profile%20email&
 *        response_type=code
 * 4. User ko is URL pe redirect kar deta hai
 */


// ROUTE 2: Google OAuth Callback
// ═══════════════════════════════════════════════════════════════════════
// 
// URL: GET /api/v1/user/auth/google/callback
// 
// FLOW:
// ─────
// 1. User Google pe login karta hai
// 2. Google user ko IS URL pe redirect karta hai
//    URL mein 'code' hota hai: /callback?code=xyz123
// 3. passport.authenticate('google') phir se chalta hai
// 4. BUT is baar code hai, to:
//    - Passport code → token exchange karta hai
//    - Passport token → profile fetch karta hai
//    - TUMHARA CALLBACK FUNCTION CHALTA HAI (passport.js mein)
//    - done(null, user) ke baad req.user set hota hai
// 5. Agle handler function mein req.user available hai
// 6. JWT token banao, cookie set karo, frontend pe redirect karo
// 
// ═══════════════════════════════════════════════════════════════════════

router.get('/google/callback',

    // ── Middleware 1: Passport Authentication ──
    // Ye pehle chalta hai
    // req.user mein user object daal deta hai
    passport.authenticate('google', {
        session: false,        // Sessions use nahi kar rahe (JWT use karenge)
        failureRedirect: '/login'  // Agar fail ho to kahan jaaye
    }),

    // ── Middleware 2: Final Handler ──
    // Ye TAB chalta hai jab Passport complete ho jaye
    // Ab req.user mein user object hai
    (req, res) => {

        try {
            // ───────────────────────────────────────────────────────
            // STEP 1: Check - User mila?
            // ───────────────────────────────────────────────────────
            if (!req.user) {
                console.log('No user found after Google auth');
                return res.redirect(process.env.CLIENT_URL + '/login?error=auth_failed');
            }

            console.log('Google auth successful for:', req.user.email);


            // ───────────────────────────────────────────────────────
            // STEP 2: JWT Token Banao
            // 
            // Same logic jo tumhare normal login mein hai
            // Token mein user ID store karo
            // ───────────────────────────────────────────────────────
            const token = jwt.sign(
                { userId: req.user._id },          // Payload: User ID
                process.env.JWT_SECRET_KEY,        // Secret key
                { expiresIn: '1d' }                // 1 day valid
            );


            // ───────────────────────────────────────────────────────
            // STEP 3: Cookie Set Karo
            // 
            // Token ko cookie mein daalo
            // httpOnly: true = JavaScript se access nahi kar sakte (security)
            // ───────────────────────────────────────────────────────
            res.cookie('token', token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,   // 1 day in milliseconds
                httpOnly: true,                    // Security: JS can't access
                sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",                   // CSRF protection
                secure: process.env.NODE_ENV !== "development"  // HTTPS only in production
            });


            // ───────────────────────────────────────────────────────
            // STEP 4: Frontend pe Redirect Karo
            // 
            // User ko chat page pe le jao
            // Cookie browser mein set ho gayi hai
            // Ab user logged in hai!
            // ───────────────────────────────────────────────────────
            console.log('Redirecting to frontend...');
            res.redirect(process.env.CLIENT_URL + '/chat');

        } catch (error) {
            console.error('Callback Error:', error);
            res.redirect(process.env.CLIENT_URL + '/login?error=server_error');
        }
    }
);
// ───────────────────────────────────────────────────────────────────────
// EXPORT
// ───────────────────────────────────────────────────────────────────────
export default router;