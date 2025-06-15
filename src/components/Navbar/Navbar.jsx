import { FaUser } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import "./navbar.css"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMenu } from '../../services/apiService';
import { IoSearch } from 'react-icons/io5';


const Navbar = () => {
const {tableId} = useParams();
const [menu, setMenu] = useState([])
const categories = [...new Set(menu.map(product => product.category))]
const [activeCat, setActiveCat] = useState(categories[0])
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
    }
    window.addEventListener("scroll", handleScroll, {passive:true})
    return () => window.removeEventListener("scroll", handleScroll)
}, [categories])


  return (
    <div className='navbar-component'>
        <div className='navbar'>

      <GiHamburgerMenu color='#486374'/>
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="50" height="50" rx="14" fill="#469cff"/>
  
  <circle cx="25" cy="25" r="14" fill="#fff"/>
  
  <rect x="15" y="17" width="1.2" height="15" rx="1.5" fill="#469cff"/>
  <rect x="13.2" y="17" width="1.2" height="6" rx="0.6" fill="#469cff"/>
  <rect x="16.8" y="17" width="1.2" height="6" rx="0.6" fill="#469cff"/>
  
  <rect x="33" y="17" width="1.2" height="15" rx="1.5" fill="#469cff"/>
  <circle cx="33.5" cy="19.5" r="3"  fill="#469cff"/>
  
  
  <text x="25" y="46" text-anchor="middle" fill="#fff"
        font-size="9" font-family="Inter,sans-serif" font-weight="bold" letter-spacing="0.5">
    Bistro
  </text>
</svg>
<FaUser color='#486374' />

            </div>
           <div className="secondary-nav">
            <div className='search-icon'>
                <IoSearch size={25}/>
            </div>
            <div className='secondary-nav-items'>

  <span className="secondary-nav-item">
    {categories.map(cat => (
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
  )
}

export default Navbar
