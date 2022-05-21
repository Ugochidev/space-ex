const Booking = require("../models/apartment.model");

const bookApartment = async (req, res, next) => {
  try {
    const { arrivalDate, departureDate, numberOfGuests, numberOfNights } =
      req.body;
    // validating reg.body with joi
    // await validatebooking.validateAsync(req.body);

    // booking
    const newbooking = await Booking.create({
      arrivalDate,
      departureDate,
      numberOfGuests,
      numberOfNights,
     });
    return successResMsg(res, 201, {
      message: "Apartment booked",
      newbooking,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const removeBooking = await Booking.findOneAndDelete({ _id});
    return res.status(200).json({
      removeBooking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

