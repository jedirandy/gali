import * as C from '../src/container';
let Functor = C.Functor;
let Applicative = C.Applicative;
let Just = C.Just;
let Nothing = C.Nothing;
let id = a => a;
describe('Containers tests', () => {
    it('Functor laws', () => {
        let functor = new Functor(1);
        expect(
            functor.fmap(id).value
        ).to.equal(
            id(functor).value
        );

        let f = v => v * 2;
        let g = v => v + 3;
        expect(
            functor.fmap(v => f(g(v))).value
        ).to.equal(
            functor.fmap(v => g(v)).fmap(v => f(v)).value
        )
    });

    it('calling fmap on a function functor will compose the functions', () => {
        let functor = new Functor(a => a * 2);
        let f = functor.fmap(a => a + 5);
        expect(
            f(1)
        ).to.equal(7);
    });

    it('Maybe monad laws', () => {
        let f = v => Just(v * 3);
        let g = v => Just(v + 3);
        let x = 1;
        // left unit
        Just(x).bind(f) === f(x);
        expect(
            Just(x).bind(f).toString()
        ).to.equal(
            f(x).toString()
        );

        // right unit
        expect(
            Just(x).bind(Just).toString()
        ).to.equal(
            Just(x).toString()
        );

        // associativity
        expect(
            Just(x).bind(f).bind(g).toString()
        ).to.equal(
            Just(x).bind(y => f(x).bind(g)).toString()
        );
    });

    it('chaining maybe', () => {
        let f = a => Just(a * 2);
        expect(
            Just(2)
                .bind(f)
                .bind(a => Nothing)
                .bind(f)
        ).to.equal(
            Nothing
        );

        expect(
            Just(1)
                .bind(f)
                .bind(f)
                .value
        ).to.equal(4);
    });

    it('ap of an Applicative takes a function and applies to a value', () => {
        let concat = new Applicative((a, b) => a + b);
        expect(
            concat
                .ap(new Applicative('a'))
                .ap(new Applicative('b')).value
        ).to.equal('ab');
    });

    it('Maybe should be an applicative, it can wrap a function and use liftA', () => {
        expect(
            Just(a => a + 1)
            .ap(Just(2))
            .value
        ).to.equal(3);
    });
});