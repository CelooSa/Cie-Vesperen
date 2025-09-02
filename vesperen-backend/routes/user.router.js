const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const verifyAdmin = require("../middlewares/verifyadmin");
const verifyToken = require("../middlewares/auth") // ici j'importe verifyToken car ds mon auth j'ia déjà un middleware verifytoken



router.post("/signUp", UserController.postUser);
router.post("/signIn", UserController.signIn);
router.get("/verify/:token", UserController.verifyEmail);
router.put("/profile/update", verifyToken, UserController.updateMyProfile);


router.put("/me", verifyToken, UserController.updateMyProfile);


router.get("/all_users", verifyAdmin, UserController.getAllUsers);
router.get("/:id", verifyAdmin, UserController.getUserById);
router.put("/update/:id", verifyAdmin, UserController.updateUser);
router.delete("/deleteUser/:id", verifyAdmin, UserController.deleteUser);


module.exports = router;
