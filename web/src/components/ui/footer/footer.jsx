import { useNavigate, Link } from "react-router-dom";
import footerLogo from "../../../assets/logo-footer.svg";

function Footer() {
  const navigate = useNavigate();
  const productCategories = [
    "T-shirt",
    "Shirt",
    "Pants",
    "Shoes",
    "Dress",
    "Accessories",
  ];

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <footer className="bg-my-black text-my-white py-10 font-montserrat rounded-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Vision */}
          <div>
            <img src={footerLogo} alt="Green Grove Logo" width="160" />
            <p className="mt-4 text-sm max-w-xs">
              Our vision is to offer sustainable fashion that reduces carbon
              footprints and promotes a greener future.
            </p>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold">About</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-lime-green">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-lime-green">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="text-lg font-semibold">Products</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {productCategories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="hover:text-lime-green"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-lg font-semibold">Social</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/ana713w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime-green"
                >
                  Ana Github
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/saragarpa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime-green"
                >
                  Sara Github
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-my-white my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between text-sm text-my-gray space-y-4 md:space-y-0">
          <p className="text-center md:text-left max-w-md">
            ©2025 <span className="font-semibold">Green Grove</span>
            . <br />
            This project was created as part of the{" "}
            <span className="font-semibold">
              Ironhack Web Development Bootcamp
            </span>
            . <br />
            All product rights belong to{" "}
            <span className="font-semibold">H&M</span>.
          </p>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-lime-green">
              Privacy & Policy
            </a>
            <a href="#" className="hover:text-lime-green">
              Terms & Condition
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
