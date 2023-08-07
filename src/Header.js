import React from 'react';

const Header = () => {
    return (
       <header style={ headerStyle } >
        <img src="https://balloontown.com.au/cdn/shop/files/MaryamLogo5-2_2_300x.png?v=1685452176" alt="Balloon Town" style={logoStyle} />
            <h1>Balloon Town </h1>
        </header>
  );
};

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: '#333',
    color: '#fff',
};

const logoStyle = {
    width: '250px', // Adjust the width as needed
    height: 'auto', // Maintain aspect ratio
    marginRight: '1rem',
};

export default Header;
