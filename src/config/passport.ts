import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../api/v1/models/user';
import config from 'config';


passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        const isPasswordValid = await user.comparePassword(password);

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
      secretOrKey: config.get("host.auth_secret"),
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id);
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
