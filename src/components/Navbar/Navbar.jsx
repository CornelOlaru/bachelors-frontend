import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import "./navbar.css";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenu } from "../../services/apiService";
import { IoSearch } from "react-icons/io5";
import logo from "../../assets/logoSVG.svg";
import LoginModal from "../../pages/Login/Login";
import RegisterModal from "../../pages/Signup/SignupModal";
import ProfileModal from "../../pages/profile/ProfileModal";

const Navbar = ({searchQuery, setSearchQuery, setSearchResults}) => {
  const { tableId } = useParams();
  const [menu, setMenu] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  
  const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  const categories = useMemo(() => {
    const desiredOrder = ["mic-dejun", "pranz", "cina", "desert", "bauturi-nealcoolice", "bauturi-alcoolice" ];
  return desiredOrder.filter(desiredCat =>
    menu.some(p => normalize(p.category) === normalize(desiredCat))
  );
}, [menu]);

  const [activeCat, setActiveCat] = useState(categories[0]);
  const [showProfile, setShowProfile] = useState(false);
    const [ showSearch, setShowSearch] = useState(false)

  const token = localStorage.getItem("token");


  const handleSearch = () => {
    setSearchResults(searchQuery.trim())
    // setShowSearch(false)
     // Scroll la secțiunea cu rezultate după un scurt delay
 
    const resultsSection = document.getElementById("search-results");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  // așteaptă puțin să se afișeze rezultatele

  }

  const handleCloseInput = () => {
      setSearchQuery("");       // goliți inputul
  setSearchResults("");   // ascundeți rezultatele
  setShowSearch(false);     // închideți bara
  }

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
      setActiveCat(cat); // marchezi și ca "active" dacă ai state pentru asta
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
        <div className="navbar">
        
          <GiHamburgerMenu color="#486374" />
          <img src={logo} alt="Logo SVG" />
          <FaUser color="#486374" onClick={handleUserClick} />
        </div>
           
       {showSearch && (
  <div className="search-overlay">
    <form className="search-bar" onSubmit={(e) => {
      e.preventDefault();
      handleSearch();
    }}>
      

      <input 
        type="text"
        placeholder="Caută..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-input-btn" type="button" onClick={handleCloseInput}>✕</button>
    </form>
  </div>
)}
        <div className="secondary-nav">
          <div className="search-icon" onClick={()=>setShowSearch(true)}>
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

      {showLogin && (
        <LoginModal
          onRequestClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal
          onRequestClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showProfile && (
        <ProfileModal
          onClose={() => setShowProfile(false)}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Navbar;
