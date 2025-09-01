const mock_devices = [
    {
        device_id: "87fds8af897fay7sfd7sfs",
        location: "Via delle Anime, 9, Lecce",
        last_seen: "07/09/1984",
        status: true
    },
    {
        device_id: "87fds8af897fay7sfd7sfs",
        location: "Via delle Anime, 9, Lecce",
        last_seen: "07/09/1984",
        status: true
    },
    {
        device_id: "87fds8af897fay7sfd7sfs",
        location: "Via delle Anime, 9, Lecce",
        last_seen: "07/09/1984",
        status: false
    },
    {
        device_id: "87fds8af897fay7sfd7sfs",
        location: "Via delle Anime, 9, Lecce",
        last_seen: "07/09/1984",
        status: false
    },
]

const mock_microservices = [
    {
        name: "DeviceIndexer",
        description: "Gestione collegamento fra nodi e backend",
        last_seen: "07/09/1984",
        status: false
    },
    {
        name: "DeviceDataProcessor",
        description: "Gestione modello AI e misure",
        last_seen: "07/09/1984",
        status: true
    },
    {
        name: "UserService",
        description: "Via delle Anime, 9, Lecce",
        last_seen: "07/09/1984",
        status: true
    },
    {
        name: "Notification",
        description: "Gestione e invio di mail e notifiche",
        last_seen: "07/09/1984",
        status: false
    },
]

export {
    mock_devices,
    mock_microservices
}