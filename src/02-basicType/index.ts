/**
 * Basic Types
 * Reference: https://www.typescriptlang.org/docs/handbook/basic-types.html
 */


/******************************
 * Title: 1. Boolean
 * Desc: true / false
 *****************************/
let isDone: boolean = false;



/******************************
 * Title: 2. Number
 * Desc: 자바스크립트에서와 같이 TypeScript의 모든 숫자는 부동 소수점 값 또는 BigIntegers이다.
 *     : 부동 소수점의 타입은 number이다.
 *     : 반면 BigIntegers의 타입은 bigint이다.
 *****************************/
let decimal: number = 6;
let hex    : number = 0xf00d;
let binary : number = 0b1010;
let octal  : number = 0o744;
let big    : bigint = 100n;



/******************************
 * Title: 3. String
 * Desc: 문자
 *****************************/
let color: string = 'blue';
color = "red";

// MORE: template string도 사용가능하다.
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;


/******************************
 * Title: 4. Array
 * Desc: 배열
 *****************************/
let list1: number[] = [1, 2, 3]; // WAY1
let list2: Array<number> = [1, 2, 3]; // WAY2



/******************************
 * Title: 5. Tuple 
 * Desc: '고정된' 길이와 타입을 갖는 배열.
 *****************************/
let x: [string, number]; // 선언
x = ["hello", 10];
x = [10, "hello"] // FAIL

// MORE: 각 배열의 요소는 Tuple에서 정의된 타입을 갖는다.
console.log(x[0].substring(1));
console.log(x[1].substring(1)); // FAIL

// MORE: 유효하지 않은 인덱스로 접근하면 에러가 발생한다.
x[3] = 'world'; // FAIL
console.log(x[5].toString()); // FAIL



/******************************
 * Title: 6. Enum
 * Desc: 숫자 값들에 이름을 주어 사용하기 편리하도록 도와주는 자료형이다.
 *****************************/
enum Color1 {
    Red,
    Green,
    Blue,
}

let c: Color1 = Color1.Green;

// MORE: 기본적으로 열거형은 0부터 시작하지만, 명시적으로 값을 지정할 수도 있다.
enum Color2 {
    Red = 1,
    Green,
    Blue
}

// MORE: 열거형의 각각의 값들을 수동으로 지정할 수도 있다.
enum Color3 {
    Red = 1,
    Green = 2,
    Blue = 4,
}

// MORE: 열거형의 순번을 통해서도 값에 접근할 수 있지만, 
//       앞선 Color3와 같은 경우로 인해 값이 무엇인지 직접 확인해야 하는 경우도 있다.
let colorName: string = Color1[2];
console.log(colorName) // === Green



/******************************
 * Title: 7. Unknown
 * Desc: 어플리케이션을 작성할 때 확실히 정할 수 없는 타입이 필요할 수도 있다.
 *       예를 들어 사용자에게서 다양한 값을 받는 경우가 그렇다.
 *       이런 경우 unkown 타입을 통해서 컴파일러나 다른 개발자에게 해당 변수의 타입은 무엇이든 될 수 있다고 명시할 수 있다. 
 *****************************/
let notSure: unknown = 4;
notSure = "maybe a string instead";
notSure = false;

// MORE: unknown 타입은 "typeof", "비교"를 통해서 타입을 좁힐 수 있다.
declare const maybe: unknown;
const aNumber: number = maybe;

if (maybe === true) { // WAY1 비교
    // 타입스크립트는 이제 maybe를 불린 타입으로 인식한다.
    const aBoolean: boolean = maybe;
    const aString: string = maybe; // FAIL
}

if (typeof maybe === 'string') { // WAY2 typeof
    // 타입스크립트는 이제 maybe를 문자 타입으로 인식한다.
    const aString: string = maybe;
    const aBoolean: boolean = maybe; // FAIL
}



/******************************
 * Title: 8. Any
 * Desc: 제 3자가 만든 코드를 사용할 때 타입스크립트로 작성되지 않았거나
 *       부적절한 타입이 사용되는 경우가 있다. 
 *       이런 경우 타입을 확인하지 않는 방법으로 any를 사용한다.
 *****************************/
declare function getValue(key: string): any;
const str: string = getValue("myString");

// MORE: unknown과의 차이점은 임의의 속성이나 존재하지 않는 속성에도 접근할 수 있다는 것이다.
//       이는 함수도 마찬가지 이며, 타입스크립트는 함수의 존재여부나 타입을 확인하지 않는다.
let looselyTyped1: any = 4;
looselyTyped1.ifItExists();
looselyTyped1.toFixed();

let stritlyTyped1: unknown = 4;
stritlyTyped1.toFixed(); // FAIL

// MORE: any타입은 해당 개체의 하위 속성에도 전파되어 적용된다.
let looselyTyped2: any = {};
let d = looselyTyped2.a.b.c.d; // === let d: any



/******************************
 * Title: 9. Void
 * Desc: 어떠한 타입도 갖지 않는 상태를 나타낸다.
 *       어떻게 보면 any 타입의 반대라고 볼 수도 있다.
 *       보통 값을 리턴하지 않는 함수의 리턴 타입으로 사용된다.
 *****************************/
function warnUser(): void {
    console.log("This is my warning message");
}

// MORE: void는 undefined 또는 null 값만을 할당할 수 있기 때문에 변수의 타입으로 선언하는 것은 의미가 없다.
let unusable: void = undefined;
unusable = null;



/******************************
 * Title: 10. Null and Undefined
 * Desc: 타입스크립트에 null과 undefined는 각각의 타입을 갖는다.
 *       void와 같이 이것들 그 자체로는 큰 의미가 없다.
 *****************************/
let u: undefined = undefined;
let n: null = null;

// MORE: 기본적으로 null과 undefined는 다른 모든 타입의 서브타입이다.
//       즉 다른 모든 타입에 할당할 수 있다는 의미이다.
//       그러나 `--strictNullChecks` 플래그를 사용할 경우에는
//       오직 그들 각각의 타입, unknown, any타입에만 할당할 수 있다.
//       (한가지 예외적으로 undefined는 void에 할당 할 수 있다.)
//       만약 string 또는 null 또는 undefined 타입을 패스하고 싶다면 Union을 사용한다.
//       string | null | undefined

// MORE: 추가적으로 `--strictNullChecks` 플래그는 기본적으로 사용하는 것을 권장한다.



/******************************
 * Title: 11. Never
 * Desc: 결코 발생하지 않는 값의 타입을 나타낸다. 예를 들면 다음과 같다.
 *       함수, 화살표 함수 표현식을 반환에 대한 리턴 타입,
 *       또는 항상 에러를 발생시키는 유형의 함수가 있다면 해당 함수의 반환 값은 never를 사용할 수 있다.
 *       never 타입은 모든 타입의 서브 타입이기 때문에 할당도 가능하다.
 *       반면 never 타입은 서브 타입을 갖지 않으며 (never 자신은 제외) 할당도 할 수 없다.
 *****************************/
function error(message: string): never {
    throw new Error(message);
}

function fail() {
    return error("something failed");
}

// 엔드 포인트가 없는 함수의 리턴 타입
function infiniteLoop(): never {
    while (true) {}
}



/******************************
 * Title: 12. Object
 * Desc: 원시 타입이 아닌 타입을 나타낸다.
 *****************************/
declare function create(o: object | null): void;

create({ prop: 0 });
create(null);

create(12) // FAIL
create('string') // FAIL
create(false) // FAIL
//create(undefined) // FAIL???



/******************************
 * Title: 13. Type assertions
 * Desc: 개발자가 타입스크립트보다 해당 타입에 대해서 구체적으로 인지하고 있을 때
 *       타입스크립트에게 해당 타입에 대해서 알려주는 방법이다.
 *****************************/
let someValue: any = "this is a string";

// WAY1: as 
let strLength1: number = (someValue as string).length;

// WAY2: angle-bracket
let strLength2: number = (<string>someValue).length; 

// MORE: 1번과 2번 방식은 동일한 방식이지만 JSX에서 타입스크립트를 사용할 때는 2번 방식을 사용해야한다.

/**
 * 원시 타입을 지칭하는데 Number, String, Boolean, Symbol, Object와 같이 대문자 타입을 사용하는 것은 추천하지 않는다.
 * 위의 대문자 타입은 원시타입을 지칭하지 않으며 반드시 소문자 원시타입을 사용해야 한다.
 */

// 추천 X
function reverse1(s: String): String {
    return s.split("").reverse().join("");
}

// 추천 O
function reverse2(s: string): string {
    return s.split("").reverse().join("");
}