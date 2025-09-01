import { FaAt, FaChartArea, FaTree, FaMap, FaMicrochip, FaServer, FaFirstAid} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";


const app_navlinks = [
    {
        link:"/app/map",
        icon:FaMap
    }
]

const affiliated_users_navlinks = [
    {
        link:"/app/dashboard",
        icon:FaChartArea
    },
    {
        link:"/app/trees-simulations",
        icon:FaTree
    },
    {
        link:"/app/health-simulations",
        icon:FaFirstAid
    },
]

const app_admin_navlinks = [
    {
        link:"/app/dashboard",
        icon:FaChartArea
    },
    {
        link:"/app/trees-simulations",
        icon:FaTree
    },
    {
        link:"/app/health-simulations",
        icon:FaFirstAid
    },
    {
        link:"/app/management",
        icon:FaServer
    }
]



const home_navlinks = [
    {
        link:"/signin",
        label:"Sign In"
    },
    {
        link:"/signup",
        label:"Sign Up"
    }
]

const adminTableIndexes = [
    {
        icon:FaMicrochip,
        subject:'devices-status',
        lable:'Dispositivi'
    },
    {
        icon:FaGear,
        subject:'microservices-status',
        lable: 'Microservizi'
    },
    {
        icon:FaAt,
        subject:'conventioned-domains',
        lable: 'Convenzioni'
    }
]


const records_ops = {
    ipa : "ipa",
    pm10 : "pm10",
    pm2dot5 : "pm2dot5",
    no2 : "no2",
    co : "co",
    c6h6: "c6h6",
    h2s : "h2s",
    o3 : "o3",
    so2 : "so2",
}

const titlesMap = {
    [records_ops.ipa]: "Andamento temporale di IPA",
    [records_ops.pm10]: "Andamento temporale di PM10",
    [records_ops.pm2dot5]: "Andamento temporale di PM2.5",
    [records_ops.no2]: "Andamento temporale di NO2",
    [records_ops.co]: "Andamento temporale di CO",
    [records_ops.c6h6]: "Andamento temporale di C6H6",
    [records_ops.h2s]: "Andamento temporale di H2S",
    [records_ops.o3]: "Andamento temporale di O3",
    [records_ops.so2]: "Andamento temporale di SO2",
};

const pollutants = [
    {
        label: "IPA",
        img: "/pollutants_map_mock/kriging_map_ipa.png"
    },
    {
        label: "PM10",
        img: "/pollutants_map_mock/kriging_map_pm10.png"
    },
    {
        label: "PM2.5",
        img: "/pollutants_map_mock/kriging_map_pm2dot5.png"
    },
    {
        label: "NO2",
        img: "/pollutants_map_mock/kriging_map_no2.png"
    },
    {
        label: "CO",
        img: "/pollutants_map_mock/kriging_map_co.png"
    },
    {
        label: "C6H6",
        img: "/pollutants_map_mock/kriging_map_c6h6.png"
    },
    {
        label: "H2S",
        img: "/pollutants_map_mock/kriging_map_h2s.png"
    },
    {
        label: "O3",
        img: "/pollutants_map_mock/kriging_map_o3.png"
    },
    {
        label: "SO2",
        img: "/pollutants_map_mock/kriging_map_so2.png"
    }
]



const supportedRegions = [
    {
        region: "Puglia",
        minZoom: 8,
        maxZoom: 12,
        bounds: [
            [39.7, 14.7],
            [42.1, 18.8],
        ]

    },
    {
        region: "Lecce",
        minZoom: 14,
        maxZoom: 18,
        bounds: [
            [40.313983, 18.075689], // south, west
            [40.401261, 18.254114], // north, east
        ]
    }
]

export{
    app_navlinks,
    affiliated_users_navlinks,
    app_admin_navlinks,
    home_navlinks,
    records_ops,
    titlesMap,
    pollutants,
    adminTableIndexes,
    supportedRegions
}