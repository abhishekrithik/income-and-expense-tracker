const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const{
    registerUser,
    loginUser,
    getUserInfo,
}= require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/getUser",protect,getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Always force https:// with your Render domain
    const imageUrl = `https://income-and-expense-tracker-4gp3.onrender.com/uploads/${req.file.filename}`;

    res.status(200).json({ imageUrl });
});


module.exports = router;