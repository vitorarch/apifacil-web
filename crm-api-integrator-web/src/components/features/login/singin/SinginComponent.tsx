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
  Heading,
  Stack,
  Text,
  Button,
  ButtonGroup,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { authenticate } from "../../../../services/loginService/loginService";
import { UserResponse } from "../../../../services/models/login/responses/userResponse";
import singinCss from "./Singin.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

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
      navigate('/home', { state: userResponse });
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
            {show ? <IoEyeOffOutline size={23} /> : <IoEyeOutline size={23} />}
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
      <Box className={singinCss.container} position="relative"> 
        <Card className={singinCss.loginTab} maxW="md">
          <CardBody>
            <Image
              className={singinCss.loginImg}
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
                <FormLabel className={singinCss.loginLabel}>Email</FormLabel>
                <Input onChange={handleEmail} placeholder="example@gmail.com" />
                <br />
                <FormLabel className={singinCss.loginLabel}>Senha</FormLabel>
                { PasswordInput() }
              </FormControl>
              <Text className=" cursor-pointer hover:text-teal-700 underline underline-offset-2 w-[150px]" onClick={() => navigate("/reset-password")}>
                Esqueceu a senha?
              </Text>
              <div className=" flex gap-2">
                <Text>Não possui conta?</Text>
                <Text className=" cursor-pointer hover:text-teal-700 underline underline-offset-2"  onClick={() => navigate("/singup")}>
                  Registre-se agora
                </Text>
              </div>
            </Stack>
          </CardBody>
          <CardFooter className={singinCss.loginFooter}>
            <ButtonGroup className={singinCss.loginBtn} spacing="2">
              <Button
                onClick={handleLogin}
                variant="solid"
                colorScheme="teal"
                isLoading={isLoading}
                loadingText="Logging In"
              >
                Login
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Box>
    </div>
  );
};

export default SinginComponent;
