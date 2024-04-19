/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState, useEffect, useRef, useCallback } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";

//import socket connection
import socket from "../../socket";

//import toast from react-toastify
import { toast } from "react-toastify";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardTitle,
  CardDeck,
  CardFooter,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../variables/charts.js";

import Header from "components/Headers/Header.js";
import Dropdown from "react-bootstrap/Dropdown";

import React from "react";
import { useLocation, Link } from "react-router-dom";
import moment from "moment-timezone"; // convert UTC date to Asia/Manila date
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import MetaData from "components/layout/MetaData.js";

// Default Admin Chart (All store sales)
import { allProductList } from "actions/productActions.js"; // Action for product inventory
import {
  allStoreSalesAction,
  getSalesOrderByBarangay,
  getSalesWalkin,
  getSalesOrderByBranch,
  getOrderTransactions,
  getOrderByGallonType,
  getStaffPerformance,
  clearErrors,
  getCurrentBranchSales,
  getAllUserReviewsByBranch,
} from "../../actions/adminAction"; // Actions for sales, walkin sales, order sales, order transactions, order gallon type, barangay sales, staff performance
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar
} from "@fortawesome/free-solid-svg-icons";
import { allAdminBranches } from "actions/storebranchActions";
import { useDispatch, useSelector } from "react-redux";
const Dashboard = (props) => {
  const dispatch = useDispatch();

  const { sales, error } = useSelector((state) => state.adminStoreSales); // Get the sales of all stores
  const { orders } = useSelector((state) => state.adminSalesOrder); // Get the sales of all online orders
  const { transactions } = useSelector((state) => state.adminOrderTransaction); // Get the transactions of all orders
  const { user } = useSelector((state) => state.auth); // Get the user id
  const { branch } = useSelector((state) => state.adminStoreBranch); // Get the selected branch id
  const { sales: walkinSales } = useSelector((state) => state.adminSalesWalkin); // Get the sales of all walk in orders
  const { gallons } = useSelector((state) => state.adminOrderGallonType); // Get the gallon type of all orders
  const { products } = useSelector((state) => state.allProducts); // Get the inventory of all products
  const { orders: barangay } = useSelector((state) => state.adminSalesBarangay); // Get the sales of all barangays
  const { performance } = useSelector((state) => state.adminStaffPerformance); // Get the performance of all employees
  const { reviews } = useSelector((state) => state.adminReview);
  const { sales: currentSalesBranch } = useSelector(
    (state) => state.adminCurrentBranchSales
  ); // Get the total sales of selected branch
  const { storeBranch } = useSelector((state) => state.allStoreBranch); //get all store branches of admin
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]; // Array of months
  const currentYear = new Date().getFullYear();
  let years = [];
  for (let year = 2024; year <= currentYear; year++) {
    years.push(year);
  }
  const [reviewSelectedYear, setReviewSelectedYear] = useState(currentYear);
  const [reviewSelectedMonth, setReviewSelectedMonth] = useState(
    new Date().getMonth()
  );
  const [reviewMonthName, setReviewMonthName] = useState(
    months[reviewSelectedMonth]
  );
  const [selectedYear, setSelectedYear] = useState(currentYear); // Selected year (number)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Selected month (number)
  const [monthName, setMonthName] = useState(months[selectedMonth]); // Selected month name (String)
  const [startDate, setStartDate] = useState(new Date());

  const [branch2, setBranch2] = useState(""); // Selected branch
  const [totalSales, setTotalSales] = useState(0);
  const [colors, setColors] = useState([]);
  //Filter states
  const [filter1, setFilter1] = useState("daily");
  const [activeNav, setActiveNav] = useState(1);
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setFilter1(
      index === 1
        ? "daily"
        : index === 2
        ? "weekly"
        : index === 3
        ? "monthly"
        : "yearly"
    );
  };

  const [filter2, setFilter2] = useState("daily");
  const [activeNav2, setActiveNav2] = useState(1);
  const toggleNavs2 = (e, index) => {
    e.preventDefault();
    setActiveNav2(index);
    setFilter2(
      index === 1
        ? "daily"
        : index === 2
        ? "weekly"
        : index === 3
        ? "monthly"
        : "yearly"
    );
  };

  const [filter3, setFilter3] = useState("today");
  const [activeNav3, setActiveNav3] = useState(1);
  const toggleNavs3 = (e, index) => {
    e.preventDefault();
    setActiveNav3(index);
    setFilter3(
      index === 1
        ? "today"
        : index === 2
        ? "week"
        : index === 3
        ? "month"
        : "year"
    );
  };

  const [filter4, setFilter4] = useState("today");
  const [activeNav4, setActiveNav4] = useState(1);
  const toggleNavs4 = (e, index) => {
    e.preventDefault();
    setActiveNav4(index);
    setFilter4(
      index === 1
        ? "today"
        : index === 2
        ? "week"
        : index === 3
        ? "month"
        : "year"
    );
  };

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        maxBarThickness: 20,
      },
    ],
  });
  const [data2, setData2] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        maxBarThickness: 20,
      },
    ],
  });
  const [data3, setData3] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        maxBarThickness: 20,
      },
    ],
  });
  const [data4, setData4] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        maxBarThickness: 20,
      },
    ],
  });
  const [data5, setData5] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
      },
    ],
  });
  const [data6, setData6] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
      },
    ],
  });
  const [data7, setData7] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
      },
    ],
  });
  const [data8, setData8] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
      },
    ],
  });
  const [options, setOptions] = useState({});
  const options2 = {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (value) {
              if (!(value % 10)) {
                return value;
              } else if (!(value % 1)) {
                return value;
              }
            },
          },
          stacked: true,
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";

          content += label;

          content += " " + yLabel;
          return content;
        },
      },
    },
  };
  const handleMonthFilter = (month, index) => {
    setMonthName(month);

    setSelectedMonth(index);
  };
  const handleReviewMonthFilter = (month, index) => {
    setReviewMonthName(month);

    setReviewSelectedMonth(index);
  };
  const handleYearFilter = (year) => {
    setSelectedYear(year);
  };
  const handleReviewYearFilter = (year) => {
    setReviewSelectedYear(year);
  };

  // Random color generator from the same hue
  let hue = Math.random() * 360;
  const goldenRatioConjugate = 0.618033988749895;
  function getRandomColor() {
    hue += goldenRatioConjugate;
    hue = hue % 1;
    const h = Math.floor(hue * 360);
    return `hsl(${h},60%,60%)`;
  }
  //Get labels based on filter
  const getLabels = (filter, transactions) => {
    if (filter === "daily") {
      return transactions.transactions.map((transaction) =>
        moment(transaction._id + "Z")
          .tz("Asia/Manila")
          .format("YYYY-MM-DD HH:mm")
      );
    } else if (filter === "weekly") {
      // return transactions.transactions.map(transaction => transaction._id);
      const [month, day, year] = transactions.startDate.split("/");
      const start = new Date(year, month - 1, Number(day));
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(start.getTime());
        date.setDate(date.getDate() + i);
        // return date.toISOString().split('T')[0];
        return moment(date).tz("Asia/Manila").format("YYYY-MM-DD");
      });
    } else if (filter === "monthly") {
      return Array.from({ length: 12 }, (_, i) =>
        new Date(0, i + 1, 0).toLocaleString("default", { month: "long" })
      );
    } else if (filter === "yearly") {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, i) =>
        (currentYear - i).toString()
      ).reverse();
    }
  };
  const getRefillLabels = (filter, data) => {
    if (filter === "daily") {
      return data.orders[0]["Refill"].map((label) =>
        moment(label._id + "Z")
          .tz("Asia/Manila")
          .format("YYYY-MM-DD HH:mm")
      );
    } else if (filter === "weekly") {
      // return data.orders[0]["Refill"].map(label => label._id);
      const [month, day, year] = data.startDate.split("/");
      const start = new Date(year, month - 1, Number(day));
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(start.getTime());
        date.setDate(date.getDate() + i);
        return moment(date).tz("Asia/Manila").format("YYYY-MM-DD");
      });
    } else if (filter === "monthly") {
      return Array.from({ length: 12 }, (_, i) =>
        new Date(0, i + 1, 0).toLocaleString("default", { month: "long" })
      );
    } else if (filter === "yearly") {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, i) =>
        (currentYear - i).toString()
      ).reverse();
    }
  };
  const getNewContainerLabels = (filter, data) => {
    if (filter === "daily") {
      return data.orders[0]["New Container"].map((label) =>
        moment(label._id + "Z")
          .tz("Asia/Manila")
          .format("YYYY-MM-DD HH:mm")
      );
    } else if (filter === "weekly") {
      // return data.orders[0]["New Container"].map(label => label._id);
      const [month, day, year] = data.startDate.split("/");
      const start = new Date(year, month - 1, Number(day));
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(start.getTime());
        date.setDate(date.getDate() + i);
        return moment(date).tz("Asia/Manila").format("YYYY-MM-DD");
      });
    } else if (filter === "monthly") {
      return Array.from({ length: 12 }, (_, i) =>
        new Date(0, i + 1, 0).toLocaleString("default", { month: "long" })
      );
    } else if (filter === "yearly") {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, i) =>
        (currentYear - i).toString()
      ).reverse();
    }
  };
  const totalSalesBranchLabel = (filter, data) => {
    if (filter === "today") {
      return data.salesByBranch.map((sale) =>
        moment(sale._id.date + "Z")
          .tz("Asia/Manila")
          .format("YYYY-MM-DD HH:mm")
      );
    } else if (filter === "week") {
      // return data.salesByBranch.map((sale) => sale._id.date)
      const [month, day, year] = data.startDate.split("/");
      const start = new Date(year, month - 1, Number(day));
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(start.getTime());
        date.setDate(date.getDate() + i);
        return moment(date).tz("Asia/Manila").format("YYYY-MM-DD");
      });
    } else if (filter === "month") {
      return Array.from({ length: 12 }, (_, i) =>
        new Date(0, i + 1, 0).toLocaleString("default", { month: "long" })
      );
    } else if (filter === "year") {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, i) =>
        (currentYear - i).toString()
      ).reverse();
    }
  };
  const getAllSalesLabels = (filter, data) => {
    if (filter === "today") {
      return data.salesByBranch.map((sale) =>
        moment(sale._id + "Z")
          .tz("Asia/Manila")
          .format("YYYY-MM-DD HH:mm")
      );
    } else if (filter === "week") {
      // return data.salesByBranch.map((sale) => sale._id.date)
      const [month, day, year] = data.startDate.split("/");
      const start = new Date(year, month - 1, Number(day));
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(start.getTime());
        date.setDate(date.getDate() + i);
        return moment(date).tz("Asia/Manila").format("YYYY-MM-DD");
      });
    } else if (filter === "month") {
      return Array.from({ length: 12 }, (_, i) =>
        new Date(0, i + 1, 0).toLocaleString("default", { month: "long" })
      );
    } else if (filter === "year") {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, i) =>
        (currentYear - i).toString()
      ).reverse();
    }
  };
  // Change the data of the chart depending on the sales, transactions, gallons
  useEffect(() => {
    if (sales && sales.salesByBranch) {
      // Get all unique statuses
      const branches = [
        ...new Set(
          sales.salesByBranch.flatMap((transaction) =>
            transaction.branches.map((order) => order.branch)
          )
        ),
      ];

      //Generate labels
      const labels = getAllSalesLabels(filter4, sales);
      const datasets = branches.map((status) => ({
        label: status,
        data: labels.map((label) => {
          let sale;
          if (filter4 === "today") {
            sale = sales.salesByBranch.find(
              (transaction) =>
                moment(transaction._id + "Z")
                  .tz("Asia/Manila")
                  .format("YYYY-MM-DD HH:mm") === label
            );
          } else if (filter4 === "week") {
            sale = sales.salesByBranch.find(
              (transaction) =>
                moment(transaction._id + "Z")
                  .tz("Asia/Manila")
                  .format("YYYY-MM-DD") === label
            );
          } else if (filter4 === "month" || filter4 === "year") {
            sale = sales.salesByBranch.find(
              (transaction) => String(transaction._id) === label
            );
          }
          const order =
            sale && sale.branches.find((order) => order.branch === status);

          return order ? order.totalSales : 0;
        }),
        backgroundColor: getRandomColor(),
      }));
      let salesData = {
        labels,
        datasets,
      };
      setData(salesData);
    } else {
      setData({
        labels: [],
        datasets: [
          {
            label: "Sales",
            data: [],
            maxBarThickness: 20,
          },
        ],
      });
    }
    if (
      transactions &&
      transactions.transactions &&
      transactions.transactions.length > 0
    ) {
      // Get all unique statuses
      const statuses = [
        ...new Set(
          transactions.transactions.flatMap((transaction) =>
            transaction.orders.map((order) => order.status)
          )
        ),
      ];

      // Generate labels
      const labels = getLabels(filter1, transactions);

      // Create a dataset for each status
      const datasets = statuses.map((status) => ({
        label: status,
        data: labels.map((label) => {
          let transaction;
          if (filter1 === "daily") {
            transaction = transactions.transactions.find(
              (transaction) =>
                moment(transaction._id + "Z")
                  .tz("Asia/Manila")
                  .format("YYYY-MM-DD HH:mm") === label
            );
          } else if (filter1 === "weekly") {
            transaction = transactions.transactions.find(
              (transaction) =>
                moment(transaction._id + "Z")
                  .tz("Asia/Manila")
                  .format("YYYY-MM-DD") === label
            );
          } else if (filter1 === "monthly" || filter1 === "yearly") {
            transaction = transactions.transactions.find(
              (transaction) => transaction._id === label
            );
          }

          const order =
            transaction &&
            transaction.orders.find((order) => order.status === status);

          return order ? order.count : 0;
        }),
        backgroundColor: getRandomColor(),
      }));

      let salesData = {
        labels,
        datasets,
      };

      setData2(salesData);
    } else {
      setData2({
        labels: [],
        datasets: [
          {
            label: "Sales",
            data: [],
          },
        ],
      });
    }
    if (gallons && gallons.orders && gallons.orders.length > 0) {
      const RefillTypeNames = [
        ...new Set(
          gallons.orders[0]["Refill"].flatMap((refills) =>
            refills.orders.map((order) => order.typeName)
          )
        ),
      ];

      let refillLabel = getRefillLabels(filter2, gallons);

      const datasets = RefillTypeNames.map((status) => ({
        label: status,
        data: refillLabel.map((labels) => {
          let gallon;
          if (filter2 === "daily") {
            gallon = gallons.orders[0]["Refill"].find(
              (label) =>
                moment(label._id + "Z")
                  .tz("Asia/Manila")
                  .format("YYYY-MM-DD HH:mm") === labels
            );
          } else if (filter2 === "weekly") {
            gallon = gallons.orders[0]["Refill"].find(
              (label) =>
                moment(label._id + "Z")
                  .tz("Asia/Manila")
                  .format("YYYY-MM-DD") === labels
            );
          } else if (filter2 === "monthly" || filter2 === "yearly") {
            gallon = gallons.orders[0]["Refill"].find(
              (label) => String(label._id) === labels
            );
          }

          const order =
            gallon && gallon.orders.find((order) => order.typeName === status);
          return order ? order.count : 0;
        }),
        backgroundColor: getRandomColor(),
      }));

      let data3 = {
        labels: refillLabel,
        datasets,
      };
      setData3(data3);

      const newContainerTypeNames = [
        ...new Set(
          gallons.orders[0]["New Container"].flatMap((refills) =>
            refills.orders.map((order) => order.typeName)
          )
        ),
      ];

      let newContainerLabel = getNewContainerLabels(filter2, gallons);

      const newContainerdatasets = newContainerTypeNames.map((status) => ({
        label: status,
        data: newContainerLabel.map((labels) => {
          let gallon;
          if (filter2 === "daily") {
            gallon = gallons.orders[0]["New Container"].find(
              (label) =>
                moment(label._id + "Z")
                  .tz("Asia/Manila")
                  .format("YYYY-MM-DD HH:mm") === labels
            );
          } else if (filter2 === "weekly") {
            gallon = gallons.orders[0]["New Container"].find(
              (label) =>
                moment(label._id + "Z")
                  .tz("Asia/Manila")
                  .format("YYYY-MM-DD") === labels
            );
          } else if (filter2 === "monthly" || filter2 === "yearly") {
            gallon = gallons.orders[0]["New Container"].find(
              (label) => String(label._id) === labels
            );
          }
          const order =
            gallon && gallon.orders.find((order) => order.typeName === status);
          return order ? order.count : 0;
        }),
        backgroundColor: getRandomColor(),
      }));

      let salesData1 = {
        labels: newContainerLabel,
        datasets: newContainerdatasets,
      };
      setData4(salesData1);
    } else {
      setData3({
        labels: [],
        datasets: [
          {
            label: "Sales",
            data: [],
          },
        ],
      });
      setData4({
        labels: [],
        datasets: [
          {
            label: "Sales",
            data: [],
          },
        ],
      });
    }
    if (barangay && barangay.orders && barangay.orders.length > 0) {
      let color = barangay.orders.map(() => getRandomColor());
      setColors(color);
      let salesData = {
        labels: barangay.orders.map((sale) => sale._id),
        datasets: [
          {
            label: "Sales",
            data: barangay.orders.map((sale) => sale.count),
            backgroundColor: color,
            hoverBackgroundColor: color,
          },
        ],
      };
      let options = {
        tooltips: {
          enabled: true,
          mode: "single",
          callbacks: {
            label: function (tooltipItems, data) {
              let label = data.labels[tooltipItems.index];
              let value =
                data.datasets[tooltipItems.datasetIndex].data[
                  tooltipItems.index
                ];
              return label + ": " + value;
            },
          },
        },
      };
      setData5(salesData);
      setOptions(options);
    }
    if (performance && performance.employees) {
      let salesData = {
        labels: performance.employees.map((sale) => sale._id),
        datasets: [
          {
            label: "Sales",
            data: performance.employees.map((sale) => sale.count),
            maxBarThickness: 30,
            backgroundColor: performance.employees.map(() => getRandomColor()),
          },
        ],
      };
      setData6(salesData);
    }
    if (performance && performance.riders) {
      let salesData = {
        labels: performance.riders.map((sale) => sale._id),
        datasets: [
          {
            label: "Sales",
            data: performance.riders.map((sale) => sale.count),
            maxBarThickness: 30,
            backgroundColor: performance.riders.map(() => getRandomColor()),
          },
        ],
      };
      setData7(salesData);
    }
    if (
      currentSalesBranch &&
      currentSalesBranch.salesByBranch &&
      currentSalesBranch.salesByBranch.length > 0
    ) {
      const labels = totalSalesBranchLabel(filter3, currentSalesBranch);

      const datasets = [
        {
          data: labels.map((label) => {
            let sale;
            if (filter3 === "today") {
              sale = currentSalesBranch.salesByBranch.find(
                (sale) =>
                  moment(sale._id.date + "Z")
                    .tz("Asia/Manila")
                    .format("YYYY-MM-DD HH:mm") === label
              );
            } else if (filter3 === "week") {
              sale = currentSalesBranch.salesByBranch.find(
                (sale) =>
                  moment(sale._id.date + "Z")
                    .tz("Asia/Manila")
                    .format("YYYY-MM-DD") === label
              );
            } else if (filter3 === "month" || filter3 === "year") {
              sale = currentSalesBranch.salesByBranch.find(
                (sale) => String(sale._id.date) === label
              );
            }

            return sale ? sale.totalSales : 0;
          }),
        },
      ];
      let salesData = {
        labels: labels,
        datasets: datasets,
      };
      setData8(salesData);
    } else {
      setData8({
        labels: [],
        datasets: [
          {
            label: "Sales",
            data: [],
          },
        ],
      });
    }
  }, [sales, transactions, gallons, barangay, performance, currentSalesBranch]);

  // Function to calculate the total sales of the selected branch
  const getTotalSales = (order, walkin) => {
    if (order.length > 0 || walkin.length > 0) {
      const totalSalesOrder =
        order.find((sale) => sale._id === branch)?.totalSales || 0;
      const totalSalesWalkin =
        walkin.find((sale) => sale._id === branch)?.totalSales || 0;
      setTotalSales(totalSalesOrder + totalSalesWalkin);
      localStorage.setItem("totalSales", totalSalesOrder + totalSalesWalkin);
    } else {
      setTotalSales(0);
      localStorage.setItem("totalSales", 0);
    }
  };

  // Change depending on the branch
  useEffect(() => {
    if (user.role === "admin") {
      if (branch) {
        if (orders && walkinSales) {
          // Get the total sales of the selected branch
          getTotalSales(orders, walkinSales);
        }

        // Get the order transactions of the selected branch
        dispatch(getOrderTransactions(branch, filter1));

        // Get the product stocks of the selected branch
        dispatch(allProductList(branch));

        // Get the gallon type of the selected branch (Refill or New Container)
        dispatch(getOrderByGallonType(branch, filter2));

        // Get the sales of all barangays of the selected branch
        dispatch(getSalesOrderByBarangay(branch));

        // Get the performance of all employees of the selected branch
        dispatch(getStaffPerformance(branch, selectedMonth + 1, selectedYear));

        //Get all reviews by branch
        dispatch(getAllUserReviewsByBranch(branch, reviewSelectedMonth + 1, reviewSelectedYear));

        //Action for current branch sales
        //Gets the total sales of selected branch
        dispatch(getCurrentBranchSales(branch, filter3));
      }
    }
  }, [
    orders,
    walkinSales,
    branch,
    filter1,
    filter2,
    filter3,
    user,
    selectedMonth,
    selectedYear,
    reviewSelectedMonth,
    reviewSelectedYear,
  ]);
  // Universal UseEffect
  useEffect(() => {
    if (user.role === "admin") {
      // Action for sales state
      // Gets the total sales of all stores
      dispatch(allStoreSalesAction(user._id, filter4));

      // Action for walkinSales state
      // Gets the total sales of all walkin sales
      dispatch(getSalesWalkin());

      // Action for orders state
      // Gets the total sales of all orders
      dispatch(getSalesOrderByBranch(user._id));

      //Get all admin branches
      dispatch(allAdminBranches(user._id));

      if (error) {
        dispatch(clearErrors());
      }
    }
  }, [dispatch, error, user, filter4]);

  useEffect(() => {
    const fetchData = () => {
      if (user.role === "admin" && branch) {
        dispatch(getOrderTransactions(branch, filter1));
        dispatch(allProductList(branch));
        dispatch(getOrderByGallonType(branch, filter2));
        dispatch(getSalesOrderByBarangay(branch));
        dispatch(getStaffPerformance(branch, selectedMonth + 1, selectedYear));
        dispatch(getCurrentBranchSales(branch, filter3));
        dispatch(getAllUserReviewsByBranch(branch));
      }

      dispatch(allStoreSalesAction(user._id, filter4));
      dispatch(getSalesWalkin());
      dispatch(getSalesOrderByBranch(user._id));
      dispatch(allAdminBranches(user._id));
    };
    socket.off("newOrder");
    socket.on("newOrder", () => {
      fetchData();
    });
    return () => {
      socket.off("newOrder");
    };
  }, [
    user,
    branch,
    filter1,
    filter2,
    filter3,
    filter4,
    selectedMonth,
    selectedYear,
  ]);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  // useEffect(() => {
  //   // Listen for 'notification' event from server
  //   if (user && user.role === "admin") {
  //     socket.emit("login", { userID: user._id, role: user.role });
  //   }
  // }, []);
  useEffect(() => {
    const storedBranchId = localStorage.getItem("branch");
    if (storedBranchId) {
      const name = storeBranch.find((branch) => branch._id === storedBranchId);
      setBranch2(name ? name.branch : "");
    } else {
      const name = storeBranch.find((branches) => branches._id === branch);
      setBranch2(name ? name.branch : "");
    }
  }, [storeBranch, branch]);

  return (
    <>
      <MetaData title={"Dashboard"} />
      <Sidebar
        logo={{
          innerLink: "/",
          imgSrc: require("../../assets/img/brand/logo2.1.jpg"),
          imgAlt: "...",
        }}
      />
      <div className="main-content">
        <AdminNavbar />
        <Header />

        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Total Sales, Order Sales, Walk in Sales */}
          <Row>
            <Col className="mb-5 mb-xl-4" xl="4">
              <Card className="shadow card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row className="align-items-center">
                    <div className="col">
                      <h5 className="text-uppercase text-muted ls-1 mb-1">
                        {new Date().toLocaleDateString()}
                      </h5>
                      <CardTitle
                        tag="h2"
                        className="text-uppercase text-black mb-0  font-weight-bolder"
                      >
                        Total Sales
                      </CardTitle>
                    </div>
                    <Col className="col-auto">
                      <CardTitle
                        tag="h1"
                        className="text-uppercase text-primary mb-0 font-weight-bolder"
                      >
                        {totalSales && totalSales > 0 ? (
                          `₱${totalSales}`
                        ) : localStorage.getItem("totalSales") &&
                          localStorage.getItem("totalSales") > 0 ? (
                          `₱${localStorage.getItem("totalSales")}`
                        ) : (
                          <span className="text-danger">₱0</span>
                        )}
                      </CardTitle>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-5 mb-xl-4" xl="4">
              <Card className="shadow card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row className="align-items-center">
                    <div className="col">
                      <h5 className="text-uppercase text-muted ls-1 mb-1">
                        {new Date().toLocaleDateString()}
                      </h5>
                      <CardTitle
                        tag="h2"
                        className="text-uppercase text-black mb-0  font-weight-bolder"
                      >
                        Total Sales Ordering
                      </CardTitle>
                    </div>
                    <Col className="col-auto">
                      <CardTitle
                        tag="h1"
                        className="text-uppercase text-primary mb-0 font-weight-bolder"
                      >
                        {orders &&
                        branch &&
                        orders.find((sale) => sale._id === branch) ? (
                          `₱${
                            orders.find((sale) => sale._id === branch)
                              .totalSales
                          }`
                        ) : (
                          <span className="text-danger">₱0</span>
                        )}
                      </CardTitle>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-5 mb-xl-4" xl="4">
              <Card className="shadow card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row className="align-items-center">
                    <div className="col">
                      <h5 className="text-uppercase text-muted ls-1 mb-1">
                        {new Date().toLocaleDateString()}
                      </h5>
                      <CardTitle
                        tag="h2"
                        className="text-uppercase text-black mb-0  font-weight-bolder"
                      >
                        Total Sales Walk In
                      </CardTitle>
                    </div>
                    <Col className="col-auto">
                      <CardTitle
                        tag="h1"
                        className="text-uppercase text-primary mb-0 font-weight-bolder"
                      >
                        {walkinSales &&
                        branch &&
                        walkinSales.find((sale) => sale._id === branch) ? (
                          `₱${
                            walkinSales.find((sale) => sale._id === branch)
                              .totalSales
                          }`
                        ) : (
                          <span className="text-danger">₱0</span>
                        )}
                      </CardTitle>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/*Order transactions, Total sales by branch */}
          <Row>
            <Col className="mb-5 mb-xl-4" xl="5">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center mb-3">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">
                        Order Transactions{" "}
                        {branch ? (
                          transactions &&
                          transactions.transactions &&
                          transactions.transactions.length === 0 && (
                            <span className="text-danger text-sm">
                              (No results)
                            </span>
                          )
                        ) : (
                          <span className="text-danger text-sm">
                            (Select a branch)
                          </span>
                        )}
                      </h2>
                    </div>
                    <div className="col d-flex  justify-content-end">
                      <h2 className="mb-0 text-primary">
                        {filter1 === "daily"
                          ? new Date().toLocaleDateString()
                          : filter1 === "weekly"
                          ? "Past 7 days"
                          : filter1 === "monthly"
                          ? "This year"
                          : "Past 5 years"}
                      </h2>
                    </div>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col">
                      <Nav className="justify-content-start" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 1,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Today</span>
                            <span className="d-md-none">T</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 2,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 3,
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 3)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 4,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 4)}
                          >
                            <span className="d-none d-md-block">Year</span>
                            <span className="d-md-none">Y</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar data={data2} options={options2} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-5 mb-xl-4" xl="7">
              <Card className="shadow h-100">
                <CardHeader className="border-0">
                  <Row className="align-items-center mb-3">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">
                        Total Sales: ({branch2}){" "}
                        {currentSalesBranch &&
                          currentSalesBranch.salesByBranch &&
                          currentSalesBranch.salesByBranch.length === 0 && (
                            <span className="text-danger text-sm">
                              (No results)
                            </span>
                          )}
                      </h2>
                    </div>

                    <div className="col d-flex  justify-content-end">
                      <h2 className="mb-0 text-primary">
                        {filter3 === "today"
                          ? new Date().toLocaleDateString()
                          : filter3 === "week"
                          ? "Past 7 days"
                          : filter3 === "month"
                          ? "This year"
                          : "Past 5 years"}
                      </h2>
                    </div>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col">
                      <Nav className="justify-content-start" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav3 === 1,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs3(e, 1)}
                          >
                            <span className="d-none d-md-block">Today</span>
                            <span className="d-md-none">T</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav3 === 2,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs3(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav3 === 3,
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={(e) => toggleNavs3(e, 3)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav3 === 4,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs3(e, 4)}
                          >
                            <span className="d-none d-md-block">Year</span>
                            <span className="d-md-none">Y</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Line
                      data={data8}
                      options={chartExample1.options}
                      getDatasetAtEvent={(e) => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/*Order Refill, Order New Container */}
          <Row>
            <Col className="mb-5 mb-xl-4" xl="12">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center mb-3">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Gallon Type</h2>
                    </div>
                    <div className="col d-flex  justify-content-end">
                      <h2 className="mb-0 text-primary">
                        {filter2 === "daily"
                          ? new Date().toLocaleDateString()
                          : filter2 === "weekly"
                          ? "Past 7 days"
                          : filter2 === "monthly"
                          ? "This year"
                          : "Past 5 years"}
                      </h2>
                    </div>
                  </Row>
                  <Row>
                    <div className="col">
                      <Nav className="justify-content-start" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav2 === 1,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs2(e, 1)}
                          >
                            <span className="d-none d-md-block">Today</span>
                            <span className="d-md-none">T</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav2 === 2,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs2(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav2 === 3,
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={(e) => toggleNavs2(e, 3)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav2 === 4,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs2(e, 4)}
                          >
                            <span className="d-none d-md-block">Year</span>
                            <span className="d-md-none">Y</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <CardDeck>
                    <Card className="shadow">
                      <CardHeader className="bg-transparent">
                        <Row className="align-items-center mb-3">
                          <div className="col">
                            <h6 className="text-uppercase text-muted ls-1 mb-1">
                              Type
                            </h6>

                            <h2 className="mb-0">
                              Refill{" "}
                              {branch ? (
                                gallons &&
                                gallons.orders &&
                                gallons.orders.length === 0 ? (
                                  <span className="text-danger text-sm">
                                    (No results)
                                  </span>
                                ) : gallons &&
                                  gallons.orders &&
                                  gallons.orders[0].Refill.length === 0 ? (
                                  <span className="text-danger text-sm">
                                    (No results)
                                  </span>
                                ) : (
                                  ""
                                )
                              ) : (
                                <span className="text-danger text-sm">
                                  (Select a branch)
                                </span>
                              )}
                            </h2>
                          </div>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <div className="chart">
                          <Bar data={data3} options={options2} />
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="shadow">
                      <CardHeader className="bg-transparent">
                        <Row className="align-items-center mb-3">
                          <div className="col">
                            <h6 className="text-uppercase text-muted ls-1 mb-1">
                              Type
                            </h6>
                            <h2 className="mb-0">
                              New Container{" "}
                              {branch ? (
                                gallons &&
                                gallons.orders &&
                                gallons.orders.length === 0 ? (
                                  <span className="text-danger text-sm">
                                    (No results)
                                  </span>
                                ) : gallons &&
                                  gallons.orders &&
                                  gallons.orders[0]["New Container"].length ===
                                    0 ? (
                                  <span className="text-danger text-sm">
                                    (No results)
                                  </span>
                                ) : (
                                  ""
                                )
                              ) : (
                                <span className="text-danger text-sm">
                                  (Select a branch)
                                </span>
                              )}
                            </h2>
                          </div>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <div className="chart">
                          <Bar data={data4} options={options2} />
                        </div>
                      </CardBody>
                    </Card>
                  </CardDeck>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* Product Inventory, Barangays */}
          <Row>
            <Col className="mb-5 mb-xl-4" xl="6">
              <Card className="shadow h-100">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Inventory
                      </h6>
                      <h3 className="mb-0">
                        Product Stock{" "}
                        {branch ? (
                          products &&
                          products.length === 0 && (
                            <span className="text-danger text-sm">
                              (No results)
                            </span>
                          )
                        ) : (
                          <span className="text-danger text-sm">
                            (Select a branch)
                          </span>
                        )}
                      </h3>
                    </div>
                    <div className="col text-right">
                      <Link to="/admin/product">
                        <Button color="primary" href="#pablo" size="sm">
                          See all
                        </Button>
                      </Link>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Stocks</th>
                    </tr>
                  </thead>
                  <tbody className="position-relative h-100">
                    {products &&
                      products.map((product) => {
                        const activeStocks = product.stocks.filter(
                          (stock) => !stock.deleted
                        );

                        const totalQuantity = activeStocks.reduce(
                          (acc, stock) => acc + stock.quantity,
                          0
                        );
                        return (
                          <tr>
                            <th>{product.typesgallon.typeofGallon}</th>
                            <td>{totalQuantity}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col className="mb-5 mb-xl-4" xl="6">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center mb-3">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">
                        Sales By Barangay{" "}
                        {branch ? (
                          barangay && Object.keys(barangay).length === 0 ? (
                            <span className="text-danger text-sm">
                              (No results)
                            </span>
                          ) : barangay.orders &&
                            barangay.orders.length === 0 ? (
                            <span className="text-danger text-sm">
                              (No results)
                            </span>
                          ) : (
                            ""
                          )
                        ) : (
                          <span className="text-danger text-sm">
                            (Select a branch)
                          </span>
                        )}
                      </h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="chart">
                      <Pie data={data5} options={options} />
                    </div>
                    <div className="mt-5">
                      {barangay &&
                        barangay.orders &&
                        barangay.orders.map((item, index) => (
                          <div key={index} className="w-100 px-4">
                            <div className="d-flex w-100 justify-content-center align-items-center">
                              <div
                                className="mr-2 block mb-3 rounded-circle"
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  backgroundColor: `${colors[index]}`,
                                }}
                              ></div>
                              <p className="d-flex w-100 justify-content-between text-sm font-medium text-black">
                                <span> {item._id}</span>
                                <span className="ml-3">
                                  {" "}
                                  {(
                                    (item.count / barangay.totalOrders) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </span>
                                <span className="ml-3">({item.count}) </span>
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* Employee Accepted orders and Rider Delivered orders */}
          <Row>
            <Col className="mb-5 mb-xl-4" xl="12">
              <Card className="shadow">
                <CardHeader>
                  <Row className="align-items-center mb-3">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Staff Performance Ranking</h2>
                    </div>
                    <Col className="d-flex justify-content-end z-3" xl="6">
                      <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                          {monthName ? monthName : "Select Month"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {months.map((month, index) => (
                            <Dropdown.Item
                              key={index}
                              eventKey={index + 1}
                              onClick={() => handleMonthFilter(month, index)}
                            >
                              {month}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                          {selectedYear ? selectedYear : "Select Year"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {years.map((year, index) => (
                            <Dropdown.Item
                              key={index}
                              eventKey={index + 1}
                              onClick={() => handleYearFilter(year, index)}
                            >
                              {year}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <CardDeck className="mb-3">
                    <Card className="shadow h-100">
                      <CardHeader className="bg-transparent">
                        <Row className="align-items-center w-100">
                          <Col xl="6">
                            <h6 className="text-uppercase text-muted ls-1 mb-1">
                              Staff Type
                            </h6>
                            <h2 className="mb-0">
                              Employee{" "}
                              {branch ? (
                                performance &&
                                Object.keys(performance).length === 0 ? (
                                  <span className="text-danger text-sm">
                                    (No results)
                                  </span>
                                ) : performance.employees &&
                                  performance.employees.length === 0 ? (
                                  <span className="text-danger text-sm">
                                    (No results)
                                  </span>
                                ) : (
                                  ""
                                )
                              ) : (
                                <span className="text-danger text-sm">
                                  (Select a branch)
                                </span>
                              )}
                            </h2>
                          </Col>
                        </Row>
                      </CardHeader>

                      <CardBody>
                        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col" className="text-center">
                                  Rank
                                </th>
                                <th scope="col">Name</th>
                                <th scope="col">Accepted Orders</th>
                              </tr>
                            </thead>
                            <tbody className="position-relative h-100">
                              {performance &&
                                performance.employees &&
                                performance.employees
                                  .sort((a, b) => b.count - a.count)
                                  .map((employee, index) => {
                                    return (
                                      <tr key={index}>
                                        <th className="text-center">
                                          {index + 1 === 1 ? (
                                            <img
                                              src="https://res.cloudinary.com/dtrr0ihcb/image/upload/v1713199793/AQUATIC_DRAGON/1_hxgypi.png"
                                              style={{
                                                width: "50px",
                                                height: "auto",
                                              }}
                                            />
                                          ) : index + 1 === 2 ? (
                                            <img
                                              src="https://res.cloudinary.com/dtrr0ihcb/image/upload/v1713199794/AQUATIC_DRAGON/2_zz2j3b.png"
                                              style={{
                                                width: "50px",
                                                height: "auto",
                                              }}
                                            />
                                          ) : index + 1 === 3 ? (
                                            <img
                                              src="https://res.cloudinary.com/dtrr0ihcb/image/upload/v1713199794/AQUATIC_DRAGON/3_xq7e4w.png"
                                              style={{
                                                width: "50px",
                                                height: "auto",
                                              }}
                                            />
                                          ) : (
                                            <span
                                              style={{
                                                fontSize: "20px",
                                                display: "inline-block",
                                                verticalAlign: "middle",
                                              }}
                                            >
                                              {index + 1}
                                            </span>
                                          )}
                                        </th>
                                        <th style={{ fontSize: "16px" }}>
                                          {employee.name}
                                        </th>
                                        <td style={{ fontSize: "16px" }}>
                                          {employee.count}
                                        </td>
                                      </tr>
                                    );
                                  })}
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="shadow">
                      <CardHeader className="bg-transparent">
                        <Row className="align-items-center">
                          <Col xl="6">
                            <h6 className="text-uppercase text-muted ls-1 mb-1">
                              Staff Type
                            </h6>
                            <h2 className="mb-0">
                              Rider{" "}
                              {branch ? (
                                performance &&
                                Object.keys(performance).length === 0 ? (
                                  <span className="text-danger text-sm">
                                    (No results)
                                  </span>
                                ) : performance.riders &&
                                  performance.riders.length === 0 ? (
                                  <span className="text-danger text-sm">
                                    (No results)
                                  </span>
                                ) : (
                                  ""
                                )
                              ) : (
                                <span className="text-danger text-sm">
                                  (Select a branch)
                                </span>
                              )}
                            </h2>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col" className="text-center">
                                  Rank
                                </th>
                                <th scope="col">Name</th>
                                <th scope="col">Delivered Orders</th>
                              </tr>
                            </thead>
                            <tbody className="position-relative h-100">
                              {performance &&
                                performance.riders &&
                                performance.riders
                                  .sort((a, b) => b.count - a.count)
                                  .map((rider, index) => {
                                    return (
                                      <tr key={index}>
                                        <th className="text-center">
                                          {index + 1 === 1 ? (
                                            <img
                                              src="https://res.cloudinary.com/dtrr0ihcb/image/upload/v1713199793/AQUATIC_DRAGON/1_hxgypi.png"
                                              style={{
                                                width: "50px",
                                                height: "auto",
                                              }}
                                            />
                                          ) : index + 1 === 2 ? (
                                            <img
                                              src="https://res.cloudinary.com/dtrr0ihcb/image/upload/v1713199794/AQUATIC_DRAGON/2_zz2j3b.png"
                                              style={{
                                                width: "50px",
                                                height: "auto",
                                              }}
                                            />
                                          ) : index + 1 === 3 ? (
                                            <img
                                              src="https://res.cloudinary.com/dtrr0ihcb/image/upload/v1713199794/AQUATIC_DRAGON/3_xq7e4w.png"
                                              style={{
                                                width: "50px",
                                                height: "auto",
                                              }}
                                            />
                                          ) : (
                                            <span
                                              style={{
                                                fontSize: "20px",
                                                display: "inline-block",
                                                verticalAlign: "middle",
                                              }}
                                            >
                                              {index + 1}
                                            </span>
                                          )}
                                        </th>
                                        <th style={{ fontSize: "16px" }}>
                                          {rider.name}
                                        </th>
                                        <td style={{ fontSize: "16px" }}>
                                          {rider.count}
                                        </td>
                                      </tr>
                                    );
                                  })}
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                  </CardDeck>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* Comments */}
          <Row>
            <Col className="mb-5 mb-xl-4" xl="12">
              <Card className="shadow">
                <CardHeader>
                  <Row className="align-items-center mb-3">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Feedback
                      </h6>
                      <h2 className="mb-0">Customer Reviews</h2>
                      <h2 className="mb-0">Average Rating {reviews && reviews.length > 0 ?( <>{reviews.reduce((acc,item)=>acc + item._id.rating,0)/(reviews.length).toFixed(2)} <FontAwesomeIcon icon={faStar} size="sm" color="#FFD700"/></> ): "No reviews yet"}</h2>
                    </div>
                    <Col className="d-flex justify-content-end z-3" xl="6">
                      <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                          {reviewMonthName ? reviewMonthName : "Select Month"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {months.map((month, index) => (
                            <Dropdown.Item
                              key={index}
                              eventKey={index + 1}
                              onClick={() =>
                                handleReviewMonthFilter(month, index)
                              }
                            >
                              {month}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                          {reviewSelectedYear ? reviewSelectedYear : "Select Year"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {years.map((year, index) => (
                            <Dropdown.Item
                              key={index}
                              eventKey={index + 1}
                              onClick={() =>
                                handleReviewYearFilter(year, index)
                              }
                            >
                              {year}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col" className="text-center">
                            User
                          </th>
                          <th scope="col">Comment</th>
                          <th scope="col">Ratings</th>
                          <th scope="col">Store Branch</th>
                        </tr>
                      </thead>

                      <tbody className="position-relative h-100">
                        {reviews &&
                          reviews.map((review, index) => {
                            return (
                              <tr key={index}>
                                <th className="text-center">{review._id.userID}</th>
                                <th style={{ fontSize: "16px" }}>
                                  {review._id.comment}
                                </th>
                                <th style={{ fontSize: "16px" }}>
                                  {review._id.rating}
                                </th>
                                <th style={{ fontSize: "16px" }}>
                                  {review._id.branchName}
                                </th>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          zx
          {/* Total Sales By Branch */}
          <Row>
            <Col className="mb-5 mb-xl-4" xl="12">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center mb-3">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">
                        Total Sales By Branch{" "}
                        {sales && sales.length === 0 && (
                          <span className="text-danger text-sm">
                            (No results)
                          </span>
                        )}
                      </h2>
                    </div>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col">
                      <Nav className="justify-content-start" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav4 === 1,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs4(e, 1)}
                          >
                            <span className="d-none d-md-block">Today</span>
                            <span className="d-md-none">T</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav4 === 2,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs4(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav4 === 3,
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={(e) => toggleNavs4(e, 3)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav4 === 4,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs4(e, 4)}
                          >
                            <span className="d-none d-md-block">Year</span>
                            <span className="d-md-none">Y</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={data}
                      options={{
                        ...options2,
                        scales: {
                          yAxes: [{ stacked: false }],
                          xAxes: [{ stacked: false }],
                        },
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* Template */}
          {/* <Row>
          <Col xl="4">
            <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 1,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 1)}>
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 2,
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 2)}>
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                
                  <div className="chart">
                    <Line
                      data={chartExample1[chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={(e) => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Page visits</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm">
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Page name</th>
                      <th scope="col">Visitors</th>
                      <th scope="col">Unique users</th>
                      <th scope="col">Bounce rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">/argon/</th>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/index.html</th>
                      <td>3,985</td>
                      <td>319</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/charts.html</th>
                      <td>3,513</td>
                      <td>294</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        36,49%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/tables.html</th>
                      <td>2,050</td>
                      <td>147</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        50,87%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/profile.html</th>
                      <td>1,795</td>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm">
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col> 
          </Row> */}
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
