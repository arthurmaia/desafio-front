import { useState, useEffect } from "react";
import Head from "next/head";
import { AxiosResponse } from "axios";
import { Doughnut } from "react-chartjs-2";

import Loader from "../components/Loader";
import api from "../services/api";
import EmployeeForm from "../components/EmployeeForm";

import styles from "./home.module.scss";

export interface SubmitProps {
  first_name: string;
  last_name: string;
  participation: number;
}

interface ICreateEmployee extends SubmitProps {
  color: string;
}

export interface IEmployee extends ICreateEmployee {
  _id: string;
}

export default function Home() {
  const [getLoading, setGetLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const handleSubmit = async ({
    first_name: firstName,
    last_name: lastName,
    participation,
  }: SubmitProps): Promise<void> => {
    if (!firstName || !lastName || !participation) {
      alert("Preencha todos os campos!");
      return;
    }

    setPostLoading(true);

    try {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      const payload: ICreateEmployee = {
        first_name: firstName,
        last_name: lastName,
        participation: Number(participation),
        color: `#${randomColor}`,
      };

      const { data }: AxiosResponse<IEmployee> = await api.post(
        "/employees",
        payload
      );

      setEmployees((prev) => [...prev, data]);
    } catch {
    } finally {
      setPostLoading(false);
    }
  };

  const handleGetEmployees = async (): Promise<void> => {
    setGetLoading(true);

    try {
      const { data }: AxiosResponse<IEmployee[]> = await api.get("/employees");

      setEmployees([...data]);
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

  useEffect(() => {
    handleGetEmployees();
  }, []);

  if (getLoading || postLoading) return <Loader />;

  return (
    <>
      <Head>
        <title>Desafio Bowe Front-end</title>
      </Head>

      <EmployeeForm onSubmit={handleSubmit} postLoading={postLoading} />

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
                  ({ _id, first_name, last_name, participation }, index) => (
                    <tr key={_id} className={styles.employeeTableRow}>
                      <td>{index + 1}</td>
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
