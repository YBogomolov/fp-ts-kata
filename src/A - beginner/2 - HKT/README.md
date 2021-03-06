# Типы высшего порядка (higher-order types, HKT)

Они же роды (kinds), они же метатипы. Род представляет собой тип типов, или метатип — аналогично тому, как множество значений формирует тип, — множество типов формирует род. Детально о родах можно почитать [в вики](https://ru.wikipedia.org/wiki/Род_(теория_типов)).

Для того, чтобы описать род в TypeScript, необходима возможность в языке указать, что параметр дженерик-интерфейса или класса сам является дженериком. К сожалению, в TS такой возможности нет. Мы не можем выразить что-то подобное:

```ts
interface Functor<F> {
  // Ошибка TS2315: Type 'F' is not generic.
  map: <A, B>(f: (a: A) => B) => (fa: F<A>) => F<B>;
}
```

В `fp-ts` для описания типов высшего порядка используются наработки из статьи [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf), а также механизм [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) из TypeScript. Для этого используется тип `Kind<F, A>`.

## Нотация

Когда вы видите запись `Kind<F, A>`, то ее следует воспринимать как способ записил выражения `F<A>` для не-полиморфного `F`.
Выдержка из документации `fp-ts`:

> Тип `Kind<F, A>` внутри себя использует словарь `URItoKind`, так что он способен проектировать абстрактный тип данных на конкретный тип данных. Так что если `URI = 'Identity'`, то `Kind<URI, number>` это `Identity<number>`.

Детальное описание шагов, которые необходимо предпринять, доступно [в документации fp-ts](https://gcanti.github.io/fp-ts/recipes/HKT.html).

# Контейнер Result

В этой ката мы познакомимся с другим типом контейнера, который выражает идею вычислений, которые могут упасть с ошибкой или вернуть результат:

```ts
// Определение типа:
type Failure<E> = Readonly<{ tag: 'Failure', error: E }>;
type Success<A> = Readonly<{ tag: 'Success'; value: A }>;
export type Result<E, A> = Failure<E> | Success<A>;
// Конструкторы:
export const failure = <E, A>(error: E): Result<E, A> => ({ tag: 'Failure', error });
export const success = <E, A>(value: A): Result<E, A> => ({ tag: 'Success', value });
```

## Бифунктор (Bifunctor)

Когда у нас есть тип с двумя параметрами, как `Result<E, A>`, то мы можем реализовать для него экземпляр тайпкласса «бифунктор». Этот тайпкласс определяет две операции: `mapLeft`, которая позволяет выполнить функториальный `map` для левой (ошибочной) части контейнера, а также `bimap`, которая выполняет *одновременный* маппинг одной из двух функций `f` и `g`, в зависимости от состояния контейнера:

```ts
interface Bifunctor<E, A> {
  mapLeft: <R>(f: (e: E) => R) => (fea: Result<E, A>) => Result<R, A>;
  bimap: <R, B>(f: (e: E) => R, g: (a: A) => B) => (fea: Result<E, A>) => Result<R, B>;
}
```

Законы бифунктора аналогичны законам функтора, только с поправкой на то, что `bimap` должна соблюдать композицию для обоих своих аргументов.

Хорошее описание бифунктора с наглядными диаграммами поведения `bimap` приведено [у Марка Симана (на английском)](https://blog.ploeh.dk/2018/12/24/bifunctors/).

# Задание

В этой ката вам необходимо реализовать функтор, монаду, аппликатив, альт (Alt) и бифунктор в виде HKT для контейнера Result.

> Подумайте, почему мы не можем написать экземпляр тайпкласса Alternative, но можем написать экземпляр тайпкласса Alt, который определяет только метод `alt`, но не определяет метод `zero`.
>> Важный урок: под реализацией тайпкласса подразумевается *однозначная* и *единственная* реализация. Если мы можем реализовать метод из тайпкласса несколькими способами, это означает либо специализацию контейнера (например, в случае с Validation — специализированной реализацией Either, являющейся *лево*ассоциативной), либо невозможность реализации этого тайпкласса в принципе.

# Выводы

В этой ката вы познакомились с понятием рода типов, а также способом их представления в TypeScript. Вы можете сделать следующие выводы:
1. Записи `Kind<F, A>` эквивалентны записи `F<A>`, но не требуют, чтобы `F` был дженериком в текущем контексте.
2. При помощи типа `Kind` можно представлять также типы с арностью больше 1. Чему эквивалентна запись `Kind2<F, L, A>`? А запись `Kind3<F, U, L, A>`?
3. Бифунктор позволяет одновременно преобразовывать контейнеры типа «А или Б», экономя ресурсы на последовательных вызовах `.map().mapLeft`.
4. Не все тайпклассы могут быть реализованы для разных контейнеров.
