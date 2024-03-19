# Lodash 란?
- 편리하게 코드를 작성하고 웹표준에 효율적으로 맞출 수 있게 해주는 Node.js의 패키지
- 객체, 배열 등의 데이터 구조를 간편하게 함수형으로 다룰 수 있고, 쉽게 변환하고 값을 추출할 수 있어서 편리함
- 간결하게 코드를 작성할 수 있다. ex) array나 object를 반복문 돌며 처리해야할 것을 한줄로 표현 가능
💥 ES6와 비교했을때 몇몇 함수는 lodash 보다 ES6 함수가 더 빠름

# 자주 쓰는 함수(native와 비교)

### find (native > lodash)
- 컬렉션 중 조건에 만족하는 결과값의 첫번째 요소를 반환

``` javascript
var array = [
  { name: 'lim', age: 26 },
  { name: 'kim', age: 28 },
  { name: 'choi', age: 32 },
  { name: 'park', age: 21 },
]

// lodash
_.find(array, arr => arr.age < 28)

// native
array.find(arr => arr.age < 28)
```

<br/>

### filter (native > lodash)
- 특정 조건을 만족하는 모든 결과값 반환

``` javascript
const numbers = [10, 40, 230, 15, 18, 51, 1221]       

// lodash
_.filter(numbers, num => num % 3 === 0)

//native
numbers.filter(num => num % 3 === 0)
```

<br/>

### every (native > lodash)
- 배열의 모든 요소가 특정한 조건을 만족시키는지에 대해 boolean 값 반환

``` javascript
const elements = ["cat", "dog", "bat"]

_.every(elements, el => el.length === 3) 

elements.every(el => el.length === 3)
```

<br/>

### some (native > lodash)
- 배열의 요소 중 하나라도 조건에 만족하는지에 대해 boolean 값 반환

``` javascript
const elements = ["cat", "dog", "bat"]

_.some(elements, el => el.startsWith('c'))

elements.some(el => el.startsWith('c'))
```

<br/>

### includes (native > lodash)
- 컬렉션에 해당 요소가 존재하는지에 대해 boolean 값 반환

``` javascript
const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,97]

_.includes(primes, 47)

primes.includes(79)
```

<br/>

### forEach (native < lodash)
``` javascript
_.each([1, 2, 3], (value, index) => {
  console.log(value)
})

_.forEach({ 'a': 1, 'b': 2 }, (value, key) => {
  console.log(key);
});

[1, 2, 3].forEach((value, index) => {
  console.log(value)
})
```
- lodash의 each는 브라우저의 스펙에 따라 구현을 다르게 가져가기 때문에 더 빠르다
- foreach에 대해서는 둘이 비슷

<br/>

### uniq (native < lodash)
- 배열의 요소들 중에서 중복값을 제거한 결과를 반환

``` javascript
const elements = [1,2,3,1,2,4,2,3,5,3]

_.uniq(elements) //  [1,2,3,4,5]

[...new Set(elements)] //  [1,2,3,4,5]
```

<br/>

### compact (native < lodash)
- 배열에서 undefined 혹은 false 값을 제거하는데 사용

``` javascript
const array = ['a', undefined, 'b', 1, undefined, 2, 3, undefined, undefined]

_.compact(array);

array.filter(data => {
  return data !== undefined && data !== null
});

//or

array.filter(Boolean);
```

<br/>

⭐ [벤치마크](https://www.measurethat.net/)



