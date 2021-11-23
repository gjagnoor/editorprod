const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let googleOptions = {
    callbackURL:
        process.env.NODE_ENV === "development"
            ? "/api/google/redirect"
            : `https://codebasev1.herokuapp.com/api/google/redirect`,
    clientID:
        process.env.client_id || require("./googleSetup.json").web.client_id, // google plus
    clientSecret:
        process.env.client_secret ||
        require("./googleSetup.json").web.client_secret
};

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        googleOptions,
        async (accessToken, refreshToken, profile, done) => {
            const user = await prisma.user.findUnique({
                where: {
                    id: profile.id
                }
            });
            if (user) {
                return done(null, user);
            } else {
                const newuser = await prisma.user.create({
                    data: {
                        id: profile.id,
                        name: profile.displayName
                    }
                });
                return done(null, newuser);
            }
        }
    )
);
