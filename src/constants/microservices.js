    const microservices = [
        { id: 1, name: "Client", x: 250, y: 40, status: true },
        { id: 2, name: "Gateway", x: 250, y: 150, status: true },
        { id: 3, name: "UserService", x: 100, y: 280, status: true },
        { id: 4, name: "Notification", x: 100, y: 370, status: true },
        { id: 5, name: "DataProcessor", x: 300, y: 380, status: true },
        { id: 6, name: "DeviceIndexer", x: 400, y: 250, status: false },
    ];

    const connections = [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4, type: "amqp" },
        { from: 2, to: 5 },
        { from: 6, to: 5, type: "amqp" },
        { from: 2, to: 6 },
        { from: 2, to: 4 },
    ];

    export {
        microservices,
        connections
    }