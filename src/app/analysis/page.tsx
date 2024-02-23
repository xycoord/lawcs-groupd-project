"use client";

import { Box } from "@mui/material";

import CustomAppBar from "../components/app_bar";
import AnalysisPage from "./analysis_page";
import React from "react";

export default function Home() {
  return (
    <main>
      <CustomAppBar/> 
      <Box sx={{ m: 2 }}>
        <AnalysisPage/>
      </Box>
    </main>
  );
}
