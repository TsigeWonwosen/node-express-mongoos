const getIt = function (req, res) {
  res.render('admin', { title: 'Admin - IT page ' });
};

const getAdmin = function (req, res) {
  res.render('admin', { title: 'Admin Page' });
};
module.exports = {
  getIt,
  getAdmin,
};
