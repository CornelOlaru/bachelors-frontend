/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from "react-router-dom";

const Component = () => {
  const navigate = useNavigate();

  
  const handleSuccess = () => {
    // După un anumit eveniment, redirectează către pagina de Home
    navigate("/home");
  };

  handleSuccess();
};