export const kpiData = [
  { id:1, icon:"💰", label:"Total Sales Today",     value:"₹ 8,45,000",  delta:"+12.4%",  up:true  },
  { id:2, icon:"📈", label:"Forecast Accuracy",     value:"94.2%",        delta:"+2.1%",   up:true  },
  { id:3, icon:"🏭", label:"Inventory Value",        value:"₹ 32,00,000", delta:"-3.5%",   up:false },
  { id:4, icon:"🛡️", label:"Supplier Risk Score",   value:"72 / 100",    delta:"Moderate",up:null  },
];

export const salesTrendData = [
  { month:"Jan", actual:6200,  forecast:5800  },
  { month:"Feb", actual:7100,  forecast:6900  },
  { month:"Mar", actual:6800,  forecast:7200  },
  { month:"Apr", actual:9500,  forecast:8800  },
  { month:"May", actual:12800, forecast:11500 },
  { month:"Jun", actual:12000, forecast:12200 },
  { month:"Jul", actual:15500, forecast:14000 },
  { month:"Aug", actual:15000, forecast:16500 },
];

export const categoryData = [
  { name:"Electronics", value:35, color:"#7c3aed" },
  { name:"Apparel",     value:20, color:"#38bdf8" },
  { name:"Home Goods",  value:28, color:"#22c55e" },
  { name:"Groceries",   value:17, color:"#f97316" },
];

export const recentActivity = [
  { id:1, type:"reorder",  msg:"Reorder triggered for Smartphone X",      time:"2m ago",  status:"info"    },
  { id:2, type:"alert",    msg:"Low stock alert: Smartwatch A (20 units)", time:"14m ago", status:"warning" },
  { id:3, type:"supplier", msg:"Supplier Vendor X risk score updated",     time:"1h ago",  status:"danger"  },
  { id:4, type:"success",  msg:"Route #2 optimized — saving ₹18,000",     time:"2h ago",  status:"success" },
  { id:5, type:"forecast", msg:"Demand forecast updated for Q3 2026",      time:"5h ago",  status:"info"    },
];

export const forecastData = [
  { month:"Mar", actual:8000,  predicted:7800,  accuracy:97.5 },
  { month:"Apr", actual:9500,  predicted:9200,  accuracy:96.8 },
  { month:"May", actual:12800, predicted:12500, accuracy:97.7 },
  { month:"Jun", actual:12000, predicted:12400, accuracy:96.8 },
  { month:"Jul", actual:15500, predicted:15200, accuracy:98.1 },
  { month:"Aug", actual:15000, predicted:15800, accuracy:94.9 },
  { month:"Sep", actual:null,  predicted:17200, accuracy:null },
  { month:"Oct", actual:null,  predicted:18500, accuracy:null },
];

export const inventoryData = [
  { id:1,  sku:"SKU-001", name:"Smartphone X Pro",    category:"Electronics", stock:245,  reorder:50,  value:"₹4,90,000", status:"instock"  },
  { id:2,  sku:"SKU-002", name:"Smartwatch A Series", category:"Electronics", stock:20,   reorder:30,  value:"₹1,40,000", status:"critical" },
  { id:3,  sku:"SKU-003", name:"Casual Linen Shirt",  category:"Apparel",     stock:380,  reorder:100, value:"₹76,000",   status:"instock"  },
  { id:4,  sku:"SKU-004", name:"Gaming Headset Pro",  category:"Electronics", stock:45,   reorder:40,  value:"₹2,25,000", status:"low"      },
  { id:5,  sku:"SKU-005", name:"Organic Coffee 500g", category:"Groceries",   stock:1200, reorder:200, value:"₹1,80,000", status:"instock"  },
  { id:6,  sku:"SKU-006", name:"Ergonomic Chair",     category:"Home Goods",  stock:18,   reorder:25,  value:"₹3,24,000", status:"critical" },
  { id:7,  sku:"SKU-007", name:"Wireless Earbuds",    category:"Electronics", stock:92,   reorder:50,  value:"₹4,60,000", status:"instock"  },
  { id:8,  sku:"SKU-008", name:"Yoga Mat Premium",    category:"Home Goods",  stock:33,   reorder:30,  value:"₹49,500",   status:"low"      },
  { id:9,  sku:"SKU-009", name:"Running Shoes X2",    category:"Apparel",     stock:0,    reorder:40,  value:"₹0",        status:"critical" },
  { id:10, sku:"SKU-010", name:"Basmati Rice 5kg",    category:"Groceries",   stock:890,  reorder:150, value:"₹1,78,000", status:"instock"  },
];

export const supplierData = [
  { id:1, name:"TechCore Pvt Ltd",    category:"Electronics", score:88, risk:"low",    delivery:97, quality:92, compliance:95, trend:[70,75,80,85,88] },
  { id:2, name:"Vendor X Industries", category:"Mixed",        score:42, risk:"high",   delivery:61, quality:55, compliance:48, trend:[65,58,52,46,42] },
  { id:3, name:"Supplier Y Co.",      category:"Apparel",      score:74, risk:"medium", delivery:80, quality:78, compliance:72, trend:[68,70,72,74,74] },
  { id:4, name:"GlobalTrade Ltd",     category:"Groceries",    score:91, risk:"low",    delivery:98, quality:95, compliance:96, trend:[85,87,89,90,91] },
  { id:5, name:"FastShip Logistics",  category:"Logistics",    score:59, risk:"medium", delivery:70, quality:65, compliance:62, trend:[72,68,64,61,59] },
  { id:6, name:"QualityFirst Mfg",    category:"Home Goods",   score:33, risk:"high",   delivery:45, quality:38, compliance:30, trend:[55,48,42,38,33] },
];

export const supplierAlerts = [
  { id:1, supplier:"Vendor X Industries", msg:"Delivery performance dropped below 65%", severity:"high"   },
  { id:2, supplier:"QualityFirst Mfg",    msg:"Compliance score critically low at 30%", severity:"high"   },
  { id:3, supplier:"FastShip Logistics",  msg:"3 delayed shipments in last 30 days",    severity:"medium" },
  { id:4, supplier:"Supplier Y Co.",      msg:"Certificate renewal due in 14 days",     severity:"low"    },
];