import {
  Box,
  Image,
  Text,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import {useState } from "react";

const WelcomeComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Box className=" flex box-border justify-center h-[25rem] w-screen mt-[10vh]">
      <Card align="center">
        <CardHeader display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Heading size="md" m="1rem"> Voce ainda não possui nenhuma integração</Heading>
          <Image src="https://static.thenounproject.com/png/1735753-200.png" width="10rem"></Image>
        </CardHeader>
        <CardBody>
          <Text fontWeight="400" > Para criar uma integração crie uma conta. Ao criar a conta você definirá o tipo de integração e as pessoas que teram acesso a essa conta</Text>
        </CardBody>
        <CardFooter>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default WelcomeComponent;
