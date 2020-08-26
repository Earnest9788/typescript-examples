/**
 * Interfaces
 * Reference: https://www.typescriptlang.org/docs/handbook/interfaces.html
 */

/**
 * 타입스크립트의 핵심 원칙 중 하나는 대상의 형태를 중심으로 타입을 체크한다는 것이다.
 * 이러한 특성을 'duck typing' 또는 'structural subtyping'이라고 부른다.
 * 타입스크립트에서 인터페이스는 이러한 '형태'를 정의하는 역할을 수행한다.
 * 인터페이스는 당신의 코드를 정의하는 역할을 하는 동시에 프로젝트 외부에서도 같은 역할을 한다.
 */

/******************************
 * Title: 1. Our First Interface
 * Desc: 기본적인 예제를 살펴본다.
 *****************************/

/**
 * 타입 체커는 printLabel1에 대한 호출을 체크한다. 
 * printLabel1 함수에 전달 되어야 하는 파라미터는 라벨 속성을 가져야하는 단일 객체인데
 * 실제로 전달된 객체의 형태를 보면 정확하게 타입이 일치하지는 않다.
 * 하지만 필요한 타입을 모두 지니고 있으므로 타입체킹을 통과 하게 된다.
 * (타입스크립트가 관대하지 않은 경우도 있으니 주의할것.)
 */ 
function printLabel1(labelObj: { label: string }) {
    console.log(labelObj.label);
}

let myObj1 = { 
    size: 10, 
    label: "Size 10 object" 
};
printLabel1(myObj1);

/**
 * 인터페이스를 통해서 파라미터의 요구사항을 정의할 수 있다. 
 * 다른 언어에서처럼(ex JAVA) 객체가 인터페이스를 구현한다고 명시적으로 코딩할 필요는 없다.
 * 중요한 것은 그 형태일 뿐이며 객체가 인터페이스의 요구 조건을 충족시키기만하면 된다.
 * 또한 속성의 순서는 중요하지 않으며 오로지 필요한 속성이 있는지 없는지가 핵심이다.
 */
interface LabeledValue {
    label: string;
}

function printLabel2(labelObj: LabeledValue) {
    console.log(labelObj.label);
}

let myObj2 = { 
    size: 10, 
    label: "size 10 object"
}
printLabel2(myObj2);



/******************************
 * Title: 2. Optional Properties
 * Desc: 인터페이스의 속성을 옵션으로 만들 수 있다.
 *****************************/

/**
 * 인터페이스의 모든 속성이 반드시 필요한 것은 아니다.
 * 어떤 속성은 특정 조건 하에서 필요하거나 필요하지 않을 수도 있다.
 * 이렇게 선택적으로 사용되는 속성을 인터페이스에서도 표현할 수 있는데
 * 해당 속성에 물음표를 표시하면 된다.
 */
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare1(config: SquareConfig): { color: string, area: number } {
    let newSquare = { color: "whire", area: 100 };

    if (config.color) {
        newSquare.color = config.color;
    }

    if (config.width) {
        newSquare.area = config.width;
    }

    return newSquare;
}

let mySquare = createSquare1({ color: "black" });

// NOTE: 이러한 선택적 속성의 장점은 인터페이스에 정의되지 않은 속성의 사용을 방지하면서
//       어떠한 속성이 사용가능하진 표현할 수 있다는 것이다.
function createSquare2(config: SquareConfig): { color: string, area: number } {
    let newSquare = { color: "white", area: 100 };
    
    if (config.clor) { // 존재 하지 않은 속성을 사용한다면 에러가 발생한다.
        // ...
    }

    if (config.width) {
        // ...
    }

    return newSquare;
}



/******************************
 * Title: 3. Readonly properties
 * Desc: 읽기 전용 속성을 만들 수 있다.
 *****************************/

/**
 * 어떤 속성들은 객체가 생성된 그 시점에서만 변경이 가능해야 하는 경우도 있다.
 * 인터페이스에서는 속성 앞에 readonly를 붙여서 이를 표현한다.
 * readonly가 붙은 속성은 재할당이 불가능해진다.
 */
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // FAIL

// MORE: 배열 전용 Readonly 속성은 다음 예제와 같이 정의한다. 
//       ReadonlyArray는 Array와 기본 기능은 동일하지만  
//       배열을 변경시킬 수 있는 메서드가 제거되어 있는 것이 차이점이다.
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

ro[0] = 12; // FAIL
ro.push(5); // FAIL
ro.length = 100 // FAIL
a = ro; //FAIL

// MORE: 앞선 예제에서 보이듯이 ReadonlyArray 속성은 일반 배열에조차 할당할 수 없다.
//       하지만 타입 어설션을 사용해서 오버라이드는 할 수 있다.
a = ro as number[];

/**
 * readonly vs const?
 * const와 readonly를 구분하는 가장 좋은 방법은 현재 변수를 다루고 있는지
 * 속성을 다루고 있는지 판단해보는 것이다.
 * 변수를 다루고 있다면 const를, 속성을 다루고 있다면 readonly를 사용하면 된다. 
 */



/******************************
 * Title: 4. Excess Property Checks
 * Desc: 초과 속성 오류를 우회하는 방법을 알아본다.
 *****************************/

/**
 * 'optional property'에서 살펴본 내용에 따르면 아래의 코드는 정상적으로 작동해야 한다.
 * 하지만 타입스크립트에서 '객체 리터럴'은 다른 변수에 할당하거나 인자로 전달될 때 특별하게 다뤄지며,
 * 과도한 타입 검사를 받는다. 아래의 예제에서는 대상이 되는 인터페이스에 colour라는 속성이 없기 때문에
 * 오류가 발생하게 된다.
 */
interface SomeConfig {
    color?: string;
    width?: number;
}

function createSomething(config: SomeConfig): { color: string; area: number } {
    return { color: config.color || 'red', area: config.width || 20 };
}

let something1 = createSomething({ colour: 'red', width: 100 }); // FAIl

/**
 * 이러한 문제를 피하는 가장 쉬운 방법은 type assertion을 사용하는 것이다.
 */
let something2 = createSomething({ width: 100, opacity: 0.5 } as SquareConfig);

/**
 * 하지만 객체가 추가적인 속성을 가질 수 있는 경우라면 문자열 인덱스 시그니쳐를 사용하는 것이 더 좋은 방법일 수 있다.
 * 아래의 예제에서 SquareConfig는 얼마든지 추가 속성을 가질 수 있으며, color, width 속성을 제외하면 어떤 타입이든 허용된다.
 */
interface SomeConfig2 {
    color?: string;
    width?: number;
    [propName: string]: any;
}

function createSomething2(config: SomeConfig2): { color: string; area: number } {
    return { color: config.color || 'red', area: config.width || 20 };
}

let something3 = createSomething2({ colour: 'red', width: 100 });

/**
 * 마지막 방법으로는 객체를 다른 변수에 할당하는 방법이 있다.
 * 다른 변수에 할당하여 전달한다면 객체 리터럴을 직접 전달한 것이 아니기 때문에
 * 엄격한 타입 검사를 피할 수 있다.
 */
let squareOptions = { colour: 'red' };
let something4 = createSomething2(squareOptions);

/**
 * 앞선 예제와 같이 간단한 코드의 경우에는 인터페이스를 직접 수정하는 것이 바람직한 방식이다.
 * 물론 복잡한 메서드와 속성을 갖고 있는 객체를 다룰 때는 위의 여러 우회 방식을 사용해야 할 수 도 있다.
 * 하지만 대부분의 경우 초과된 속성 확인 때문에 발생하는 오류는 실제로 버그인 경우가 많다.
 */



/******************************
 * Title: 5. Function Types
 * Desc: 인터페이스로 함수의 타입을 기술할 수 있다.
 *****************************/

/**
 * 인터페이스로 함수의 타입을 기술하기 위해서 콜 시그니처를 사용한다.
 * 콜 시그니쳐는 매개변수와 반환값의 타입 만을 기술한 함수 선언이다.
 * 물론 각 매개변수의 타입도 필요하다.
 */
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

/**
 * 파라미터의 타입만 정확하게 전달한다면 파라미터의 이름이 달라도 상관없다.
 */
let mySearch2: SearchFunc;

mySearch2 = function(src: string, sub: string) {
    let result = src.search(sub);
    return result > -1;
}

/**
 * 각 매개변수는 대응되는 인터페이스의 속성에 맞춰 한번에 하나씩 검사된다.
 * 파라미터의 타입을 지정하지 않는다고 하더라도 타입스크립트는 인터페이스를 참조하여 
 * 자동으로 해당 파라미터의 타입과 반환 타입을 추론할 수 있다. 
 */
let mySearch3: SearchFunc;

mySearch3 = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
}

/**
 * 다음의 예제에서는 인터페이스의 반환 타입과 실제 반환 값의 타입이 불일치하기 때문에
 * 에러가 발생한다.
 */
let mySearch4: SearchFunc;

mySearch4 = function (src, sub) {
    let result = src.search(sub);
    return "string"; // FAIL
}



/******************************
 * Title: 6. Indexable Types
 * Desc: 
 *****************************/
