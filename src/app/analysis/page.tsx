"use client";

import { useState } from "react";

import { Box, Button, Typography } from "@mui/material";

import CustomAppBar from "../components/app_bar";
import AnalysisPage from "./analysis_page";
import example_clauses from "../copy/example_clauses.json"
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
