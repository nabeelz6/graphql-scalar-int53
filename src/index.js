import { GraphQLScalarType } from 'graphql';
//import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

const MAX_INT53 = Number.MAX_SAFE_INTEGER;
const MIN_INT53 = Number.MIN_SAFE_INTEGER;

function coerceInt(value) {
    if (value === '') {
        throw new TypeError(
            'Int53 cannot represent non 53-bit signed integer value: (empty string)',
        );
    }
    const num = Number(value);
    if (num !== num || num > MAX_INT53 || num < MIN_INT53) {
        throw new TypeError(
            'Int53 cannot represent non 53-bit signed integer value: ' + String(value),
        );
    }
    const int = Math.floor(num);
    if (int !== num) {
        throw new TypeError(
            'Int53 cannot represent non-integer value: ' + String(value),
        );
    }
    return int;
}

export default new GraphQLScalarType({
    name: 'Int53',
    description:
        'The `Int53` scalar type represents non-fractional signed whole numeric ' +
        'values. Int53 can represent values between -(2^53) - 1 and 2^53 - 1. ',
    serialize: coerceInt,
    parseValue: coerceInt,
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            const num = parseInt(ast.value, 10);
            if (num <= MAX_INT53 && num >= MIN_INT53) {
                return num;
            }
        }
        return undefined;
    },
});
