const setUserActive = (req, res) => {
  // You can manually invoke the privat middleware here
  privat(req, res, () => {
    // req.user is available here
    const user = req.user;

    // Your internal function logic using req.user
    console.log('User:', user);

    // Respond as needed
    res.send(`Internal function response for user: ${user.username}`);
  });
};