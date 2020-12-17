import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js";
import { useToken } from "../../Context/UserContext";
import { randomColorGen, dateFormatter } from "../../Helper/HelperFunctions";

import { Layout, Row, Col } from "antd";

const DashBoard: React.FC<{}> = () => {
  const { Content } = Layout;
  const canvasRefDoughnut = useRef<HTMLCanvasElement>(null);
  const canvasRefLine = useRef<HTMLCanvasElement>(null);

  const [numbersOfState, setNumbersOfState] = useState<number[]>([]);
  const [bgColors, setBgColors] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const [purchaseOfDate, setPurchaseOfDate] = useState<string[]>([]);
  const [purchaseCount, setPurchaseCount] = useState<number[]>([]);

  const { token } = useToken();

  const doughnutChartData: Chart.ChartData = {
    datasets: [
      {
        data: numbersOfState,
        backgroundColor: bgColors,
      },
    ],

    labels: labels,
  };

  const lineChartDate: Chart.ChartData = {
    labels: purchaseOfDate,
    datasets: [
      {
        label: "Numbers of Submissions", // Name the series
        data: purchaseCount, // Specify the data values array
        fill: false,
        borderColor: "#2196f3", // Add custom color border (Line)
        backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
        borderWidth: 1, // Specify bar border width
      },
    ],
  };

  const getWarranties = async () => {
    try {
      await fetch("http://localhost:4000/api/get-warranties", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const stateCount = new Map();
          const dateFrequency = new Map();

          data.map((warranty: any, index: number) => {
            if (stateCount.has(warranty.state)) {
              stateCount.set(
                warranty.state,
                stateCount.get(warranty.state) + 1
              );
            } else {
              stateCount.set(warranty.state, 1);
            }

            //For date frequencies

            const formattedDate = dateFormatter(warranty.date_of_purchase);

            if (dateFrequency.has(formattedDate)) {
              dateFrequency.set(
                formattedDate,
                dateFrequency.get(formattedDate) + 1
              );
            } else {
              dateFrequency.set(formattedDate, 1);
            }
          });

          const states: string[] = [];
          const numbersOfState: number[] = [];
          const bgColors: string[] = [];

          stateCount.forEach((count, state) => {
            states.push(state);
            numbersOfState.push(count);
            bgColors.push(randomColorGen());
          });

          setLabels(states);
          setBgColors(bgColors);
          setNumbersOfState(numbersOfState);

          //for date frequency

          const purchaseDate: string[] = [];
          const numbersOfSubmissions: number[] = [];

          dateFrequency.forEach((count, date) => {
            purchaseDate.push(date);
            numbersOfSubmissions.push(count);
          });

          setPurchaseOfDate(purchaseDate);
          setPurchaseCount(numbersOfSubmissions);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getWarranties();
  }, []);

  useEffect(() => {
    const ctx = canvasRefDoughnut.current?.getContext("2d");

    if (ctx && numbersOfState.length != 0) {
      new Chart(ctx, {
        type: "doughnut",
        data: doughnutChartData,
        options: {
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
        },
      });
    }
  }, [numbersOfState]);

  useEffect(() => {
    const ctx = canvasRefLine.current?.getContext("2d");

    if (ctx && purchaseOfDate.length != 0 && purchaseCount.length != 0) {
      new Chart(ctx, {
        type: "line",
        data: lineChartDate,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [purchaseOfDate, purchaseCount]);

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <span style={{ margin: "16px 0" }} />
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          height: "100%",
        }}
      >
        <h3>DashBoard</h3>

        <Row>
          <Col span={12}>
            <h3 style={{ textAlign: "center", marginTop: "30px" }}>
              Warranty Submissions based on States
            </h3>

            <div className="chart-container">
              <canvas ref={canvasRefDoughnut}></canvas>
            </div>
          </Col>
          <Col span={12}>
            <h3 style={{ textAlign: "center", marginTop: "30px" }}>
              Warranty Submissions based on Date
            </h3>

            <div className="chart-container">
              <canvas ref={canvasRefLine}></canvas>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashBoard;
