import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../api/v1/models/user';
import config from 'config';
import {decryptReversibleUuid, getDataFromToken} from "../utils/tokenUtils";


passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
          console.log("Local strategy")
        const user = await User.findOne({ email: email });

          console.log("User", user)

        if (!user) {
            console.log("Arrivi qua?")
          return done(null, false, { message: 'Invalid email or password' });
        }

          console.log("Userddddd")

        const isPasswordValid = await user.comparePassword(password);

          console.log("isValidPassword", isPasswordValid)

        if (!isPasswordValid) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

//JWT Strategy
passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("auth.secret"),
    },
    async (payload, done) => {
      try {
        if (payload.exp && Date.now() >= payload.exp * 1000) {
          return done(null, false, { message: 'Token has expired' });
        }

        let decryptedId: string = decryptReversibleUuid(payload.uuid)
        const user = await User.findById(decryptedId);
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
