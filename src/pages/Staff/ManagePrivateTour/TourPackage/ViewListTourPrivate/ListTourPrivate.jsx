import React from 'react';
// import { Card, List } from 'antd';
import { Table, Button, Tag, Tooltip  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DETAIL_TOUR_REQUEST_STAFF } from '../../../../../settings/constant';

const getStatusColor = (status) => {
    const statusColors = {
        PROCESSING: 'blue',
        AWAITING_RESPONSE: 'orange',
        SELECTED_TOUR: 'green',
        COMPLETED: 'geekblue',
        CANCELLED: 'volcano',
    };

    return statusColors[status.replace(/ /g, '_').toUpperCase()] || 'default';
};

const ListTourPrivate = ({ orders, title }) => {
    const navigate = useNavigate(); // Sử dụng hook useNavigate

    const showTourDetails = (order) => {
        // Assuming order.id is numeric.
        navigate(DETAIL_TOUR_REQUEST_STAFF.replace(':id', order.id.toString()), { state: { order } });
    };

    if (!Array.isArray(orders) || orders.length === 0) { 
        return (
            <div className="text-center">
                <p className="text-lg font-semibold">Không có đơn hàng nào đang chờ xử lý.</p>
            </div>
        );
    }

    // Convert orders to a format compatible with the Ant Design Table
    const dataSource =  orders.map((order) => ({
        key: order.id,
        id: order.id, 
        status: order.status,
        dateRange: order.dateRange,
        username: order.username,
        phone: order.phone,
        tourName: order.tourName,

        type: order.type,
        description: order.description,
        adults: order.adults,
        child: order.children,
        locations: order.locations,
        note: order.note,
        // Assuming you have a total field in your order object
        // total: order.total
    }));

    


    

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên Tour',
            dataIndex: 'tourName',
            key: 'tourName',
            
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>{status.replace(/_/g, ' ')}</Tag>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'dateRange',
            key: 'dateRange',
        },
        {
            title: 'Customer',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            // width: 250, // Adjust the width as needed
            render: (text) => (
                <Tooltip title={text}>
                    <span>{truncateText(text, 10)}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Số lượng người lớn',
            dataIndex: 'adults',
            key: 'adults',
        },
        {
            title: 'Số lượng trẻ em',
            dataIndex: 'child',
            key: 'child',
        },
        {
            title: 'Locations',
            dataIndex: 'locations',
            key: 'locations',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            // width: 250, // Adjust the width as needed
            render: (text) => (
                <Tooltip title={text}>
                    <span>{truncateText(text, 5)}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Total',
            render: () => 'Total Placeholder',
            key: 'total',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => showTourDetails(record)}>View Details</Button>
            ),
        },
    ];


    const paginationConfig = {
        pageSize: 10, // You want 10 items per page
        showSizeChanger: true, // Allows changing the page size
        pageSizeOptions: ['10', '20', '30'], // Page size options in the changer
        showQuickJumper: true, // Allows jumping to a specific page
        showTotal: (total, range) => `Tổng Tour: ${total}`, // Display total number of items
    };

    const truncateText = (text, limit) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return `${words.slice(0, limit).join(' ')}...`;
        }
        return text;
    };

    return (
        <div className="container mx-auto mt-4">
            <h2 className="text-xl font-bold text-center mb-5">{title}</h2>
            <Table 
                columns={columns} 
                dataSource={dataSource} 
                pagination={paginationConfig} 
                scroll={{ x: 1800, y: 500 }} 
            />
        </div>
    );
};

export default ListTourPrivate;
