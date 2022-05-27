import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';


const Banner = ({ imageUrl, purpose, title1, title2, desc1, desc2, linkName, buttonText }) => (
<Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
  <Image src={imageUrl} alt='banner' width={500} height={300}/>
  <Box p='5'>
    <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
    <Text fontSize='3xl' fontWeight='bold'>{title1} <br /> {title2}</Text>
    <Text color='gray.700' fontSize='lg' paddingBottom='3' paddingTop='3'>{desc1} <br /> {desc2}</Text>
    <Button fontSize='xl'>
      <Link href={linkName}>{buttonText}</Link>
    </Button>
    </Box>
</Flex>
);

export default function Home({propertiesForSale, propertiesForRent}) {
  return (
    <Box>
      
     <Banner 
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4' 
        purpose='Rent A Home' 
        title1='Rental Homes For' 
        title2='Everyone' 
        desc1='Explore Apartments, Villas, Homes' 
        desc2='and more' 
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
     />

     <Flex flexWrap='wrap'>
       {propertiesForRent.map((property) => <Property property= {property} key={property.id} />)}
     </Flex>

     <Banner 
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008' 
        purpose='Buy A Home' 
        title1='Rental Homes For' 
        title2='Everyone' 
        desc1='Explore Apartments, Villas, Homes' 
        desc2='and more' 
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
     />

     <Flex flexWrap='wrap'>
       {propertiesForSale.map((property) => <Property property= {property} key={property.id} />)}
     </Flex>   

    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}