import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import axios from "axios";
import { Table } from "antd";


const ListPlayer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Table columns
    const columns = [
        {
            title: "Name",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Contact",
            dataIndex: "contact",
            key: "contact",
        },
        {
            title: "Skill",
            dataIndex: "skill",
            key: "skill",
        },
        {
            title: "T-Shirt Size",
            dataIndex: "tshirtsize",
            key: "tshirtsize",
        },
        {
            title: "Choice Number",
            dataIndex: "choiceno",
            key: "choiceno",
        },
    ];

    const fetchData = async () => {
        try {
            setLoading(true);

            const resp = await axios.get(
                'https://5egpoykfxf.execute-api.us-east-1.amazonaws.com/prod/listplayer'
            );
            console.log("listplayer", resp)
            // AntD Table expects each row to have unique `key`
            const tableData = resp.data.data.map((item) => ({
                ...item,
                key: item.payment_id,
            }));

            setData(tableData);
        } catch (error) {
            toast.error("Failed to load data");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="mt-10 ms-20">
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
            ></Table>
        </div>
    );
};

export default ListPlayer;
