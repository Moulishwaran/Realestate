import React, { useState } from "react";
import classes from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BsHouseDoor } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineFileImage } from "react-icons/ai";
import { logout } from "../../redux/authSlice";
import { request } from "../../utils/fetchAPI";

const Navbar = () => {
  const [state, setState] = useState({});

  const [showForm, setShowForm] = useState(false);
  const [photo, setPhoto] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };
  const handleCloseForm = () => {
    setShowForm(false);
    setPhoto(null);
    setState({});
  };
  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleListProperty = async (e) => {
    e.preventDefault();

    let filename = null;
    if (photo) {
      const formData = new FormData();
      filename = crypto.randomUUID() + photo.name;
      formData.append("filename", filename);
      formData.append("image", photo);

      await request(`/upload/image`, "POST", {}, formData, true);
    } else {
      return;
    }
    try {
      const options = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await request(`/property`, "POST", options, {
        ...state,
        img: filename,
      });

      handleCloseForm();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to="/" className={classes.left}>
          Real Estate <BsHouseDoor />
        </Link>
        <ul className={classes.center}>
          <li className={classes.listItem}>Home</li>
          <li className={classes.listItem}>About</li>
          <li className={classes.listItem}>Featured</li>
          <li className={classes.listItem}>Contacts</li>
        </ul>
        <div className={classes.right}>
          {!user ? (
            <>
              <Link to="/signup">Sign up</Link>
              <Link to="/signin">Sign in</Link>
            </>
          ) : (
            <>
              <span>Hello {user.username}!</span>
              <span onClick={handleLogout} className={classes.logoutBtn}>
                Logout
              </span>
              <Link onClick={() => setShowForm(true)} className={classes.list}>
                List your property
              </Link>
            </>
          )}
        </div>

        {showForm && (
          <div onClick={handleCloseForm} className={classes.listPropertyForm}>
            <div
              className={classes.listPropertyWrapper}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>List Property</h2>
              <form onSubmit={handleListProperty}>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleState}
                />
                <input
                  type="text"
                  placeholder="Type"
                  name="type"
                  onChange={handleState}
                />
                <input
                  type="text"
                  placeholder="Desc"
                  name="desc"
                  onChange={handleState}
                />
                <input
                  type="text"
                  placeholder="Continent"
                  name="continent"
                  onChange={handleState}
                />
                <input
                  type="text"
                  placeholder="price"
                  name="price"
                  onChange={handleState}
                />
                <input
                  type="text"
                  placeholder="Sq. meters"
                  name="sqmeters"
                  onChange={handleState}
                />
                <input
                  type="text"
                  placeholder="Beds"
                  name="beds"
                  onChange={handleState}
                  step={1}
                  min={2}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "50%",
                  }}
                >
                  <label htmlFor="photo">
                    Property picture <AiOutlineFileImage />
                  </label>
                  <input
                    type="file"
                    id="photo"
                    style={{ display: "none" }}
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  {photo && <p>{photo.name}</p>}
                </div>
                <button>List Property</button>
              </form>
              <AiOutlineClose
                onClick={handleCloseForm}
                className={classes.removeIcon}
              />
            </div>
          </div>
        )}
        {
          <div className={classes.mobileNav}>
            {showMobileNav && (
              <div className={classes.navigation}>
                <Link to="/" className={classes.left}>
                  Real Estate <BsHouseDoor />
                </Link>
                <ul className={classes.center}>
                  <li className={classes.listItem}>Home</li>
                  <li className={classes.listItem}>About</li>
                  <li className={classes.listItem}>Featured</li>
                  <li className={classes.listItem}>Contacts</li>
                </ul>
                <div className={classes.right}>
                  {!user ? (
                    <>
                      <Link to="/signup">Sign up</Link>
                      <Link to="/signin">Sign in</Link>
                    </>
                  ) : (
                    <>
                      <span>Hello {user.username}!</span>
                      <span
                        onClick={handleLogout}
                        className={classes.logoutBtn}
                      >
                        Logout
                      </span>
                      <Link
                        onClick={() => setShowForm(true)}
                        className={classes.list}
                      >
                        List your property
                      </Link>
                    </>
                  )}
                </div>
                {showForm && showMobileNav && (
                  <div
                    onClick={handleCloseForm}
                    className={classes.listPropertyForm}
                  >
                    <div
                      className={classes.listPropertyWrapper}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h2>List Property</h2>
                      <form onSubmit={handleListProperty}>
                        <input
                          type="text"
                          placeholder="Title"
                          name="title"
                          onChange={handleState}
                        />
                        <input
                          type="text"
                          placeholder="Type"
                          name="type"
                          onChange={handleState}
                        />
                        <input
                          type="text"
                          placeholder="Desc"
                          name="desc"
                          onChange={handleState}
                        />
                        <input
                          type="text"
                          placeholder="Continent"
                          name="continent"
                          onChange={handleState}
                        />
                        <input
                          type="text"
                          placeholder="price"
                          name="price"
                          onChange={handleState}
                        />
                        <input
                          type="text"
                          placeholder="Sq. meters"
                          name="sqmeters"
                          onChange={handleState}
                        />
                        <input
                          type="text"
                          placeholder="Beds"
                          name="beds"
                          onChange={handleState}
                          step={1}
                          min={2}
                        />

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            width: "50%",
                          }}
                        >
                          <label htmlFor="photo">
                            Property picture <AiOutlineFileImage />
                          </label>
                          <input
                            type="file"
                            id="photo"
                            style={{ display: "none" }}
                            onChange={(e) => setPhoto(e.target.files[0])}
                          />
                          {photo && <p>{photo.name}</p>}
                        </div>
                        <button>List Property</button>
                      </form>
                      <AiOutlineClose
                        onClick={handleCloseForm}
                        className={classes.removeIcon}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {!showMobileNav && (
              <GiHamburgerMenu
                onClick={() => setShowMobileNav((prev) => !prev)}
                className={classes.hamburgerIcon}
              />
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
