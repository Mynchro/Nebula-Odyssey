const activities = [
    {
        info: {
            Truppenstärke: "80",
            Einheiten: {
                1: "Leichter Jaeger",
                2: "Schwerer Jaeger",
            },
        },
        timestamp: 5,
        planets: [
            { img: "/planets/p-1.png", name: "Planet 1" },
            { img: "/planets/p-2.png", name: "Planet 2" },
        ],
    },
    {
        info: {
            Truppenstärke: "120",
            Einheiten: {
                1: "Leichter Jaeger",
                2: "Schwerer Jaeger",
                3: "Bomber",
            },
        },
        timestamp: 120,
        planets: [
            { img: "/planets/p-3.png", name: "Planet 3" },
            { img: "/planets/p-4.png", name: "Planet 4" },
        ],
    },
    {
        info: {
            Truppenstärke: "120",
            Einheiten: {
                1: "Schwerer Jaeger",
                2: "Bomber",
            },
        },
        timestamp: 180,
        planets: [
            { img: "/planets/p-5.png", name: "Planet 5" },
            { img: "/planets/p-6.png", name: "Planet 6" },
        ],
    },
];

export default activities;
