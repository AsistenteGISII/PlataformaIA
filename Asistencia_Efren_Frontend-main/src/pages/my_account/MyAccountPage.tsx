import React from "react";
import { Box, Container } from "@mui/material";
import ListSettings from "./components/ListSettings";
import { MyData } from "./components/settings_options/MyData";
import { ValuedModels } from "./components/settings_options/ValuedModels";
import { ValuedDatasets } from "./components/settings_options/ValuedDatasets";
import SpeedDialFAQS from "../../components/FAQs/SpeedDialFAQS";
import DropDownList from "./components/DropDownList";

export const MyAccountPage = () => {
  const [option, setOption] = React.useState("Mi Perfil");

  const updateOption = (option: string) => {
    setOption(option);
  };

  let specificComponent = null;

  switch (option) {
    case "Mi Perfil":
      specificComponent = <MyData />;
      break;
    case "Modelos Publicados":
      specificComponent = <ValuedModels />;
      break;
    case "Datasets Publicados":
      specificComponent = <ValuedDatasets />;
      break;
    default:
      specificComponent = <MyData />;
      break;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-start", 
          alignItems: "flex-start",
          flexDirection: "row",
          gap: 2,
          margin: "85.5px auto 40px auto",
          maxWidth: "1100px",
          textAlign: "center",
          borderRadius: "0 30px 0 0",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            marginRight: "1vh",
            alignSelf: "stretch", 
          }}
        >
          <ListSettings changeParentOption={updateOption} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0,
            alignSelf: "stretch", 
          }}
        >
          {specificComponent}
        </Box>
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            width: "100%",
            paddingBottom: 2,
          }}
        >
          <DropDownList changeParentOption={updateOption} />
        </Box>
      </Container>
      <SpeedDialFAQS />
    </Box>
  );
};
