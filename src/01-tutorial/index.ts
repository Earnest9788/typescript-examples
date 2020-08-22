/**
 * TypeScript for JavaScript Programmers
 * Reference: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
 */


/******************************
 * Title: 1. Types by Inference
 * Desc: 기본적인 자바스크립트의 타입은 타입스크립트가 추론을 통해서 붙여준다.
 *****************************/
let helloWorld = "Hello World"; // === let helloWorld: string


/******************************
 * Title: 2. Defining Types
 * Desc: 타입을 추론하기 어려운 경우(ex 사용자 정의 객체) 타입스크립트에게 명시적으로 타입을 알려줄 수 있다.
 *****************************/
interface User {
    name: string;
    id: number;
}
// => interface를 사용해서 객체의 형태를 기술할 수 있다.

const user1: User = {
    name: "Earnest",
    id: 0,
}
// => interface를 통해서 객체의 타입을 선언할 수 있다.

const user2: User = {
    name: 1, // (x)
    id: 1
}
// => 인터페이스와 일치하지 않는 객체를 사용하면 타입스크립트가 경고를 준다.

class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}

const user3: User = new UserAccount("Rick", 1);
// => 인터페이스는 클래스와도 함께 사용할 수 있다.

function getAdminUser(): User {
    // ...
    return "user"; // (x)
}
// => 인터페이스는 함수의 린턴 값을 정의할 수 있다.

function deleteUser(user: User) {
    // ...
}
// => 인터페이스는 함수의 파라미터 값을 정의할 수 있다.

/**
 * 자바스크립트는 boolean, bigint, null, number, string, symbol, object, undefined와 같은 원시타입을 제공한다.
 * 하지만 타입스크립트는 여기에 unknown, any, never, void 등의 타입을 추가로 제공한다.
 */

/******************************
 * Title: 3. Composing Types
 * Desc: 여러가지 타입들을 조합해서 보다 복잡한 타입을 구성할 수 있다.
 *****************************/

/**
 * Way1: Union
 * Desc: 여러가지 타입중 하나의 타입이 될 수 있는 타입.
 */
type MyBool = true | false;

type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
// => union을 통해서 특정 문자열이나 숫자집합을 타입으로 사용할 수 있다. 

const union1: WindowStates = "d"; // (x)
const union2: OddNumbersUnderTen = 2; // (x)

function getLength(obj: string | string[]) {
    if (typeof obj === 'string') {
        return [obj]; // === (parameter) obj: string
    } else {
        return obj;
    }
}
// => 서로 다른 타입도 사용 가능하며 이를 통해서 서로 다른 리턴 값을 줄 수도 있다.

/**
 * Way2: Generics
 * Desc: 타입을 변수의 형식으로 제공하여 외부에서 부여할 수 있도록 한다.
 */
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
// => 제네릭을 통해서 배열의 인자의 타입을 제한 할 수 있다.

interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

declare const backpack: Backpack<string>;
const object = backpack.get(); // 여기서 object의 타입은 string이다.
backpack.add(23); // (x)


/******************************
 * Title: 4. Structural Type System
 * Desc: 타입스크립트는 타입을 체크할 때 값의 형태(shape)를 기준으로 판단한다.
 *     : 이를 'structural typing' 또는 'duck typing'이라고 부른다.
 *     : 2개의 객체가 동일한 형태라면 그 둘은 같은 것으로 판단된다.
 *****************************/
interface Point {
    x: number;
    y: number;
}

function printPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

const point1 = { x: 12, y: 26 };
printPoint(point1);
// => point1은 Point타입으로 선언되지 않았지만 형태가 같기 때문에 같은 타입으로 판단된다.

const point2 = { x: 12, y: 26, z: 89 };
printPoint(point2);
// => SUCCESS (부분 집합의 형태로 일치한다면 같은 형태로 간준된다.)

const point3 = { x: 12, y: 26, width: 30, height: 80 };
printPoint(point3);
// => SUCCESS

const point4 = { hex: '#187ABF' };
printPoint(point4);
// => FAIL

class VirtualPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const newVPoint = new VirtualPoint(13, 57);
printPoint(newVPoint);
// => SUCCESS (클래스의 경우에도 객체와 마찬가지로 적용된다.)