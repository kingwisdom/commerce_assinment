import roles from '../roles.js';
import Boom from 'boom';

// import AccessControl from 'accesscontrol';


// const ac = new AccessControl();

// const roles = () => {
//   ac.grant('user').readAny('product');
//   ac.grant('admin').extend('user').createAny('product');

//   return ac;
// };

const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    const permission = roles.can(req.payload.role)[action](resource);

    if (!permission.granted) {
      return next(Boom.unauthorized("You don't have permission."));
    }

    next();
  };
};

export default grantAccess;
