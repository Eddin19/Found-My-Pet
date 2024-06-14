const { User } = require("../models");
const { Op } = require("sequelize");

const register = async (req, res) => {
  try {
    // Validar si email ya se utilizó
    const { email } = req.body;
    const verifyEmail = await User.findOne({ where: { email } });
    if (verifyEmail) {
      return res.status(400).json({ message: "Email ya registrado" });
    }

    // Lógica para registrar un nuevo usuario
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const {
      username,
      email,
      telefono,
      ciudad,
      foto_perfil,
      first_name,
      last_name,
      phone_number,
      date_of_birth,
      profile_picture_url,
      bio,
      address,
      city,
      state,
      notification_preferences,
      privacy_settings,
      is_active,
      role,
    } = req.body;
    const { id } = req.params;

    // Validar si User existe para actualizar
    let user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario No encontrado" });
    }

    user = await user.update({
      username,
      email,
      telefono,
      ciudad,
      foto_perfil,
      first_name,
      last_name,
      phone_number,
      date_of_birth,
      profile_picture_url,
      bio,
      address,
      city,
      state,
      notification_preferences,
      privacy_settings,
      is_active,
      role,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Validar si User existe para actualizar
    let user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "Usuario No encontrado" });
    }

    await user.destroy();
    res.status(204).json({ message: "Usuario Eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  const {
    username,
    email,
    ciudad,
    first_name,
    last_name,
    phone_number,
    address,
    city,
    state,
    is_active,
    role,
  } = req.query;

  try {
    //clausula dinamica para filtros conbinados
    let whereClause = {};

    //Construccion de la clausula dinamica
    if (username) {
      whereClause.username = { [Op.like]: `%${username}%` };
    }
    if (email) {
      whereClause.email = { [Op.like]: `%${email}%` };
    }
    if (ciudad) {
      whereClause.ciudad = { [Op.like]: `%${ciudad}%` };
    }
    if (first_name) {
      whereClause.first_name = { [Op.like]: `%${first_name}%` };
    }
    if (last_name) {
      whereClause.last_name = { [Op.like]: `%${last_name}%` };
    }
    if (phone_number) {
      whereClause.phone_number = { [Op.like]: `%${phone_number}%` };
    }
    if (address) {
      whereClause.address = { [Op.like]: `%${address}%` };
    }
    if (city) {
      whereClause.city = { [Op.like]: `%${city}%` };
    }
    if (state) {
      whereClause.state = { [Op.like]: `%${state}%` };
    }
    if (is_active) {
      whereClause.is_active = { [Op.like]: `%${is_active}%` };
    }
    if (role) {
      whereClause.role = { [Op.like]: `%${role}%` };
    }

    const users = await User.findAll({ where: whereClause });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const savePreferences = async (req, res) => {
  const { id } = req.params;
  const { notification_preferences, privacy_settings } = req.body;

  try {
    //Verificar si usuario existe y traerlo
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario No encontrado" });
    }

    await user.update({
      notification_preferences,
      privacy_settings,
    });

    res.status(200).json({ message: "Preferencias guardadas correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    //Verificar si usuario existe y traerlo
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario No encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  update,
  deleteUser,
  getAllUsers,
  savePreferences,
  getUserById,
};
