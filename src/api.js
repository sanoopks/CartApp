const BaseUrl = 'https://www.themealdb.com/api/json/v1/1/';

const get = async url => {
  const response = await fetch(BaseUrl + url);
  const data = await response.json();
  return data;
};

export {get};
