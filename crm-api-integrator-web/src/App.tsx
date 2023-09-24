// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { ChakraProvider, Box, Flex, Spacer } from "@chakra-ui/react";
import SingupComponent from "./components/features/login/singup/SingupComponent";
import SinginComponent from "./components/features/login/singin/SinginComponent";
import UserHomeComponent from "./components/features/userHome/UserHomeComponent";
import CreateAccountComponent from "./components/features/createAccount/CreateAccountComponent";
import RetryIntegrationComponent from "./components/features/integration/RetryIntegrationComponent";
import ConfirmEmailComponent from "./components/features/confirmEmail/ConfirmEmailComponent";
import HowToComponent from "./components/features/howTo/HowToComponent";
import Header from "./components/features/header/header";
import SendEmail from "./components/features/passRecovery/SendEmailComponent";
import PasswordReset from "./components/features/passRecovery/PasswordResetComponent";

const App: React.FC = () => {

  return (
    <ChakraProvider>
      <Router>
        { /*
        <Flex className="mainContainer" p={4} bg="blackAlpha.800" color="white">
          { (path !== "/singin" || path !== "/singup") && (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Link to="/home">Home</Link>
            </Box>
          ) }
          <Spacer />
          <Box>
            <Link to="/singin">Entrar</Link>
          </Box>
          <Box mx={10}>
            <Link to="/singup">Registar</Link>
          </Box>
        </Flex>*/
        }
        <Routes>
          <Route path="/" element={<Navigate to="singin" />} />
          <Route path="/home" element={<UserHomeComponent/>} />
          <Route path="/singin" element={<SinginComponent />} />
          <Route path="/singup" element={<SingupComponent/>} />
          <Route path="/reset-password" element={ <SendEmail /> } />
          <Route path="/reset-password/:id" element={ <PasswordReset /> } />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
