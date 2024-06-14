const { Comentario, Post, User } = require('../models');
const { Op } = require('sequelize');

// Registrar un nuevo comentario
const register = async (req, res) => {
  try {
    const newComment = await Comentario.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un comentario existente
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comentario.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    const updatedComment = await comment.update(req.body);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un comentario
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comentario.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    await comment.destroy();
    res.status(204).json({ message: 'Comentario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Banear un comentario (desactivar)
const ban = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comentario.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    const updatedComment = await comment.update({ is_active: false });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los comentarios por publicación
const allcommentsByPost = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comentario.findAll({ where: { post_id: id, is_active: true } });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los comentarios por usuario
const allcommentsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comentario.findAll({ where: { user_id: id, is_active: true } });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un comentario por ID
const commentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comentario.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  update,
  deleteComment,
  ban,
  allcommentsByPost,
  allcommentsByUser,
  commentById,
};
