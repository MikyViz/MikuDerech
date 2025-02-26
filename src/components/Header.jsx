import { Navbar, Nav, Container, Button, Offcanvas, ListGroup } from 'react-bootstrap';
import { MdHelp, MdExitToApp, MdInsertDriveFile, MdAssessment, MdChangeHistory, MdTraffic, MdNotifications, MdPerson, MdPeople, MdPersonAdd, MdTableChart, MdMenu } from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(!show);
    return (
        <div>
            <Navbar expand="lg" className='border-bottom border-dark' style={{ backgroundColor: "var(--background-color)" }}>
                <Container>
                    <Nav className="d-flex align-items-center me-auto">
                        <Button variant="outline-dark" className="me-2"><MdHelp className='fs-4' /> תמיכה</Button>
                        <span className="dot bg-success rounded-circle me-2 p-2" style={{ width: '10px', height: '10px' }}></span>
                        <span className='fs-5 me-2'>מחובר</span>
                    </Nav>

                    <Navbar.Brand className="mx-auto">MIKUDERECH</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav className="fs-5">!שלום אחי</Nav>
                    </Nav>
                    <Nav className="me-auto" >
                        {/* <Nav.Link href="/"><MdExitToApp className='fs-3' /></Nav.Link> */}
                        <Button variant="outline-dark" onClick={handleShow}><MdMenu className='fs-3' /></Button>
                    </Nav>
                </Container>
            </Navbar>

            <Offcanvas show={show} onHide={handleShow} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        <ListGroup.Item><Link to={'/'}><MdExitToApp className="me-2" /> יציאה</Link></ListGroup.Item>
                        <ListGroup.Item><MdAssessment className="me-2" /> לוח בקרה </ListGroup.Item>
                        <ListGroup.Item><MdInsertDriveFile className="me-2" /> דוחות (טאב נפתח)</ListGroup.Item>
                        <ListGroup.Item><MdChangeHistory className="me-2" /> שינויים מתוכננים </ListGroup.Item>
                        <ListGroup.Item><MdTraffic className="me-2" /> עדכוני תנועה </ListGroup.Item>
                        <ListGroup.Item><MdNotifications className="me-2" /> התראות </ListGroup.Item>
                        <ListGroup.Item><MdPerson className="me-2" /> פרטים אישיים </ListGroup.Item>
                        <ListGroup.Item><MdPeople className="me-2" /> לקוחות </ListGroup.Item>
                        <ListGroup.Item><MdPersonAdd className="me-2" /> משתמשים </ListGroup.Item>
                        <ListGroup.Item><MdTableChart className="me-2" /> טבלאות מערכת </ListGroup.Item>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}
