const { Mascota, User, Etiqueta } = require('../models');
const { Op } = require('sequelize');

// Registrar una nueva mascota
const register = async (req, res) => {
  try {
    const newPet = await Mascota.create(req.body);
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una mascota existente
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Mascota.findByPk(id);
    if (!pet) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }
    const updatedPet = await pet.update(req.body);
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una mascota
const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Mascota.findByPk(id);
    if (!pet) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }
    await pet.destroy();
    res.status(204).json({ message: 'Mascota eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener el usuario dueño de una mascota
const getUserByPet = async (req, res) => {
  try {
    const { petId } = req.params;
    const pet = await Mascota.findByPk(petId, {
      include: [{ model: User, attributes: ['id', 'username', 'email'] }]
    });
    if (!pet) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }
    res.status(200).json(pet.User);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las mascotas
const getAllPets = async (req, res) => {
  try {
    const pets = await Mascota.findAll({
      include: [{ model: User, attributes: ['id', 'username'] }]
    });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  update,
  deletePet,
  getUserByPet,
  getAllPets,
};
