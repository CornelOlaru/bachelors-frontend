import { Link } from "react-router-dom";

//Home page component used as a fallback after the order is completed
const HomePage = () => {

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center p-6">
      <h1 className="text-2xl font-bold mb-4">Bine ai venit!</h1>
      <p className="text-gray-700 text-lg">
        Pentru a accesa meniul, te rugăm să scanezi codul QR de pe masă.
        Se va deschide automat o filă nouă cu meniul mesei tale.
      </p>
      
      <button style={{backgroundColor: "#3091ff"}} onClick={()=> {
        localStorage.removeItem("storageId")
        localStorage.removeItem("cart")
        localStorage.removeItem("token")
        window.location.href= 'https://bachelorsproject.vercel.app/table/6848e26bbbaecc71d7850cc9'
      }}>Pentru Demo apasati aici!</button>
      
    </div>
  );
};

export default HomePage;