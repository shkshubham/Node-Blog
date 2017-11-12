var index = function(req, res) {
    res.render('profile',{
      user:req.user
    });
};

var store = function (req, res) {

};

module.exports = {
  index,
  store
}
