import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  StackDivider,
  Tag,
  TagLabel,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import "./AccountComponent.css";
import { ChangeEvent, useState } from "react";
import TextToCopy from "../../commom/TextToCopy/TextToCopy";

const AccountComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [accountName, setAccountName] = useState("");
  const [integrationId, setIntegrationId] = useState<string>("");
  const [integrationType, setIntegrationType] = useState<string>("");
  const [showClientId, setShowClientId] = useState<boolean>(true);
  const [showClientSecret, setShowClientSecret] = useState<boolean>(true);
  const [showCode, setShowCode] = useState<boolean>(true);
  const [integrationName, setIntegrationName] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [subdomain, setSubdomain] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [usersAccessRights, setUsersAccessRights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErros] = useState<Error[]>([]);

  const handleShowClientId = () => setShowClientId(!showClientId);
  const handleShowClientSecret = () => setShowClientSecret(!showClientSecret);
  const handleShowCode = () => setShowCode(!showCode);

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleAccountName = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountName(event.target.value);
  };

  const handleIntegrationName = (event: ChangeEvent<HTMLInputElement>) => {
    setIntegrationName(event.target.value);
  };

  const handleClientId = (event: ChangeEvent<HTMLInputElement>) => {
    setClientId(event.target.value);
  };

  const handleClientSecret = (event: ChangeEvent<HTMLInputElement>) => {
    setClientSecret(event.target.value);
  };

  const handleCode = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleSubdomain = (event: ChangeEvent<HTMLInputElement>) => {
    setSubdomain(event.target.value);
  };

  function ClientIdInput() {
    return (
      <InputGroup className="inputGroup" size="md">
        <Box className="inputArea">
          <Input
            isReadOnly
            pr="4.5rem"
            type={showClientId ? "text" : "password"}
            onChange={handleClientId}
            isRequired
          />
          <InputRightElement width="4.5rem">
            <Button h="1.65rem" size="sm" onClick={handleShowClientId}>
              {showClientId ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </Box>
      </InputGroup>
    );
  }

  function ClientCodeInput() {
    return (
      <InputGroup className="inputGroup" size="md">
        <Input
          isReadOnly
          pr="4.5rem"
          type={showCode ? "text" : "password"}
          onChange={handleCode}
          isRequired
        />
        <InputRightElement width="4.5rem">
          <Button h="1.65rem" size="sm" onClick={handleShowCode}>
            {showCode ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  }

  function ClientSecretInput() {
    return (
      <InputGroup className="inputGroup" size="md">
        <Input
          isReadOnly
          className=".hideInput"
          pr="4.5rem"
          type={showClientSecret ? "text" : "password"}
          onChange={handleClientSecret}
          isRequired
        />
        <InputRightElement width="4.5rem">
          <Button
            className="hideInputButton"
            h="1.65rem"
            size="sm"
            onClick={handleShowClientSecret}
          >
            {showClientSecret ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  }

  return (
    <Box className="container">
      <Grid
        className="grid"
        h="45rem"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem className="gridItem" colSpan={2} bg="white">
          <FormLabel className="header" fontSize="1.5rem">
            Conta
          </FormLabel>
          <Divider mb="1rem" color="telegram" />
          <FormLabel className="formLabels">Nome</FormLabel>
          <Input mb="1rem" isReadOnly pr="4.5rem" type="text" />
          <FormLabel className="formLabels">Usuarios com acesso</FormLabel>
          <Box className="userAccess"></Box>
        </GridItem>
        <GridItem className="gridItem" colSpan={2} bg="white">
          <FormLabel className="header" fontSize="1.5rem">
            Integração
          </FormLabel>
          <Divider mb="1rem" />
          <FormLabel className="formLabels">Client Id</FormLabel>
          <FormControl>{ClientIdInput()}</FormControl>
          <FormLabel className="formLabels">Secret Id</FormLabel>
          <FormControl>{ClientSecretInput()}</FormControl>
          <FormLabel className="formLabels">Subdomain</FormLabel>
          <FormControl>{ClientCodeInput()}</FormControl>
        </GridItem>
        <GridItem className="gridItem" colSpan={4} bg="white">
          <Card>
            <CardHeader color="telegram">
              <FormLabel className="header" fontSize="1.5rem">
                Endpoints
              </FormLabel>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box >
                  <Heading size="xs" textTransform="uppercase">
                    Companies
                  </Heading>
                  <TextToCopy
                    text={`https://apifacil.azurewebsites.net/api/kommo/reports/companies?i=${integrationId}`}
                  />
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Leads
                  </Heading>
                  <TextToCopy
                    text={`https://apifacil.azurewebsites.net/api/kommo/reports/leads?i=${integrationId}`}
                  />
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Events
                  </Heading>
                  <TextToCopy
                    text={`https://apifacil.azurewebsites.net/api/kommo/reports/events?i=${integrationId}`}
                  />
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Pipelines
                  </Heading>
                  <TextToCopy
                    text={`https://apifacil.azurewebsites.net/api/kommo/reports/pipelines?i=${integrationId}`}
                  />
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Sources
                  </Heading>
                  <TextToCopy
                    text={`https://apifacil.azurewebsites.net/api/kommo/reports/sources?i=${integrationId}`}
                  />
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Status
                  </Heading>
                  <TextToCopy
                    text={`https://apifacil.azurewebsites.net/api/kommo/reports/statuses?i=${integrationId}`}
                  />
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Tasks
                  </Heading>
                  <TextToCopy
                    text={`https://apifacil.azurewebsites.net/api/kommo/reports/tasks?i=${integrationId}`}
                  />
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Users
                  </Heading>
                  <TextToCopy
                    text={`https://apifacil.azurewebsites.net/api/kommo/reports/users?i=${integrationId}`}
                  />
                </Box>
              </Stack>
            </CardBody>
          </Card>
          <Divider />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AccountComponent;
