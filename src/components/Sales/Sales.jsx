import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Orders from "../Orders/Orders";
import CompLoader from "../Loaders/CompLoader";

const MainBox = styled.div`
  height: ${(props) => (props.isLoading ? "93vh" : "")};
  padding: ${(props) => (props.isLoading ? "0" : "0 1rem")};
  position: relative;
`;

const UpperBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  /* gap: 2rem; */
  padding: 1rem 1rem;
`;
const SalesBox = styled.div`
  color: #f4f4f4;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  transition: all 0.5s;
  gap: -1rem;
  width: 20%;

  border-radius: 0.4rem;

  h3 {
    margin-top: -0rem;
    font-weight: 400;
    color: white;
  }
  span {
    font-size: 1.5rem;
    letter-spacing: 0.09rem;
    i {
      font-size: 0.8rem;
      font-style: normal;
    }
  }
  table {
    width: 100%;

    text-align: center;
    thead {
      font-size: 1.2rem;
      font-weight: 400;
      tr {
        td {
          padding: 1rem 0;
        }
      }
    }
    tbody {
      font-size: 1.1rem;
      font-weight: bold;
    }
  }
`;

const MidBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 3rem;
  p {
    margin: -0rem;
    font-size: 2rem;
    font-weight: 500;
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: none;
  color: #777;
  background-color: transparent;
  width: 8%;
  border-radius: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 0.04rem;
  &:focus {
    outline: none;
    border: none;
    border: 1px solid #777;
    border-style: dotted;
  }
  @media only screen and (max-width: 1099px) {
    padding: 1rem 0;
  }
`;
const Option = styled.option`
  color: #777;
  font-weight: bold;
`;

const OrderBox = styled.div`
  padding: 0.5rem 3rem;
  p {
    font-size: 2rem;
    font-weight: 500;
  }
`;

const Sales = () => {
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
  ];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;
  const [isLoading, setIsLoading] = useState(true);
  const [currentActive, setCurrentActive] = useState("today");
  const [monthlySales, setMonthlySales] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [fetcherYear, setFetcherYear] = useState(year);
  const [fetcherMonth, setFetcherMonth] = useState(months[month]);
  const [totalSales, setTotalSales] = useState(0);
  const [orders, setOrders] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(months[month]);
  const [selectedYear, setSelectedYear] = useState(year);

  const fectherDaily = async (month) => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/order/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "allDays", month, year: selectedYear }),
    });
    const data = await res.json();

    let arr = [];
    for (let i = 31; i >= 0; i--) {
      if (i === 0) {
        arr.push({ name: i, Rs: 0 });
        continue;
      }
      if (i < 10) {
        i = "0" + i;
      }
      i = "" + i;
      arr.push({ name: i, Rs: data[i] });
    }
    arr.reverse();

    setDailySales(arr);
  };
  const fectherMonthly = async (year) => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/order/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "allMonths", year: selectedYear }),
    });
    const data = await res.json();

    let c = 0;
    const arr = months.map((month) => {
      c += Number(data[month]);
      return { name: month, Rs: data[month] };
    });
    setTotalSales(c);
    setMonthlySales(arr);
  };

  const ordersFetcher = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/order-counter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: day,
          year: selectedYear,
          month: selectedMonth,
        }),
      }
    );
    const data = await res.json();
    setIsLoading(false);
    setOrders(data);
  };
  useEffect(() => {
    fectherDaily(fetcherMonth);
    fectherMonthly(fetcherYear);
    ordersFetcher();
    const intv = setInterval(() => {
      fectherDaily(fetcherMonth);
      fectherMonthly(fetcherYear);
      ordersFetcher();
    }, 2000);
    return () => {
      clearInterval(intv);
    };
  }, [currentActive, fetcherYear, fetcherMonth]);

  const onClickHandler = (e) => {
    const id = e.target.id;
    setCurrentActive(id);
  };
  function relDiff(a, b) {
    return ((a - b) / b) * 100;
  }
  const getSelectValueHandlerYear = () => {
    const e = document.getElementById("searchFilter");
    const text = e.options[e.selectedIndex].value;
    setSelectedYear(text);
    setFetcherYear(text);
  };
  const getSelectValueHandlerMonth = () => {
    const e = document.getElementById("searchFilter");
    const text = e.options[e.selectedIndex].value;

    setSelectedMonth(text);
    setFetcherMonth(text);
  };
  const years = [year, year - 1, year - 2, year - 3];

  return (
    <MainBox isLoading={isLoading}>
      {isLoading && <CompLoader />}
      {!isLoading && (
        <>
          <UpperBox>
            {orders && (
              <>
                <SalesBox
                  style={{
                    backgroundColor: "#321FDB",
                    boxShadow:
                      currentActive === "today"
                        ? "0.25rem 0.25rem 0.5rem #605f5f"
                        : "",
                    transform:
                      currentActive === "today" ? "scale(1.05)" : "scale(1)",
                  }}
                  onClick={() => {
                    setCurrentActive("today");
                  }}
                >
                  <span>
                    {day} {selectedMonth} <i> ({selectedYear})</i>
                  </span>

                  {dailySales.map((sale) => {
                    if (sale.name == day) {
                      return <h3>₹ {sale.Rs.toLocaleString("en-IN")}</h3>;
                    }
                  })}

                  <ResponsiveContainer width="100%" aspect={4}>
                    <AreaChart
                      width={200}
                      height={60}
                      data={dailySales}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <Area
                        type="monotone"
                        dataKey="Rs"
                        stroke="#f5f5f59e"
                        fill="#f5f5f59e"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </SalesBox>

                <SalesBox
                  style={{
                    backgroundColor: "#3399FF",
                    boxShadow:
                      currentActive === "month"
                        ? "0.25rem 0.25rem 0.5rem #605f5f"
                        : "",
                    transform:
                      currentActive === "month" ? "scale(1.05)" : "scale(1)",
                  }}
                  onClick={() => {
                    setCurrentActive("month");
                  }}
                >
                  <span>
                    {fetcherMonth} <i>({selectedYear})</i>
                  </span>
                  {monthlySales.map((mon) => {
                    if (mon.name == fetcherMonth) {
                      return (
                        <h3 key={mon.name}>
                          ₹ {mon.Rs.toLocaleString("en-IN")}
                        </h3>
                      );
                    }
                  })}
                  <ResponsiveContainer width="100%" aspect={4}>
                    <AreaChart
                      width={200}
                      height={60}
                      data={dailySales}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <Area
                        type="monotone"
                        dataKey="Rs"
                        stroke="#f5f5f59e"
                        fill="#f5f5f59e"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </SalesBox>
                <SalesBox
                  style={{
                    backgroundColor: "#E55353",
                    boxShadow:
                      currentActive === "year"
                        ? "0.25rem 0.25rem 0.5rem #605f5f"
                        : "",
                    transform:
                      currentActive === "year" ? "scale(1.05)" : "scale(1)",
                  }}
                  onClick={() => {
                    setCurrentActive("year");
                  }}
                >
                  <span>{fetcherYear}</span>

                  <h3>₹ {totalSales.toLocaleString("en-IN")}</h3>
                  <ResponsiveContainer width="100%" aspect={4}>
                    <AreaChart
                      width={200}
                      height={60}
                      data={monthlySales}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <Area
                        type="monotone"
                        dataKey="Rs"
                        stroke="#f5f5f59e"
                        fill="#f5f5f59e"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </SalesBox>

                <SalesBox
                  style={{
                    backgroundColor: "#1ddf95",
                  }}
                >
                  <span>Orders</span>
                  <div
                    style={{
                      // border: "1px solid #29cf8f",
                      height: "60%",
                      display: "flex",

                      alignItems: "center",
                    }}
                  >
                    <table>
                      <thead>
                        <tr>
                          {year == selectedYear && <td>Today</td>}
                          <td>{selectedMonth}</td>
                          <td>{selectedYear}</td>
                          <td>Total</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {year == selectedYear && (
                            <td>{orders.todayOrders.length}</td>
                          )}
                          <td>{orders.thisMonthOrders.length}</td>
                          <td>{orders.thisYearOrders.length}</td>
                          <td>{orders.totalOrders.length}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </SalesBox>
              </>
            )}
          </UpperBox>
          <MidBox>
            <p>Sales</p>
            {currentActive === "year" && (
              <Select
                name="searchFilter"
                id="searchFilter"
                onChange={getSelectValueHandlerYear}
              >
                <Option value={selectedYear}>{selectedYear}</Option>
                {years.map((m) => {
                  if (m != selectedYear) {
                    return (
                      <Option key={m} value={m}>
                        {m}
                      </Option>
                    );
                  }
                })}
              </Select>
            )}
            {(currentActive === "today" || currentActive === "month") && (
              <Select
                style={{ width: "12%" }}
                name="searchFilter"
                id="searchFilter"
                onChange={getSelectValueHandlerMonth}
              >
                <Option value={selectedMonth}>{selectedMonth}</Option>
                {months.map((m) => {
                  if (m === selectedMonth) {
                    return <></>;
                  }
                  return (
                    <Option key={m} value={m}>
                      {m}
                    </Option>
                  );
                })}
              </Select>
            )}
          </MidBox>

          {monthlySales.length > 0 && currentActive === "year" && (
            <ResponsiveContainer
              style={{
                border: " 1px solid #dfdfdf",
                marginTop: "1.5rem",
                padding: "1rem 0 ",
                display: "block",
                borderRadius: "0.6rem",
                margin: "0 auto",
              }}
              width="94%"
              aspect={4}
            >
              <AreaChart
                width={500}
                height={400}
                data={monthlySales}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid stroke="0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Rs"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
          {dailySales.length > 0 &&
            (currentActive === "month" || currentActive === "today") && (
              <ResponsiveContainer
                style={{
                  border: " 1px solid #dfdfdf",
                  marginTop: "1.5rem",
                  padding: "1rem 0 ",
                  display: "block",
                  borderRadius: "0.6rem",
                  margin: "0 auto",
                }}
                width="94%"
                aspect={4}
              >
                <AreaChart
                  width={500}
                  height={400}
                  data={dailySales}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid stroke="0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Rs"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          {orders && (
            <OrderBox>
              <p>Orders</p>
              {currentActive === "today" && (
                <Orders orders={orders.todayOrders} />
              )}
              {currentActive === "month" && (
                <Orders orders={orders.thisMonthOrders} />
              )}
              {currentActive === "year" && (
                <Orders orders={orders.thisYearOrders} />
              )}
            </OrderBox>
          )}
        </>
      )}
    </MainBox>
  );
};

export default Sales;
