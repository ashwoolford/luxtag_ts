import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js";
import { Layout } from "antd";

const DashBoard: React.FC<{}> = () => {
  const { Content } = Layout;
  const canvasRefDoughnut = useRef<HTMLCanvasElement>(null);
  const canvasRefLine = useRef<HTMLCanvasElement>(null);

  const [numbersOfState, setNumbersOfState] = useState<number[]>([]);
  const [bgColors, setBgColors] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  //

  const [purchaseOfDate, setPurchaseOfDate] = useState<string[]>([]);
  const [purchaseCount, setPurchaseCount] = useState<number[]>([]);

  //

  const randomColorGen = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const dateFormatter = (zuluDate: String) => {
    return (
      zuluDate.substring(0, 4) +
      "-" +
      zuluDate.substring(5, 7) +
      "-" +
      zuluDate.substring(8, 10)
    );
  };

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
      await fetch("http://localhost:4000/api/get-warranties")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          const stateCount = new Map();
          const dateFrequency = new Map();

          data.map((warranty: any) => {

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
              responsive: true, // Instruct chart js to respond nicely.
              maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
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
          height: "100%"
        }}
      >
        <h3>DashBoard</h3>
        <h3 style={{ textAlign: "center" }}>Submissions in order to States</h3>

        <div className="chart-container">
          <canvas ref={canvasRefDoughnut}></canvas>
        </div>

        <h3 style={{ textAlign: "center" }}>Submissions in order to Date</h3>

        <div className="chart-container">
          <canvas ref={canvasRefLine}></canvas>
        </div>
      </Content>
    </Layout>
  );
};

export default DashBoard;
