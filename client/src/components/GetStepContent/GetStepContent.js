import React from "react";
import BasicInfoForm from "../../components/BasicInfoForm/BasicInfoForm";
import StretchForm from "../../components/StretchForm/StretchForm";
import Review from "../../components/Review/Review";
import TapeForm from "../../components/TapeForm/TapeForm";

const GetStepContent = ({
  step,
  stepsLength,
  input,
  activeOrder,
  type,
  kind,
  handleInputChange,
  handleDateChange
}) => {
  if (step === 0) {
    return (
      <BasicInfoForm
        input={input}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
      />
    );
  } else if (step === 1) {
    if (kind === "KT" && type === "TPD") {
      return (
        <TapeForm
          input={input}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
        />
      );
    }
    if (kind === "KT" && type === "FS") {
      return (
        <StretchForm input={input} handleInputChange={handleInputChange} />
      );
    }
  }
  if (step === stepsLength - 1) {
    return <Review input={input} data={activeOrder} />;
  }
};

export default GetStepContent;
