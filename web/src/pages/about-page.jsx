import Lottie from "react-lottie";
import aboutImage from "../assets/aboutImage.json";

function AboutPage() {
  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: aboutImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="font-montserrat text-my-black">
      {/* Hero Section */}
      <div className="relative bg-lime-green text-center py-24 px-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          ABOUT{" "}
          <span className="underline decoration-wavy text-dark-green decoration-dark-green">
            GREEN GROVE
          </span>
        </h1>
        <p className="text-lg sm:text-xl mt-6 text-gray-800 leading-relaxed max-w-xl mx-auto">
          Where fashion meets sustainability in perfect harmony.
        </p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-20 px-6 md:px-8">
        {/* Left Column */}
        <div className="space-y-12 flex flex-col justify-between min-h-full">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-wide">
              Who We Are
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Green Grove is a global women’s fashion brand creating timeless,
              sustainable clothing. With eco-friendly materials, ethical
              practices, and cutting-edge technology, we empower women to make
              conscious choices.
            </p>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-wide">
              Our Commitment
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We integrate the{" "}
              <span className="text-dark-green font-semibold">
                Carbon Interface API
              </span>{" "}
              to calculate shipment carbon footprints, helping you make
              informed, sustainable decisions.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex justify-center items-center min-h-full">
          <Lottie options={lottieOptions} height={400} width={400} style={{ cursor: 'default' }}/>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-my-gray py-20">
        <div className="container mx-auto text-center space-y-6 md:space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-green tracking-tight">
            Our Vision
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            To lead in combining fashion, sustainability, and innovation. Green
            Grove is a movement inspiring women to make stylish and responsible
            choices.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
            <div className="bg-my-white shadow-md p-8 rounded-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-dark-green">
                Sustainable Design
              </h3>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Eco-friendly materials and ethical production practices.
              </p>
            </div>
            <div className="bg-my-white shadow-md p-8 rounded-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-dark-green">
                Carbon Awareness
              </h3>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Track and reduce the carbon emissions of your purchases.
              </p>
            </div>
            <div className="bg-my-white shadow-md p-8 rounded-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-dark-green">
                Global Reach
              </h3>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Accessible in stores across the globe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
