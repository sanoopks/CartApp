import React from 'react';
import {
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

function Item({data}) {
  const navigation = useNavigation();

  return (
    <Box
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1">
      <Box flex={1}>
        <Image
          source={{
            uri: data.strMealThumb,
          }}
          resizeMode="cover"
          width={'100%'}
          height={130}
          alt="image"
        />
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="sm" ml="-1">
            {data.strMeal}
          </Heading>
        </Stack>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="400">
              $30
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
}

export default Item;
