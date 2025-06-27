
//Home page component used as a fallback after the order is completed
const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center p-6">
      <h1 className="text-2xl font-bold mb-4">Bine ai venit!</h1>
      <p className="text-gray-700 text-lg">
        Pentru a accesa meniul, te rugăm să scanezi codul QR de pe masă.
        Se va deschide automat o filă nouă cu meniul mesei tale.
      </p>
    </div>
  );
};

export default HomePage;