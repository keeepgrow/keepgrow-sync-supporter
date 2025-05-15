import React, { useEffect } from "react";
import { useQAData } from "../../../../../popup/store/qaData";
import LoginCheckbox from "./checkbox";
import OnLoginFooter from "./footer";

const MappingLoginPage = () => {
  const { qaData } = useQAData();

  useEffect(() => {
    useQAData.update("mappingLogin", true);
  }, []);

  return (
    <div>
      <div className="kg_title">계정연동</div>
    </div>
  );
};

export default MappingLoginPage;
