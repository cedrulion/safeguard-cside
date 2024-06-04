import "../App.css"
const AuthFooter = () => {
    return (
      <footer className="flex justify-center items-center text-center text-gray-500 py-4" style={{ fontFamily: 'roboto' }}>  
        <p className="font-bold">  
          © DYLAN KABAKA-MANAGEMENT {new Date().getFullYear()} - All rights reserved
        </p>
      </footer>
    );
  };
  
  export default AuthFooter;
  