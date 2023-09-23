import { Box, Button, ButtonGroup, Card, Heading, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import passwordResetCss from "./PasswordReset.css";

export default function SendEmail() {
  const [email, setEmail] = useState('');
  const [loadingTime, setLoadingTime] = useState<number | null>(null);
  const [contadorIniciado, setContadorIniciado] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const sendEmail = () => {
    setIsLoading(true);
    setLoadingTime(60); // Iniciar a contagem regressiva com 60 segundos
    setContadorIniciado(true);
  }

  const decrementarTempo = () => {
    if (loadingTime && loadingTime > 0) {
      setLoadingTime(loadingTime - 1);
    } else {
      setContadorIniciado(false); // Contagem regressiva concluída
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval: any;

    if (contadorIniciado) {
      interval = setInterval(decrementarTempo, 1000);
    } else {
      clearInterval(interval); // Limpar o intervalo se a contagem não estiver iniciada
    }

    // Limpa o intervalo quando o componente é desmontado
    return () => {
      clearInterval(interval);
    };
  }, [loadingTime, contadorIniciado]);

  return (
    <Box className={ passwordResetCss.container }>
      <Card className={passwordResetCss.card}>
        <Heading  className={passwordResetCss.header}>Recuperação de Senha</Heading>
        <Text>Perdeu sua senha? Não se preocupe, estamos aqui para ajudar!</Text>
        <Text>Por favor, siga estas etapas simples:</Text>
        <br/>
        <Text>1. Insira seu endereço de email registrado.</Text>
        <Text>2. Enviaremos um link de redefinição de senha para o seu email.</Text>
        <Text>3. Clique no link e siga as instruções para criar uma nova senha segura.</Text>
        <div className={ passwordResetCss.limit + " my-5" } >
          <Input onChange={handleEmail} placeholder="example@gmail.com" />
        </div>
        <ButtonGroup spacing={2} className={passwordResetCss.limit}>
          <Button
            onClick={ () => sendEmail() }
            variant="solid"
            colorScheme="teal"
            className=" w-full"
            isDisabled={isLoading}
          >
            { isLoading ? `Reenviar código em ${loadingTime}` : "Enviar" }
          </Button>
        </ButtonGroup>
      </Card>
    </Box>
  )
}