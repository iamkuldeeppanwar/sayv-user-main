import React, { useEffect, useState } from "react";
import {
  Carousel,
  Col,
  Container,
  Image,
  ProgressBar,
  Row,
} from "react-bootstrap";
// import Skeleton from "react-loading-skeleton";
// import { getError, toastOptions } from "../utils/error";
import { MotionDiv } from "../components";
import DashboardCard from "../components/layout/DasboardCard";
import "./Dashboard.css";
// import SearchField from "../components/layout/SearchField";
import { Link } from "react-router-dom";
import BudgetComponents from "./DashboardComponents/BudgetComponents";
import UpcomingBillComponents from "./DashboardComponents/UpcomingBillComponent";
import PieCharts from "../components/Charts/PieChart";
import BarsChart from "../components/Charts/BarsChart";
import {
  imgAddr,
  useDashboardDataMutation,
  useGetBillsMutation,
} from "../features/apiSlice";
import { getError } from "../utils/error";
import { formatDate } from "../components/FormateDateTime/FormatDateTime";
import Skeleton from "react-loading-skeleton";
// import { IoMdRefresh } from "react-icons/io";

const COLORS = [
  { start: "rgba(36, 204, 167, 1)", end: "rgba(74, 86, 226, 1)" },
  { start: "rgba(36, 204, 167, 1)", end: "rgba(36, 204, 167, 1)" },
  { start: "rgba(36, 204, 167, 0.7)", end: "rgba(36, 204, 167, 0.7)" },
  { start: "rgba(36, 204, 167, 0.4)", end: "rgba(36, 204, 167, 0.4)" },
  { start: "rgba(36, 204, 167, 0.2)", end: "rgba(36, 204, 167, 0.2)" },
];

export default function Dashboard() {
  const [dashboardData, { isLoading }] = useDashboardDataMutation();
  const [getBills, { isLoading: billLoading }] = useGetBillsMutation();
  const [accountPortfolioActive, setAccountPortfolioActive] = useState(1);
  const [expenseActive, setExpenseActive] = useState(1);

  const [showBudget, setShowBudget] = useState(false);
  const [showActiveBudget, setShowActiveBudget] = useState(1);

  const [showBills, setShowBills] = useState(false);
  const [showActiveBills, setShowActiveBills] = useState(1);

  const [dashboard, setDashboard] = useState({});
  const [bills, setBills] = useState();

  const upcomingPayments = [
    {
      icons: "/icons/disnep.png",
      text: "Disney+",
      subText: "5th of every month",
      amount: "-$30.00",
    },
    {
      icons: "/icons/spotify.png",
      text: "Spotify",
      subText: "18th of every month",
      amount: "-$30.00",
    },
    {
      icons: "/icons/amazon.png",
      text: "Amazon",
      subText: "10th of May, every year",
      amount: "-$30.00",
    },
  ];

  useEffect(() => {
    getDashboardData();
  }, []);

  useEffect(() => {
    if (expenseActive === 2) {
      getUpcomingBills();
    }
  }, [expenseActive]);

  const getUpcomingBills = async () => {
    try {
      const { bills } = await getBills().unwrap();
      setBills(bills);
    } catch (error) {
      getError(error);
    }
  };

  const getDashboardData = async () => {
    try {
      const { data } = await dashboardData();
      console.log(data);
      setDashboard(data?.dashboardData);
    } catch (error) {
      getError(error);
    }
  };

  return (
    <MotionDiv>
      <Container fluid>
        {!isLoading ? (
          <h2
            style={{
              fontWeight: 600,
            }}
            className="my-2"
          >
            Hello!{" "}
            <span style={{ color: "rgba(55, 73, 87, 0.6)" }}>
              {dashboard?.userName}
            </span>
          </h2>
        ) : (
          <Skeleton className="rounded-2 mb-2" height={"40px"} width={"100%"} />
        )}
        <Row className="g-3">
          {!isLoading ? (
            <Col>
              <DashboardCard height={"380px"}>
                <h4 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                  Account Portfolio
                </h4>
                <ul className="account_portfolio_active">
                  <li
                    onClick={() => setAccountPortfolioActive(1)}
                    style={{
                      borderBottom:
                        accountPortfolioActive === 1
                          ? "2px solid rgba(0, 74, 173, 1)"
                          : "none",
                      color:
                        accountPortfolioActive === 1
                          ? "rgba(0, 74, 173, 1)"
                          : "rgba(55, 73, 87, 0.7)",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Saving account
                  </li>
                  <li
                    onClick={() => setAccountPortfolioActive(2)}
                    style={{
                      borderBottom:
                        accountPortfolioActive === 2
                          ? "2px solid rgba(0, 74, 173, 1)"
                          : "none",
                      color:
                        accountPortfolioActive === 2
                          ? "rgba(0, 74, 173, 1)"
                          : "rgba(55, 73, 87, 0.7)",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Credit Cards
                  </li>
                  <li
                    onClick={() => setAccountPortfolioActive(3)}
                    style={{
                      borderBottom:
                        accountPortfolioActive === 3
                          ? "2px solid rgba(0, 74, 173, 1)"
                          : "none",
                      color:
                        accountPortfolioActive === 3
                          ? "rgba(0, 74, 173, 1)"
                          : "rgba(55, 73, 87, 0.7)",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Money In vs Out
                  </li>
                  <li
                    onClick={() => setAccountPortfolioActive(4)}
                    style={{
                      borderBottom:
                        accountPortfolioActive === 4
                          ? "2px solid rgba(0, 74, 173, 1)"
                          : "none",
                      color:
                        accountPortfolioActive === 4
                          ? "rgba(0, 74, 173, 1)"
                          : "rgba(55, 73, 87, 0.7)",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Monthly Money Out
                  </li>
                </ul>

                {accountPortfolioActive === 1 && (
                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "rgba(245, 247, 248, 1)",
                      height: "260px",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                  >
                    <div className="mt-5 d-flex align-items-center justify-content-between">
                      <div>
                        <div
                          style={{
                            color: "rgba(0, 74, 173, 0.7)",
                            fontSize: "16px",
                            fontWeight: 600,
                          }}
                        >
                          Total amount
                        </div>
                        <div
                          style={{
                            color: "var(--primary-color",
                            fontWeight: 700,
                            fontSize: "30px",
                          }}
                        >
                          ${dashboard?.card1?.["Total amount"]}
                        </div>
                      </div>

                      <Image
                        width={"100px"}
                        height={"100px"}
                        src="/images/money.png"
                        alt="..."
                      />
                    </div>
                  </div>
                )}

                {accountPortfolioActive === 2 && (
                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "rgba(245, 247, 248, 1)",
                      height: "260px",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                  >
                    <div className="mt-5 d-flex align-items-center justify-content-between">
                      <div>
                        <div
                          style={{
                            color: "rgba(0, 74, 173, 0.7)",
                            fontSize: "16px",
                            fontWeight: 600,
                          }}
                        >
                          Total amount
                        </div>
                        <div
                          style={{
                            color: "var(--primary-color",
                            fontWeight: 700,
                            fontSize: "30px",
                          }}
                        >
                          ${dashboard?.card1?.["Credit Card"]}
                        </div>
                      </div>

                      <Image
                        width={"100px"}
                        height={"100px"}
                        src="/images/money.png"
                        alt="..."
                      />
                    </div>
                  </div>
                )}

                {accountPortfolioActive === 3 && (
                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "rgba(245, 247, 248, 1)",
                      height: "270px",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div
                          style={{
                            color: "var(--primary-color)",
                            fontWeight: 600,
                            fontSize: "16px",
                          }}
                        >
                          This month
                        </div>
                        <BarsChart
                          data={dashboard?.card1?.moneyInVsMoneyOut}
                          width={200}
                          height={220}
                          moneyInvsOut={true}
                          color={COLORS}
                          barWidth={45}
                          gradient={true}
                          gradientNumber={12}
                          barGrad1={"#004AAD"}
                          barGrad2={"#3AC3AC"}
                          barGrad3={"#004AAD"}
                          barGrad4={"#DC5A5A"}
                        />
                      </div>
                      <div>
                        <div
                          className="px-4 py-2 mb-3"
                          style={{
                            backgroundColor: "rgba(249, 252, 255, 1)",
                            border: "2px solid rgba(226, 242, 255, 1)",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "10px",
                              color: "var(--primary-color)",
                              textAlign: "end",
                            }}
                          >
                            Total Money In:
                          </div>
                          <div
                            className="text-end"
                            style={{
                              backgroundImage:
                                "linear-gradient(270deg, #5CB6F9 0%, #004AAD 100%)",
                              WebkitBackgroundClip: "text",
                              color: "transparent",
                              fontSize: "20px",
                              fontWeight: 600,
                            }}
                          >
                            {dashboard?.card1?.moneyInVsMoneyOut[0].uv}$
                          </div>
                        </div>

                        <div
                          className="px-4 py-2 mb-3"
                          style={{
                            backgroundColor: "rgba(249, 252, 255, 1)",
                            border: "2px solid rgba(226, 242, 255, 1)",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "10px",
                              color: "var(--primary-color)",
                              textAlign: "end",
                            }}
                          >
                            Money Out:
                          </div>
                          <div
                            className="text-end"
                            style={{
                              backgroundImage:
                                "linear-gradient(270deg, #DC5A5B -4.02%, #004AAD 105.17%)",
                              WebkitBackgroundClip: "text",
                              color: "transparent",
                              fontSize: "20px",
                              fontWeight: 600,
                            }}
                          >
                            {dashboard?.card1?.moneyInVsMoneyOut[1].uv}$
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {accountPortfolioActive === 4 && (
                  <div
                    className="mt-3"
                    style={{
                      backgroundColor: "rgba(245, 247, 248, 1)",
                      height: "270px",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        color: "var(--primary-color)",
                        fontWeight: 600,
                        fontSize: "16px",
                      }}
                    >
                      This Year
                    </div>

                    <div className="d-flex justify-content-center">
                      <BarsChart
                        data={dashboard?.card1?.monthlyMoneyOut}
                        barWidth={30}
                        width={"100%"}
                        height={220}
                        moneyInvsOut={true}
                        gradient={true}
                        gradientNumber={12}
                        barGrad1={"#5CB6F9"}
                        barGrad2={"#004AAD"}
                        barGrad3={"#5CB6F9"}
                        barGrad4={"#004AAD"}
                      />
                    </div>
                  </div>
                )}
              </DashboardCard>
            </Col>
          ) : (
            <Col className={`p-2`}>
              <Skeleton className="rounded-4" height={"350px"} width={"100%"} />
            </Col>
          )}

          {!isLoading ? (
            <Col>
              <DashboardCard height={"380px"}>
                <div className="d-flex align-items-center justify-content-between">
                  <h4 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                    Expenses
                  </h4>
                  <p
                    style={{
                      color: "rgba(92, 182, 249, 1)",
                      fontWeight: 600,
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    See more
                  </p>
                </div>
                <ul className="account_portfolio_active px-5">
                  <li
                    onClick={() => setExpenseActive(1)}
                    style={{
                      borderBottom:
                        expenseActive === 1
                          ? "2px solid rgba(0, 74, 173, 1)"
                          : "none",
                      color:
                        expenseActive === 1
                          ? "rgba(0, 74, 173, 1)"
                          : "rgba(55, 73, 87, 0.7)",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Money out
                  </li>
                  <li
                    onClick={() => setExpenseActive(2)}
                    style={{
                      borderBottom:
                        expenseActive === 2
                          ? "2px solid rgba(0, 74, 173, 1)"
                          : "none",
                      color:
                        expenseActive === 2
                          ? "rgba(0, 74, 173, 1)"
                          : "rgba(55, 73, 87, 0.7)",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Upcoming payments
                  </li>
                  <li
                    onClick={() => setExpenseActive(3)}
                    style={{
                      borderBottom:
                        expenseActive === 3
                          ? "2px solid rgba(0, 74, 173, 1)"
                          : "none",
                      color:
                        expenseActive === 3
                          ? "rgba(0, 74, 173, 1)"
                          : "rgba(55, 73, 87, 0.7)",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Money In
                  </li>
                </ul>

                <div className="mt-2">
                  {expenseActive === 1 && (
                    <div className="d-flex justify-content-end">
                      <PieCharts
                        COLORS={COLORS}
                        data={dashboard?.moneyOutGraph}
                        cornerRadius={10}
                        height={280}
                        width={500}
                      />
                    </div>
                  )}

                  {expenseActive === 2 && (
                    <>
                      {!billLoading ? (
                        bills?.slice(0, 4)?.map((paymt) => {
                          return (
                            <div
                              className="d-flex align-items-center justify-content-between mt-2"
                              style={{
                                borderRadius: "10px",
                                backgroundColor: "rgba(245, 247, 248, 1)",
                                padding: "10px",
                              }}
                            >
                              <div className="d-flex align-items-center gap-2">
                                <Image
                                  style={{
                                    objectFit: "cover",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                  }}
                                  src={imgAddr + paymt?.category?.image}
                                  alt="..."
                                />
                                <div>
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      color: "rgba(55, 73, 87, 1)",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {paymt?.category?.name}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "10px",
                                      color: "rgba(55, 73, 87, 0.8)",
                                    }}
                                  >
                                    {/* {paymt?.category} */}
                                  </div>
                                </div>
                              </div>
                              <div
                                style={{
                                  fontSize: "14px",
                                  color: "var(--primary-color)",
                                  fontWeight: 600,
                                }}
                              >
                                ${paymt?.budget_amount}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <Col className={`p-2`}>
                          <Skeleton
                            className="rounded-2"
                            height={"250px"}
                            width={"100%"}
                          />
                        </Col>
                      )}
                    </>
                  )}

                  {expenseActive === 3 && (
                    <Carousel>
                      <Carousel.Item>
                        <div className="d-flex flex-column justify-content-center mt-5">
                          <BarsChart
                            data={dashboard?.card2?.monthlyMoneyIn}
                            barWidth={30}
                            width={"100%"}
                            height={220}
                            moneyInvsOut={true}
                            gradient={true}
                            gradientNumber={12}
                            moneyIn={true}
                            barGrad1={"#5CB6F9"}
                            barGrad2={"#004AAD"}
                            barGrad3={" #5CB6F9"}
                            barGrad4={"#004AAD"}
                          />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item>
                        <Row className="d-flex justify-content-between gap-3 px-3 mt-2">
                          <Col
                            className="p-3"
                            style={{
                              backgroundColor: "rgba(245, 247, 248, 1)",
                              borderRadius: "10px",
                            }}
                          >
                            <div
                              style={{
                                color: "#4A7EC4",
                                fontSize: "12px",
                                fontWeight: 700,
                              }}
                            >
                              Bank
                            </div>
                            <div
                              style={{
                                color: "var(--primary-color)",
                                fontSize: "18px",
                                fontWeight: 700,
                              }}
                            >
                              ${dashboard?.card1?.["Total amount"]}
                            </div>
                          </Col>

                          <Col
                            className="p-3"
                            style={{
                              backgroundColor: "rgba(245, 247, 248, 1)",
                              borderRadius: "10px",
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: "#F5F7F8",
                                color: "rgba(92, 182, 249, 0.8)",
                                fontSize: "12px",
                                fontWeight: 700,
                              }}
                            >
                              Net worth
                            </div>
                            <div
                              style={{
                                backgroundColor: "#F5F7F8",
                                color: "#5CB6F9",
                                fontSize: "18px",
                                fontWeight: 700,
                              }}
                            >
                              ${dashboard?.card1?.["Total amount"]}
                            </div>
                          </Col>
                        </Row>

                        <Row className="d-flex justify-content-between gap-3 mt-4 px-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: "14px",
                                color: "var(--primary-color)",
                              }}
                            >
                              Cashflow
                            </div>
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: "12px",
                                color: "rgba(92, 182, 249, 1)",
                              }}
                            >
                              View
                            </div>
                          </div>

                          <div
                            style={{
                              backgroundColor: "#F5F7F8",
                              borderRadius: "10px",
                            }}
                            className="d-flex justify-content-around align-items-center p-2"
                          >
                            <div style={{ color: "#3AC3AC" }}>
                              <div
                                style={{ fontSize: "12px", fontWeight: 400 }}
                              >
                                Money in
                              </div>
                              <div
                                style={{ fontSize: "14px", fontWeight: 600 }}
                              >
                                ${dashboard?.card1?.moneyInVsMoneyOut[0].uv}
                              </div>
                              <div
                                style={{ fontSize: "12px", fontWeight: 400 }}
                              >
                                53.8%
                              </div>
                            </div>

                            <div>
                              <div
                                style={{ fontSize: "12px", fontWeight: 400 }}
                              >
                                Money out
                              </div>
                              <div
                                style={{ fontSize: "14px", fontWeight: 600 }}
                              >
                                ${dashboard?.card1?.moneyInVsMoneyOut[1].uv}
                              </div>
                              <div
                                style={{ fontSize: "12px", fontWeight: 400 }}
                              >
                                53.8%
                              </div>
                            </div>

                            <div
                              style={{
                                color: "var(--primary-color)",
                              }}
                            >
                              <div
                                style={{ fontSize: "12px", fontWeight: 400 }}
                              >
                                Over spent
                              </div>
                              <div
                                style={{ fontSize: "14px", fontWeight: 600 }}
                              >
                                $1,386
                              </div>
                            </div>
                          </div>
                        </Row>
                      </Carousel.Item>
                    </Carousel>
                  )}
                </div>
              </DashboardCard>
            </Col>
          ) : (
            <Col className={`p-2`}>
              <Skeleton className="rounded-4" height={"350px"} width={"100%"} />
            </Col>
          )}
        </Row>

        <Row className="g-3 mt-2">
          {!isLoading ? (
            <>
              <Col>
                <DashboardCard>
                  <div className="d-flex align-items-center justify-content-between">
                    <h4
                      style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}
                    >
                      Net worth
                    </h4>
                    <p
                      style={{
                        color: "var(--primary-color)",
                        fontWeight: 600,
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </p>
                  </div>

                  <div className="mt-3">
                    <div
                      style={{
                        color: "rgba(116, 141, 174, 1)",
                        fontWeight: 600,
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      Net Worth
                    </div>

                    <div
                      className="mt-2"
                      style={{
                        color: "var(--primary-color)",
                        fontWeight: 600,
                        fontSize: "30px",
                        cursor: "pointer",
                      }}
                    >
                      ${dashboard?.card1?.["Total amount"]}
                    </div>
                  </div>

                  <div className="mt-4 d-flex justify-content-between">
                    <div
                      style={{
                        color: "rgba(121, 144, 176, 1)",
                        fontSize: "16px",
                      }}
                    >
                      Assets
                    </div>{" "}
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                      }}
                    >
                      ${dashboard?.card1?.["Total amount"]}
                    </div>
                  </div>

                  <div className="mt-4 d-flex justify-content-between">
                    <div
                      style={{
                        color: "rgba(121, 144, 176, 1)",
                        fontSize: "16px",
                      }}
                    >
                      Liabilities
                    </div>{" "}
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                      }}
                    >
                      $0
                    </div>
                  </div>
                </DashboardCard>
              </Col>

              <Col>
                <DashboardCard>
                  <h4 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                    Budget
                  </h4>

                  <div className="mt-4 d-flex justify-content-between align-items-center">
                    <div>
                      <h3
                        style={{
                          fontWeight: 600,
                          color: "var(--primary-color)",
                          borderRadius: "20px",
                        }}
                      >
                        5 days
                      </h3>
                      <p
                        style={{
                          fontWeight: 600,
                          color: "rgba(159, 175, 198, 1)",
                          fontSize: "12px",
                        }}
                      >
                        Left for this week’s budget
                      </p>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(92, 182, 249, 0.08)",
                        color: "rgba(92, 182, 249, 1)",
                        fontSize: "12px",
                        padding: "8px",
                        borderRadius: "20px",
                      }}
                    >
                      1 active budget
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "rgba(245, 247, 248, 1)",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <div className=" d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2 align-items-center">
                        <Image src="/images/Rectangle 116.png" alt="..." />
                        <div>
                          <div
                            style={{
                              fontWeight: 600,
                              color: "rgba(55, 73, 87, 1)",
                              fontSize: "12px",
                            }}
                          >
                            Cafes & Coffee
                          </div>
                          <div
                            style={{
                              fontWeight: 600,
                              color: "rgba(159, 175, 198, 1)",
                              fontSize: "12px",
                            }}
                          >
                            $20 spent of 50
                          </div>
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            color: "rgba(92, 182, 249, 1)",
                            fontSize: "12px",
                          }}
                        >
                          $30.00
                        </div>

                        <div
                          style={{
                            color: "rgba(55, 73, 87, 0.8)",
                            fontSize: "12px",
                          }}
                        >
                          remaining
                        </div>
                      </div>
                    </div>
                    {/* <div className="mt-1">
                      <ProgressBar now={60} label={`${60}%`} visuallyHidden />
                    </div> */}
                  </div>

                  <div className="mt-3 text-center">
                    <Link
                      onClick={() => setShowBudget(true)}
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "14px",
                        fontWeight: 400,
                        textDecoration: "underline",
                      }}
                      to=""
                    >
                      View budget
                    </Link>
                  </div>
                </DashboardCard>
              </Col>

              <Col
                style={{ cursor: "pointer" }}
                onClick={() => setShowBills(true)}
              >
                <DashboardCard>
                  <h4 style={{ fontWeight: 600, color: "rgba(0, 39, 91, 1)" }}>
                    Upcoming Bills
                  </h4>

                  <div className="d-flex align-items-center flex-column mt-2">
                    <div
                      style={{
                        backgroundColor: "rgba(224, 234, 255, 1)",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        padding: "10px",
                      }}
                    >
                      <Image src="/icons/Bills.png" alt="..." />
                    </div>

                    <h3
                      className="text-center mt-4"
                      style={{
                        fontWeight: 700,
                        fontSize: "20px",
                        color: "var(--primary-color)",
                      }}
                    >
                      Don’t miss a bill
                    </h3>

                    <div
                      className="text-center px-5 mt-2"
                      style={{
                        fontWeight: 400,
                        fontSize: "16px",
                      }}
                    >
                      Track your bills and other known recurring expenses -
                      We’ll remind you before they’re due.
                    </div>
                  </div>
                </DashboardCard>
              </Col>
            </>
          ) : (
            [1, 2, 3].map((_, i) => (
              <Col key={i} className={`p-2`}>
                <Skeleton
                  className="rounded-2"
                  height={"300px"}
                  width={"100%"}
                />
              </Col>
            ))
          )}
        </Row>

        <Row className="mt-4">
          <Col>
            <DashboardCard>
              <div className="d-flex align-items-center justify-content-end">
                {/* <button
                  className="px-3 py-1"
                  style={{
                    backgroundColor: "white",
                    color: "var(--primary-color)",
                    border: "1px solid #D2EBFD",
                    borderRadius: "18px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  Refresh <IoMdRefresh />
                </button> */}
                <div
                  className="px-3 py-1"
                  style={{
                    color: "rgba(92, 182, 249, 1)",
                    fontWeight: 600,
                    fontSize: "12px",
                    backgroundColor: "rgba(242, 249, 255, 1)",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                >
                  View all
                </div>
              </div>

              <ul className="market mt-2">
                {!isLoading
                  ? dashboard?.transactions?.map((data, idx) => {
                      return (
                        <li
                          key={idx}
                          className="d-flex justify-content-between align-items-center "
                        >
                          <div className="d-flex align-items-center gap-2">
                            <Image
                              width={"35px"}
                              height={"35px"}
                              style={{
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              src={
                                data?.category?.image
                                  ? imgAddr + data?.category?.image
                                  : "/icons/Rectangle 116.png"
                              }
                              alt="..."
                            />
                            <div>
                              <div
                                style={{
                                  fontSize: "rgba(55, 73, 87, 1)",
                                  fontSize: "16px",
                                }}
                              >
                                {data?.description}
                              </div>
                              <div
                                style={{
                                  fontSize: "rgba(55, 73, 87, 0.7)",
                                  fontSize: "12px",
                                  fontWeight: 400,
                                }}
                              >
                                at {formatDate(data?.date)}
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              color: "var(--primary-color)",
                              fontSize: "20px",
                              fontWeight: 800,
                            }}
                          >
                            {data?.amount} $
                          </div>
                        </li>
                      );
                    })
                  : [1, 2, 3, 4, 5].map((_, i) => (
                      <Col key={i} className={`p-2`}>
                        <Skeleton
                          className="rounded-2"
                          height={"40px"}
                          width={"100%"}
                        />
                      </Col>
                    ))}
              </ul>
            </DashboardCard>
          </Col>
        </Row>
      </Container>

      {/* Budget */}
      <BudgetComponents
        show={showBudget}
        hide={setShowBudget}
        active={showActiveBudget}
        activeLink={setShowActiveBudget}
      />

      {/* Upcoming bills */}
      <UpcomingBillComponents
        show={showBills}
        hide={setShowBills}
        active={showActiveBills}
        activeLink={setShowActiveBills}
      />
    </MotionDiv>
  );
}
