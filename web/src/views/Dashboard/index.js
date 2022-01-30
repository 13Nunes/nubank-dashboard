// Basic
import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";

// Styles, Images and UI
import "./styles.scss";
import { Alert } from "react-st-modal";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import AppBar from "../../components/AppBar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { DataGrid } from "@mui/x-data-grid";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "moment/locale/pt-br";

// API
import api from "../../services/api";

// Helpers
import Utils from "../../helpers/Utils";

// Init
const expirationDay = 14; // Data de vencimento da fatura @todo customizar
const columns = [
  {
    field: "description",
    headerName: "Descrição",
    width: 250,
    renderCell: (params) => {
      return `${params.row.description} ${
        params.row.installments
          ? `(${params.row.installments.current} / ${params.row.installments.total})`
          : ""
      }`;
    },
  },
  {
    field: "title",
    headerName: "Categoria",
    width: 180,
  },
  {
    field: "amount",
    headerName: "Valor",
    sortComparator: (v1, v2, param1, param2) =>
      param1.api.getCellValue(param1.id, "amount") -
      param2.api.getCellValue(param2.id, "amount"),
    renderCell: (params) => {
      return `${Utils.currencyValue(params.row.amount) || ""}`;
    },
  },
  {
    field: "time",
    headerName: "Data da compra",
    width: 200,
    renderCell: (params) => {
      return `${new Date(params.row.time).toLocaleString() || ""}`;
    },
  },
];
let initialDate = moment();
if (initialDate.date() < expirationDay) {
  initialDate.subtract(1, "months");
}
initialDate.date(expirationDay);
initialDate = initialDate.toDate();
const installments = [
  {
    description: "Material Escolar #1",
    category: "transaction",
    amount: 3530,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 1,
      total: 3,
    },
    id: "16",
  },
  {
    description: "Material Escolar #2",
    category: "transaction",
    amount: 9973,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 1,
      total: 3,
    },
    id: "17",
  },
  {
    description: "Mangueira fogão",
    category: "transaction",
    amount: 7500,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 1,
      total: 3,
    },
    id: "15",
  },
  {
    description: "Cobase",
    category: "transaction",
    amount: 13578,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 3,
      total: 3,
    },
    id: "1",
  },
  {
    description: "Teclado Yamaha",
    category: "transaction",
    amount: 18849,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 7,
      total: 12,
    },
    id: "2",
  },
  {
    description: "Travesseiro",
    category: "transaction",
    amount: 6745,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 1,
      total: 2,
    },
    id: "3",
  },
  {
    description: "Petz",
    category: "transaction",
    amount: 8481,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 3,
      total: 3,
    },
    id: "4",
  },
  {
    description: "Mercado Livre",
    category: "transaction",
    amount: 4602,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 4,
      total: 6,
    },
    id: "5",
  },
  {
    description: "Mesa Giovani",
    category: "transaction",
    amount: 4551,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 11,
      total: 12,
    },
    id: "6",
  },
  {
    description: "Máquina de Lavar",
    category: "transaction",
    amount: 29240,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 10,
      total: 12,
    },
    id: "7",
  },
  {
    description: "Ômega 3",
    category: "transaction",
    amount: 7535,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 5,
      total: 6,
    },
    id: "8",
  },
  {
    description: "Pet Memorial",
    category: "transaction",
    amount: 18750,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 2,
      total: 12,
    },
    id: "10",
  },
  {
    description: "Pantufas",
    category: "transaction",
    amount: 8896,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 2,
      total: 2,
    },
    id: "11",
  },
  {
    description: "Filtros Clamper",
    category: "transaction",
    amount: 5526,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 2,
      total: 3,
    },
    id: "12",
  },
  {
    description: "D-link Repetidor",
    category: "transaction",
    amount: 3962,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 2,
      total: 12,
    },
    id: "13",
  },
  {
    description: "Material Escola Giovani",
    category: "transaction",
    amount: 9672,
    time: initialDate.toString(),
    source: "upfront_national",
    title: "parcelados",
    installments: {
      current: 2,
      total: 10,
    },
    id: "14",
  },
];

const Dashboard = () => {
  // States
  const [loading, setLoading] = useState(false);
  const [expiration, setExpiration] = useState(initialDate);
  const [transations, setTransations] = useState([]);
  const [featured, setFeatured] = useState({
    uber: { qty: 0, amount: 0 },
    ml: { qty: 0, amount: 0 },
    installments: { qty: 0, amount: 0 },
    rappifood: { qty: 0, amount: 0 },
  });
  const [chartOption, setChartOptions] = useState({
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
  });

  // Methods
  const handleFormSubmit = useCallback(
    async (event) => {
      // Set Loading
      setLoading(true);

      // Request
      api
        .get(`/card/getTransactions?expiration=${expiration}`, {
          "Content-Type": "application/json",
        })
        .then(({ data }) => {
          if (data.success === true) {
            const transactions = parseTransations(data.transactions);
            setTransations(transactions);
          } else {
            console.log("Erro");
          }

          // Finish loading
          setLoading(false);
        })
        .catch(async (e) => {
          setLoading(false);
          await Alert("Algo errado!", "Ops...");
        });
    },
    [expiration]
  );
  const handleBackSubmit = () => {
    let backDate = moment(expiration);
    backDate.subtract(1, "months");
    setExpiration(backDate);
  };
  const handleForwardSubmit = () => {
    let forwardDate = moment(expiration);
    forwardDate.add(1, "months");
    setExpiration(forwardDate);
  };
  function prepareChartOption(chartData) {
    return {
      chart: {
        type: "pie",
        margin: [0, 0, 0, 0],
      },
      title: {
        text: "",
      },
      tooltip: {
        pointFormat: "R$ {point.y}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          data: chartData,
        },
      ],
      credits: {
        enabled: false,
      },
    };
  }
  function parseTransations(transations) {
    // Merge
    transations = [...transations, ...installments];

    // Filter installments
    transations = transations.filter(
      (t) => t.source !== "installments_merchant"
    );

    // Sum values
    const uber = { qty: 0, amount: 0 };
    const ml = { qty: 0, amount: 0 };
    const rappifood = { qty: 0, amount: 0 };
    const installments2 = { qty: 0, amount: 0 };
    for (let transaction of transations) {
      if (transaction.description.toLowerCase().includes("uber")) {
        uber.qty++;
        uber.amount += transaction.amount;
      }
      if (transaction.description.toLowerCase().includes("mercadolivre")) {
        ml.qty++;
        ml.amount += transaction.amount;
      }
      if (
        transaction.description.toLowerCase().includes("rappi") ||
        transaction.description.toLowerCase().includes("Ifood")
      ) {
        rappifood.qty++;
        rappifood.amount += transaction.amount;
      }
      if (transaction.title.toLowerCase().includes("parcelados")) {
        installments2.qty++;
        installments2.amount += transaction.amount;
      }
    }

    // Set featured
    setFeatured({
      uber,
      ml,
      installments: installments2,
      rappifood,
    });

    // transations = transations.map((t) => {
    //   return {
    //     ...t,
    //     amount:
    //       t.source === "installments_merchant"
    //         ? t.details.charges.amount
    //         : t.amount,
    //   };
    // });
    return transations;
  }

  // useEffects
  useEffect(() => {
    function prepareChart() {
      // Group by category
      let groupedValues = Utils.groupBy(transations, "title");

      // Sum values
      let chartValues = [];
      for (let [key, value] of Object.entries(groupedValues)) {
        const total = value.reduce((a, b) => a + (b["amount"] || 0), 0);
        // console.log("Category: ", key, " => Total: ", Utils.prepareValue(total));
        chartValues.push({
          name: key,
          y: Utils.prepareValue(total),
        });
      }

      // Prepare chart options
      const opt = prepareChartOption(chartValues);

      // Set chart options
      setChartOptions(opt);
    }

    // Exec
    prepareChart();
  }, [transations]);
  useEffect(() => {
    handleFormSubmit();
  }, [handleFormSubmit]);

  return (
    <div id="page-dashboard">
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <AppBar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Select date */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", alignItems: "center" }}>
                <IconButton
                  aria-label="back"
                  size="small"
                  onClick={handleBackSubmit}
                >
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DatePicker
                    label="Data de vencimento"
                    value={expiration}
                    onChange={(date) => {
                      setExpiration(date);
                    }}
                    autoOk
                    dense
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <IconButton
                  aria-label="forward"
                  size="small"
                  onClick={handleForwardSubmit}
                >
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </Paper>
            </Grid>

            {/* Cards */}
            <Grid item xs={12} md={3} lg={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Parcelados:
                </Typography>
                {`${Utils.currencyValue(featured.installments.amount)} (${
                  featured.installments.qty
                })`}
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Uber:
                </Typography>
                {`${Utils.currencyValue(featured.uber.amount)} (${
                  featured.uber.qty
                })`}
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Mercado Livre:
                </Typography>
                {`${Utils.currencyValue(featured.ml.amount)} (${
                  featured.ml.qty
                })`}
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Rappi / iFood:
                </Typography>
                {`${Utils.currencyValue(featured.rappifood.amount)} (${
                  featured.rappifood.qty
                })`}
              </Paper>
            </Grid>

            {/* Chart */}
            <Grid item xs={12} md={5} lg={5}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 450,
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Gastos por categoria
                </Typography>
                {loading && (
                  <Skeleton variant="circular" width={300} height={300} />
                )}
                {!loading && (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOption}
                  />
                )}
              </Paper>
            </Grid>

            {/* Details */}
            <Grid item xs={12} md={7} lg={7}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 450,
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Detalhes das transações
                </Typography>
                {loading && (
                  <Skeleton variant="rectangular" width={800} height={300} />
                )}

                {!loading && (
                  <DataGrid
                    rows={transations}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;
