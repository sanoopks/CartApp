import React, {useEffect, useState} from 'react';
import {Box, FlatList, HStack, Pressable, Text} from 'native-base';
import Item from './Item';
import {useDispatch, useSelector} from 'react-redux';
import {getCartItems} from './CartSlice';

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(getCartItems);
  const [totals, setTotals] = useState({
    total: 0,
    subTotal: 0,
  });

  useEffect(() => {
    let sTotal = 0;
    for (let item of items) {
      sTotal += item.qty * item.price;
    }
    let total = sTotal + 2;
    setTotals({
      subTotal: sTotal,
      total: total,
    });
  }, [items]);

  return (
    <Box flex={1}>
      <Box flex={1}>
        <FlatList
          data={items}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <Pressable
              my={2}
              flex={1}
              mx={2}
              onPress={() => {
                props.navigation.navigate('Detail', {
                  data: item,
                });
              }}>
              <Item data={item} />
            </Pressable>
          )}
          keyExtractor={item => item.idMeal}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          style={{
            marginTop: 10,
          }}
          ListEmptyComponent={() => <Text>No data found</Text>}
        />
      </Box>
      <Box py={2} px={6}>
        <HStack justifyContent={'space-between'}>
          <Text fontSize={14} fontWeight={'bold'}>
            Sub Total
          </Text>
          <Text fontSize={14} fontWeight={'bold'}>
            $ {totals.subTotal}
          </Text>
        </HStack>

        <HStack justifyContent={'space-between'}>
          <Text fontSize={14} fontWeight={'bold'}>
            Est.Tax
          </Text>
          <Text fontSize={14} fontWeight={'bold'}>
            $ 2.00
          </Text>
        </HStack>

        <HStack justifyContent={'space-between'}>
          <Text fontSize={14} fontWeight={'bold'}>
            Delivery
          </Text>
          <Text fontSize={14} fontWeight={'bold'}>
            Free
          </Text>
        </HStack>
        <Box height={1} borderBottomWidth={1} />
        <HStack justifyContent={'space-between'}>
          <Text fontSize={14} fontWeight={'bold'}>
            Total
          </Text>
          <Text fontSize={14} fontWeight={'bold'}>
            ${totals.total}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}

export default Cart;
