import { ListGroup, Col } from 'react-bootstrap';
import { MdInsertDriveFile , MdAssessment, MdChangeHistory, MdTraffic, MdNotifications, MdPerson, MdPeople, MdPersonAdd, MdTableChart } from 'react-icons/md';

export default function SideNavbar() {
    return (
        <Col xs={3} md={2} className="bg-light border-start vh-100 ">
            <ListGroup variant="flush">
                <ListGroup.Item><MdAssessment className="me-2" /> לוח בקרה </ListGroup.Item>
                <ListGroup.Item><MdInsertDriveFile  className="me-2" /> דוחות (טאב נפתח)</ListGroup.Item>
                <ListGroup.Item><MdChangeHistory className="me-2" /> שינויים מתוכננים </ListGroup.Item>
                <ListGroup.Item><MdTraffic className="me-2" /> עדכוני תנועה </ListGroup.Item>
                <ListGroup.Item><MdNotifications className="me-2" /> התראות </ListGroup.Item>
                <ListGroup.Item><MdPerson className="me-2" /> פרטים אישיים </ListGroup.Item>
                <ListGroup.Item><MdPeople className="me-2" /> לקוחות </ListGroup.Item>
                <ListGroup.Item><MdPersonAdd className="me-2" /> משתמשים </ListGroup.Item>
                <ListGroup.Item><MdTableChart className="me-2" /> טבלאות מערכת </ListGroup.Item>
            </ListGroup>
        </Col>
    );
}
