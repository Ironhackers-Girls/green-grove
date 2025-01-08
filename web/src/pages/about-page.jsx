function AboutPage() {
  return (
    <section className="font-montserrat">
      {/* Hero Section */}
      <div className="bg-lime-green p-20 text-center">
        <h1 className="text-5xl font-bold text-my-black">
          About Green Grove
        </h1>
        <p className="text-lg text-dark-green mt-4">
          Where fashion and sustainability unite.
        </p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-16 px-6">
        {/* Text Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Who We Are</h2>
          <p className="mt-4 text-gray-600">
            Green Grove is a global women’s fashion brand dedicated to creating
            timeless, sustainable clothing. Combining high-quality materials,
            ethical practices, and cutting-edge technology, we bring
            eco-conscious fashion to women around the world.
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mt-8">
            Our Commitment
          </h2>
          <p className="mt-4 text-gray-600">
            By integrating the{" "}
            <span className="font-semibold text-dark-green">
              Carbon Interface API
            </span>
            , we calculate the carbon footprint of every shipment, empowering
            you to make informed, sustainable choices.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Sustainable Fashion"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-my-gray py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-dark-green">Our Vision</h2>
          <p className="text-lg text-my-black mt-4">
            To lead the way in combining fashion, sustainability, and
            innovation. Green Grove is more than a brand—it’s a movement to
            inspire women to make choices that are both stylish and responsible.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-my-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-dark-green">
                Sustainable Design
              </h3>
              <p className="mt-2 text-gray-600">
                Eco-friendly materials and ethical production practices.
              </p>
            </div>
            <div className="bg-my-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-dark-green">
                Carbon Awareness
              </h3>
              <p className="mt-2 text-gray-600">
                Track and reduce the carbon emissions of your purchases.
              </p>
            </div>
            <div className="bg-my-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-dark-green">
                Global Reach
              </h3>
              <p className="mt-2 text-gray-600">
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
