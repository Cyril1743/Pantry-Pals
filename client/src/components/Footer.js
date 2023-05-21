import React from 'react';
import { Box, Flex, Icon, Link } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import '../styles/style.css'

const Footer = () => {
  return (
    <Box as="footer" py={4} className='footer'>
      <Flex justify="center" mt={2}>
        <Link className="footerLink"  mr={4} href="https://github.com/Cyril1743" target="_blank" _hover={{ textDecoration: 'none' }}>
        <Icon as={FaGithub} boxSize={5} mr={1} />
          David
        </Link>
        <Link className="footerLink"  mr={4} href="https://github.com/AmeliaBigler" target="_blank" _hover={{ textDecoration: 'none' }}>
        <Icon as={FaGithub} boxSize={5} mr={1} />
          Amelia
        </Link>
        <Link className="footerLink"  mr={4} href="https://github.com/JonathanGuhl" target="_blank" _hover={{ textDecoration: 'none' }}>
        <Icon as={FaGithub} boxSize={5} mr={1} />
          Jon G
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;