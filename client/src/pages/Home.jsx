import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Welcome to Skillora - Your Learning Journey Starts Here
              </h1>
              <p className="lead mb-4">
                Discover a world of knowledge with our comprehensive learning
                platform. Access courses, connect with instructors, and achieve
                your learning goals.
              </p>
              {!isAuthenticated ? (
                <div className="d-grid gap-2 d-md-flex">
                  <Link to="/register" className="btn btn-light btn-lg px-4 me-md-2">
                    Get Started
                  </Link>
                  <Link to="/courses" className="btn btn-outline-light btn-lg px-4">
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="d-grid gap-2 d-md-flex">
                  <Link
                    to={user.role === 'student' ? '/dashboard' : '/instructor/dashboard'}
                    className="btn btn-light btn-lg px-4 me-md-2"
                  >
                    Go to Dashboard
                  </Link>
                  <Link to="/courses" className="btn btn-outline-light btn-lg px-4">
                    Browse Courses
                  </Link>
                </div>
              )}
            </div>
            <div className="col-lg-6">
              <img
                src="/images/hero-image.jpg"
                alt="Learning"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <h2 className="text-center mb-5">Why Choose Skillora?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-book fs-1 text-primary mb-3"></i>
                <h3 className="card-title h5">Quality Courses</h3>
                <p className="card-text">
                  Access high-quality courses created by expert instructors in
                  various fields.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-people fs-1 text-primary mb-3"></i>
                <h3 className="card-title h5">Expert Instructors</h3>
                <p className="card-text">
                  Learn from experienced professionals who are passionate about
                  teaching.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-graph-up fs-1 text-primary mb-3"></i>
                <h3 className="card-title h5">Track Progress</h3>
                <p className="card-text">
                  Monitor your learning progress and earn certificates upon
                  completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Start Learning?</h2>
          <p className="lead mb-4">
            Join thousands of students who are already learning with Skillora.
          </p>
          <Link to="/courses" className="btn btn-primary btn-lg">
            Explore Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 