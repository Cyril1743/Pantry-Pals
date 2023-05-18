import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';
import '../styles/style.css'

const Footer = () => {
  return (
    <Box as="footer" py={4} className='footer'>
      <Flex justify="center" mt={2}>
        <Link fontSize="md" color="blue.500" mr={4} href="https://github.com/Cyril1743" target="_blank">
          David
        </Link>
        <Link fontSize="md" color="blue.500" mr={4} href="https://github.com/AmeliaBigler" target="_blank">
          Amelia
        </Link>
        <Link fontSize="md" color="blue.500" mr={4} href="https://github.com/JonathanGuhl" target="_blank">
          Jon
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;