import React, {useEffect} from 'react';

import {Button, Icon, Ionicons} from 'native-base';

function Category({data, onChange}) {
  return (
    <Button marginX={2} height={10} onPress={() => onChange(data.strCategory)}>
      {data.strCategory}
    </Button>
  );
}

export default Category;
