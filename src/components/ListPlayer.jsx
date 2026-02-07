import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { Table, Image, Modal, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from 'react-redux'

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
        <div className="mt-10 ms-20">
            <AppTitleBar />
            <div className="mt-6">
                <Table
                    columns={columns}
                    dataSource={player.playerList}
                    loading={player.loading}
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