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
            <img
              src={footerLogo}
              alt="Green Grove Logo"
              width="160"
            />
            <p className="mt-4 text-sm">
              Our vision is to offer sustainable fashion<br></br> that reduces carbon
              footprints<br></br> and promotes a greener future.
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
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime-green"
                >
                  Ana Github
                </a>
              </li>
              <li>
                <a
                  href="#"
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
        <div className="flex flex-col md:flex-row justify-between text-sm text-my-gray">
          <p>©2025 Green Grove. <br></br>This project was created as part of the Ironhack bootcamp.<br></br>
          All product rights belong to H&M.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
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
