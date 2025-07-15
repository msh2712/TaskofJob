import React, { useState, useEffect } from 'react';

const MoveToScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="btn btn-primary position-fixed"
          style={{
            bottom: '80px',
            right: '40px',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '25px',
            zIndex: 1000,
            border :"2px solid black",
            backgroundColor:"white",
            color:"black"
          }}
        >
          ↑
        </button>
      )}
    </>
  );
};

export default MoveToScrollUp;
