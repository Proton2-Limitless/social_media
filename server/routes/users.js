import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFirend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router()
//READ
router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)

//DELETE
router.patch("/:id/:friendId", verifyToken, addRemoveFirend)

export default router
