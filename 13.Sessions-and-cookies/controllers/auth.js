exports.getLogin = (req, res, next) => {
  const isLoggedIn =  req.get('Cookie').split('=')[1].trim().split()[0];
  console.log(req.get('Cookie'))
  console.log(isLoggedIn, typeof isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn
  });
};


exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true');
  res.redirect('/');
};