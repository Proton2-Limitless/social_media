import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formatedFriends = friends.map(
      ({ _id, firstNAme, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstNAme,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    return res.status(200).json(formatedFriends);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addRemoveFirend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = user.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formatedFriends = friends.map(
      ({ _id, firstNAme, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstNAme,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    return res.status(200).json(formatedFriends);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
