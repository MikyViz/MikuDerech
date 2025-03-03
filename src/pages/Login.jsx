import { Container, Card, Button, Form, Col, Row } from 'react-bootstrap/';
// import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    // const navigate = useNavigate();

    return (
        <Container fluid className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'var(--background-color)' }}>
            <Card className="p-4 w-50" style={{ backgroundColor: 'white' }}>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                                Email
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type='email' plaintext placeholder='Email' />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="3">
                                Password
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button style={{backgroundColor:'var(--btn-color)', borderColor:'var(--btn-color)'}} href='/home/dashboard'>!יאללא</Button>
                        </div>
                        </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
