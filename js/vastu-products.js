const vastuCollectionDetails = {
    "Metal Strips": {
        badge: "Metal Strip",
        description: "A directional metal strip used in non-demolition Vastu correction work.",
        benefits: ["Item-specific metal remedy", "Suitable for professional Vastu layouts", "Complete product image shown"],
        specs: { "Collection": "Vastu Metal Strips", "Use": "Directional and elemental correction", "Guidance": "Use with a qualified Vastu placement plan" }
    },
    "Color Tapes": {
        badge: "Color Tape",
        description: "A colored Vastu tape for marking and balancing elemental zones without structural changes.",
        benefits: ["Clear element-specific color", "Simple non-demolition application", "Complete roll image shown"],
        specs: { "Collection": "Vastu Color Tapes", "Use": "Elemental zone marking", "Guidance": "Apply only after confirming the affected direction" }
    },
    "Treatment Remedies": {
        badge: "Treatment",
        description: "A specialist Vastu treatment remedy for planned energy correction and placement.",
        benefits: ["Purpose-built Vastu treatment item", "Suitable for mapped correction plans", "Complete product image shown"],
        specs: { "Collection": "Vastu Treatment Remedies", "Use": "Specialist Vastu correction", "Guidance": "Placement should follow a professional Vastu assessment" }
    },
    "Springs": {
        badge: "Vastu Spring",
        description: "A shape-, direction-, and material-specific Vastu spring for mapped elemental corrections.",
        benefits: ["Direction-specific form", "Color or metal aligned construction", "Complete product image shown"],
        specs: { "Collection": "Vastu Springs", "Use": "Directional energy correction", "Guidance": "Confirm clockwise or anti-clockwise placement before use" }
    },
    "Devta Divs": {
        badge: "Devta Div",
        description: "A Devta Div used for precise Vastu Purusha Mandala zone activation and correction.",
        benefits: ["Named for a specific Devta zone", "Designed for mapped placement", "Complete product image shown"],
        specs: { "Collection": "Vastu Devta Divs", "Use": "Devta zone activation", "Guidance": "Install only after identifying the exact Mandala zone" }
    },
    "Paintings": {
        badge: "Vastu Painting",
        description: "A Vastu-themed painting selected for directional ambience and visual energy balancing.",
        benefits: ["Direction-conscious visual remedy", "Ready for wall placement", "Full artwork image shown"],
        specs: { "Collection": "Vastu Paintings", "Use": "Directional visual enhancement", "Guidance": "Choose the wall direction according to the subject" }
    }
};

const vastuProductRows = [
    [2101, "Aluminium Metal Strip Vastu", 725, "Metal Strips", "20220306051947.png"],
    [2102, "Copper Metal Strip", 725, "Metal Strips", "20220306044545.png"],
    [2103, "Iron Metal Strip", 725, "Metal Strips", "20220306043454.png"],
    [2104, "Brass Metal Strip", 725, "Metal Strips", "20220309115925.png"],
    [2105, "Steel Strip", 725, "Metal Strips", "20220309115947.png"],

    [2201, "Blue Tape For Vastu", 257, "Color Tapes", "20220306052509.png"],
    [2202, "Red Tape For Vastu", 257, "Color Tapes", "20220306053812.png"],
    [2203, "Green Tape For Vastu", 257, "Color Tapes", "20220306061055.png"],
    [2204, "White Tape For Vastu", 257, "Color Tapes", "20220306055654.png"],
    [2205, "Yellow Tape For Vastu", 257, "Color Tapes", "20220306054154.png"],

    [2301, "Suraksha Kawach", 1400, "Treatment Remedies", "20250731035531.png"],
    [2302, "Ashtdigpal", 1400, "Treatment Remedies", "20250703120014.png"],
    [2303, "Pooja Samagri", 257, "Treatment Remedies", "20250703120912.png"],
    [2304, "Shifter + Blocker", 5000, "Treatment Remedies", "20250703121236.png"],
    [2305, "Zink Helix", 905, "Treatment Remedies", "20250705022031.png"],
    [2306, "Led Helix", 905, "Treatment Remedies", "20250705022647.png"],
    [2307, "Brass Helix", 905, "Treatment Remedies", "20250705022940.png"],
    [2308, "Copper Helix", 905, "Treatment Remedies", "20250705023353.png"],
    [2309, "Elevator", 2300, "Treatment Remedies", "20250731035230.png"],
    [2310, "Shree Yantra 3 Inch", 1760, "Treatment Remedies", "20250705025645.png"],
    [2311, "Shree Yantra 4 Inch", 3200, "Treatment Remedies", "20250705025940.png"],
    [2312, "Vidhi Shool", 905, "Treatment Remedies", "20250705030514.png"],

    [2401, "Copper Spring", 725, "Springs", "20220226043137.jpg"],
    [2402, "Brass Square Anti Clockwise Spring", 725, "Springs", "20220226051226.jpg"],
    [2403, "Brass Square Clockwise Spring", 725, "Springs", "20220226051715.jpg"],
    [2404, "Iron Round Clockwise Spring", 725, "Springs", "20220226052444.jpg"],
    [2405, "Iron Anti Clockwise Round Spring", 725, "Springs", "20220226053046.jpg"],
    [2406, "White Round Anti Clockwise Spring", 257, "Springs", "20220226053656.jpg"],
    [2407, "White Round Clockwise Spring", 257, "Springs", "20220226054544.jpg"],
    [2408, "Steel Conical Anti Clockwise Spring", 725, "Springs", "20220227121059.jpg"],
    [2409, "Stainless Steel Conical Clockwise Spring", 725, "Springs", "20220227121340.jpg"],
    [2410, "Black Wavy Round Anti Clockwise Spring", 257, "Springs", "20220227122035.jpg"],
    [2411, "Black Wavy Round Clockwise Spring", 257, "Springs", "20220227122510.jpg"],
    [2412, "Copper Triangular Clockwise Spring", 725, "Springs", "20220309015434.png"],
    [2413, "Green Conical Anti-Clockwise Spring", 257, "Springs", "20220227124529.jpg"],
    [2414, "Green Conical Clockwise Spring", 257, "Springs", "20220227124914.jpg"],
    [2415, "Red Triangular Clockwise Spring", 257, "Springs", "20220309015726.png"],
    [2416, "Red Triangular Anti Clockwise Spring", 257, "Springs", "20220309015751.png"],
    [2417, "Yellow Square Anti Clockwise Spring", 257, "Springs", "20220227010728.jpg"],
    [2418, "Yellow Square Clockwise Spring", 257, "Springs", "20220227010733.jpg"],
    [2419, "Aluminium Wavy Round Clockwise Spring", 725, "Springs", "20220227011905.jpg"],
    [2420, "Aluminium Wavy Round Anti Clockwise Spring", 725, "Springs", "20220227012325.jpg"],

    [2501, "Pusha Devta Div", 725, "Devta Divs", "20220316015519.png"],
    [2502, "Diti Devta Div", 725, "Devta Divs", "20220316030046.png"],
    [2503, "Brisha Devta Div", 725, "Devta Divs", "20220316030350.png"],
    [2504, "Bringraj Devta Div", 725, "Devta Divs", "20220316030603.png"],
    [2505, "Aryama Devta Div", 725, "Devta Divs", "20220316031201.png"],
    [2506, "Shikhi Devta Div", 725, "Devta Divs", "20220316031412.png"],
    [2507, "Bhujag Devta Div", 725, "Devta Divs", "20220316031709.png"],
    [2508, "Mrigha Devta Div", 725, "Devta Divs", "20220316031943.png"],
    [2509, "Mitra Devta Div", 725, "Devta Divs", "20220316032156.png"],
    [2510, "Viviswan Devta Div", 725, "Devta Divs", "20220316032422.png"],
    [2511, "Parjanya Devta Div", 725, "Devta Divs", "20220316032715.png"],
    [2512, "Shosha Devta Div", 725, "Devta Divs", "20220316032931.png"],
    [2513, "Aditi Devta Div", 725, "Devta Divs", "20220319100928.png"],
    [2514, "Grishapatya Devta Div", 725, "Devta Divs", "20220319101215.png"],
    [2515, "Mukhya Devta Div", 725, "Devta Divs", "20220319101525.png"],
    [2516, "Bhallat Devta Div", 725, "Devta Divs", "20220319101801.png"],
    [2517, "Jayant Devta Div", 725, "Devta Divs", "20220319102340.png"],
    [2518, "Rajyakshama Devta Div", 725, "Devta Divs", "20220319105110.png"],
    [2519, "Apaha Devta Div", 725, "Devta Divs", "20220319105254.png"],
    [2520, "Savitra Devta Div", 725, "Devta Divs", "20220319105418.png"],
    [2521, "Savita Devta Div", 725, "Devta Divs", "20220319105533.png"],
    [2522, "Pitra Devta Div", 725, "Devta Divs", "20220319105739.png"],
    [2523, "Roga Devta Div", 725, "Devta Divs", "20220319105856.png"],
    [2524, "Rudra Devta Div", 725, "Devta Divs", "20220319110330.png"],
    [2525, "Jaya Devta Div", 725, "Devta Divs", "20220319111153.png"],
    [2526, "Naga Devta Div", 725, "Devta Divs", "20220319111403.png"],
    [2527, "Duawarik Devta Div", 725, "Devta Divs", "20220319111544.png"],
    [2528, "Apahaavtsa Devta Div", 725, "Devta Divs", "20220319111749.png"],
    [2529, "Indra Devta Div", 725, "Devta Divs", "20220319112038.png"],
    [2530, "Asur Devta Div", 725, "Devta Divs", "20220319112300.png"],
    [2531, "Mahendra Devta Div", 725, "Devta Divs", "20220319112507.png"],
    [2532, "Surgreev Devta Div", 725, "Devta Divs", "20220319112744.png"],
    [2533, "Yama Devta Div", 725, "Devta Divs", "20220319112937.png"],
    [2534, "Satya Devta Div", 725, "Devta Divs", "20220319113209.png"],
    [2535, "Surya Devta Div", 725, "Devta Divs", "20220319113502.png"],
    [2536, "Anil Devta Div", 725, "Devta Divs", "20220319115120.png"],
    [2537, "Gandharv Devta Div", 725, "Devta Divs", "20220319122445.png"],
    [2538, "Budhar Devta Div", 725, "Devta Divs", "20220319122622.png"],
    [2539, "Akash Devta Div", 725, "Devta Divs", "20220319122753.png"],
    [2540, "Vithatha Devta Div", 725, "Devta Divs", "20220319122932.png"],
    [2541, "Pushpdant Devta Div", 725, "Devta Divs", "20220319124054.png"],
    [2542, "Papayakshma Devta Div", 725, "Devta Divs", "20220319124225.png"],

    [2601, "Churning Scenery", 1130, "Paintings", "20220223122843.jpg"],
    [2602, "Dual Mountain Painting", 1130, "Paintings", "20220425040905.jpg"],
    [2603, "Green Landscape Painting", 1130, "Paintings", "20220223123713.jpg"],
    [2604, "Door Opener Painting", 1130, "Paintings", "20220223124109.jpg"],
    [2605, "Village Scene Painting", 1130, "Paintings", "20220224124627.jpg"]
];

const vastuProductsData = vastuProductRows.map(([id, name, price, vastuType, imageFile]) => {
    const details = vastuCollectionDetails[vastuType];
    return {
        id,
        name,
        category: "Vastu",
        vastuType,
        price,
        image: `images/products/vastu/${imageFile}`,
        link: `product-detail.html?id=${id}`,
        description: `${name}. ${details.description}`,
        benefits: details.benefits,
        specs: details.specs,
        handbook: "This is a specialist Vastu remedy. Placement, direction, material, color, and orientation should be selected from an accurate floor plan or a qualified Vastu assessment. Product imagery is item-specific so you can identify the exact remedy before ordering.",
        badge: details.badge
    };
});

productsData.push(...vastuProductsData);
