import Header from "../components/Header";
import SideNavbar from "../components/SideNavbar";
import { Container, Row, Col } from 'react-bootstrap';
import Dashboard from "./Dashboard";

export default function Home() {
    return (
        <div dir="rtl">
            <Header />
            <Container fluid>
                <Row>
                    {/* <SideNavbar xs={3} /> */}
                    <Col xs={9} md={10} className="offset-md-2">
                        <div className="p-3">
                            {/* Основное содержимое */}
                            <h1>Welcome to MIKUDERECH</h1>
                            <p>This is your main content area.</p>
                            <Dashboard/>
                        </div>
                    </Col>
                    
                </Row>
            </Container>
        </div>
    );
}
