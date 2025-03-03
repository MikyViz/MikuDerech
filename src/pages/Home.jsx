import Header from "../components/Header";
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import Filters from "../components/Filters";

export default function Home() {
    return (
        <div>
            <Header />
            <Filters/>
            <Container fluid>
                <Row>
                    <Col xs={11} md={10} className="offset-md-2">
                        <div className="p-3">
                            <h1>Welcome to MIKUDERECH</h1>
                            <p>This is your main content area.</p>
                            <Outlet />
                        </div>
                    </Col>
                    
                </Row>
            </Container>
        </div>
    );
}
