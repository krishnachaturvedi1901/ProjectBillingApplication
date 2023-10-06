import React, { useContext, useState, useEffect } from "react";
import { WindowWidthContext } from "../../states/context/WindowWidthContext/WindowWidthContext";
import { ThemeContext } from "../../states/context/ThemeContext/ThemeContext";
import SelectClient from "../../components/Home_Components/ClientSection/SelectClient";
import ProjectTable from "../../components/Home_Components/ProjectSection/ProjectTable";
import BillAmount from "../../components/Home_Components/AmountSection/BillAmount";
import DownloadPreview from "../../components/Home_Components/DownloadSection/DownloadPreview";

const Home = () => {
  // const { windowWidth } = useContext(WindowWidthContext);

  return (
    <main className=" bg-slate-200 dark:bg-slate-600 h-screen text-colorDarkFont dark:text-colorLightFont ">
      <SelectClient />
      <ProjectTable />
      <BillAmount />
      <DownloadPreview />
    </main>
  );
};

export default Home;
