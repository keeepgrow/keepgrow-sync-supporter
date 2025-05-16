import React, { useEffect } from "react";
import { useQAData } from "../../../../../popup/store/qaData";

const MappingLoginPage = () => {
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
