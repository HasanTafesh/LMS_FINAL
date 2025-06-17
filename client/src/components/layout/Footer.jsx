import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="text-white mb-3 fw-bold">Skillora</h5>
            <p className="text-white-90">
              Empowering learners worldwide with quality education and practical skills.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="text-white mb-3 fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-90 text-decoration-none hover-lift">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/courses" className="text-white-90 text-decoration-none hover-lift">
                  Courses
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white-90 text-decoration-none hover-lift">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white-90 text-decoration-none hover-lift">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="text-white mb-3 fw-bold">Contact Us</h5>
            <ul className="list-unstyled text-white-90">
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-envelope me-2"></i>
                info@skillora.com
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-telephone me-2"></i>
                +1 (555) 123-4567
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-geo-alt me-2"></i>
                123 Education St, Learning City
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4 border-white-25" />
        <div className="text-center text-white-90">
          <small>&copy; {new Date().getFullYear()} Skillora. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 