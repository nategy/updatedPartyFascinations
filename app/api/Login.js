export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ success: false, message: "Method not allowed" });
    }

    const { username, password } = req.body;

    const correctUsername = process.env.LOGIN_USERNAME;
    const correctPassword = process.env.LOGIN_PASSWORD;

    if (
      username?.toLowerCase() === correctUsername &&
      password === correctPassword
    ) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
