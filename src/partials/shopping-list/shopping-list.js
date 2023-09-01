const dog = {
  name: 'Mango',
  age: 3,
  isHappy: true,
};

const dogJSON = JSON.stringify(dog);
console.log(dogJSON);

const js = dogJSON

const dogName = JSON.parse(js)
console.log(dogName)