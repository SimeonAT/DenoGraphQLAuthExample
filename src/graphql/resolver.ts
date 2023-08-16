import AuthController from "../auth/controller.ts";
import BaseController from "../base/controller.ts";
import authorize from '../auth/middleware.ts';

const base = new BaseController();
const auth = new AuthController();

const resolvers = {
  Query: {
    backend: base.defaultResolver,
    login: auth.authenticate,
    auth: authorize(auth.authorized, ['user', 'admin']),
    admin: authorize(auth.admin, ['admin']),
  },
};

export default resolvers;