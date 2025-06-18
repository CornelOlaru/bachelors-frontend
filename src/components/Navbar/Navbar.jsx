import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import "./navbar.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenu } from "../../services/apiService";
import { IoSearch } from "react-icons/io5";
import logo from "../../assets/logoSVG.svg";
import LoginModal from "../../pages/Login/Login";
import RegisterModal from "../../pages/Signup/SignupModal";
import ProfileModal from "../../pages/profile/ProfileModal";
import Modal from "../modal/Modal";

const Navbar = ({ searchQuery, setSearchQuery, setSearchResults }) => {
  const { tableId } = useParams();
  const [menu, setMenu] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [click, setClick] = useState(false);
  const sideMenuRef = useRef(null); //Using reference to check if the users click outside the element
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleClickOutside = (e) => {
        if (sideMenuRef.current && !sideMenuRef.current.contains(e.target) && click) {
            setClick(false)
        } 

  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [click]);

  const hamburgerClick = () => {
    setClick(!click);

    if (!click) {
      document.body.classList.add = "no-scroll"; //Disable scrolling
    } else {
      document.body.classList.remove = "no-scroll"; //Enable scrolling
    }
  };

  const normalize = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const categories = useMemo(() => {
    const desiredOrder = [
      "mic-dejun",
      "pranz",
      "cina",
      "desert",
      "bauturi-nealcoolice",
      "bauturi-alcoolice",
    ];
    return desiredOrder.filter((desiredCat) =>
      menu.some((p) => normalize(p.category) === normalize(desiredCat))
    );
  }, [menu]);

  const [activeCat, setActiveCat] = useState(categories[0]);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const token = localStorage.getItem("token");

  const handleSearch = () => {
    setSearchResults(searchQuery.trim());
    // setShowSearch(false)
    // Scroll la secțiunea cu rezultate după un scurt delay

    const resultsSection = document.getElementById("search-results");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // așteaptă puțin să se afișeze rezultatele
  };

  const handleCloseInput = () => {
    setSearchQuery(""); // goliți inputul
    setSearchResults(""); // ascundeți rezultatele
    setShowSearch(false); // închideți bara
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowProfile(false);
    setShowLogin(false);
  };

  const handleUserClick = () => {
    if (token) {
      setShowProfile(true);
    } else {
      setShowLogin(true);
    }
  };

  useEffect(() => {
    if (!tableId) {
      //If table Id isn't present, the function does not fetch
      return;
    }

    const fetchMenu = async () => {
      try {
        const response = await getMenu();
        setMenu(response);
        console.log("category Array :  ", response);
      } catch (error) {
        console.log("Failed to fetch menu: ", error);
      }
    };
    fetchMenu();
  }, [tableId]);

  const handleCategoryClick = (cat) => {
    const section = document.getElementById(`cat-${cat}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveCat(cat);
      setClick(false) 
    }
    if (section) {
      const y = section.getBoundingClientRect().top + window.scrollY - 54; // 54px = height navbar
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveCat(cat);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let current = categories[0];
      for (const cat of categories) {
        const section = document.getElementById(`cat-${cat}`);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 70) {
            current = cat;
          }
        }
      }
      setActiveCat(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  return (
    <>
      <div className="navbar-component">
       <div className={ click ? "navbar-side-open" : "navbar"}>
        

      {click && <div className="menu-overlay" onClick={hamburgerClick}></div>}
  {!click && (
      <div className="hamburgerMenu" onClick={hamburgerClick}>
      <FaBars color="#486374" />
    </div>
  )}
  

 
  <div ref={sideMenuRef} className={`mobile-side-menu ${click ? "open" : "close"}`}>
 

    <button ref={sideMenuRef} className="close-btn" onClick={hamburgerClick}>
      <FaTimes color="#486374" />
    </button>

   
    <img className="side-menu-logo" src={logo} alt="Logo" />
 


    <ul className={click ? "nav-links active" : "nav-links"}>
        <h4 className="side-menu-title">Produse</h4>
  {categories.map((cat) => (
    <p key={`cat-${cat}`} className="nav-link" onClick={() => handleCategoryClick(cat)}>
      {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* afișează cu majusculă */}
    </p>
  ))}
</ul>
  </div>

 
  <img src={logo} alt="Logo SVG" />
  <FaUser color="#486374" onClick={handleUserClick} />
</div>


        {showSearch && (
          <div className="search-overlay">
            <form
              className="search-bar"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <input
                type="text"
                placeholder="Caută..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="search-input-btn"
                type="button"
                onClick={handleCloseInput}
              >
                ✕
              </button>
            </form>
          </div>
        )}
        <div className="secondary-nav">
          <div className="search-icon" onClick={() => setShowSearch(true)}>
            <IoSearch size={25} />
          </div>

          <div className="secondary-nav-items">
            <span className="secondary-nav-item">
              {categories.map((cat) => (
                <button
                  className={`cat-btn${activeCat === cat ? " active" : ""}`}
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat.replace(/-/g, " ").toUpperCase()}
                </button>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* {showLogin && (
       

        <LoginModal
        
          onRequestClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          />
          
      )} */}
        {showLogin && (
  <Modal isOpen={showLogin} onRequestClose={() => setShowLogin(false)}>
    <LoginModal
      onRequestClose={() => setShowLogin(false)}
      onSwitchToRegister={() => {
        setShowLogin(false);
        setShowRegister(true);
      }}
    />
  </Modal>
)}


      {/* {showRegister && (
        <RegisterModal
          onRequestClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )} */}

 {showRegister && (
  <Modal size="100" isOpen={showRegister} onRequestClose={() => setShowRegister(false)}>
    <RegisterModal
      onRequestClose={() => setShowRegister(false)}
      onSwitchToLogin={() => {
        setShowRegister(false);
        setShowLogin(true);
      }}
    />
  </Modal>
)}

      {/* {showProfile && (
        <ProfileModal
          onClose={() => setShowProfile(false)}
          onLogout={handleLogout}
        />
      )} */}
{showProfile && (
  <Modal size="100" isOpen={showProfile} onRequestClose={() => setShowProfile(false)}>
    <ProfileModal
      onClose={() => setShowProfile(false)}
      onLogout={handleLogout}
      />
  </Modal>
)}
     
    </>
  );
};

export default Navbar;
