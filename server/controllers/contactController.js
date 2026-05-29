import ContactEnquiry from "../models/ContactEnquiry.js";

//Public: create ContactEnquiry
export const createContactEnquiry = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      consultationType,
      preferredMode,
      preferredDate,
      message,
    } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and Message are Required",
      });
    }

    const enquiry = await ContactEnquiry.create({
      name,
      phone,
      email,
      consultationType,
      preferredMode,
      preferredDate,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry Submitted Successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin : Get All Enquiry
export const getContactEnquiries = async (req, res) => {
  try {
    const enquiries = await ContactEnquiry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Admin : get Single ContactEnquiry
export const getContactEnquiryById = async (req, res) => {
  try {
    const enquiry = await ContactEnquiry.findById(req.params.id);

    if (!enquiry) {
      res.status(404).json({
        success: true,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Admin : Update Enquiry status
export const updateContactEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["New", "Contacted", "Closed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Status",
      });
    }

    const enquiry = await ContactEnquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!enquiry) {
      res.status(404).json({
        success: false,
        message: "enquiry not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status Updated Successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin : Delete Enquiry
export const deleteContactEnquiry = async (req, res) => {
  try {
    const enquiry = await ContactEnquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
