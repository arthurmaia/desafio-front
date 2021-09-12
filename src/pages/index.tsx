import { useState } from "react";
import Head from "next/head";
import { AxiosResponse } from "axios";
import { Doughnut } from "react-chartjs-2";

import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import api from "../services/api";
import { employees as employessJson } from "../mock/index.json";

import styles from "./home.module.scss";

interface IEmployee {
  id: number;
  first_name: string;
  last_name: string;
  participation: number;
  color: string;
}

export default function Home() {
  const [getLoading, setGetLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [participation, setParticipation] = useState("");

  const [employees, setEmployees] = useState<IEmployee[]>(employessJson);

  const handleClearInputs = (): void => {
    setFirstName("");
    setLastName("");
    setParticipation("");
  };

  const handleGetEmployees = async (): Promise<void> => {
    setGetLoading(true);

    try {
    } catch {
    } finally {
      setGetLoading(false);
    }
  };

  const renderChart = (): React.ReactNode => {
    const doughnutData = {
      labels: employees.map(({ first_name }) => first_name),
      datasets: [
        {
          label: "My First Dataset",
          data: employees.map(({ participation }) => participation),
          backgroundColor: employees.map(({ color }) => color),
          hoverOffset: 4,
        },
      ],
    };

    return (
      <Doughnut
        data={doughnutData}
        redraw={false}
        options={{
          plugins: {
            legend: {
              position: "right",
            },
          },
        }}
      />
    );
  };

  const handleSubmit = async (): Promise<void> => {
    if (!firstName || !lastName || !participation) {
      alert("Preencha todos os campos!");
      return;
    }

    setPostLoading(true);

    try {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      const payload: IEmployee = {
        id: Math.random(),
        first_name: firstName,
        last_name: lastName,
        participation: Number(participation),
        color: `#${randomColor}`,
      };

      // const { data }: AxiosResponse = await api.post("/employees", payload);

      // console.log({ data });

      setEmployees((prev) => [...prev, payload]);
    } catch (err) {
      console.log({ err });
      alert("Houve um erro!");
    } finally {
      setPostLoading(false);
      handleClearInputs();
    }
  };

  if (getLoading || postLoading) return <Loader />;

  return (
    <>
      <Head>
        <title>Desafio Bowe Front-end</title>
      </Head>

      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Input
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />

          <Input
            defaultValue={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />

          <Input
            defaultValue={participation}
            placeholder="Participation"
            onChange={(e) =>
              setParticipation(e.target.value.replace(/\D/g, ""))
            }
          />

          <Button onClick={handleSubmit} disabled={postLoading}>
            SEND
          </Button>
        </div>
      </header>

      <div className={styles.bodyContainer}>
        <h2 className={styles.title}>DATA</h2>

        <p className={styles.subTitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        {!!employees.length && (
          <div className={styles.bodyContent}>
            <table className={styles.employeesTableContainer}>
              <thead>
                <tr>
                  <th></th>
                  <th className={styles.customTableHeader}>Last name</th>
                  <th className={styles.customTableHeader}>First name</th>
                  <th>Participation</th>
                </tr>
              </thead>

              <tbody>
                {employees.map(
                  ({ id, first_name, last_name, participation }) => (
                    <tr key={id} className={styles.employeeTableRow}>
                      <td>{id}</td>
                      <td>{first_name}</td>
                      <td>{last_name}</td>
                      <td>{`${participation}%`}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <div className={styles.chartContainer}>{renderChart()}</div>
          </div>
        )}
      </div>
    </>
  );
}
