import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState(true);

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
    window.scrollTo(0, 0);
  });

  const classOne = menu
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <>
      <div id="navbar" className="navbar-area">
        <div className="edemy-nav">
          <div className="container-fluid">
            <div className="navbar navbar-expand-lg navbar-light">
              <Link to="/">
                <p onClick={toggleNavbar} className="navbar-brand">
                  <img src="/images/logo.png" alt="logo" />
                </p>
              </Link>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <form className="search-box">
                  <input
                    type="text"
                    className="input-search"
                    placeholder="Search for anything"
                  />
                  <button type="submit">
                    <i className="flaticon-search"></i>
                  </button>
                </form>

                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="#" activeClassName="active">
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="nav-link"
                      >
                        Home <i className="bx bx-chevron-down"></i>
                      </a>
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link to="/" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            eLearning School
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/index-2" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Vendor Certification Training
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/index-3" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Online Training School
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/index-4" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Distance Learning
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/index-5" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Language School
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/index-6" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Modern Schooling
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/index-7" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Yoga Training
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/index-8" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Health Coaching
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/index-9" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Kindergaten
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link to="#">
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="nav-link"
                      >
                        Pages <i className="bx bx-chevron-down"></i>
                      </a>
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link to="#">
                          <a
                            onClick={(e) => e.preventDefault()}
                            className="nav-link"
                          >
                            About Us <i className="bx bx-chevron-down"></i>
                          </a>
                        </Link>

                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link to="/about-1" activeClassName="active">
                              <a onClick={toggleNavbar} className="nav-link">
                                About Us 01
                              </a>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link to="/about-2" activeClassName="active">
                              <a onClick={toggleNavbar} className="nav-link">
                                About Us 02
                              </a>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link to="/about-3" activeClassName="active">
                              <a onClick={toggleNavbar} className="nav-link">
                                About Us 03
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item">
                        <Link to="/success-story" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Success Story
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/advisor" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Teacher
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/gallery" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Gallery
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/faq" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            FAQs
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/contact" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Contact Us
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/profile-authentication"
                          activeClassName="active"
                        >
                          <a onClick={toggleNavbar} className="nav-link">
                            Login/Register
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/404" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            404 Error Page
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/coming-soon" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Coming Soon
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/purchase-guide" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Purchase Guide
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/privacy-policy" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Privacy Policy
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/terms-of-service" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Terms of Service
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item megamenu">
                    <Link to="#">
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="nav-link"
                      >
                        Courses <i className="bx bx-chevron-down"></i>
                      </a>
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <div className="container">
                          <div className="row">
                            <div className="col">
                              <ul className="megamenu-submenu">
                                <li className="nav-item">
                                  <Link
                                    href="/courses-1"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Grid 01
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-2"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Grid 02
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-3"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Grid 03
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-4"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Grid 04
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-5"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses List 01
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-6"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Right Sidebar
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <div className="col">
                              <ul className="megamenu-submenu">
                                <li className="nav-item">
                                  <Link
                                    href="/single-courses-1"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Single Layout 01
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/single-courses-2"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Single Layout 02
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/categories"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Categories
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/membership-levels"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Membership Levels
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/become-a-teacher"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Become a Teacher
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/profile"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Profile
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <div className="col">
                              <ul className="megamenu-submenu">
                                <li className="nav-item">
                                  <Link
                                    href="/courses-1"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Grid 01
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-2"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Grid 02
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-3"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Grid 03
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-4"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Grid 04
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-5"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses List 01
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/courses-6"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Right Sidebar
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <div className="col">
                              <ul className="megamenu-submenu">
                                <li className="nav-item">
                                  <Link
                                    href="/single-courses-1"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Single Layout 01
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/single-courses-2"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Single Layout 02
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/categories"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Courses Categories
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/membership-levels"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Membership Levels
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/become-a-teacher"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Become a Teacher
                                    </a>
                                  </Link>
                                </li>

                                <li className="nav-item">
                                  <Link
                                    href="/profile"
                                    activeClassName="active"
                                  >
                                    <a
                                      onClick={toggleNavbar}
                                      className="nav-link"
                                    >
                                      Profile
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="row m-0 mobile-none">
                            <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                <div className="icon">
                                  <i className="bx bx-code-alt"></i>
                                </div>
                                <h3>Development</h3>
                                <span className="sub-title">60 Courses</span>

                                <Link to="/courses-1">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                <div className="icon">
                                  <i className="bx bx-camera"></i>
                                </div>
                                <h3>Photography</h3>
                                <span className="sub-title">21 Courses</span>

                                <Link to="/courses-2">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                <div className="icon">
                                  <i className="bx bx-layer"></i>
                                </div>
                                <h3>Design</h3>
                                <span className="sub-title">58 Courses</span>

                                <Link to="/courses-3">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                <div className="icon">
                                  <i className="bx bxs-flag-checkered"></i>
                                </div>
                                <h3>Language</h3>
                                <span className="sub-title">99 Courses</span>

                                <Link to="/courses-4">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                <div className="icon">
                                  <i className="bx bx-health"></i>
                                </div>
                                <h3>Fitness</h3>
                                <span className="sub-title">21 Courses</span>

                                <Link to="/courses-5">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>

                            <div className="col-lg-2 col-sm-4 col-md-4 col-6 p-0">
                              <div className="single-category-widget">
                                <div className="icon">
                                  <i className="bx bx-line-chart"></i>
                                </div>
                                <h3>Business</h3>
                                <span className="sub-title">49 Courses</span>

                                <Link to="/courses-6">
                                  <a className="link-btn"></a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link to="#">
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="nav-link"
                      >
                        Events <i className="bx bx-chevron-down"></i>
                      </a>
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link to="/events" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Events
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/single-events" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Events Details
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link to="#">
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="nav-link"
                      >
                        Shop <i className="bx bx-chevron-down"></i>
                      </a>
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link to="/products-list-1" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Product List 01
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/products-list-2" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Product List 02
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/cart" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Cart
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/checkout" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Checkout
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/single-products" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Product Details
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link to="#">
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="nav-link"
                      >
                        Blog <i className="bx bx-chevron-down"></i>
                      </a>
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link to="/blog-1" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Grid (2 in Row)
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/blog-2" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Grid (3 in Row)
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/blog-3" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Grid (Full Width)
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/blog-4" activeClassName="active">
                          <a onClick={toggleNavbar} className="nav-link">
                            Right Sidebar
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="#">
                          <a
                            onClick={(e) => e.preventDefault()}
                            className="nav-link"
                          >
                            Single Post <i className="bx bx-chevron-down"></i>
                          </a>
                        </Link>

                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link
                              href="/single-blog-1"
                              activeClassName="active"
                            >
                              <a onClick={toggleNavbar} className="nav-link">
                                Default
                              </a>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link
                              href="/single-blog-2"
                              activeClassName="active"
                            >
                              <a onClick={toggleNavbar} className="nav-link">
                                With Video
                              </a>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link
                              href="/single-blog-3"
                              activeClassName="active"
                            >
                              <a onClick={toggleNavbar} className="nav-link">
                                With Image Slider
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>

                <div className="others-option d-flex align-items-center">
                  <div className="option-item">
                    <div className="cart-btn">
                      <Link to="/cart">
                        <a>
                          <i className="flaticon-shopping-cart"></i>{" "}
                          <span>3</span>
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div className="option-item">
                    <Link to="/profile-authentication">
                      <a className="default-btn">
                        <i className="flaticon-user"></i> Login/Register{" "}
                        <span></span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
