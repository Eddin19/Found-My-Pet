const { Etiqueta, Post, Mascota } = require('../models');
const { Op } = require('sequelize');

// Registrar una nueva etiqueta
const register = async (req, res) => {
  try {
    const newTag = await Etiqueta.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una etiqueta existente
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Etiqueta.findByPk(id);
    if (!tag) {
      return res.status(404).json({ error: 'Etiqueta no encontrada' });
    }
    const updatedTag = await tag.update(req.body);
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una etiqueta
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Etiqueta.findByPk(id);
    if (!tag) {
      return res.status(404).json({ error: 'Etiqueta no encontrada' });
    }
    await tag.destroy();
    res.status(204).json({ message: 'Etiqueta eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las publicaciones por etiqueta
const getAllPostsByTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Etiqueta.findByPk(id, {
      include: [{ model: Post, as: 'posts' }]
    });
    if (!tag) {
      return res.status(404).json({ error: 'Etiqueta no encontrada' });
    }
    res.status(200).json(tag.posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las mascotas por etiqueta
const getAllPetsByTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Etiqueta.findByPk(id, {
      include: [{ model: Mascota, as: 'mascotas' }]
    });
    if (!tag) {
      return res.status(404).json({ error: 'Etiqueta no encontrada' });
    }
    res.status(200).json(tag.mascotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las etiquetas
const getAllTags = async (req, res) => {
  try {
    const tags = await Etiqueta.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Asignar una etiqueta a una publicación
const setTagToPost = async (req, res) => {
  try {
    const { tagId, postId } = req.params;
    const tag = await Etiqueta.findByPk(tagId);
    const post = await Post.findByPk(postId);

    if (!tag || !post) {
      return res.status(404).json({ error: 'Etiqueta o Publicación no encontrada' });
    }

    await tag.addPost(post);
    res.status(200).json({ message: 'Etiqueta asignada a la Publicación' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Asignar una etiqueta a una mascota
const setTagToPet = async (req, res) => {
  try {
    const { tagId, petId } = req.params;
    const tag = await Etiqueta.findByPk(tagId);
    const pet = await Mascota.findByPk(petId);

    if (!tag || !pet) {
      return res.status(404).json({ error: 'Etiqueta o Mascota no encontrada' });
    }

    await tag.addMascota(pet);
    res.status(200).json({ message: 'Etiqueta asignada a la Mascota' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una etiqueta por nombre
const getTagByName = async (req, res) => {
  try {
    const { name } = req.params;
    const tag = await Etiqueta.findOne({ where: { nombre: name } });
    if (!tag) {
      return res.status(404).json({ error: 'Etiqueta no encontrada' });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar la asignación de una etiqueta a una publicación
const unsetTagToPost = async (req, res) => {
  try {
    const { tagId, postId } = req.params;
    const tag = await Etiqueta.findByPk(tagId);
    const post = await Post.findByPk(postId);

    if (!tag || !post) {
      return res.status(404).json({ error: 'Etiqueta o Publicación no encontrada' });
    }

    await tag.removePost(post);
    res.status(200).json({ message: 'Etiqueta removida de la Publicación' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar la asignación de una etiqueta a una mascota
const unsetTagToPet = async (req, res) => {
  try {
    const { tagId, petId } = req.params;
    const tag = await Etiqueta.findByPk(tagId);
    const pet = await Mascota.findByPk(petId);

    if (!tag || !pet) {
      return res.status(404).json({ error: 'Etiqueta o Mascota no encontrada' });
    }

    await tag.removeMascota(pet);
    res.status(200).json({ message: 'Etiqueta removida de la Mascota' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  update,
  deleteTag,
  getAllPostsByTag,
  getAllPetsByTag,
  getAllTags,
  setTagToPost,
  setTagToPet,
  getTagByName,
  unsetTagToPost,
  unsetTagToPet,
};
