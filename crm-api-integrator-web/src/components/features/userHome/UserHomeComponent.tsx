import {
  AddIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Grid,
  Text,
  GridItem,
  Menu,
  Image,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
  Stack,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  StackDivider,
  CardFooter,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import "./UserHomeComponent.css";
import TextToCopy from "../../commom/TextToCopy/TextToCopy";
import { useLocation, useNavigate } from "react-router-dom";
import { UserResponse } from "../../../services/models/login/responses/userResponse";
import { getAccountById } from "../../../services/account/getAccountByIdService";
import { AccountResponse } from "../../../services/models/account/accountResponse";
import CreateAccountComponent from "../createAccount/CreateAccountComponent";
import RetryIntegrationComponent from "../integration/RetryIntegrationComponent";
import { IntegrationResponse } from "../../../services/models/integration/kommoIntegrationResponse";
import WelcomeComponent from "../welcome/WelcomeComponent";
import { IEndpoints, setDefaultEndpoints } from "../../models/home/home.interfaces";
import Header from "../header/header";
import { loginById } from "../../../services/loginService/loginService";

const UserHomeComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [endpoints, setEndpoints] = useState([] as IEndpoints[]);
  const [userInfo, setUserInfo] = useState<UserResponse>();
  const [accountDetails, setAccountDetails] = useState<AccountResponse>();
  const [allAccounts, setAllAccounts] = useState([] as AccountResponse[]);
  //const queryParams = new URLSearchParams(location.search);
  const [receivedData, setReceivedData] = useState<IntegrationResponse>();
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isRetryIntegrationOpen, setIsRetryIntegrationOpen] = useState(false);

  const handleUpdateIntegrationDetails = async (data: IntegrationResponse) => {
    // Atualizar as informações com base nos dados recebidos
    setReceivedData(data);
    closeModalRetry();
  };

  const handleUpdateAccountDetails = (data: AccountResponse) => {
    // Atualizar as informações com base nos dados recebidos
    setAccountDetails(data);
    setAllAccounts((prev) => [...prev, data]);
    closeCreateAccountModal();
  };
  
  const requestUserInfos = useCallback(async () => {
    const result = await loginById(state.id as string);
    if (result.isSuccessful) {
      setUserInfo(result.response);
      if (result.response.accounts.length !== 0) {
        requestAccountById(result.response.accounts[0].id);
        setAllAccounts(result.response.accounts);
        setEndpoints(setDefaultEndpoints(result.response.accounts[0].id));
      }
    }
  }, [])

  const requestAccountById = useCallback(async (accountId: string) => {
    const result = await getAccountById(accountId);
    if (result.isSuccessful) {
      setAccountDetails(result.response);
    }
  }, [])

  const closeModalRetry = () => {
    setIsRetryIntegrationOpen(false);
  };

  const openCreateAccountModal = () => {
    setIsCreateAccountOpen(true);
  };

  const closeCreateAccountModal = () => {
    setIsCreateAccountOpen(false);
  };


  const openRetriIntegrationModel = () => {
    setIsRetryIntegrationOpen(true);
  };



  useEffect(() => {
    requestUserInfos();

    return () => {};
  }, []);

  const MyMenu = () => {
    return (
      <>
        {accountDetails ? (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {accountDetails.name}
            </MenuButton>
            <MenuList className=" p-2">
              {allAccounts.map((account) => (
                <MenuItem
                  key={account.id}
                  minH="48px"
                  onClick={() => requestAccountById(account.id)}
                  backgroundColor={ account.id === accountDetails.id ? " #cbd5e1" : "" }
                >
                  <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src="https://simg.nicepng.com/png/small/933-9332131_profile-picture-default-png.png"
                    mr="12px"
                  />
                  <span>{account.name}</span>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        ) : (
          <Menu>
            <MenuButton as={Button}>Sem contas</MenuButton>
          </Menu>
        )}
      </>
    );
  };

  if (!userInfo) return <Spinner />
  return (
    <div>
    <Grid
      templateAreas={`"header header"
                  "nav main"`}
      gridTemplateRows={"4rem 1fr 20rem"}
      gridTemplateColumns={"40rem 1fr"}
      h="30rem"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem
        className="userHomeHeader"
        padding="10px"
        pl="2"
        area={"header"}
      >
        <Box className="userHomeHeaderButtons">
          {MyMenu()}
          <Stack direction="row" spacing={4}>
            <Button
              leftIcon={<AddIcon />}
              onClick={openCreateAccountModal}
              colorScheme="teal"
              variant="solid"
            >
              Criar conta
            </Button>
            {isCreateAccountOpen && (
              <CreateAccountComponent
                userId={userInfo?.id as string}
                isOpen={isCreateAccountOpen}
                onClose={closeCreateAccountModal}
                onUpdate={handleUpdateAccountDetails}
              />
            )}
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="outline"
              onClick={() => navigate("/singin")}
            >
              Sair
            </Button>
          </Stack>
        </Box>
        <Divider m="10px" />
      </GridItem>
      { accountDetails ? (
        <GridItem pl="2" area={"nav"}>
          <Text className="userInfo" marginTop="1rem" fontSize="1.5rem">
            Informações do usuário
          </Text>
          <Divider m="10px" />
          <Grid
            className="teste"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={4}
          >
            <GridItem className="infoCard" colSpan={2}>
              <Text>Nome completo</Text>
              <Text className="answerText">{userInfo?.name}</Text>
              <Text>Email</Text>
              <Text className="answerText">{userInfo?.email}</Text>
              <Text>Telefone</Text>
              <Text className="answerText">{userInfo?.phone}</Text>
            </GridItem>
            <GridItem
              className="infoCard"
              color="white"
              colSpan={2}
              bg="teal.400"
            >
              <Text>Criado em</Text>
              <Text className="answerText">
                {accountDetails?.createdAt.toString()}
              </Text>
              <Text>Criado por</Text>
              <Text className="answerText">
                {accountDetails?.createdBy.name}
              </Text>
              <Text>Tipos de integração</Text>
              <Text className="answerText">Kommo</Text>
            </GridItem>
            <GridItem colSpan={4}>
              <Text className="userInfo" fontSize="1.5rem">
                Informações da integração
              </Text>
              <Divider m="10px" marginBottom="20px" />
              {accountDetails?.integration.hasSuccessfullyConnected ? (
                <GridItem className="infoCard" colSpan={2}>
                  <Text>Nome</Text>
                  <Text className="answerText">{accountDetails?.name}</Text>
                  <Text>Client Id</Text>
                  <Text className="answerText">
                    {accountDetails?.integration.details.clientId}
                  </Text>
                  <Text>Client Secret</Text>
                  <Text className="answerText">
                    {accountDetails?.integration.details.clientSecret}
                  </Text>
                  <Text>Subdomain</Text>
                  <Text className="answerText">
                    {accountDetails?.integration.details.subdomain}
                  </Text>
                  <Text>Integration Id</Text>
                  <Text className="answerText">
                    {accountDetails?.integration.id}
                  </Text>
                </GridItem>
              ) : (
                <GridItem colSpan={4}>
                  <Card align="center">
                    <CardHeader>
                      <Heading size="md" color="red.500">
                        Ops! Falha na integração
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Text fontWeight="400">
                        Parece que algo deu errado. Por favor confira os dados e
                        tente novamente!
                      </Text>
                    </CardBody>
                    <CardFooter>
                      <Button
                        colorScheme="teal"
                        onClick={openRetriIntegrationModel}
                      >
                        {" "}
                        Tentar novamente
                      </Button>
                      <RetryIntegrationComponent
                        integrationId={accountDetails?.integration.id as string}
                        clientId={
                          accountDetails?.integration.details.clientId as string
                        }
                        clientSecret={
                          accountDetails?.integration.details
                            .clientSecret as string
                        }
                        subdomain={
                          accountDetails?.integration.details
                            .subdomain as string
                        }
                        isOpen={isRetryIntegrationOpen}
                        onUpdate={handleUpdateIntegrationDetails}
                        onClose={closeModalRetry}
                      />
                    </CardFooter>
                  </Card>
                </GridItem>
              )}
            </GridItem>
          </Grid>
        </GridItem>
      ) : (
        <WelcomeComponent />
      )}
      <GridItem pl="2" area={"main"}>
        { accountDetails && (
          <Card className="endpointsCard">
            <CardHeader color="telegram">
              <Text className="userInfo" fontSize="1.5rem">
                Endpoints
              </Text>
            </CardHeader>
            <CardBody className=" overflow-y-auto max-h-[730px] scroll-auto mr-[2px]">
              <Stack divider={<StackDivider />} spacing="4">
                { endpoints.map((e) => {
                  const { name, integrationUrl } = e;
                  return (
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        { name }
                      </Heading>
                      <TextToCopy
                        text={ integrationUrl }
                      />
                    </Box>
                  )
                }) }
              </Stack>
            </CardBody>
          </Card>
        ) }
      </GridItem>
    </Grid>
    </div>
  );
};

export default UserHomeComponent;
