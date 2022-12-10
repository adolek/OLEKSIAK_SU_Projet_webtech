const userProfile = {
  username: "David",
  email: "david@adaltas.com",
};

export default function handler(req, res) {
  userProfile.isLoggedIn = true;
  res.status(200).json({ ...userProfile, isLoggedIn: true });
}
