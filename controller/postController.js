const PostMessage = require("../model/PostMessage");

exports.getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, message, creator, tags } = req.body;
  const newPostMessage = new PostMessage({
    title,
    message,

    creator,
    tags,
  });

  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, tags } = req.body;

  const updatedPost = { creator, title, message, tags, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  await PostMessage.findByIdAndDelete(id);

  res.json({ message: `${id} deleted successfully` });
};
