import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div 
        className="bg-primary text-white py-5 position-relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold mb-4 fade-in">About Skillora</h1>
              <p className="lead mb-0 fade-in">
                Empowering learners worldwide with quality education and practical skills.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-eye-fill fs-1 text-primary me-3"></i>
                  <h2 className="h3 mb-0">Our Vision</h2>
                </div>
                <p className="lead mb-0">
                  We envision a world where quality education is accessible to all,
                  breaking down barriers of geography, time, and resources. Through our
                  platform, we aim to empower learners and educators to create a
                  community of continuous learning and growth.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100 hover-lift">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-bullseye fs-1 text-primary me-3"></i>
                  <h2 className="h3 mb-0">Our Mission</h2>
                </div>
                <p className="lead mb-0">
                  Our mission is to provide a comprehensive learning platform that
                  connects students with expert instructors, offering high-quality
                  courses and resources that enable personal and professional
                  development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Our Values</h2>
            <p className="lead text-muted">The principles that guide everything we do</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-4">
                    <i className="bi bi-star-fill fs-1 text-primary"></i>
                  </div>
                  <h3 className="h4 mb-3">Excellence</h3>
                  <p className="text-muted mb-0">
                    We are committed to delivering the highest quality learning
                    experience through our platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-4">
                    <i className="bi bi-people-fill fs-1 text-primary"></i>
                  </div>
                  <h3 className="h4 mb-3">Community</h3>
                  <p className="text-muted mb-0">
                    We foster a supportive learning community where students and
                    instructors can connect and grow together.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-4">
                    <i className="bi bi-lightbulb-fill fs-1 text-primary"></i>
                  </div>
                  <h3 className="h4 mb-3">Innovation</h3>
                  <p className="text-muted mb-0">
                    We continuously innovate to provide the best learning
                    experience and stay ahead of educational technology trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Our Team</h2>
          <p className="lead text-muted">
            Meet the passionate individuals behind Skillora who are dedicated to
            making quality education accessible to all.
          </p>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm hover-lift">
              <img 
                src="/images/team/placeholder-1.jpg"
                alt="John Doe"
                className="card-img-top"
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <div className="card-body text-center p-4">
                <h3 className="h4 mb-2">John Doe</h3>
                <p className="text-primary mb-3">Founder & CEO</p>
                <div className="d-flex justify-content-center gap-3">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted hover-lift">
                    <i className="bi bi-linkedin fs-5"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted hover-lift">
                    <i className="bi bi-twitter fs-5"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm hover-lift">
              <img 
                src="/images/team/placeholder-2.jpg"
                alt="Jane Smith"
                className="card-img-top"
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <div className="card-body text-center p-4">
                <h3 className="h4 mb-2">Jane Smith</h3>
                <p className="text-primary mb-3">Head of Education</p>
                <div className="d-flex justify-content-center gap-3">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted hover-lift">
                    <i className="bi bi-linkedin fs-5"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted hover-lift">
                    <i className="bi bi-twitter fs-5"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm hover-lift">
              <img 
                src="/images/team/placeholder-3.jpg"
                alt="Mike Johnson"
                className="card-img-top"
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <div className="card-body text-center p-4">
                <h3 className="h4 mb-2">Mike Johnson</h3>
                <p className="text-primary mb-3">Technical Director</p>
                <div className="d-flex justify-content-center gap-3">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted hover-lift">
                    <i className="bi bi-linkedin fs-5"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted hover-lift">
                    <i className="bi bi-twitter fs-5"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-4">Join Our Learning Community</h2>
          <p className="lead mb-4">
            Start your learning journey with Skillora today and be part of our
            growing community.
          </p>
          <Link to="/register" className="btn btn-light btn-lg px-5 hover-lift">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About; 