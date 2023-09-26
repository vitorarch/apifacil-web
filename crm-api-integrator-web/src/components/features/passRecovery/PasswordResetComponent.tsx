import { Box, Button, ButtonGroup, Card, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IPasswords } from "../../models/login/user.interfaces";
import passwordResetCss from "./PasswordReset.css";
import { useNavigate, useParams } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { resetPassword } from "../../../services/password/passwordReset";

export default function PasswordReset() {
  const [show, setShow] = useState(false as boolean);
  const [passwords, setPasswords] = useState({} as IPasswords);
  const [differentPasswords, setDifferentPasswords] = useState(false as boolean);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleShowPassword = () => setShow(!show);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setDifferentPasswords(false);
    const { name, value } = event.target;
    setPasswords({ ...passwords, [name]: value });
  }

  const passwordReset = async () => {
    const { password, confirmPassword } = passwords;
    if ((!password && !confirmPassword) || password !== confirmPassword) {
      setDifferentPasswords(true);
    } else {
      const result = await resetPassword(passwords.password, id as string);
      console.log(result);
      
      if (result.isSuccessful) {
        navigate('/home', { state: { userResponse: result.response } });
      } else {
        console.log("Error");
        
      }
    }
  }

  const validatingIdenticalPasswords = (): boolean => {
    const { password, confirmPassword } = passwords;
    if (password !== confirmPassword || (!password && !confirmPassword)) return true
    return false
  }

  function PasswordInput(isMainPassword: boolean) {
    return (
      <InputGroup>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          onChange={handleChange}
          name={ isMainPassword ? "password" : "confirmPassword" }
          isRequired
          placeholder={ isMainPassword ? "digite sua senha..." : "confirme sua senha..." }
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
            {show ? <IoEyeOffOutline size={23} /> : <IoEyeOutline size={23} />}
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  }

  return (
    <Box className={passwordResetCss.container}>
      <Card className={passwordResetCss.card}>
        <Stack mt="6" spacing="3">
          <Heading className={passwordResetCss.header}>Redefinição de Senha</Heading>
          <Text>Você está prestes a redefinir sua senha.</Text>
          <Text>Por favor, escolha uma senha forte e segura que seja difícil de adivinhar.</Text>
          <Text>Lembre-se de guardar a sua nova senha em um local seguro.</Text>
          <FormControl className={ passwordResetCss.passwords }>
            <div className={passwordResetCss.limit}>
              <FormLabel>Senha</FormLabel>
              {PasswordInput(true)}
            </div>
            <div className={passwordResetCss.limit}>
              <FormLabel>
                Confirmar senha
              </FormLabel>
              {PasswordInput(false)}
            </div>
            <Stack className=" h-[25px]">
              { differentPasswords ? (
                <p className="text-red-700">Senhas são diferentes</p>
              ) : <p></p> }
            </Stack>
            <ButtonGroup spacing={2} className={passwordResetCss.limit}>
              <Button
                onClick={ () => passwordReset() }
                variant="solid"
                colorScheme="teal"
                className=" w-full"
              >
                Redefinir Senha
              </Button>
            </ButtonGroup>
          </FormControl>
        </Stack>
      </Card>
    </Box>
  )
}