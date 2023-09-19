import {
  AbsoluteCenter,
  Box,
  Text,
  PinInput,
  PinInputField,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ConfirmEmailComponent = () => {
  const navigate = useNavigate();

  const redirectToPage = () => {
    navigate("/singin"); // Substitua pelo caminho da página para a qual deseja redirecionar
  };

  return (
    <AbsoluteCenter>
      <Card align="center">
        <CardHeader>
          <Heading size="md"> Quase lá!</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            Um email de verificação foi enviado para o email informado durante o
            cadastro da conta. Acesse seu email e clque em 'Confirmar email'
            para finalizar o cadastro e ter acesso ao API Facil.
          </Text>
        </CardBody>
        <CardFooter display="flex" flexDirection="column">
          <Text>
            Um email de verificação foi enviado para o email informado durante o
            cadastro da conta. Acesse seu email e clque em 'Confirmar email'
            para finalizar o cadastro e ter acesso ao API Facil.
          </Text>
          <Button colorScheme="teal" onClick={redirectToPage}> Entrar </Button>
        </CardFooter>
      </Card>
    </AbsoluteCenter>
  );
};

export default ConfirmEmailComponent;
