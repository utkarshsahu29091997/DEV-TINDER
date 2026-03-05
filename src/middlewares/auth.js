const adminAuth = (req, res, next) => {
  console.log("Admin auth middleware");
  const token = "xyx";
  const isAdminAuthorized = token === "xyx";
  if (!isAdminAuthorized) {
    res.status(401).send("Admin Unauthorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User auth middleware");
  const token = "abc";
  const isUserAuthorized = token === "abc";
  if (!isUserAuthorized) {
    res.status(401).send("User Unauthorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
