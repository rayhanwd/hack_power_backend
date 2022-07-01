const jwt = require('jsonwebtoken');

module.exports.Authenticated = async function (req,res,next) {
    try {
        const verified = await jwt.verify(
          req.headers.token,
          process.env.JWT_SECRET
        );
    
        if (!verified) {
          return res.status(400).json({
            error: true,
            data: null,
            token: null,
            message: 'You have no permission to access!',
          });
        }
        next();
      } catch (e) {
        return res.status(500).json({
          message: 'route for only logged user',
        });
      }
}
