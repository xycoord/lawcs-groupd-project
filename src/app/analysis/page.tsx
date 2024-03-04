"use client";

import { Box } from "@mui/material";
import { withRouter } from 'next/router'
import { useRouter } from 'next/navigation'

import CustomAppBar from "../components/app_bar";
import AnalysisPage from "./analysis_page";
import React from "react";
import { DataProvider } from "../DataContext";
export default function Home() {

  return (
    <DataProvider>
      <main>
        <CustomAppBar/> 
        <Box sx={{ m: 2 }}>
          <AnalysisPage/>
        </Box>
      </main>
    </DataProvider>
  );
}
