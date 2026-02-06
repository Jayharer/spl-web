import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { Table, Image, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import { apiListPlayers, apiGetFile } from "../backend/api";
import AppTitleBar from "./AppTitleBar";


const ListPlayer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [img, setImg] = useState("");

    // Table columns
    const columns = [
        {
            title: "Player photo",
            render: (_, record) => (
                <EyeOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => openImage(record.filename)}
                />
            ),
        },
        {
            title: "Full name",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Contact No",
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
        }
    ];

    const fetchData = async () => {
        try {
            setLoading(true);

            const resp = await apiListPlayers();
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

    const openImage = async (id) => {
        const imgUrl = await apiGetFile(id);
        console.log(imgUrl)
        setImg(imgUrl);
        setVisible(true);
    };

    return (
        <div className="mt-10 ms-20">
            <AppTitleBar />
            <div className="mt-6">
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                ></Table>
            </div>
            <Modal
                open={visible}
                footer={null}
                onCancel={() => setVisible(false)}
                title="Photo"
            >
                <img src={img} />
            </Modal>
        </div>
    );
};

export default ListPlayer;
