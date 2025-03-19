import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';

// Функция для получения уникальных значений по ключу
const getUniqueValues = (array, key) => {
  return [...new Set(array.map(item => item[key]))];
};

function Filters() {
  const url = import.meta.env.VITE_URL;
  const userId = import.meta.env.VITE_USERID;
  const user = import.meta.env.VITE_USER;
  const password = import.meta.env.VITE_PASSWORD;

  // Состояния для данных, фильтров и опций селектов
  const [allData, setAllData] = useState([]);
  const [allFilters, setAllFilters] = useState({
    Agency: [],
    Cluster: [],
    SubCluster: [],
    City: [],
    LineID: [],
    LineType: [],
    linegroup: []
  });
  const [filterOfFilter, setFilterOfFilter] = useState({
    Agency: '',
    Cluster: '',
    SubCluster: '',
    City: '',
    LineID: '',
    LineType: '',
    linegroup: ''
  });
  const [filteredFilters, setFilteredFilters] = useState([]);

  // Запрашиваем данные с сервера и генерируем начальные опции
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post(
        `${url}/UsersChoice`,
        {
          userName: user,
          password,
          data: { UserId: userId, SelectChoice: 'All' }
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const resData = response.data.ResData;
      setAllData(resData);
      setAllFilters({
        Agency: getUniqueValues(resData, 'agency_name'),
        Cluster: getUniqueValues(resData, 'ClusterName'),
        SubCluster: getUniqueValues(resData, 'ClusterSubDesc'),
        City: getUniqueValues(resData, 'CityName'),
        LineID: getUniqueValues(resData, 'LineID'),
        LineType: getUniqueValues(resData, 'LineType'),
        linegroup: getUniqueValues(resData, 'RouteNumber')
      });
      setFilteredFilters(resData);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error.response?.data || error.message);
    }
  }, [url, user, password, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Обновляем опции фильтров на основе выбранных значений
  const updateFilterOptions = (updatedFilters) => {
    const filteredData = allData.filter(item =>
      Object.entries(updatedFilters).every(([key, val]) => {
        if (!val) return true;
        const mapping = {
          Agency: 'agency_name',
          Cluster: 'ClusterName',
          SubCluster: 'ClusterSubDesc',
          City: 'CityName',
          LineID: 'LineID',
          LineType: 'LineType',
          linegroup: 'RouteNumber'
        };
        const dataKey = mapping[key] || key;
        return String(item[dataKey]).trim() === String(val).trim();
      })
    );

    setFilteredFilters(filteredData);

    setAllFilters({
      Agency: getUniqueValues(filteredData, 'agency_name'),
      Cluster: getUniqueValues(filteredData, 'ClusterName'),
      SubCluster: getUniqueValues(filteredData, 'ClusterSubDesc'),
      City: getUniqueValues(filteredData, 'CityName'),
      LineID: getUniqueValues(filteredData, 'LineID'),
      LineType: getUniqueValues(filteredData, 'LineType'),
      linegroup: getUniqueValues(filteredData, 'RouteNumber')
    });
  };

  // При изменении любого фильтра – обновляем selected values и опции
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    const updatedFilters = { ...filterOfFilter, [id]: value };
    setFilterOfFilter(updatedFilters);
    updateFilterOptions(updatedFilters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику для обработки отправки формы
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center">
        {[
          { id: "Agency", label: "מפעיל" },
          { id: "Cluster", label: "אשכול (אזורים)" },
          { id: "SubCluster", label: "תת אשכול" },
          { id: "City", label: "עיר" },
          { id: "LineID", label: "קו" },
          { id: "LineType", label: "סוג קו" },
          { id: "linegroup", label: "קבוצת קווים" }
        ].map(({ id, label }) => (
          <Form.Group as={Col} controlId={id} key={id}>
            <Form.Label>{label}:</Form.Label>
            <Form.Select value={filterOfFilter[id]} onChange={handleFilterChange}>
              <option value="">Выберите</option>
              {allFilters[id]?.map((option, index) => (
                <option key={`${id}-${index}`} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ))}
        <Col>
          <Button variant="primary" type="submit" className="mt-4">
            Сохранить
          </Button>
        </Col>
      </Row>
      <hr />
    </Form>
  );
}

export default Filters;