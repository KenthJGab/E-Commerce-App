import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import PreviewProducts from './PreviewProducts';

export default function FeaturedProducts() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
      .then((res) => res.json())
      .then((data) => {
        const shuffledData = shuffleArray(data);

        const featuredTop = shuffledData.slice(0, 6); 
        const featuredBottom = shuffledData.slice(6, 12);

        const topProducts = featuredTop.map((item) => (
          <PreviewProducts data={item} key={item._id} breakPoint={2} />
        ));

        const bottomProducts = featuredBottom.map((item) => (
          <PreviewProducts data={item} key={item._id} breakPoint={2} />
        ));

        setPreviews({ top: topProducts, bottom: bottomProducts });
      });
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <>
      <div className="text-center">
        <img
          src="https://i.ibb.co/smzZwjw/3.png"
          alt="Featured Products"
          style={{ width: '300px', height: '250px' }}
        />
      </div>
      <br />
      <br />
      <Row className="justify-content-center mb-4">
        {previews.top}
        {previews.bottom}
      </Row>
    </>
  );
}
