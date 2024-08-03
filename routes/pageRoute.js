const express=require("express");

const pageController=require("../controllers/pageController")
const redicretMiddleware=require("../middlewares/redirectMiddleware");


const router = express.Router()

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/register").get(redicretMiddleware,pageController.getRegisterPage);
router.route("/login").get(redicretMiddleware,pageController.getLoginPage);

module.exports=router;