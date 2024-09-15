const Header = () => {
    return (
      <header className="w-full bg-white py-4 px-8"> {/* Increased padding for height */}
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <img
              src="https://signyards-asserts.s3.ap-south-1.amazonaws.com/logo.jpeg"  
              alt="Signyards Logo"
              className="h-12"  
            />
          </div>
        </div>
      </header>
    );
  };
  
export default Header;

  