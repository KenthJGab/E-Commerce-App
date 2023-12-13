import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights() {
  const cardStyle = {
    border: '1px solid white',
  };

  return (
    <Row className="mt-3 mb-3 p-4">
      <Col xs={4} md={4}>
        <Card className="cardHighlight p-2" style={cardStyle}>
          <Card.Body>
            <Card.Title>
              <h6 className='text-center fw-bold'>Fashion</h6>
            </Card.Title>
            <Card.Text className='text-center fs-10 text-muted'>
              In the realm of fashion, one can acquire clothing, but true style is an inherent possession.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      
      <Col xs={4} md={4}>
        <Card className="cardHighlight p-2" style={cardStyle}>
          <Card.Body>
            <Card.Title>
              <h6 className='text-center fw-bold'>Simple</h6>
            </Card.Title>
            <Card.Text className='text-center fs-10 text-muted' >
              In your world, simplicity speaks volumes. Your creations are not just clothes; they're statements, reflections of your unique style.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={4} md={4}>
        <Card className="cardHighlight p-2" style={cardStyle}>
          <Card.Body>
            <Card.Title>
              <h6 className='text-center fw-bold'>Aesthetic</h6>
            </Card.Title>
            <Card.Text className='text-center fs-10 text-muted'>
              In the vast landscape of trends, embrace your authenticity.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
