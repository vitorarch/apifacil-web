import { Box, Flex, Spacer } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <Flex className="mainContainer" p={4} bg="blackAlpha.800" color="white">
       {(pathname !== "/singin" && pathname !== "/singup") && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Link to="/home">Home</Link>
        </Box>
      )}
      <Spacer />
      <Box>
        <Link to="/singin">Entrar</Link>
      </Box>
      <Box mx={10}>
        <Link to="/singup">Registar</Link>
      </Box>
    </Flex>
  )
}