import React, {useEffect, useState} from 'react';
import {Box, Button, Center, HStack, Image, Stack, Text} from 'native-base';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addItem, getCartItems, updateItem} from '../cart/CartSlice';

const {width, height} = Dimensions.get('screen');

function Detail({route, navigation}) {
  const dispatch = useDispatch();
  const items = useSelector(getCartItems);
  const [cartItem, setCartItem] = useState({});
  const data = route.params.data;

  useEffect(() => {
    const thisItem = items.filter(item => item.idMeal == data.idMeal);
    if (thisItem.length) {
      setCartItem(thisItem[0]);
    } else {
      setCartItem({});
    }
  }, [items]);

  const onQtyChange = state => {
    const existItemIndex = items.findIndex(item => item.idMeal == data.idMeal);
    if (existItemIndex !== -1) {
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
    } else {
      if (state == 'inc') {
        dispatch(
          addItem({
            ...data,
            qty: 1,
            price: 30,
          }),
        );
      }
    }
  };

  return (
    <Center flex={1}>
      <Image
        source={{
          uri: data.strMealThumb,
        }}
        resizeMode="cover"
        width={width}
        height={200}
        alt="image"
      />
      <Box flex={1} pt={2}>
        <Text fontWeight={'bold'} fontSize={20}>
          {data.strMeal}
        </Text>
        <HStack pt={1} alignItems={'center'}>
          <Button onPress={() => onQtyChange('dec')}>-</Button>
          <Text px={1} fontWeight={'bold'}>
            {'qty' in cartItem ? cartItem.qty : 0}
          </Text>
          <Button onPress={() => onQtyChange('inc')}>+</Button>
        </HStack>
      </Box>
      <HStack
        py={2}
        width={'100%'}
        alignItems={'space-between'}
        justifyContent={'space-around'}>
        <Box>
          <Text>Total Price</Text>
          <Text fontWeight={'bold'} fontSize={18}>
            ${' '}
            {'price' in cartItem && 'qty' in cartItem
              ? cartItem.qty * cartItem.price
              : 0}
          </Text>
        </Box>
        <Button
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          Go To Cart
        </Button>
      </HStack>
    </Center>
  );
}

export default Detail;
