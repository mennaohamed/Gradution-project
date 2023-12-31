const express = require("express")
const router = express.Router()
const registerController = require("../controllers/registerController")
const auth = require('../middleware/auth')
const checkRole = require("../middleware/role")

router.post("/register",async (req, res) =>{
  await registerController.addNewUser(req, res)
})

router.get("/register", auth,checkRole("User" , "admin"),(req, res) => {
  registerController.getAllUsers(req, res)
})

router.get("/register/:userId", auth,checkRole("admin"),(req, res) => {
  registerController.getUserById(req, res)
})

router.put("/register/:id", auth,checkRole("admin"),async (req, res) => {
  await registerController.updateUserInfoById(req, res)
})

router.delete("/register/:userId",auth,checkRole("User","admin","Association"),(req, res) => {
  registerController.deleteUserById(req, res)
})

router.post("/login", async (req, res) =>{
  await registerController.adduserRegisteralready(req, res)
})

router.patch("/logout/:_id", auth,checkRole("User","Association"),async (req, res) => {
  await registerController.deleteUser(req, res)
})

module.exports = router
