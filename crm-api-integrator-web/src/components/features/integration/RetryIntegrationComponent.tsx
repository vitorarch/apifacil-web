import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { retryIntegration } from "../../../services/integration/retryIntegrationService";
import { IntegrationResponse } from "../../../services/models/integration/kommoIntegrationResponse";

interface RetryIntegrationProps {
  integrationId: string;
  clientId: string;
  clientSecret: string;
  subdomain: string;
  isOpen: boolean;
  onUpdate: (data: IntegrationResponse) => void;
  onClose: () => void;
}

const RetryIntegrationComponent: React.FC<RetryIntegrationProps> = ({ integrationId, clientId, clientSecret, subdomain, isOpen, onUpdate , onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [newClientId, setNewClientId] = useState<string>(clientId);
  const [newClientSecret, setNewClientSecret] = useState<string>(clientSecret);
  const [newSubdomain, setNewSubdomain] = useState<string>(subdomain);
  const [retryIntegrationObj, setRetryIntegrationObj] = useState<IntegrationResponse>();

  const handleClientId = (event: ChangeEvent<HTMLInputElement>) => {
    setNewClientId(event.target.value);
  };

  const handleClientSecret = (event: ChangeEvent<HTMLInputElement>) => {
    setNewClientSecret(event.target.value);
  };

  const handleCode = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleSubdomain = (event: ChangeEvent<HTMLInputElement>) => {
    setNewSubdomain(event.target.value);
  };

  const toast = useToast();

  const handleRetryIntegration = async () => {
    setIsLoading(true);
    const response  = await retryIntegration(integrationId, newClientId, newClientSecret, code, newSubdomain);
    setIsLoading(false);
    if (response.isSuccessful) {
      const integration = response.response as IntegrationResponse;
      setRetryIntegrationObj(integration)
      toast({
        title: "Conta criada!",
        description: "Sua conta foi criada com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onUpdate(integration);

    } else {
      toast({
        title: "Falhou!",
        description: response.failureMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function IntegrationModal() {
    return (
      <Box>
        <ModalHeader>Dados integração</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl marginBottom="0.8rem">
            <FormLabel>Client Id</FormLabel>
            <Input onChange={handleClientId} value={newClientId} placeholder="" />
          </FormControl>
          <FormControl marginBottom="0.8rem">
            <FormLabel>Client Secret</FormLabel>
            <Input
              onChange={handleClientSecret}
              value={newClientSecret}
              placeholder=""
            />
          </FormControl>
          <FormControl marginBottom="0.8rem">
            <FormLabel>Code</FormLabel>
            <Input onChange={handleCode} value={code} placeholder="" />
          </FormControl>
          <FormControl marginBottom="0.8rem">
            <FormLabel>Subdomain</FormLabel>
            <Input
              onChange={handleSubdomain}
              value={newSubdomain}
              placeholder=""
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isLoading}
            loadingText="Conectando"
            colorScheme="teal"
            variant="outline"
            spinnerPlacement="start"
            onClick={handleRetryIntegration}
          >
            Conectar
          </Button>
        </ModalFooter>
      </Box>
    );
  }

  return (
    <Modal
      size="5xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent color="black">{IntegrationModal()}</ModalContent>
    </Modal>
  );
};

export default RetryIntegrationComponent;
