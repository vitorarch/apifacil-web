import React from "react";
import { Text, Button, useClipboard, Box } from "@chakra-ui/react";

interface TextToCopyProps {
  text: string;
}

const TextToCopy: React.FC<TextToCopyProps> = ({ text }) => {
  const { hasCopied, onCopy } = useClipboard(text);
  const handleCopy = () => {
    // Aqui, você pode executar qualquer lógica adicional antes de copiar o texto, se necessário.
    // Por exemplo, você pode modificar o valor da variável 'text' antes de copiá-la.

    onCopy();
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <Text pt="2" fontSize="sm" fontWeight="400">
        {text}
      </Text>
      <Button onClick={handleCopy}>Copiar</Button>
    </Box>
  );
};

export default TextToCopy;
