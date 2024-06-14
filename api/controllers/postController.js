const { Post, User, Etiqueta, Comentario } = require("../models");
const { Op } = require("sequelize");

const register = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post No encontrado" });
    }
    const updatedPost = await post.update(req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post No encontrado" });
    }
    await post.destroy();
    res.status(204).json({ message: "Post Eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.findAll({
      where: { user_id: userId, is_active: true },
      include: [{ model: User, attributes: ['username'] }]
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBanPostByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.findAll({
      where: { user_id: userId, is_active: false },
      include: [{ model: User, attributes: ['username'] }]
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const banPost = async (req, res) => {
  try {
    const { idPost } = req.params;
    const post = await Post.findByPk(idPost);
    if (!post) {
      return res.status(404).json({ error: "Post No encontrado" });
    }
    await post.update({ is_active: false });
    res.status(200).json({ message: "Post Bloqueado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allowPost = async (req, res) => {
  try {
    const { idPost } = req.params;
    const post = await Post.findByPk(idPost);
    if (!post) {
      return res.status(404).json({ error: "Post No encontrado" });
    }
    await post.update({ is_active: true });
    res.status(200).json({ message: "Post Desbloqueado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTagsByPost = async (req, res) => {
  try {
    const { idPost } = req.params;
    const post = await Post.findByPk(idPost, {
      include: [{ model: Etiqueta, as: 'etiquetas' }]
    });
    if (!post) {
      return res.status(404).json({ error: "Post No encontrado" });
    }
    res.status(200).json(post.etiquetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { idPost } = req.params;
    const post = await Post.findByPk(idPost, {
      include: [{ model: Comentario }]
    });
    if (!post) {
      return res.status(404).json({ error: "Post No encontrado" });
    }
    res.status(200).json(post.Comentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  update,
  deletePost,
  getBanPostByUser,
  getPostByUser,
  banPost,
  allowPost,
  getTagsByPost,
  getCommentsByPost,
};
