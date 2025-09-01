

const MicroserviceNode = ({ x, y, name, status }) => {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <rect
                width={name.length * 1.8 + 80}
                height="50"
                rx="8"
                fill="#f0f0f0"
                stroke="#333"
                strokeWidth="2"
            />

            <text
                x={40 + name.length * 0.5}
                y="30"
                textAnchor="middle"
                fontSize="12"
                fill="#333"
            >
                {name}
            </text>
            <defs>
                <filter
                    id="blur"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                    filterUnits="userSpaceOnUse"
                >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                </filter>
            </defs>

            <circle
                cx={70 + name.length * 1.8}
                cy="10"
                r="7"
                fill={status == true ? "green" : "red"}
                opacity="0.7"
                filter="url(#blur)"
            />

            <circle
                cx={70 + name.length * 1.8}
                cy="10"
                r="6"
                fill={status == true ? "green" : "red"}
                stroke="#333"
                strokeWidth="1"
            />
        </g>
    );
};


export default MicroserviceNode