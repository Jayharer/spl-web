import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { Table, Image, Modal, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux'
import { CSVLink } from "react-csv";

import { apiGetFile } from "../backend/api";
import { listPlayerLoadFlow } from "../backend/listPlayerSlice"
import AppTitleBar from "./AppTitleBar";



const ListPlayer = () => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [img, setImg] = useState("");
    const player = useSelector((state) => state.player)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listPlayerLoadFlow());
    }, [dispatch])

    const headers = [
        { label: "Player Name", key: "full_name" },
        { label: "Contact No", key: "contact" },
        { label: "Skill", key: "skill" },
        { label: "T-Shirt Size Name", key: "tshirtsize" },
        { label: "Choice No", key: "choiceno" },
        { label: "Payement ID", key: "payment_id" },
        { label: "Payement Method", key: "method" },
        { label: "Payement Instrument", key: "instrument" },
        { label: "Coupon Code", key: "couponcode" },
    ];

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

    const openImage = async (filename) => {
        setLoading(true)
        setVisible(true);
        const imgUrl = await apiGetFile(filename);
        console.log(imgUrl)
        setImg(imgUrl);
        setLoading(false)
    };

    return (
        <div className="mt-5 ms-20">
            <div className="flex">
                <AppTitleBar />
                <CSVLink
                    data={player.playerList}
                    headers={headers}
                    filename="players.csv"
                    className="ml-40 px-2 py-2 bg-purple-500 text-white rounded hover:bg-purple-800 transition"
                >
                    Download
                                        </CSVLink>
            </div>
            <div className="mt-3">
                <Table
                    columns={columns}
                    dataSource={player.playerList}
                    loading={player.loading}
                    pagination={{ pageSize: 8 }}
                ></Table>
            </div>
            <Modal title="Photo" open={visible} footer={null}
                onCancel={() => setVisible(false)}>
                {loading ? (
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <div className="p-2">
                        <Image src={img} />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ListPlayer;

{/* <Modal open={open} onOpenChange={fetchData}>
  <Spin spinning={loading} tip="Loading...">
    <div>Data Loaded Here</div>
  </Spin>
</Modal> */}