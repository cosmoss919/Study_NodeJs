const _ = require('lodash');

// chain
// 1. chain 함수로 users 배열을 체이닝으로 감싸기
// 2. sorBy 함수로 사용자들을 나이순으로 정렬
// 3. map 함수로 각 사용자의 이름과 나이를 문자열로 변환
// 4. value 함수로 체이닝 연산을 종료하고 최종 결과를 반환함

// !!! 주의 사항 chain은 반드시 마지막에 value()를 호출해야 실제 곗나이 이루어지고 결과가 반환됨

const users = [
    { 'user': 'barney', 'age': 36 },
    { 'user': 'fred',   'age': 40 },
    { 'user': 'pebbles', 'age': 1 }
];

const result = _
    .chain(users)
    .sortBy('age')
    .map(o => {
        return o.user + ' is ' + o.age;
    })
    .value();

console.log(result);


