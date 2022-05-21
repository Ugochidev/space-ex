const Apartment = require("../models/apartment.model");

// creating data for apartment
const addApartment = async (req, res, next) => {
  try {
    const { apartmentName, address } = req.body;
    const { filename } = req.file;

    const newApartment = await new Apartment.create({
      image: filename,
      apartmentName,
      address,
    });
    return res.status(201).json({
      success: true,
      newApartment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update apartment
const updateApartment = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const apartmentUpdate = await Apartments.findOneAndUpdate(
      { _id },
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json({
      apartmentUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// getting a single apartment with users unique email address
const fetchSingleApartment = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const singleApartments = await Apartment.findOne({ _id });
    if (!singleApartments) {
      return res.status(404).json({
        message: "Apartment Not Found!",
      });
    }
    return res.status(200).json({
      success: true,
      singleApartments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.messsage,
    });
  }
};

// getting the data of all registered apartments
const fetchApartments = async (req, res, next) => {
  try {
    const allApartments = await apartments.find();
    return res.status(200).json({
      success: true,
      allApartments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};