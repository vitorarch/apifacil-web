import {
  Box,
  Link,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Heading,
  Stack,
  Input,
  FormLabel,
  FormControl,
  Wrap,
  WrapItem,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import "./SingupComponent.css";
import { register } from "../../../../services/loginService/loginService";
import { BaseResponse } from "../../../../services/models/base/baseResponse";
import { UserResponse } from "../../../../services/models/login/responses/userResponse";
import {
  ErrorsResponse,
  Error,
} from "../../../../services/models/base/errorsResponse";
import { useNavigate } from "react-router-dom";

const SingupComponent = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const [everyFieldIsFilled, setEveryFieldIsFilled] = useState<boolean>(false);
  const [errors, setErros] = useState<Error[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    const result = await register(name, email, phone, password);
    setIsLoading(false);
    console.log(result);
    if (result.isSuccessful) {
      const userResponse = result.response as UserResponse;
      navigate("/home", { state: userResponse });
      // Login bem-sucedido, faça qualquer ação necessária
    } else {
      const errors = result.response as Error[];
      setErros(errors);
      showErrorToasts(errors);
    }
  };

  const showErrorToasts = (errors: Error[]) => {
    if (errors) {
      errors.forEach((error) => {
        toast({
          title: error.key,
          description: error.value,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });
    }
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const verifyPasswordsMatch = () => {
    if (password == confirmPassword) {
      setPasswordsMatch(true);
    }
  };

  const verifyEveryFieldIsFilled = () => {
    if (
      name != "" &&
      email != "" &&
      phone != "" &&
      password != "" &&
      confirmPassword != ""
    ) {
      setEveryFieldIsFilled(true);
    }
  };

  const handleShowPassword = () => setShow(!show);

  function PasswordInput(isMainPassword: boolean) {
    const placeholder: string = isMainPassword
      ? "digite sua senha..."
      : "confirme sua senha...";
    const passwordEvent = isMainPassword
      ? handlePassword
      : handleConfirmPassword;
    return (
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          style={{ width: "20rem" }}
          onChange={passwordEvent}
          isRequired
          placeholder={placeholder}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  }

  const toast = useToast();

  return (
    <div>
      <Box className="container" position="relative">
        <Card className="card">
          <CardBody>
            <div className="divImage">
              <Image
                className="image"
                src="https://i.ibb.co/P1Z3w1N/apifacil.png"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
            </div>
            <Stack mt="6" spacing="3">
              <Heading size="md">Regista-se agora!</Heading>
              <Text>Crie uma conta e começe a usar</Text>
              <FormControl className="form">
                <div>
                  <FormLabel className="formLabelSingup">
                    Nome completo
                  </FormLabel>
                  <Input
                    style={{ width: "20rem" }}
                    onChange={handleName}
                    isRequired
                    placeholder="nome completo"
                  />
                </div>
                <div>
                  <FormLabel className="formLabelSingup">Email</FormLabel>
                  <Input
                    style={{ width: "20rem" }}
                    onChange={handleEmail}
                    isRequired
                    placeholder="example@gmail.com"
                  />
                </div>
                <div>
                  <FormLabel className="formLabelSingup">Telefone</FormLabel>
                  <Input
                    style={{ width: "20rem" }}
                    onChange={handlePhone}
                    isRequired
                    placeholder="(XX) 9XXXX-XXXX"
                  />
                </div>
                <div>
                  <FormLabel className="formLabelSingup">Senha</FormLabel>
                  {PasswordInput(true)}
                </div>
                <div>
                  <FormLabel className="formLabelSingup">
                    Confirmar senha
                  </FormLabel>
                  {PasswordInput(false)}
                </div>
              </FormControl>
              <Text color="blue.600">
                Já tem conta?&nbsp;
                <Link
                  onClick={() => {
                    navigate("/singin");
                  }}
                >
                  Faça o login
                </Link>
              </Text>
            </Stack>
          </CardBody>
          <CardFooter className="login-cardFooter">
            <ButtonGroup className="login-buttonGroup" spacing="2">
              <Button
                isDisabled={passwordsMatch}
                onClick={handleLogin}
                variant="solid"
                colorScheme="teal"
                isLoading={isLoading}
                loadingText="Registrando..."
              >
                {isLoading ? "Logging In" : "Registrar"}
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Box>
    </div>
  );
};

export default SingupComponent;
