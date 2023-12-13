import React from 'react';

export default function Footer() {
  return (
    <div>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center border-top">
          <p className="text-muted">&copy; 2023 SHopSHeeSH, Inc</p>
          <img
            className='pb-1'
            src="https://i.ibb.co/z4pgFSK/1.png"
            alt=""
            style={{ width: '120px', height: '110px', marginLeft: 'auto' }}
          />

          <p style={{ fontSize: '10px' }} className="text-muted">
            <h6>About</h6>
            Welcome to <strong>SHopSHeeSH!</strong>, where fashion meets aesthetics! We curate a collection of fashion products that embrace uniqueness and authenticity.
            In the realm of trends, we believe in celebrating individual style. Our carefully selected products are not just clothing; they are statements that reflect your unique personality.
            Join us on this journey to embrace your authenticity and explore the world of aesthetic fashion. SHopSHeeSH – where your style speaks volumes!
          </p>
        </footer>
      </div>
    </div>
  );
}
