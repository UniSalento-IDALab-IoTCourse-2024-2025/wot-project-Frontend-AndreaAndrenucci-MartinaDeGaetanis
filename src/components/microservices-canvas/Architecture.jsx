import React, { useEffect, useState } from "react";
import { microservices, connections } from "../../constants/microservices";
import { API_ENDPOINTS } from "../../constants/backend_ops";
import { useDeviceDataProcessor, useDeviceIndexer, useHealthCheck } from "../../hooks/backend";
import MicroserviceNode from "./MicroserviceNode";
import { tryGatewayConn } from "../../hooks/backend/useGatewayTest";
import { use } from "react";

const Architecture = () => {


    const getNodeById = (id) => microservices.find((m) => m.id === id);

    const[dataProcessorStatus, setDataProcessorStatus] = useState(false);
    const[indexerStatus, setIndexerStatus] = useState(false);
    const[gatewayStatus, setGatewayStatus] = useState(false);
    const[UserServiceStatus, setUserServiceStatus] = useState(false);
    const[NotificationStatus, setNotificationStatus] = useState(false);

    const { useMethods: isDataProcessorOnline } = useDeviceDataProcessor(API_ENDPOINTS.DEVICE.TEST_CONNECTION);
    const { useMethods: isIndexerOnline } = useDeviceIndexer(API_ENDPOINTS.INDEXER.TEST_CONNECTION);
    const {useMethods: isUserServiceOnline} = useHealthCheck(API_ENDPOINTS.HEALTH_CHECK_API.TEST_CONNECTION_USER);
    const {useMethods: isNotificationOnline} = useHealthCheck(API_ENDPOINTS.HEALTH_CHECK_API.TEST_CONNECTION_NOTIFICATION);

    const getConnectionsStatus = async () => {
        setDataProcessorStatus(await isDataProcessorOnline())
        setIndexerStatus(await isIndexerOnline())
        setGatewayStatus(await tryGatewayConn())
        setUserServiceStatus(await isUserServiceOnline())
        setNotificationStatus(await isNotificationOnline())
    }

    useEffect(()=>{
        getConnectionsStatus()
    },[dataProcessorStatus, gatewayStatus, UserServiceStatus, NotificationStatus, indexerStatus])

    const getMicroserviceStatus = (name) => {
        switch (name) {
            case "DataProcessor":
                return dataProcessorStatus;
            case "Client":
                return true; 
            case "Gateway":
                return gatewayStatus;
            case "UserService":
                return UserServiceStatus;
            case "Notification":
                return NotificationStatus;
            case "DeviceIndexer":
                return indexerStatus; 
            default:
                return false;
        }
    };



    return (
        <svg width="800" height="800" style={{ background: "#00000000" }}>
            <g transform="scale(1.3)">

                {connections.map((c, i) => {
                    const from = getNodeById(c.from);
                    const to = getNodeById(c.to);
                    return (
                        <line
                            key={i}
                            x1={from.x + 60}
                            y1={from.y + 25}
                            x2={to.x + 60}
                            y2={to.y + 25}
                            stroke="#888"
                            strokeWidth="2"
                            strokeDasharray={c.type === "amqp" ? "6,4" : "0"}
                            markerEnd="url(#arrowhead)"
                        />
                    );
                })}

                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="10"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
                    </marker>
                </defs>

                {microservices.map((m) => (
                    <MicroserviceNode
                        key={m.id}
                        x={m.x}
                        y={m.y}
                        name={m.name}
                        status={getMicroserviceStatus(m.name)}
                    />
                ))}
            </g>
        </svg>
    );
};

export default Architecture;
