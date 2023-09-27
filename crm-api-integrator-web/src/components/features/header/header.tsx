import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ userName }: { userName: string }) {
  return (
    <Box className=" w-full bg-gray-800 text-white p-4 items-right justify-end flex">
      <Text>{ userName }</Text>
    </Box>
  )
}