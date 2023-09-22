import { Box, Button, ButtonGroup, Card, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import passRecoveryCss from "./PassRecovery";

export default function PassRecoveryComponent() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const sendEmail = () => {
    setIsLoading(true);
  }

  return (
    <Box className={ passRecoveryCss.container }>
      <Card>
        <Text>Perdeu sua senha? Não se preocupe, estamos aqui para ajudar!</Text>
        <br/>
        <Text>Por favor, siga estas etapas simples:</Text>
        <br/>
        <Text>1. Insira seu endereço de email registrado.</Text>
        <Text>2. Enviaremos um link de redefinição de senha para o seu email.</Text>
        <Text>3. Clique no link e siga as instruções para criar uma nova senha segura.</Text>
        <br/>
        <Text>
          Lamentamos qualquer inconveniente que a perda de senha possa ter causado. Estamos aqui para garantir que você recupere o acesso à sua conta com facilidade e segurança.
        </Text>
        <Input onChange={handleEmail} placeholder="example@gmail.com" />
        <ButtonGroup spacing={2}>
          <Button
            onClick={ () => sendEmail() }
            variant="solid"
            colorScheme="teal"
            isLoading={isLoading}
            loadingText="Enviando..."
          >
            Enviar
          </Button>
        </ButtonGroup>
      </Card>
    </Box>
  )
}