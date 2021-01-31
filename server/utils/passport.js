const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const CustomDate = require('./date');

const createOrRetrieveUser = async (userInfo) => {
  // Setea facebookId o googleId
  userInfo[`${userInfo.provider}Id`] = userInfo.id;

  // Busca el usuario por id o email
  let user = await User.query()
    .findOne({ email: userInfo.email })
    .withGraphFetched('address.city.province');

  // Si no existe el usuario
  if (!user) {
    // Borra campos que no interesan
    userInfo.id = undefined;
    userInfo.provider = undefined;

    // Creo usuario
    user = await User.query().insertAndFetch(userInfo);
  } else {
    // Si existe, actualizo informacion

    // Fecha de logueo
    const userPatch = {
      lastLogin: new CustomDate().MYSQLParse(),
    };

    // Si existe una cuenta con el mismo email pero no esta guardado el inicio por otra red, la vincula
    if (!user[`${userInfo.provider}Id`]) {
      userPatch[`${userInfo.provider}Id`] = userInfo.id;
    }

    // Hace el update del user y lo devuelve
    user = await user.$query().patchAndFetch(userPatch);
  }

  return user;
};

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${
          process.env.NODE_ENV === 'production' ? process.env.API_URL : ''
        }/api/v1/auth/google/callback`,
        session: false,
      },
      async (accessToken, refreshToken, profile, done) => {
        const userInfo = {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          provider: profile.provider,
        };

        const user = await createOrRetrieveUser(userInfo);

        done(null, user);
      }
    )
  );
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `${
          process.env.NODE_ENV === 'production' ? process.env.API_URL : ''
        }/api/v1/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'photos', 'emails', 'birthday'], // email should be in the scope.
        session: false,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('1');
        const userInfo = {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photo: `https://graph.facebook.com/${profile.id}/picture?type=large&width=720&height=720`,
          provider: profile.provider,
        };

        const user = await createOrRetrieveUser(userInfo);

        done(null, user);
      }
    )
  );
};
