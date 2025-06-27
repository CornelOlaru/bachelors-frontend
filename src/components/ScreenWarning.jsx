import { useState, useEffect } from "react";
import rotateDevice from "../assets/rotate-phone.png"
import "../index.css"
//Component applied when the screen is too large
const ScreenWarning = () => {

  const [tooWide, setTooWide] = useState(window.innerWidth > 850);

  useEffect(() => {
    const handleResize = () => setTooWide(window.innerWidth > 850);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!tooWide) return null;
   return (
    <div className="screen-warning">
      <img src={rotateDevice} alt="Rotate device" width={120} style={{ marginBottom: 16 }} />
      <p>
        Dimensiunea ecranului este prea mare pentru această aplicație.<br />
        Te rugăm să micșorezi fereastra sau să rotești dispozitivul.
      </p>
    </div>
  );
}

export default ScreenWarning
