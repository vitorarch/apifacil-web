import {
  Box,
  Text,
  WrapItem,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  useToast,
  InputGroup,
  InputRightElement,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import "./CreateAccountComponent.css";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import {
  CreateAccountRequest,
  KommoIntegrationRequest,
} from "../../../services/models/account/createAccountRequest";
import { createAccount } from "../../../services/account/createAccoountService";
import { SinginAccountResponse } from "../../../services/models/account/singinAccountResponse";
import { Error } from "../../../services/models/base/errorsResponse";
import { AccountResponse } from "../../../services/models/account/accountResponse";
import React from "react";
import { render } from "react-dom";

interface CreateAccountProps {
    userId: string;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (account: AccountResponse) => void;
  }
  
  const CreateAccountComponent: React.FC<CreateAccountProps> = ({ userId, isOpen, onClose, onUpdate }) => {
  //   const [activeStep, setActiveStep] = useState(0);
  const [accountName, setAccountName] = useState("");;
  const [clientId, setClientId] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [subdomain, setSubdomain] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [usersAccessRights, setUsersAccessRights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErros] = useState<Error[]>([]);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [activeStep, setActiveStep] = useState(0); // Estado para rastrear o passo ativo

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleAccountName = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountName(event.target.value);
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

  const handleUserAccessRights = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setUsersAccessRights([...usersAccessRights, email]);
      setEmail("");
    }
  };

  const removeEmail = (index: number) => {
    const auxliarList = [...usersAccessRights];
    auxliarList.splice(index, 1);
    setUsersAccessRights(auxliarList);
  };


  const handlePreviousStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleCreateAccount = async () => {
    const accountRequest = createAccountRequest();
    var response = await createAccount(accountRequest);
    if (response.isSuccessful) {
      const accountResponse = response.response as AccountResponse;

      toast({
        title: "Conta criada!",
        description: "Sua conta foi criada com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onUpdate(accountResponse as AccountResponse)

    } else {
      const errors = response.response as Error[];
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

  const steps = [
    { title: "Primeiro", description: "Informações da conta" },
    { title: "Segundo", description: "Informações da integração" },
    { title: "Terceiro", description: "Defina os acessos" },
  ];

  function AccountInformation() {
    return (
      <Box>
        <ModalHeader>Criar Conta</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nome da conta</FormLabel>
            <Input onChange={handleAccountName} value={accountName} placeholder="" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleNextStep}>
            Próximo
          </Button>
          <Button colorScheme="red" variant="outline" onClick={onClose}> Cancelar </Button>
        </ModalFooter>
      </Box>
    );
  }

  function IntegrationInformation() {
    return (
      <Box>
        <ModalHeader>Dados integração</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl marginBottom="0.8rem">
            <FormLabel>Client Id</FormLabel>
            <Input onChange={handleClientId} value={clientId} placeholder="" />
          </FormControl>
          <FormControl marginBottom="0.8rem">
            <FormLabel>Client Secret</FormLabel>
            <Input ref={initialRef} onChange={handleClientSecret} value={clientSecret} placeholder="" />
          </FormControl>
          <FormControl marginBottom="0.8rem">
            <FormLabel>Code</FormLabel>
            <Input ref={initialRef} onChange={handleCode} value={code} placeholder="" />
          </FormControl>
          <FormControl marginBottom="0.8rem">
            <FormLabel>Subdomain</FormLabel>
            <Input ref={initialRef} onChange={handleSubdomain} value={subdomain} placeholder="" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleNextStep}>
            Próximo
          </Button>
          <Button marginRight="0.65rem" onClick={handlePreviousStep}>Anterior</Button>
          <Button colorScheme="red" variant="outline" onClick={onClose}> Cancelar </Button>
        </ModalFooter>
      </Box>
    );
  }

  function AccessRightsInformation() {
    return (
      <Box>
        <ModalHeader>Direitos de acesso</ModalHeader>
        <FormControl>
          <HStack className="usersAccessRights" spacing={4} h="3rem">
            {usersAccessRights.map((size, index) => (
              <Tag
                size="lg"
                borderRadius="full"
                variant="subtle"
                colorScheme="teal"
              >
                <TagLabel>{size}</TagLabel>
                <TagCloseButton onClick={() => removeEmail(index)} />
              </Tag>
            ))}
          </HStack>
          <br></br>
          <FormLabel> Digite o email para conceder acesso </FormLabel>
          <Input
            type="text"
            value={email}
            onKeyDown={handleUserAccessRights}
            onChange={handleEmail}
            placeholder="digite o email..."
          />
        </FormControl>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleCreateAccount}>
            Criar
          </Button>
          <Button marginRight="0.65rem" onClick={handlePreviousStep}>Anterior</Button>
          <Button colorScheme="red" variant="outline" onClick={onClose}> Cancelar </Button>
        </ModalFooter>
      </Box>
    );
  }

  function StepperComponent() {
    return (
      <Stepper colorScheme="teal" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    );
  }

  function createAccountRequest() {
    const createAccountRequest: CreateAccountRequest<KommoIntegrationRequest> =
      {
        userId: userId,
        name: accountName,
        usersAccessRights: usersAccessRights,
        integration: {
          integrationType: 0,
          integrationDetails: {
            clientId: clientId,
            clientSecret: clientSecret,
            code: code,
            subdomain: subdomain,
          },
        },
      };
    return createAccountRequest;
  }

  const toast = useToast();

  return (
      <Modal
        size="5xl"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent color="black">
          <Box p="15px">
            <StepperComponent />
            {activeStep === 0
              ? AccountInformation()
              : activeStep === 1
              ? IntegrationInformation()
              : AccessRightsInformation()}
          </Box>
        </ModalContent>
      </Modal>
  );
};

export default CreateAccountComponent;
