import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { SubmitProps } from "../../pages";

import Button from "../Button";
import Input from "../Input";

import styles from "./index.module.scss";

interface EmployeeFormProps {
  onSubmit: (prop: SubmitProps) => Promise<void>;
  postLoading: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onSubmit,
  postLoading,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [participation, setParticipation] = useState("");

  const handleClearInputs = (): void => {
    setFirstName("");
    setLastName("");
    setParticipation("");
  };

  const handleSubmit = async (): Promise<void> => {
    await onSubmit({
      first_name: firstName,
      last_name: lastName,
      participation: Number(participation),
    });
    handleClearInputs();
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />

        <Input
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <Input
          value={participation}
          placeholder="Participation"
          onChange={(e) => setParticipation(e.target.value.replace(/\D/g, ""))}
        />

        <Button onClick={handleSubmit} disabled={postLoading}>
          SEND
        </Button>
      </div>
    </header>
  );
};

export default EmployeeForm;
