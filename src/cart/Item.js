import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Image,
  Pressable,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getCartItems, updateItem} from './CartSlice';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

function Item({data}) {
  const dispatch = useDispatch();
  const items = useSelector(getCartItems);
  const [cartItem, setCartItem] = useState({});

  useEffect(() => {
    const thisItem = items.filter(item => item.idMeal == data.idMeal);
    if (thisItem.length) {
      setCartItem(thisItem[0]);
    } else {
      setCartItem({});
    }
  }, [items]);

  const onQtyChange = state => {
    const newItemsTemp = items.map(item => {
      if (item.idMeal == data.idMeal) {
        if (state == 'dec' && item.qty > 0) {
          return {
            ...item,
            qty: item.qty - 1,
          };
        } else if (state == 'inc') {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }
      }
      return item;
    });
    const newItems = newItemsTemp.filter(item => item.qty > 0);
    dispatch(updateItem(newItems));
  };

  return (
    <HStack
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      alignItems={'center'}
      px={3}>
      <Box flex={1}>
        <Image
          source={{
            uri: data.strMealThumb,
          }}
          resizeMode="cover"
          width={50}
          height={50}
          alt="image"
        />
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Text fontSize={15} width={width / 2}>
            {data.strMeal}
          </Text>
        </Stack>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="400">
              ${'price' in cartItem ? cartItem.price : 0} x
              {'qty' in cartItem ? cartItem.qty : 0}
            </Text>
          </HStack>
        </HStack>
      </Stack>
      <VStack>
        <Button my={1} onPress={() => onQtyChange('inc')}>
          +
        </Button>
        <Button my={1} onPress={() => onQtyChange('dec')}>
          -
        </Button>
      </VStack>
    </HStack>
  );
}

export default Item;
