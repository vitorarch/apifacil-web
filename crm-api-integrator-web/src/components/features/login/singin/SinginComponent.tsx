import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  Image,
  Spinner,
  Heading,
  Stack,
  Text,
  Button,
  ButtonGroup,
  Progress,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import "./SinginComponent.css";
import { useNavigate } from 'react-router-dom';
import { authenticate } from "../../../../services/loginService/loginService";
import { UserResponse } from "../../../../services/models/login/responses/userResponse";

const SinginComponent = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [show, setShow] = useState<boolean>(false)
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const result = await authenticate(email, password);
    setIsLoading(false);
    if (result.isSuccessful) {
      const userResponse = result.response as UserResponse;
      navigate('/home', { state: userResponse })
      // Login bem-sucedido, faça qualquer ação necessária
    } else {
      setErrorMessage(result.failureMessage as string);
      showErrorToasts(errorMessage);
    }
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrorMessage('');
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrorMessage('');
  };

  const handleShowPassword = () => setShow(!show)

  function PasswordInput() {
  
    return (
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          onChange={handlePassword}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleShowPassword}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }

  const showErrorToasts = (error: string) => {
        toast({
          title: "Login",
          description: error,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        });
    }
  
  const toast = useToast();

  return (
    <div>
      <Box className="container" position="relative">
        <Card className="singin-card" maxW="md">
          <CardBody>
            <Image
              className="login-image"
              src="https://i.ibb.co/P1Z3w1N/apifacil.png"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">Faça o login</Heading>
              <Text>
                Olá! Seja bem vindo de volta! <br />
                Faça o login agora!
              </Text>
              <FormControl>
                <FormLabel className="login-formLabel">Email</FormLabel>
                <Input onChange={handleEmail} placeholder="example@gmail.com" />
                <br />
                <FormLabel className="login-formLabel">Senha</FormLabel>
                { PasswordInput() }
              </FormControl>
              <Text color="blue.600">
                Esqueceu a senha? <br />
              </Text>
            </Stack>
          </CardBody>
          <CardFooter className="login-cardFooter">
            <ButtonGroup className="login-buttonGroup" spacing="2">
              <Button
                onClick={handleLogin}
                variant="solid"
                colorScheme="teal"
                isLoading={isLoading}
                loadingText="Entrando..."
              >
                {isLoading ? 'Logging In' : 'Login'}
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Box>
    </div>
  );
};

export default SinginComponent;
