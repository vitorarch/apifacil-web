import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const HowToComponent = () => {
  return (
    <Container maxW="lg" mt={10}>
      <Heading as="h1" size="xl" mb={6}>
        Como criar uma integração?
      </Heading>
      <Text as="h3" size="lg" mb={6}>
        Primeiro passo: Kommo
      </Text>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Tópico 1: Criar integração
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              Passo 1: Acesse sua conta kommo
              <br></br>
              <Link href="https://www.kommo.com/br/" isExternal>
                Kommo <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
            <Text>
              {"Passo 2: Vá em Configurações > Integrações > Criar Integração"}
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Tópico 2: Definir integração
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>Passo 1: Redirect URL</Text>
            <Text>
              O redirect URL definirá para qual endpoint os dados serão
              enviados. Copie este endpoint: https://apifacil.azurewebsites.net/
              e cole no campo especificado. Com isso os dados serão enviados e
              assim tratados e disponiblizados em endpoints para você usar junto
              ao Power BI
            </Text>
            <Text>Passo 2: Selecione a campo: Permitir acesso a tudo</Text>
            <Text>
              Passo 3: Defina um nome e descrição para sua integração (ambos são
              de cráter obrigatório)
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Tópico 3: Chaves e Escopos
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              As chaves e escopos são as credencias utilizadas para permitir o
              acesso do nosso sistema a sua api de dados. Elas serão necessárias
              ao criar-se uma integração. Na tela de crição essas chaves serão
              pedidas, basta copiá-las e assim será criado a conexão
            </Text>
            <Text>
              O redirect URL definirá para qual endpoint os dados serão
              enviados. Copie este endpoint: https://apifacil.azurewebsites.net/
              e cole no campo especificado. Com isso os dados serão enviados e
              assim tratados e disponiblizados em endpoints para você usar junto
              ao Power BI
            </Text>
            <Text>Passo 2: Selecione a campo: Permitir acesso a tudo</Text>
            <Text>
              Passo 3: Defina um nome e descrição para sua integração (ambos são
              de cráter obrigatório)
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Text marginTop="1.5rem" as="h3" size="lg" mb={6}>
        Segundo passo: API Facil
      </Text>
      <Accordion>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Tópico 1: Criar intregração
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>
              Já dentro da nosssa plataforma, na página do usuário clique em '+ Criar integração'.
              Um modal será exibido e nele aparecerão campos que deverão ser preenchidos corretamente
              para que a conexão do nosso sistema e da sua conta Kommo seja bem-sucedida. 
            </Text>
            <Text>
              O primeiro campo será para definir o nome de identificação da sua integração.
              A seguir será pedido as chaves e escopos criados no item anterior. Copie as chaves
              para os respectivos campos e então avance para a última etapa.
              A última etapa consiste em fornecer acesso a outros usuários já cadastrados.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default HowToComponent;
