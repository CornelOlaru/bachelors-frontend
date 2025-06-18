import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";
import "./footer.css";


const Footer = () => {
  return (
    <div className='footer-container'>
      <ul className='footer-list'>
        <h3>Informații Utile</h3>
        <a href="#terms"><li>Termeni si Condiții</li></a>
        <a href="#privacy"><li>Politică de Confidențialitate</li></a>
        <a href="#cookies"><li>Politică de Cookie</li></a>
        <a href="#allergens"><li>Alergeni</li></a>

        
      </ul>
        <ul className='footer-list'>
        <h3>Găsește-ne și pe</h3>
        <a href="#instagram"><IoLogoInstagram /> <li> Instagram</li></a>
        <a href="#facebook"><IoLogoFacebook /><li>  Facebook</li></a>
        </ul>
    </div>
  )
}

export default Footer
