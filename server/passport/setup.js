const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

let googleOptions = {
    callbackURL:
        process.env.NODE_ENV === "production"
            ? "https://editorprod.herokuapp.com/api/google/redirect"
            : "/api/google/redirect",
    clientID:
        process.env.client_id || require("./googlePlus.json").web.client_id,
    clientSecret:
        process.env.client_secret ||
        require("./googlePlus.json").web.client_secret
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
        (accessToken, refreshToken, profile, done) => {
            // const user = await prisma.user.findUnique({
            //     where: {
            //         id: profile.id
            //     }
            // });
            // if (user) {
            //     return done(null, user);
            // } else {
            //     const newuser = await prisma.user.create({
            //         data: {
            //             id: profile.id,
            //             email: profile.email,
            //             name: profile.displayName
            //         }
            //     });
            //     return done(null, newuser);
            // }
            // const findQuery = `SELECT * FROM users WHERE displayName = $1`;
            // const findQueryValues = [profile.displayName];
            // client.query(findQuery, findQueryValues, (err, foundUser) => {
            //     foundUser = foundUser.rows[0];
            //     if (!foundUser) {
            //         const insertQuery =
            //             "INSERT INTO users(googleid, displayName) VALUES($1, $2) RETURNING *";
            //         const insertQueryValues = [profile.id, profile.displayName];
            //         client.query(
            //             insertQuery,
            //             insertQueryValues,
            //             (err, createdUser) => {
            //                 done(null, createdUser);
            //             }
            //         );
            //     } else {
            //         done(null, foundUser);
            //     }
            // });
        }
    )
);
