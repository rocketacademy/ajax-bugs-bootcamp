import jsSHA from 'jssha';

export default function initUsersController(db) {
  const login = async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });
      console.log('user password', user.password);

      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(req.body.password);
      const hashedPassword = shaObj.getHash('HEX');
      console.log('hashed password', hashedPassword);

      if (hashedPassword === user.password) {
        res.cookie('loggedIn', true);
        res.cookie('userId', user.id);
        res.render('root', { user });
      } else {
        res.send('you need to log in');
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  return { login };
}
