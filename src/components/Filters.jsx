import React, { useState, useContext, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { GlobalStateContext } from '../GlobalStateProvider';

function Filters() {
    const { globalState, setGlobalState } = useContext(GlobalStateContext);

    const [filters, setFilters] = useState({
        operator: '',
        cluster: '',
        city: '',
        line: '',
        lineType: '',
        lineGroup: '',
        StartDate: '',
        EndDate: ''
    });

    const handleFiltersChange = (e) => {
        const { id, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(filters).every(value => value === '')) {
            console.warn('Форма пуста, фильтры не добавлены');
            return;
        }
        setGlobalState(prev => ({
            ...prev,
            filters: [
                ...prev.filters,
                filters
            ],
            currentFilter: filters
        }));

        console.log('Фильтры:', filters);
        console.log('currentFilter:', filters);
    };

    useEffect(() => {
        console.log('Обновленный currentFilter:', globalState.currentFilter);
    }, [globalState.currentFilter]);

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
                <Form.Group as={Col} controlId="operator">
                    <Form.Label>מפעיל:</Form.Label>
                    <Form.Select value={filters.operator} onChange={handleFiltersChange}>
                        <option value="">Выберите</option>
                        <option value="אגד">אגד</option>
                        <option value="דן">דן</option>
                        <option value="קווים">קווים</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="cluster">
                    <Form.Label>אשכול (אזורים):</Form.Label>
                    <Form.Select value={filters.cluster} onChange={handleFiltersChange}>
                        <option value="">Выберите</option>
                        <option value="1">אשכול 1</option>
                        <option value="2">אשכול 2</option>
                        <option value="3">אשכול 3</option>
                        <option value="4">אשכול 4</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="city">
                    <Form.Label>עיר:</Form.Label>
                    <Form.Select value={filters.city} onChange={handleFiltersChange}>
                        <option value="">Выберите</option>
                        <option value="tel-aviv">תל אביב</option>
                        <option value="jerusalem">ירושלים</option>
                        <option value="haifa">חיפה</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="line">
                    <Form.Label>קו:</Form.Label>
                    <Form.Select value={filters.line} onChange={handleFiltersChange}>
                        <option value="">Выберите</option>
                        <option value="1">קו 1</option>
                        <option value="2">קו 2</option>
                        <option value="3">קו 3</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="lineType">
                    <Form.Label>סוג קו:</Form.Label>
                    <Form.Select value={filters.lineType} onChange={handleFiltersChange}>
                        <option value="">Выберите</option>
                        <option value="regular">רגיל</option>
                        <option value="express">מהיר</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="lineGroup">
                    <Form.Label>קבוצת קווים:</Form.Label>
                    <Form.Select value={filters.lineGroup} onChange={handleFiltersChange}>
                        <option value="">Выберите</option>
                        <option value="group-1">קבוצה 1</option>
                        <option value="group-2">קבוצה 2</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="StartDate">
                    <Form.Label>מתאריך:</Form.Label>
                    <Form.Control type="date" value={filters.StartDate} onChange={handleFiltersChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="EndDate">
                    <Form.Label>עד תאריך:</Form.Label>
                    <Form.Control type="date" value={filters.EndDate} onChange={handleFiltersChange} />
                </Form.Group>

                <Col>
                    <Button
                        variant="primary"
                        type="submit"
                        className="mt-4"
                        disabled={Object.values(filters).every(value => value === '')}
                    >
                        סנן
                    </Button>
                </Col>
            </Row>
            <hr />
        </Form>
    );
}

export default Filters;
