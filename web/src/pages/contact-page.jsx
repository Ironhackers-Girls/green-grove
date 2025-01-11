import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import Lottie from "react-lottie";
import contactAnimation from "../assets/contactAnimation.json";

const initialData = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
};

function ContactPage() {
  const [formData, setFormData] = useState(initialData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: contactAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSnackbarMessage("Message sent successfully");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    console.log("Form Data Submitted:", formData);
    setFormData(initialData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="font-montserrat py-12">
      <div className="max-w-full mx-auto px-5 sm:px-10 lg:px-15 space-y-12">
        {/* Title */}
        <div className="text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-my-black">
            Welcome to <span className="text-dark-green">Green Grove</span>
            <br />
            Let's make sustainable choices!
          </h1>
        </div>

        <hr className="border-gray-300 my-6" />

        {/* Questions */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 text-center">
          <div>
            <p className="font-semibold text-lg text-gray-800">
              Have any questions about our products?
            </p>
            <a
              href="mailto:support@greengrove.com"
              className="relative text-dark-green hover:underline"
            >
              support@greengrovecorp.com
            </a>
          </div>
          <div>
            <p className="font-semibold text-lg text-gray-800">
              Prefer to contact us directly?
            </p>
            <a
              href="mailto:info@greengrove.com"
              className="relative text-dark-green hover:underline"
            >
              info@greengrovecorp.com
            </a>
          </div>
          <div>
            <p className="font-semibold text-lg text-gray-800">
              Are you a current or future customer?
            </p>
            <a href="#" className="relative text-dark-green hover:underline">
              Let us know how we can assist you
            </a>
          </div>
        </div>

        <hr className="border-gray-300 my-6" />

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-semibold text-gray-900 mb-8">
              Send us your request
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-dark-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Enter your company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-1 w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-dark-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-dark-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[\d\+\-\(\)\s]*"
                  className="mt-1 w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-dark-green focus:outline-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mt-2 px-6 py-3 bg-lime-green text-dark-green text-xs sm:text-sm font-semibold rounded-full hover:bg-dark-green hover:text-white transition-all"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <Lottie
              options={lottieOptions}
              height={300}
              width="100%"
              style={{
                maxWidth: "500px",
                width: "100%",
                height: "auto",
                cursor: "default",
              }}
            />
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ContactPage;
