import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { GlobalStateContext } from '../GlobalStateProvider';

function Filters() {
    const { globalState, setGlobalState } = useContext(GlobalStateContext);
    const url = import.meta.env.VITE_URL;
    const userId = import.meta.env.VITE_USERID;
    const user = import.meta.env.VITE_USER;
    const password = import.meta.env.VITE_PASSWORD;

    const formatDate = (date) => date.toISOString().split('T')[0];
    const [filterOptions, setFilterOptions] = useState({});
    const [filters, setFilters] = useState({
        Agency: '', Cluster: '', SubCluster: '', City: '', LineID: '',
        LineType: '', linegroup: '',
        StartDate: formatDate(new Date(globalState.currentFilter.StartDate)),
        EndDate: formatDate(new Date(globalState.currentFilter.EndDate))
    });

    const filterKeyMapping = {
        Agency: 'agency_id',
        Cluster: 'Clusterid',
        SubCluster: 'ClusterSubDesc',
        City: 'CityName',
        LineID: 'LineID',
        LineType: 'LineType',
        linegroup: 'LineID'
    };

    const [allData, setAllData] = useState([]);

    const fetchFilterData = useCallback(async () => {
        try {
            const data = await fetch(`${url}/UsersChoice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: user,
                    password,
                    data: { UserId: userId, SelectChoice: 'All' }
                })
            });

            const result = await data.json();
            setAllData(result.ResData);
            generateFilterOptions(result.ResData);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error.response?.data || error.message);
        }
    }, [url, user, password, userId]);

    useEffect(() => { fetchFilterData(); }, [fetchFilterData]);

    const generateFilterOptions = (data) => {
        const unique = (key) => [...new Map(data.map(item => [item[key], item])).values()];
        setFilterOptions({
            Agency: unique('agency_id'),
            Cluster: unique('Clusterid'),
            SubCluster: unique('ClusterSubDesc'),
            City: unique('CityName'),
            LineID: unique('LineID'),
            LineType: unique('LineType'),
            linegroup: unique('LineID')
        });
    };

    const handleFiltersChange = (e) => {
        const { id, value } = e.target;

        // Обновляем выбранные фильтры
        const updatedFilters = { ...filters, [id]: value };

        // Фильтруем данные, оставляя только соответствующие всем выбранным фильтрам
        const filteredData = allData.filter(item =>
            Object.entries(updatedFilters).every(([key, val]) => {
                if (!val) return true; // фильтр не выбран
                // Получаем реальное название поля из мэппинга или используем key по умолчанию
                const dataKey = filterKeyMapping[key] || key;
                return String(item[dataKey]) === String(val);
            })
        );

        console.log('filteredData:', filteredData);
        
        const optionsData = filteredData.length > 0 ? filteredData : allData;
        generateFilterOptions(optionsData);
        setFilters(updatedFilters);
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(filters).every(val => val === '')) return;
        setGlobalState(prev => ({ ...prev, filters: [...prev.filters, filters], currentFilter: filters }));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
                {[
                    { id: "Agency", label: "מפעיל", key: "agency_id", text: "agency_name" },
                    { id: "Cluster", label: "אשכול (אזורים)", key: "Clusterid", text: "ClusterName" },
                    { id: "SubCluster", label: "תת אשכול", key: "ClusterSubDesc", text: "ClusterSubDesc" },
                    { id: "City", label: "עיר", key: "CityName", text: "CityName" },
                    { id: "LineID", label: "קו", key: "LineID", text: "RouteNumber" },
                    { id: "LineType", label: "סוג קו", key: "LineType", text: "LineType" },
                    { id: "linegroup", label: "קבוצת קווים", key: "id", text: "descrip" }
                ].map(({ id, label, key, text }) => (
                    <Form.Group as={Col} controlId={id} key={id}>
                        <Form.Label>{label}:</Form.Label>
                        <Form.Select value={filters[id]} onChange={handleFiltersChange}>
                            <option value="">Выберите</option>
                            {filterOptions[id]?.map((option, index) => (
                                <option key={`${index}`} value={option[key]}>
                                    {option[text]}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                ))}

                <Form.Group as={Col} controlId="StartDate">
                    <Form.Label>מתאריך:</Form.Label>
                    <Form.Control type="date" value={filters.StartDate} onChange={handleFiltersChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="EndDate">
                    <Form.Label>עד תאריך:</Form.Label>
                    <Form.Control type="date" value={filters.EndDate} onChange={handleFiltersChange} />
                </Form.Group>

                <Col>
                    <Button variant="primary" type="submit" className="mt-4" disabled={Object.values(filters).every(value => value === '')}>
                        סנן
                    </Button>
                </Col>
            </Row>
            <hr />
        </Form>
    );
}

export default Filters;
