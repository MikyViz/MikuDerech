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
    
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    const [filterOptions, setFilterOptions] = useState({});
    const [filters, setFilters] = useState({
        Agency: '', Cluster: '', SubCluster: '', City: '', LineID: '',
        LineType: '', linegroup: '',
        StartDate: threeMonthsAgo.toISOString().split('T')[0],
        EndDate: currentDate.toISOString().split('T')[0]
    });

    const [allData, setAllData] = useState([]);

    const fetchFilterData = useCallback(async () => {
        try {
            const { data } = await axios.post(`${url}/UsersChoice`, {
                userName: user, password,
                data: { UserId: userId, SelectChoice: 'All' }
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            setAllData(data.ResData);
            generateFilterOptions(data.ResData);
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
            if (!val) return true; // Если значение фильтра не выбрано - пропускаем
            return item[key] === val;
        })
    );

    // Пересчитываем доступные опции для всех фильтров
    const newFilterOptions = {
        City: [...new Set(filteredData.map(item => item.CityName))],
        Agency: [...new Set(filteredData.map(item => item.agency_name))],
        Cluster: [...new Set(filteredData.map(item => item.ClusterName))],
        SubCluster: [...new Set(filteredData.map(item => item.ClusterSubDesc))],
        LineID: [...new Set(filteredData.map(item => item.LineID))],
        LineType: [...new Set(filteredData.map(item => item.LineType))],
        linegroup: [...new Set(filteredData.map(item => item.RouteNumber))],
    };

    // Оставляем выбранные фильтры, только если они есть в новых данных
    const validatedFilters = Object.keys(updatedFilters).reduce((acc, key) => {
        if (!updatedFilters[key] || newFilterOptions[key].includes(updatedFilters[key])) {
            acc[key] = updatedFilters[key];
        } else {
            acc[key] = ''; // Если опции больше нет в новых данных - сбрасываем её
        }
        return acc;
    }, {});

    setFilters(validatedFilters);
    setFilterOptions(newFilterOptions);
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
                                <option key={`${id}-${option[key]}`} value={option[key]}>
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
