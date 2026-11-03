var __defProp = Object.defineProperty;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/index.js
var exports_core2 = {};
__export(exports_core2, {
  $ZodAny: () => $ZodAny,
  $ZodArray: () => $ZodArray,
  $ZodAsyncError: () => $ZodAsyncError,
  $ZodBase64: () => $ZodBase64,
  $ZodBase64URL: () => $ZodBase64URL,
  $ZodBigInt: () => $ZodBigInt,
  $ZodBigIntFormat: () => $ZodBigIntFormat,
  $ZodBoolean: () => $ZodBoolean,
  $ZodCIDRv4: () => $ZodCIDRv4,
  $ZodCIDRv6: () => $ZodCIDRv6,
  $ZodCUID: () => $ZodCUID,
  $ZodCUID2: () => $ZodCUID2,
  $ZodCatch: () => $ZodCatch,
  $ZodCheck: () => $ZodCheck,
  $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
  $ZodCheckEndsWith: () => $ZodCheckEndsWith,
  $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
  $ZodCheckIncludes: () => $ZodCheckIncludes,
  $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
  $ZodCheckLessThan: () => $ZodCheckLessThan,
  $ZodCheckLowerCase: () => $ZodCheckLowerCase,
  $ZodCheckMaxLength: () => $ZodCheckMaxLength,
  $ZodCheckMaxSize: () => $ZodCheckMaxSize,
  $ZodCheckMimeType: () => $ZodCheckMimeType,
  $ZodCheckMinLength: () => $ZodCheckMinLength,
  $ZodCheckMinSize: () => $ZodCheckMinSize,
  $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
  $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
  $ZodCheckOverwrite: () => $ZodCheckOverwrite,
  $ZodCheckProperties: () => $ZodCheckProperties,
  $ZodCheckProperty: () => $ZodCheckProperty,
  $ZodCheckRegex: () => $ZodCheckRegex,
  $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
  $ZodCheckStartsWith: () => $ZodCheckStartsWith,
  $ZodCheckStringFormat: () => $ZodCheckStringFormat,
  $ZodCheckUpperCase: () => $ZodCheckUpperCase,
  $ZodCodec: () => $ZodCodec,
  $ZodCreditCard: () => $ZodCreditCard,
  $ZodCustom: () => $ZodCustom,
  $ZodCustomStringFormat: () => $ZodCustomStringFormat,
  $ZodCyclicError: () => $ZodCyclicError,
  $ZodDate: () => $ZodDate,
  $ZodDefault: () => $ZodDefault,
  $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
  $ZodE164: () => $ZodE164,
  $ZodEmail: () => $ZodEmail,
  $ZodEmoji: () => $ZodEmoji,
  $ZodEncodeError: () => $ZodEncodeError,
  $ZodEnum: () => $ZodEnum,
  $ZodError: () => $ZodError,
  $ZodExactOptional: () => $ZodExactOptional,
  $ZodFile: () => $ZodFile,
  $ZodFunction: () => $ZodFunction,
  $ZodGUID: () => $ZodGUID,
  $ZodIBAN: () => $ZodIBAN,
  $ZodIPv4: () => $ZodIPv4,
  $ZodIPv6: () => $ZodIPv6,
  $ZodISODate: () => $ZodISODate,
  $ZodISODateTime: () => $ZodISODateTime,
  $ZodISODuration: () => $ZodISODuration,
  $ZodISOTime: () => $ZodISOTime,
  $ZodIntersection: () => $ZodIntersection,
  $ZodJWT: () => $ZodJWT,
  $ZodKSUID: () => $ZodKSUID,
  $ZodLazy: () => $ZodLazy,
  $ZodLiteral: () => $ZodLiteral,
  $ZodMAC: () => $ZodMAC,
  $ZodMap: () => $ZodMap,
  $ZodNaN: () => $ZodNaN,
  $ZodNanoID: () => $ZodNanoID,
  $ZodNever: () => $ZodNever,
  $ZodNonOptional: () => $ZodNonOptional,
  $ZodNull: () => $ZodNull,
  $ZodNullable: () => $ZodNullable,
  $ZodNumber: () => $ZodNumber,
  $ZodNumberFormat: () => $ZodNumberFormat,
  $ZodObject: () => $ZodObject,
  $ZodObjectJIT: () => $ZodObjectJIT,
  $ZodOptional: () => $ZodOptional,
  $ZodPipe: () => $ZodPipe,
  $ZodPrefault: () => $ZodPrefault,
  $ZodPreprocess: () => $ZodPreprocess,
  $ZodPromise: () => $ZodPromise,
  $ZodReadonly: () => $ZodReadonly,
  $ZodRealError: () => $ZodRealError,
  $ZodRecord: () => $ZodRecord,
  $ZodRegistry: () => $ZodRegistry,
  $ZodSet: () => $ZodSet,
  $ZodString: () => $ZodString,
  $ZodStringFormat: () => $ZodStringFormat,
  $ZodSuccess: () => $ZodSuccess,
  $ZodSymbol: () => $ZodSymbol,
  $ZodTemplateLiteral: () => $ZodTemplateLiteral,
  $ZodTransform: () => $ZodTransform,
  $ZodTuple: () => $ZodTuple,
  $ZodType: () => $ZodType,
  $ZodULID: () => $ZodULID,
  $ZodURL: () => $ZodURL,
  $ZodUUID: () => $ZodUUID,
  $ZodUndefined: () => $ZodUndefined,
  $ZodUnion: () => $ZodUnion,
  $ZodUnknown: () => $ZodUnknown,
  $ZodVoid: () => $ZodVoid,
  $ZodXID: () => $ZodXID,
  $ZodXor: () => $ZodXor,
  $brand: () => $brand,
  $constructor: () => $constructor,
  $input: () => $input,
  $output: () => $output,
  Doc: () => Doc,
  INVALID: () => INVALID,
  JSONSchema: () => exports_json_schema,
  JSONSchemaGenerator: () => JSONSchemaGenerator,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  URL_BAD_FORMAT: () => URL_BAD_FORMAT,
  URL_UNPARSEABLE: () => URL_UNPARSEABLE,
  ZodCompileAsyncError: () => ZodCompileAsyncError,
  ZodCompileUnsupportedError: () => ZodCompileUnsupportedError,
  _any: () => _any,
  _array: () => _array,
  _base64: () => _base64,
  _base64url: () => _base64url,
  _bigint: () => _bigint,
  _boolean: () => _boolean,
  _catch: () => _catch,
  _check: () => _check,
  _cidrv4: () => _cidrv4,
  _cidrv6: () => _cidrv6,
  _coercedBigint: () => _coercedBigint,
  _coercedBoolean: () => _coercedBoolean,
  _coercedDate: () => _coercedDate,
  _coercedNumber: () => _coercedNumber,
  _coercedString: () => _coercedString,
  _creditCard: () => _creditCard,
  _cuid: () => _cuid,
  _cuid2: () => _cuid2,
  _custom: () => _custom,
  _date: () => _date,
  _decode: () => _decode,
  _decodeAsync: () => _decodeAsync,
  _default: () => _default,
  _discriminatedUnion: () => _discriminatedUnion,
  _e164: () => _e164,
  _email: () => _email,
  _emoji: () => _emoji2,
  _encode: () => _encode,
  _encodeAsync: () => _encodeAsync,
  _endsWith: () => _endsWith,
  _enum: () => _enum,
  _file: () => _file,
  _float32: () => _float32,
  _float64: () => _float64,
  _gt: () => _gt,
  _gte: () => _gte,
  _guid: () => _guid,
  _iban: () => _iban,
  _includes: () => _includes,
  _int: () => _int,
  _int32: () => _int32,
  _int64: () => _int64,
  _intersection: () => _intersection,
  _ipv4: () => _ipv4,
  _ipv6: () => _ipv6,
  _isoDate: () => _isoDate,
  _isoDateTime: () => _isoDateTime,
  _isoDuration: () => _isoDuration,
  _isoTime: () => _isoTime,
  _jwt: () => _jwt,
  _ksuid: () => _ksuid,
  _lazy: () => _lazy,
  _length: () => _length,
  _literal: () => _literal,
  _lowercase: () => _lowercase,
  _lt: () => _lt,
  _lte: () => _lte,
  _mac: () => _mac,
  _map: () => _map,
  _max: () => _lte,
  _maxLength: () => _maxLength,
  _maxSize: () => _maxSize,
  _mime: () => _mime,
  _min: () => _gte,
  _minLength: () => _minLength,
  _minSize: () => _minSize,
  _multipleOf: () => _multipleOf,
  _nan: () => _nan,
  _nanoid: () => _nanoid,
  _nativeEnum: () => _nativeEnum,
  _negative: () => _negative,
  _never: () => _never,
  _nonnegative: () => _nonnegative,
  _nonoptional: () => _nonoptional,
  _nonpositive: () => _nonpositive,
  _normalize: () => _normalize,
  _null: () => _null2,
  _nullable: () => _nullable,
  _number: () => _number,
  _optional: () => _optional,
  _overwrite: () => _overwrite,
  _parse: () => _parse,
  _parseAsync: () => _parseAsync,
  _pipe: () => _pipe,
  _positive: () => _positive,
  _promise: () => _promise,
  _properties: () => _properties,
  _property: () => _property,
  _readonly: () => _readonly,
  _record: () => _record,
  _refine: () => _refine,
  _regex: () => _regex,
  _safeDecode: () => _safeDecode,
  _safeDecodeAsync: () => _safeDecodeAsync,
  _safeEncode: () => _safeEncode,
  _safeEncodeAsync: () => _safeEncodeAsync,
  _safeParse: () => _safeParse,
  _safeParseAsync: () => _safeParseAsync,
  _set: () => _set,
  _size: () => _size,
  _slugify: () => _slugify,
  _startsWith: () => _startsWith,
  _string: () => _string,
  _stringFormat: () => _stringFormat,
  _stringbool: () => _stringbool,
  _success: () => _success,
  _superRefine: () => _superRefine,
  _symbol: () => _symbol,
  _templateLiteral: () => _templateLiteral,
  _toLowerCase: () => _toLowerCase,
  _toUpperCase: () => _toUpperCase,
  _transform: () => _transform,
  _trim: () => _trim,
  _tuple: () => _tuple,
  _uint32: () => _uint32,
  _uint64: () => _uint64,
  _ulid: () => _ulid,
  _undefined: () => _undefined2,
  _union: () => _union,
  _unknown: () => _unknown,
  _uppercase: () => _uppercase,
  _url: () => _url,
  _uuid: () => _uuid,
  _uuidv4: () => _uuidv4,
  _uuidv6: () => _uuidv6,
  _uuidv7: () => _uuidv7,
  _void: () => _void,
  _xid: () => _xid,
  _xor: () => _xor,
  base64Charset: () => base64Charset,
  base64urlCharset: () => base64urlCharset,
  canParseURL: () => canParseURL,
  clone: () => clone,
  compile: () => compile,
  compileFn: () => compileFn,
  config: () => config,
  createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
  createToJSONSchemaMethod: () => createToJSONSchemaMethod,
  decode: () => decode,
  decodeAsync: () => decodeAsync,
  describe: () => describe,
  encode: () => encode,
  encodeAsync: () => encodeAsync,
  extractDefs: () => extractDefs,
  finalize: () => finalize,
  flattenError: () => flattenError,
  formatError: () => formatError,
  getDiscriminatedOption: () => getDiscriminatedOption,
  globalConfig: () => globalConfig,
  globalRegistry: () => globalRegistry,
  handleUnrepresentable: () => handleUnrepresentable,
  initializeContext: () => initializeContext,
  isBackEdge: () => isBackEdge,
  isRecursiveSchema: () => isRecursiveSchema,
  isValidBase64: () => isValidBase64,
  isValidBase64URL: () => isValidBase64URL,
  isValidCIDRv6: () => isValidCIDRv6,
  isValidCreditCard: () => isValidCreditCard,
  isValidIBAN: () => isValidIBAN,
  isValidIPv6: () => isValidIPv6,
  isValidJWT: () => isValidJWT,
  locales: () => exports_locales,
  memoizer: () => memoizer,
  mergeValues: () => mergeValues,
  meta: () => meta,
  parse: () => parse,
  parseAsync: () => parseAsync,
  parseURLObject: () => parseURLObject,
  prettifyError: () => prettifyError,
  process: () => processSchema,
  processSchema: () => processSchema,
  regexes: () => exports_regexes,
  registry: () => registry,
  safeDecode: () => safeDecode,
  safeDecodeAsync: () => safeDecodeAsync,
  safeEncode: () => safeEncode,
  safeEncodeAsync: () => safeEncodeAsync,
  safeParse: () => safeParse,
  safeParseAsync: () => safeParseAsync,
  standardProps: () => standardProps,
  stripTabAndNewline: () => stripTabAndNewline,
  toDotPath: () => toDotPath,
  toJSONSchema: () => toJSONSchema,
  toZod: () => toZod,
  treeifyError: () => treeifyError,
  urlHostnameOk: () => urlHostnameOk,
  urlProtocolOk: () => urlProtocolOk,
  util: () => exports_util,
  validate: () => validate,
  validateAsync: () => validateAsync,
  validateURL: () => validateURL,
  version: () => version,
  withParser: () => withParser
});

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/util.js
var exports_util = {};
__export(exports_util, {
  BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
  CONSTANT_CATCH: () => CONSTANT_CATCH,
  Class: () => Class,
  NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
  aborted: () => aborted,
  allowsEval: () => allowsEval,
  assert: () => assert,
  assertEqual: () => assertEqual,
  assertIs: () => assertIs,
  assertNever: () => assertNever,
  assertNotEqual: () => assertNotEqual,
  assignProp: () => assignProp,
  attachSchema: () => attachSchema,
  base64ToUint8Array: () => base64ToUint8Array,
  base64urlToUint8Array: () => base64urlToUint8Array,
  cached: () => cached,
  captureStackTrace: () => captureStackTrace,
  cleanEnum: () => cleanEnum,
  cleanRegex: () => cleanRegex,
  clone: () => clone,
  cloneDef: () => cloneDef,
  codePointLength: () => codePointLength,
  constantCatch: () => constantCatch,
  createTransparentProxy: () => createTransparentProxy,
  defineLazy: () => defineLazy,
  defineLazyInternal: () => defineLazyInternal,
  derived: () => derived,
  esc: () => esc,
  escapeRegex: () => escapeRegex,
  explicitlyAborted: () => explicitlyAborted,
  extend: () => extend,
  finalizeIssue: () => finalizeIssue,
  floatSafeRemainder: () => floatSafeRemainder,
  getElementAtPath: () => getElementAtPath,
  getEnumValues: () => getEnumValues,
  getLengthableOrigin: () => getLengthableOrigin,
  getParsedType: () => getParsedType,
  getSizableOrigin: () => getSizableOrigin,
  hexToUint8Array: () => hexToUint8Array,
  hide: () => hide,
  installLazyProp: () => installLazyProp,
  isObject: () => isObject,
  isPlainObject: () => isPlainObject,
  issue: () => issue,
  joinValues: () => joinValues,
  jsonStringifyReplacer: () => jsonStringifyReplacer,
  members: () => members,
  merge: () => merge,
  mergeDefs: () => mergeDefs,
  normalizeParams: () => normalizeParams,
  nullish: () => nullish,
  numKeys: () => numKeys,
  objectClone: () => objectClone,
  omit: () => omit,
  optionalKeys: () => optionalKeys,
  own: () => own,
  parsedType: () => parsedType,
  partial: () => partial,
  pick: () => pick,
  prefixIssues: () => prefixIssues,
  primitiveTypes: () => primitiveTypes,
  promiseAllObject: () => promiseAllObject,
  propertyKeyTypes: () => propertyKeyTypes,
  randomString: () => randomString,
  rawShape: () => rawShape,
  required: () => required,
  safeExtend: () => safeExtend,
  shallowClone: () => shallowClone,
  slugify: () => slugify,
  stringifyPrimitive: () => stringifyPrimitive,
  toZod: () => toZod,
  uint8ArrayToBase64: () => uint8ArrayToBase64,
  uint8ArrayToBase64url: () => uint8ArrayToBase64url,
  uint8ArrayToHex: () => uint8ArrayToHex,
  unwrapMessage: () => unwrapMessage
});

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/regexes.js
var exports_regexes = {};
__export(exports_regexes, {
  anyString: () => anyString,
  base64: () => base64,
  base64url: () => base64url,
  bigint: () => bigint,
  boolean: () => boolean,
  browserEmail: () => browserEmail,
  cidrv4: () => cidrv4,
  cidrv6: () => cidrv6,
  creditCard: () => creditCard,
  cuid: () => cuid,
  cuid2: () => cuid2,
  currencyCode: () => currencyCode,
  date: () => date,
  datetime: () => datetime,
  domain: () => domain,
  duration: () => duration,
  e164: () => e164,
  email: () => email,
  emoji: () => emoji,
  extendedDuration: () => extendedDuration,
  guid: () => guid,
  hex: () => hex,
  hostname: () => hostname,
  html5Email: () => html5Email,
  httpProtocol: () => httpProtocol,
  iban: () => iban,
  idnEmail: () => idnEmail,
  integer: () => integer,
  ipv4: () => ipv4,
  ipv6: () => ipv6,
  ksuid: () => ksuid,
  lowercase: () => lowercase,
  mac: () => mac,
  md5_base64: () => md5_base64,
  md5_base64url: () => md5_base64url,
  md5_hex: () => md5_hex,
  nanoid: () => nanoid,
  nanoidOfLength: () => nanoidOfLength,
  null: () => _null,
  number: () => number,
  rfc5322Email: () => rfc5322Email,
  sha1_base64: () => sha1_base64,
  sha1_base64url: () => sha1_base64url,
  sha1_hex: () => sha1_hex,
  sha256_base64: () => sha256_base64,
  sha256_base64url: () => sha256_base64url,
  sha256_hex: () => sha256_hex,
  sha384_base64: () => sha384_base64,
  sha384_base64url: () => sha384_base64url,
  sha384_hex: () => sha384_hex,
  sha512_base64: () => sha512_base64,
  sha512_base64url: () => sha512_base64url,
  sha512_hex: () => sha512_hex,
  string: () => string,
  time: () => time,
  ulid: () => ulid,
  undefined: () => _undefined,
  unicodeEmail: () => unicodeEmail,
  uppercase: () => uppercase,
  uuid: () => uuid,
  uuid4: () => uuid4,
  uuid6: () => uuid6,
  uuid7: () => uuid7,
  xid: () => xid
});

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/index.js
var exports_locales = {};
__export(exports_locales, {
  ar: () => ar_default,
  az: () => az_default,
  be: () => be_default,
  bg: () => bg_default,
  bn: () => bn_default,
  ca: () => ca_default,
  ckb: () => ckb_default,
  cs: () => cs_default,
  da: () => da_default,
  de: () => de_default,
  el: () => el_default,
  en: () => en_default,
  eo: () => eo_default,
  es: () => es_default,
  fa: () => fa_default,
  fi: () => fi_default,
  fr: () => fr_default,
  frCA: () => fr_CA_default,
  gu: () => gu_default,
  he: () => he_default,
  hi: () => hi_default,
  hr: () => hr_default,
  hu: () => hu_default,
  hy: () => hy_default,
  id: () => id_default,
  is: () => is_default,
  it: () => it_default,
  ja: () => ja_default,
  ka: () => ka_default,
  kh: () => kh_default,
  km: () => km_default,
  kn: () => kn_default,
  ko: () => ko_default,
  lt: () => lt_default,
  mk: () => mk_default,
  ms: () => ms_default,
  ne: () => ne_default,
  nl: () => nl_default,
  nn: () => nn_default,
  no: () => no_default,
  ota: () => ota_default,
  pl: () => pl_default,
  ps: () => ps_default,
  pt: () => pt_default,
  ptBR: () => pt_BR_default,
  ro: () => ro_default,
  ru: () => ru_default,
  sk: () => sk_default,
  sl: () => sl_default,
  sv: () => sv_default,
  ta: () => ta_default,
  tg: () => tg_default,
  th: () => th_default,
  tk: () => tk_default,
  tr: () => tr_default,
  ua: () => ua_default,
  uk: () => uk_default,
  ur: () => ur_default,
  uz: () => uz_default,
  vi: () => vi_default,
  yo: () => yo_default,
  zhCN: () => zh_CN_default,
  zhTW: () => zh_TW_default
});

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/json-schema.js
var exports_json_schema = {};

// src/register.tsx
import { atom, read, update } from "claude-code";

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/util.js
function assertEqual(val) {
  return val;
}
function assertNotEqual(val) {
  return val;
}
function toZod() {
  return (schema) => schema;
}
function assertIs(_arg) {}
function assertNever(_x) {
  throw new Error("Unexpected value in exhaustive check");
}
function assert(_) {}
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function joinValues(array, separator = "|") {
  return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}

class Cached {
  constructor(getter) {
    this._getter = getter;
    this._value = undefined;
  }
  get value() {
    const getter = this._getter;
    if (getter !== undefined) {
      this._value = getter();
      this._getter = undefined;
    }
    return this._value;
  }
}
function cached(getter) {
  return new Cached(getter);
}
function nullish(input) {
  return input === null || input === undefined;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
  const ratio = val / step;
  const roundedRatio = Math.round(ratio);
  const tolerance = 4 * Number.EPSILON * Math.max(Math.abs(ratio), 1);
  if (Math.abs(ratio - roundedRatio) < tolerance)
    return 0;
  return ratio - roundedRatio;
}
var EVALUATING = /* @__PURE__ */ Symbol("evaluating");
function defineLazy(object, key, getter) {
  let value = undefined;
  Object.defineProperty(object, key, {
    get() {
      if (value === EVALUATING) {
        return;
      }
      if (value === undefined) {
        value = EVALUATING;
        value = getter();
      }
      return value;
    },
    set(v) {
      Object.defineProperty(object, key, {
        value: v
      });
    },
    configurable: true
  });
}
function objectClone(obj) {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function rawShape(def) {
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  return desc?.get ? desc.get.raw : desc?.value;
}
function sourceShape(schema) {
  return rawShape(schema._zod.def) ?? schema._zod.def.shape;
}
function deferProp(target, key, getter) {
  Object.defineProperty(target, key, {
    get() {
      const value = getter();
      assignProp(this, key, value);
      return value;
    },
    enumerable: true,
    configurable: true
  });
}
function putProp(target, key, value) {
  if (key in target)
    assignProp(target, key, value);
  else
    target[key] = value;
}
function mirrorShape(target, source, keys, wrap) {
  const raw = sourceShape(source);
  for (const key of keys) {
    const desc = Object.getOwnPropertyDescriptor(raw, key);
    if (!desc.enumerable)
      continue;
    if (desc.get) {
      deferProp(target, key, () => {
        const value = source._zod.def.shape[key];
        return wrap ? wrap(value, key) : value;
      });
    } else
      putProp(target, key, wrap ? wrap(desc.value, key) : desc.value);
  }
}
function mirrorProps(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    const desc = Object.getOwnPropertyDescriptor(source, key);
    if (!desc.enumerable)
      continue;
    if (desc.get)
      deferProp(target, key, () => source[key]);
    else
      putProp(target, key, desc.value);
  }
}
function mergeDefs(...defs) {
  const mergedDescriptors = {};
  for (const def of defs) {
    const descriptors = Object.getOwnPropertyDescriptors(def);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
  return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path) {
  if (!path)
    return obj;
  return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
  const keys = Object.keys(promisesObj);
  const promises = keys.map((key) => promisesObj[key]);
  return Promise.all(promises).then((results) => {
    const resolvedObj = {};
    for (let i = 0;i < keys.length; i++) {
      resolvedObj[keys[i]] = results[i];
    }
    return resolvedObj;
  });
}
function randomString(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0;i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = /* @__PURE__ */ cached(() => {
  if (globalConfig.jitless) {
    return false;
  }
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === undefined)
    return true;
  if (typeof ctor !== "function")
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function shallowClone(o) {
  if (isPlainObject(o))
    return { ...o };
  if (Array.isArray(o))
    return [...o];
  if (o instanceof Map)
    return new Map(o);
  if (o instanceof Set)
    return new Set(o);
  return o;
}
function numKeys(data) {
  let keyCount = 0;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      keyCount++;
    }
  }
  return keyCount;
}
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(data) ? "nan" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    case "object":
      if (Array.isArray(data)) {
        return "array";
      }
      if (data === null) {
        return "null";
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return "promise";
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return "map";
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return "set";
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return "date";
      }
      if (typeof File !== "undefined" && data instanceof File) {
        return "file";
      }
      return "object";
    default:
      throw new Error(`Unknown data type: ${t}`);
  }
};
var propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
var primitiveTypes = /* @__PURE__ */ new Set([
  "string",
  "number",
  "bigint",
  "boolean",
  "symbol",
  "undefined"
]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== undefined) {
    if (params?.error !== undefined)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function createTransparentProxy(getter) {
  let target;
  return new Proxy({}, {
    get(_, prop, receiver) {
      target ?? (target = getter());
      return Reflect.get(target, prop, receiver);
    },
    set(_, prop, value, receiver) {
      target ?? (target = getter());
      return Reflect.set(target, prop, value, receiver);
    },
    has(_, prop) {
      target ?? (target = getter());
      return Reflect.has(target, prop);
    },
    deleteProperty(_, prop) {
      target ?? (target = getter());
      return Reflect.deleteProperty(target, prop);
    },
    ownKeys(_) {
      target ?? (target = getter());
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(_, prop) {
      target ?? (target = getter());
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    defineProperty(_, prop, descriptor) {
      target ?? (target = getter());
      return Reflect.defineProperty(target, prop, descriptor);
    }
  });
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint")
    return value.toString() + "n";
  if (typeof value === "string")
    return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin !== undefined && shape[k]._zod.optout === "optional";
  });
}
var NUMBER_FORMAT_RANGES = /* @__PURE__ */ (() => ({
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-340282346638528860000000000000000000000, 340282346638528860000000000000000000000],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}))();
var BIGINT_FORMAT_RANGES = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  }
  const newShape = {};
  mirrorShape(newShape, schema, maskedKeys(schema, mask));
  return clone(schema, mergeDefs(currDef, { shape: newShape, checks: [] }));
}
function maskedKeys(schema, mask) {
  const raw = sourceShape(schema);
  const keys = [];
  for (const key of Reflect.ownKeys(mask)) {
    if (!Object.getOwnPropertyDescriptor(raw, key)?.enumerable) {
      throw new Error(`Unrecognized key: "${String(key)}"`);
    }
    if (mask[key])
      keys.push(key);
  }
  return keys;
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  }
  const omitted = new Set(maskedKeys(schema, mask));
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key) => !omitted.has(key)));
  return clone(schema, mergeDefs(currDef, { shape: newShape, checks: [] }));
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const checks = schema._zod.def.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    const existingShape = sourceShape(schema);
    for (const key of Reflect.ownKeys(shape)) {
      if (Object.getOwnPropertyDescriptor(existingShape, key) !== undefined) {
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
      }
    }
  }
  return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function extended(schema, shape) {
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)));
  mirrorProps(newShape, shape);
  return newShape;
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to safeExtend: expected a plain object");
  }
  return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function merge(a, b) {
  if (!b?._zod?.def) {
    throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
  }
  if (a._zod.def.checks?.length) {
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  }
  const newShape = {};
  mirrorShape(newShape, a, Reflect.ownKeys(sourceShape(a)));
  mirrorShape(newShape, b, Reflect.ownKeys(sourceShape(b)));
  const def = mergeDefs(a._zod.def, {
    shape: newShape,
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: b._zod.def.checks ?? []
  });
  return clone(a, def);
}
function partial(Class2, schema, mask, name = "partial") {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(`.${name}() cannot be used on object schemas containing refinements`);
  }
  const selected = mask ? new Set(maskedKeys(schema, mask)) : undefined;
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class2 && ((value, key) => selected && !selected.has(key) ? value : new Class2({ type: "optional", innerType: value })));
  return clone(schema, mergeDefs(schema._zod.def, { shape: newShape, checks: [] }));
}
function required(Class2, schema, mask) {
  const selected = mask ? new Set(maskedKeys(schema, mask)) : undefined;
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value, key) => selected && !selected.has(key) ? value : new Class2({ type: "nonoptional", innerType: value }));
  return clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
}
function aborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex;i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true) {
      return true;
    }
  }
  return false;
}
function explicitlyAborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex;i < x.issues.length; i++) {
    if (x.issues[i]?.continue === false) {
      return true;
    }
  }
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a;
    (_a = iss).path ?? (_a.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function attachSchema(issues, start, inst) {
  var _a;
  for (let i = start;i < issues.length; i++) {
    (_a = issues[i]).schema ?? (_a.schema = inst);
  }
}
function finalizeIssue(iss, ctx, config) {
  var _a;
  const traits = iss.inst?._zod?.traits;
  if (traits?.has("$ZodType")) {
    if (traits.has("$ZodCheck"))
      (_a = iss).schema ?? (_a.schema = iss.inst);
    else
      iss.schema = iss.inst;
  }
  const schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : undefined;
  const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(schemaError?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
  const full = {};
  for (const k of Object.keys(iss)) {
    if (k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__")
      continue;
    full[k] = iss[k];
  }
  full.path ?? (full.path = []);
  full.message = message;
  if (ctx?.reportInput) {
    full.input = iss.input;
  }
  return full;
}
function getSizableOrigin(input) {
  if (input instanceof Set)
    return "set";
  if (input instanceof Map)
    return "map";
  if (input instanceof File)
    return "file";
  return "unknown";
}
var highSurrogate = /[\uD800-\uDBFF]/;
function codePointLength(str) {
  const units = str.length;
  if (!highSurrogate.test(str))
    return units;
  let count = units;
  for (let i = 0;i < units - 1; i++) {
    if ((str.charCodeAt(i) & 64512) === 55296 && (str.charCodeAt(i + 1) & 64512) === 56320) {
      count--;
      i++;
    }
  }
  return count;
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function parsedType(data) {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "nan" : "number";
    }
    case "object": {
      if (data === null) {
        return "null";
      }
      if (Array.isArray(data)) {
        return "array";
      }
      const obj = data;
      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
        return obj.constructor.name;
      }
    }
  }
  return t;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
function cleanEnum(obj) {
  return Object.entries(obj).filter(([k, _]) => {
    return Number.isNaN(Number.parseInt(k, 10));
  }).map((el) => el[1]);
}
function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0;i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
function uint8ArrayToBase64(bytes) {
  let binaryString = "";
  for (let i = 0;i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
}
function base64urlToUint8Array(base64url) {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - base64.length % 4) % 4);
  return base64ToUint8Array(base64 + padding);
}
function uint8ArrayToBase64url(bytes) {
  return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex) {
  const cleanHex = hex.replace(/^0x/, "");
  if (cleanHex.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0;i < cleanHex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return bytes;
}
function uint8ArrayToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

class Class {
  constructor(..._args) {}
}
function members(proto, table) {
  for (const key in table) {
    const desc = Object.getOwnPropertyDescriptor(table, key);
    if (desc.get)
      Object.defineProperty(proto, key, { ...desc, enumerable: false });
    else
      defineBound(proto, key, desc.value);
  }
}
function own(inst, key, value, enumerable = true) {
  Object.defineProperty(inst, key, { configurable: true, writable: true, enumerable, value });
  return value;
}
function hide(inst, key, value) {
  return own(inst, key, value, false);
}
function derived(computes, table) {
  for (const key in computes) {
    const compute = computes[key];
    Object.defineProperty(table, key, {
      configurable: true,
      enumerable: true,
      get() {
        return own(this, key, compute(this));
      },
      set(value) {
        own(this, key, value);
      }
    });
  }
  return table;
}
function defineBound(proto, key, fn) {
  Object.defineProperty(proto, key, {
    configurable: true,
    get() {
      return this == null ? fn : own(this, key, fn.bind(this));
    },
    set(value) {
      own(this, key, value);
    }
  });
}
function claim(inst, sentinel) {
  const proto = Object.getPrototypeOf(inst);
  return sentinel in proto ? undefined : proto;
}
var installing;
var broke = false;
var breaker = {
  configurable: true,
  get() {
    broke = true;
    return;
  }
};
function defineLazyInternal(inst, key, compute) {
  const proto = Object.getPrototypeOf(inst._zod);
  if (key in proto && installing !== inst._zod) {
    installing = undefined;
    return;
  }
  installing = inst._zod;
  Object.defineProperty(proto, key, {
    configurable: true,
    get() {
      Object.defineProperty(this, key, breaker);
      const outer = broke;
      broke = false;
      try {
        const value = compute(this);
        if (broke)
          delete this[key];
        else
          Object.defineProperty(this, key, { configurable: true, writable: true, value });
        broke = broke || outer;
        return value;
      } catch (err) {
        delete this[key];
        broke = broke || outer;
        throw err;
      }
    },
    set(value) {
      Object.defineProperty(this, key, { configurable: true, writable: true, value });
    }
  });
}
function installLazyProp(inst, key, make, enumerable) {
  const proto = claim(inst, key);
  if (!proto)
    return;
  Object.defineProperty(proto, key, {
    configurable: true,
    get() {
      const desc = { configurable: true, writable: true, enumerable, value: undefined };
      Object.defineProperty(this, key, desc);
      desc.value = make(this);
      Object.defineProperty(this, key, desc);
      return desc.value;
    },
    set(value) {
      Object.defineProperty(this, key, { configurable: true, writable: true, enumerable, value });
    }
  });
}
var CONSTANT_CATCH = "~constantCatch";
function constantCatch(value) {
  const fn = () => value;
  fn[CONSTANT_CATCH] = true;
  return fn;
}

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/core.js
var _a;
var NEVER = /* @__PURE__ */ Object.freeze({
  status: "aborted"
});
var _zodDesc = { value: undefined, enumerable: false };
var _E = "captureStackTrace" in Error ? Error : null;
function newError(Definition) {
  const E = _E;
  if (E) {
    const saved = E.stackTraceLimit;
    if (typeof saved === "number") {
      try {
        E.stackTraceLimit = 0;
      } catch {
        _E = null;
        return new Definition;
      }
      try {
        return new Definition;
      } finally {
        E.stackTraceLimit = saved;
      }
    }
  }
  return new Definition;
}
function $constructor(name, initializer, proto, params) {
  const zodProto = {};
  function Internals(def) {
    this.def = def;
    this.constr = _;
    this.traits = new Set;
  }
  Internals.prototype = zodProto;
  const protoMembers = proto;
  const initialized = protoMembers && new WeakSet;
  function init(inst, def) {
    if (!inst._zod) {
      _zodDesc.value = new Internals(def);
      try {
        Object.defineProperty(inst, "_zod", _zodDesc);
      } finally {
        _zodDesc.value = undefined;
      }
    } else if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer(inst, def);
    if (initialized) {
      const own = Object.getPrototypeOf(inst);
      const ctorProto = inst._zod.constr.prototype;
      let up = own;
      while (up && up !== ctorProto)
        up = Object.getPrototypeOf(up);
      const target = up ?? own;
      if (!initialized.has(target)) {
        initialized.add(target);
        members(target, protoMembers);
      }
    }
    const proto = _.prototype;
    for (const k in proto) {
      if (!Object.prototype.hasOwnProperty.call(proto, k))
        continue;
      if (!(k in inst)) {
        inst[k] = proto[k].bind(inst);
      }
    }
  }
  const Parent = params?.Parent ?? Object;

  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    const inst = params?.Parent ? newError(Definition) : this;
    init(inst, def);
    const deferred = inst._zod.deferred;
    if (deferred) {
      for (const fn of deferred) {
        fn();
      }
      inst._zod.deferred = undefined;
    }
    const pp = globalThis.__zod_globalConfig?.postProcessor;
    if (pp)
      pp(inst);
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
var $brand = /* @__PURE__ */ Symbol("zod_brand");

class $ZodAsyncError extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
}

class $ZodEncodeError extends Error {
  constructor(name) {
    super(`Encountered unidirectional transform during encode: ${name}`);
    this.name = "ZodEncodeError";
  }
}
(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
var globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/errors.js
function _getMessage() {
  const internals = this._zod;
  internals.message ?? (internals.message = JSON.stringify(internals.def, jsonStringifyReplacer, 2));
  return internals.message;
}
function _setMessage(value) {
  this._zod.message = value;
}
var _messageDesc = {
  get: _getMessage,
  set: _setMessage,
  enumerable: true,
  configurable: true
};
var _issuesDesc = { value: undefined, enumerable: false };
var _installedToString = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
var initializer = (inst, def) => {
  inst.name = "$ZodError";
  _issuesDesc.value = def;
  Object.defineProperty(inst, "issues", _issuesDesc);
  _issuesDesc.value = undefined;
  Object.defineProperty(inst, "message", _messageDesc);
  const proto = Object.getPrototypeOf(inst);
  if (!_installedToString.has(proto)) {
    _installedToString.add(proto);
    Object.defineProperty(proto, "toString", {
      configurable: true,
      enumerable: false,
      get() {
        const value = () => this.message;
        Object.defineProperty(this, "toString", { value, configurable: true, writable: true });
        return value;
      },
      set(value) {
        Object.defineProperty(this, "toString", { value, configurable: true, writable: true });
      }
    });
  }
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, undefined, {
  Parent: Error
});
function node(obj, key, make) {
  if (!Object.prototype.hasOwnProperty.call(obj, key)) {
    if (key === "__proto__") {
      Object.defineProperty(obj, key, { value: make(), writable: true, enumerable: true, configurable: true });
    } else {
      obj[key] = make();
    }
  }
  return obj[key];
}
function flattenError(error, mapper = (issue) => issue.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error.issues) {
    if (sub.path.length > 0) {
      node(fieldErrors, sub.path[0], () => []).push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error, mapper = (issue) => issue.message) {
  const fieldErrors = { _errors: [] };
  const processError = (error, path = []) => {
    for (const issue of error.issues) {
      if (issue.code === "invalid_union" && issue.errors.length) {
        issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
      } else if (issue.code === "invalid_key") {
        processError({ issues: issue.issues }, [...path, ...issue.path]);
      } else if (issue.code === "invalid_element") {
        processError({ issues: issue.issues }, [...path, ...issue.path]);
      } else {
        const fullpath = [...path, ...issue.path];
        if (fullpath.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < fullpath.length) {
            const el = fullpath[i];
            const terminal = i === fullpath.length - 1;
            if (el === "_errors") {
              if (terminal)
                curr._errors.push(mapper(issue));
              i++;
              continue;
            }
            if (!Object.prototype.hasOwnProperty.call(curr, el)) {
              Object.defineProperty(curr, el, {
                value: { _errors: [] },
                enumerable: true,
                writable: true,
                configurable: true
              });
            }
            const node = curr[el];
            if (terminal) {
              node._errors.push(mapper(issue));
            }
            curr = node;
            i++;
          }
        }
      }
    }
  };
  processError(error);
  return fieldErrors;
}
function treeifyError(error, mapper = (issue) => issue.message) {
  const result = { errors: [] };
  const processError = (error, path = []) => {
    var _a;
    for (const issue of error.issues) {
      if (issue.code === "invalid_union" && issue.errors.length) {
        issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
      } else if (issue.code === "invalid_key") {
        processError({ issues: issue.issues }, [...path, ...issue.path]);
      } else if (issue.code === "invalid_element") {
        processError({ issues: issue.issues }, [...path, ...issue.path]);
      } else {
        const fullpath = [...path, ...issue.path];
        if (fullpath.length === 0) {
          result.errors.push(mapper(issue));
          continue;
        }
        let curr = result;
        let i = 0;
        while (i < fullpath.length) {
          const el = fullpath[i];
          const terminal = i === fullpath.length - 1;
          if (typeof el === "string") {
            curr.properties ?? (curr.properties = {});
            if (!Object.prototype.hasOwnProperty.call(curr.properties, el)) {
              Object.defineProperty(curr.properties, el, {
                value: { errors: [] },
                enumerable: true,
                writable: true,
                configurable: true
              });
            }
            curr = curr.properties[el];
          } else {
            curr.items ?? (curr.items = []);
            (_a = curr.items)[el] ?? (_a[el] = { errors: [] });
            curr = curr.items[el];
          }
          if (terminal) {
            curr.errors.push(mapper(issue));
          }
          i++;
        }
      }
    }
  };
  processError(error);
  return result;
}
function toDotPath(_path) {
  const segs = [];
  const path = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
  for (const seg of path) {
    if (typeof seg === "number")
      segs.push(`[${seg}]`);
    else if (typeof seg === "symbol")
      segs.push(`[${JSON.stringify(String(seg))}]`);
    else if (/[^\w$]/.test(seg))
      segs.push(`[${JSON.stringify(seg)}]`);
    else {
      if (segs.length)
        segs.push(".");
      segs.push(seg);
    }
  }
  return segs.join("");
}
function prettifyError(error) {
  const lines = [];
  const issues = [...error.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
  for (const issue of issues) {
    lines.push(`✖ ${issue.message}`);
    if (issue.path?.length)
      lines.push(`  → at ${toDotPath(issue.path)}`);
  }
  return lines.join(`
`);
}

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/parse.js
function finalizeParams(callee, params) {
  return { callee: params?.callee ?? callee, Err: params?.Err };
}
var _parse = (_Err) => {
  const fn = (schema, value, _ctx, _params) => {
    const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
    const result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise) {
      throw new $ZodAsyncError;
    }
    if (result.issues.length) {
      const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
      captureStackTrace(e, _params?.callee ?? fn);
      throw e;
    }
    return result.value;
  };
  return fn;
};
var parse = /* @__PURE__ */ _parse($ZodRealError);
var _parseAsync = (_Err) => {
  const fn = async (schema, value, _ctx, params) => {
    const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
      result = await result;
    if (result.issues.length) {
      const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
      captureStackTrace(e, params?.callee ?? fn);
      throw e;
    }
    return result.value;
  };
  return fn;
};
var parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  return result.issues.length ? failure(_Err, result.issues, ctx) : { success: true, data: result.value };
};
var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
function failure(Err, issues, ctx) {
  let error;
  return {
    success: false,
    get error() {
      if (!error) {
        error = new Err(issues.map((iss) => finalizeIssue(iss, ctx, config())));
        issues = undefined;
        ctx = undefined;
      }
      return error;
    },
    set error(e) {
      error = e;
      issues = undefined;
      ctx = undefined;
    }
  };
}
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? failure(_Err, result.issues, ctx) : { success: true, data: result.value };
};
var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
var COMPILE_INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid");
var COMPILE_FALLBACK = /* @__PURE__ */ Symbol.for("zod.compile.fallback");
var validate = (schema, value, _ctx) => {
  const validator = schema._zod.bag.validator;
  if (validator !== undefined) {
    if (validator(value) !== COMPILE_INVALID)
      return true;
    if (validator.definite === true && _ctx === undefined)
      return false;
  }
  return validateFallback(schema, value, _ctx);
};
function validateFallback(schema, value, _ctx) {
  const ctx = _ctx ? { ..._ctx, async: false, abortEarly: true } : { async: false, abortEarly: true };
  const fallbackRun = schema._zod.bag.fallbackRun;
  let result;
  if (fallbackRun) {
    ctx[COMPILE_FALLBACK] = true;
    result = fallbackRun({ value, issues: [] }, ctx);
  } else {
    result = schema._zod.run({ value, issues: [] }, ctx);
  }
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  return result.issues.length === 0;
}
var validateAsync = async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: true, abortEarly: true } : { async: true, abortEarly: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length === 0;
};
var _encode = (_Err) => {
  const parse = _parse(_Err);
  const fn = (schema, value, _ctx, _params) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return parse(schema, value, ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var encode = /* @__PURE__ */ _encode($ZodRealError);
var _decode = (_Err) => {
  const parse = _parse(_Err);
  const fn = (schema, value, _ctx, _params) => {
    return parse(schema, value, _ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var decode = /* @__PURE__ */ _decode($ZodRealError);
var _encodeAsync = (_Err) => {
  const parseAsync = _parseAsync(_Err);
  const fn = async (schema, value, _ctx, _params) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return await parseAsync(schema, value, ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError);
var _decodeAsync = (_Err) => {
  const parseAsync = _parseAsync(_Err);
  const fn = async (schema, value, _ctx, _params) => {
    return await parseAsync(schema, value, _ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError);
var _safeEncode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParse(_Err)(schema, value, ctx);
};
var safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError);
var _safeDecode = (_Err) => (schema, value, _ctx) => {
  return _safeParse(_Err)(schema, value, _ctx);
};
var safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError);
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value, ctx);
};
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _safeParseAsync(_Err)(schema, value, _ctx);
};
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/regexes.js
var cuid = /^[cC][0-9a-z]{6,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
function nanoidOfLength(length) {
  return new RegExp(`^[a-zA-Z0-9_-]{${length}}$`);
}
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version) => {
  if (!version)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var uuid4 = /* @__PURE__ */ uuid(4);
var uuid6 = /* @__PURE__ */ uuid(6);
var uuid7 = /* @__PURE__ */ uuid(7);
var email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
var idnEmail = unicodeEmail;
var browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var _emoji = `^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`;
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var mac = (delimiter) => {
  const escapedDelim = escapeRegex(delimiter ?? ":");
  return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
};
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
var hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
var domain = /^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;
var httpProtocol = /^https?$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var creditCard = /^\d(?:[ -]?\d){11,18}$/;
var currencyCode = /^(?:AED|AFN|ALL|AMD|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BHD|BIF|BMD|BND|BOB|BOV|BRL|BSD|BTN|BWP|BYN|BZD|CAD|CDF|CHE|CHF|CHW|CLF|CLP|CNY|COP|COU|CRC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MXV|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLE|SOS|SRD|SSP|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UYW|UZS|VED|VES|VND|VUV|WST|XAD|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XCD|XCG|XDR|XOF|XPD|XPF|XPT|XSU|XTS|XUA|XXX|YER|ZAR|ZMW|ZWG)$/;
var iban = /^[A-Z]{2}(?!00|01|99)\d{2}[A-Z0-9]{11,30}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
function anchor(source) {
  return new RegExp(`^${source}$`);
}
var date = /* @__PURE__ */ anchor(dateSource);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : args.seconds ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const opts = ["Z"];
  if (args.offset)
    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const qualified = `${timeSource({ precision: args.precision, seconds: true })}(?:${opts.join("|")})`;
  const timeRegex = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var anyString = /^[\s\S]{0,}$/;
var string = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
var bigint = /^-?\d+n?$/;
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;
var _null = /^null$/i;
var _undefined = /^undefined$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
var hex = /^[0-9a-fA-F]*$/;
function fixedBase64(bodyLength, padding) {
  return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
function fixedBase64url(length) {
  return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
}
var md5_hex = /^[0-9a-fA-F]{32}$/;
var md5_base64 = /* @__PURE__ */ fixedBase64(22, "==");
var md5_base64url = /* @__PURE__ */ fixedBase64url(22);
var sha1_hex = /^[0-9a-fA-F]{40}$/;
var sha1_base64 = /* @__PURE__ */ fixedBase64(27, "=");
var sha1_base64url = /* @__PURE__ */ fixedBase64url(27);
var sha256_hex = /^[0-9a-fA-F]{64}$/;
var sha256_base64 = /* @__PURE__ */ fixedBase64(43, "=");
var sha256_base64url = /* @__PURE__ */ fixedBase64url(43);
var sha384_hex = /^[0-9a-fA-F]{96}$/;
var sha384_base64 = /* @__PURE__ */ fixedBase64(64, "");
var sha384_base64url = /* @__PURE__ */ fixedBase64url(64);
var sha512_hex = /^[0-9a-fA-F]{128}$/;
var sha512_base64 = /* @__PURE__ */ fixedBase64(86, "==");
var sha512_base64url = /* @__PURE__ */ fixedBase64url(86);

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a = inst._zod).onattach ?? (_a.onattach = []);
});
var _whenHasSize = (payload) => {
  const val = payload.value;
  return !nullish(val) && val.size !== undefined;
};
var _whenHasLength = (payload) => {
  const val = payload.value;
  return !nullish(val) && val.length !== undefined;
};
var numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin: numericOriginMap[typeof payload.value] ?? origin,
      code: "too_big",
      maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin: numericOriginMap[typeof payload.value] ?? origin,
      code: "too_small",
      minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? def.value !== BigInt(0) && payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
    if (isMultiple)
      return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          continue: false,
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (input < minimum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = _whenHasSize);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size <= def.maximum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = _whenHasSize);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size >= def.minimum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = _whenHasSize);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size === def.size)
      return;
    const tooBig = size > def.size;
    payload.issues.push({
      origin: getSizableOrigin(input),
      ...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const units = input.length;
    const length = typeof input === "string" && units > def.maximum ? codePointLength(input) : units;
    if (length <= def.maximum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const units = input.length;
    const length = typeof input === "string" && units >= def.minimum && units < def.minimum * 2 ? codePointLength(input) : units;
    if (length >= def.minimum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const units = input.length;
    const length = typeof input === "string" && units >= def.length && units <= def.length * 2 ? codePointLength(input) : units;
    if (length === def.length)
      return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a, _b;
  $ZodCheck.init(inst, def);
  if (def.pattern)
    (_a = inst._zod).check ?? (_a.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b = inst._zod).check ?? (_b.check = () => {});
});
var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position},}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function handleCheckPropertyResult(result, payload, property) {
  if (result.issues.length) {
    payload.issues.push(...prefixIssues(property, result.issues));
  }
}
var $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    const result = def.schema._zod.run({
      value: payload.value[def.property],
      issues: []
    }, {});
    if (result instanceof Promise) {
      return result.then((result) => handleCheckPropertyResult(result, payload, def.property));
    }
    handleCheckPropertyResult(result, payload, def.property);
    return;
  };
});
var $ZodCheckProperties = /* @__PURE__ */ $constructor("$ZodCheckProperties", (inst, def) => {
  $ZodCheck.init(inst, def);
  hide(inst, Symbol.iterator, function* () {
    yield inst;
  });
  let entries;
  inst._zod.check = (payload) => {
    if (payload.value == null) {
      payload.issues.push({ expected: "object", code: "invalid_type", input: payload.value, inst });
      return;
    }
    entries ?? (entries = Reflect.ownKeys(def.shape).map((key) => [key, def.shape[key]]));
    const input = payload.value;
    let proms;
    for (const [key, schema] of entries) {
      const result = schema._zod.run({ value: input[key], issues: [] }, {});
      if (result instanceof Promise) {
        proms ?? (proms = []);
        proms.push(result.then((result) => handleCheckPropertyResult(result, payload, key)));
      } else {
        handleCheckPropertyResult(result, payload, key);
      }
    }
    if (proms)
      return Promise.all(proms).then(() => {
        return;
      });
    return;
  };
});
var $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
  $ZodCheck.init(inst, def);
  const mimeSet = new Set(def.mime);
  inst._zod.check = (payload) => {
    if (mimeSet.has(payload.value.type))
      return;
    payload.issues.push({
      code: "invalid_value",
      values: def.mime,
      input: payload.value.type,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/doc.js
class Doc {
  constructor(args = [], closed = {}) {
    this.content = [];
    this.indent = 0;
    this.args = args;
    this.closed = closed;
  }
  indented(fn) {
    this.indent += 1;
    try {
      fn(this);
    } finally {
      this.indent -= 1;
    }
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content.split(`
`).filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const content = this?.content ?? [``];
    const factory = new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {
${content.join(`
`)}
};`);
    return factory(...Object.values(this.closed));
  }
}

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 6,
  patch: 5
};

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const defChecks = inst._zod.def.checks;
  const checks = inst._zod.traits.has("$ZodCheck") ? [inst, ...defChecks ?? []] : defChecks?.length ? [...defChecks] : [];
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks, ctx) => {
      if (payload.memo)
        return payload;
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks) {
        if (ch._zod.def.when) {
          if (explicitlyAborted(payload))
            continue;
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError;
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            attachSchema(payload.issues, currLen, inst);
            if (!isAborted)
              isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          attachSchema(payload.issues, currLen, inst);
          if (!isAborted)
            isAborted = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    const handleCanaryResult = (canary, payload, ctx) => {
      if (aborted(canary)) {
        canary.aborted = true;
        return canary;
      }
      const checkResult = runChecks(payload, checks, ctx);
      if (checkResult instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
      }
      return inst._zod.parse(checkResult, ctx);
    };
    inst._zod.run = (payload, ctx) => {
      if (ctx.skipChecks) {
        return inst._zod.parse(payload, ctx);
      }
      if (ctx.direction === "backward") {
        const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
        if (canary instanceof Promise) {
          return canary.then((canary) => {
            return handleCanaryResult(canary, payload, ctx);
          });
        }
        return handleCanaryResult(canary, payload, ctx);
      }
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return result.then((result) => runChecks(result, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
}, {
  get "~standard"() {
    return hide(this, "~standard", standardProps(this));
  },
  set "~standard"(value) {
    own(this, "~standard", value);
  }
});
var toStandardResult = (r, ctx) => r.issues.length ? { issues: r.issues.map((iss) => finalizeIssue(iss, ctx, config())) } : { value: r.value };
async function validateAsync2(inst, value) {
  const ctx = { async: true };
  return toStandardResult(await inst._zod.run({ value, issues: [] }, ctx), ctx);
}
function standardProps(inst) {
  return {
    validate: (value) => {
      const ctx = { async: false };
      try {
        const r = inst._zod.run({ value, issues: [] }, ctx);
        if (!(r instanceof Promise))
          return toStandardResult(r, ctx);
      } catch (_) {}
      return validateAsync2(inst, value);
    },
    vendor: "zod",
    version: 1
  };
}
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = def.pattern ?? anyString;
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_) {}
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid);
  $ZodStringFormat.init(inst, def);
});
var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    };
    const v = versionMap[def.version];
    if (v === undefined)
      throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid(v));
  } else
    def.pattern ?? (def.pattern = uuid());
  $ZodStringFormat.init(inst, def);
});
var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email);
  $ZodStringFormat.init(inst, def);
});
var URL_BAD_FORMAT = 1;
var URL_UNPARSEABLE = 2;
function canParseURL(input) {
  try {
    if (typeof URL !== "undefined" && typeof URL.canParse === "function")
      return URL.canParse(input);
    new URL(input);
    return true;
  } catch {
    return false;
  }
}
function validateURL(trimmed, def) {
  if (!("normalize" in def) && !("hostname" in def) && !("protocol" in def)) {
    return canParseURL(trimmed) || URL_UNPARSEABLE;
  }
  return parseURLObject(trimmed, def);
}
function parseURLObject(trimmed, def) {
  if (!def.normalize && def.protocol?.source === httpProtocol.source && !/^https?:\/\//i.test(trimmed)) {
    return URL_BAD_FORMAT;
  }
  try {
    if (typeof URL !== "undefined") {
      const URLStatic = URL;
      if (typeof URLStatic.parse === "function")
        return URLStatic.parse(trimmed) ?? URL_UNPARSEABLE;
    }
    return new URL(trimmed);
  } catch {
    return URL_UNPARSEABLE;
  }
}
var asciiTabOrNewline = /[\t\n\r]/g;
function stripTabAndNewline(value) {
  return value.replace(asciiTabOrNewline, "");
}
function urlHostnameOk(url, hostname) {
  hostname.lastIndex = 0;
  return hostname.test(url.hostname);
}
function urlProtocolOk(url, protocol) {
  protocol.lastIndex = 0;
  return protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol);
}
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const trimmed = payload.value.trim();
      const url = validateURL(trimmed, def);
      if (url === URL_BAD_FORMAT) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid URL format",
          input: payload.value,
          inst,
          continue: !def.abort
        });
        return;
      }
      if (url === URL_UNPARSEABLE) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          input: payload.value,
          inst,
          continue: !def.abort
        });
        return;
      }
      if (url === true) {
        payload.value = stripTabAndNewline(trimmed);
        return;
      }
      if (def.hostname && !urlHostnameOk(url, def.hostname)) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid hostname",
          pattern: def.hostname.source,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      }
      if (def.protocol && !urlProtocolOk(url, def.protocol)) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid protocol",
          pattern: def.protocol.source,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      }
      payload.value = def.normalize ? url.href : stripTabAndNewline(trimmed);
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji());
  $ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  if (def.length !== undefined && (!Number.isInteger(def.length) || def.length < 1))
    throw new Error(`Invalid nanoid length: ${def.length}`);
  def.pattern ?? (def.pattern = def.length === undefined ? nanoid : nanoidOfLength(def.length));
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2);
  $ZodStringFormat.init(inst, def);
});
var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid);
  $ZodStringFormat.init(inst, def);
});
var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid);
  $ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date);
  $ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration);
  $ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4);
  $ZodStringFormat.init(inst, def);
});
var ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
function isValidIPv6(value) {
  if (!ipv6Alphabet.test(value))
    return false;
  return canParseURL(`http://[${value}]`);
}
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (!isValidIPv6(payload.value)) {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
  def.pattern ?? (def.pattern = mac(def.delimiter));
  $ZodStringFormat.init(inst, def);
});
var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4);
  $ZodStringFormat.init(inst, def);
});
function isValidCIDRv6(value) {
  const parts = value.split("/");
  if (parts.length !== 2)
    return false;
  const [address, prefix] = parts;
  if (!prefix)
    return false;
  const prefixNum = Number(prefix);
  if (`${prefixNum}` !== prefix)
    return false;
  if (prefixNum < 0 || prefixNum > 128)
    return false;
  return isValidIPv6(address);
}
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (!isValidCIDRv6(payload.value)) {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (/\s/.test(data))
    return false;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
var base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/;
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64Charset);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var base64urlCharset = /^[A-Za-z0-9_-]*$/;
function isValidBase64URL(data) {
  if (!base64urlCharset.test(data))
    return false;
  const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64urlCharset);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164);
  $ZodStringFormat.init(inst, def);
});
var CC_SANITIZE = /[- ]/g;
function isLuhnAlgo(digits) {
  let length = digits.length;
  let bit = 1;
  let sum = 0;
  while (length) {
    const value = digits.charCodeAt(--length) - 48;
    bit ^= 1;
    sum += bit ? [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][value] : value;
  }
  return sum % 10 === 0;
}
function isValidCreditCard(input) {
  if (!creditCard.test(input))
    return false;
  return isLuhnAlgo(input.replace(CC_SANITIZE, ""));
}
var $ZodCreditCard = /* @__PURE__ */ $constructor("$ZodCreditCard", (inst, def) => {
  def.pattern ?? (def.pattern = creditCard);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidCreditCard(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "credit_card",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function isIso7064Mod97(iban2) {
  let remainder = 0;
  const len = iban2.length;
  for (let i = 4;i < len; i++) {
    const code = iban2.charCodeAt(i);
    remainder = (code >= 65 ? remainder * 100 + (code - 55) : remainder * 10 + (code - 48)) % 97;
  }
  for (let i = 0;i < 4; i++) {
    const code = iban2.charCodeAt(i);
    remainder = (code >= 65 ? remainder * 100 + (code - 55) : remainder * 10 + (code - 48)) % 97;
  }
  return remainder === 1;
}
function isValidIBAN(input) {
  if (!iban.test(input))
    return false;
  return isIso7064Mod97(input);
}
var $ZodIBAN = /* @__PURE__ */ $constructor("$ZodIBAN", (inst, def) => {
  def.pattern ?? (def.pattern = iban);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidIBAN(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "iban",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT(payload.value, def.alg))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (def.fn(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: def.format,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = number;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? String(input) : undefined : undefined;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = bigint;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = BigInt(payload.value);
      } catch (_) {}
    if (typeof payload.value === "bigint")
      return payload;
    payload.issues.push({
      expected: "bigint",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
  $ZodCheckBigIntFormat.init(inst, def);
  $ZodBigInt.init(inst, def);
});
var $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "symbol")
      return payload;
    payload.issues.push({
      expected: "symbol",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _undefined;
  inst._zod.values = new Set([undefined]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "undefined",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _null;
  inst._zod.values = new Set([null]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input === null)
      return payload;
    payload.issues.push({
      expected: "null",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "void",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce) {
      try {
        payload.value = new Date(payload.value);
      } catch (_err) {}
    }
    const input = payload.value;
    const isDate = input instanceof Date;
    const isValidDate = isDate && !Number.isNaN(input.getTime());
    if (isValidDate)
      return payload;
    payload.issues.push({
      expected: "date",
      code: "invalid_type",
      input,
      ...isDate ? { received: "Invalid Date" } : {},
      inst
    });
    return payload;
  };
});
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = memo ? memo.alloc(inst, payload, Array(input.length), ctx) : Array(input.length);
    const proms = [];
    const abortEarly = ctx?.abortEarly;
    for (let i = 0;i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result) => handleArrayResult(result, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
        if (abortEarly && result.issues.length !== 0 && aborted(result))
          break;
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handlePropertyResult(result, final, key, input, optin, optout) {
  const isPresent = key in input;
  const isOptionalOut = optout === "optional";
  if (!isPresent && isOptionalOut && optin === "optional") {
    return;
  }
  if (result.issues.length) {
    if (optin !== undefined && isOptionalOut && !isPresent) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (!isPresent && optin === undefined) {
    if (!result.issues.length) {
      final.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: undefined,
        path: [key]
      });
    }
    return;
  }
  if (result.value === undefined) {
    if (isPresent || optin === "defaulted" && !isOptionalOut) {
      final.value[key] = undefined;
    }
  } else {
    final.value[key] = result.value;
  }
}
var NO_SYMBOL_KEYS = [];
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  const ownSymbols = Object.getOwnPropertySymbols(def.shape);
  const symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS;
  const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
  for (const k of allKeys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    allKeys,
    symbolKeys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst, abortEarly) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const optin = _catchall.optin;
  const optout = _catchall.optout;
  let seen = 0;
  for (const key in input) {
    if (abortEarly && payload.issues.length !== seen) {
      if (aborted(payload, seen))
        break;
      seen = payload.issues.length;
    }
    if (keySet.has(key))
      continue;
    if (key === "__proto__") {
      if (t === "never")
        unrecognized.push(key);
      continue;
    }
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
    } else {
      handlePropertyResult(r, payload, key, input, optin, optout);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst,
      continue: true
    });
  }
  if (!proms.length)
    return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  const sh = desc?.get ? desc.get.raw : def.shape ?? {};
  if (sh) {
    const get = () => {
      const newSh = { ...sh };
      Object.defineProperty(def, "shape", { value: newSh });
      get.raw = newSh;
      return newSh;
    };
    get.raw = sh;
    Object.defineProperty(def, "shape", { get });
  }
  const _normalized = cached(() => normalizeDef(def));
  defineLazyInternal(inst, "propValues", (zod) => {
    const shape = zod.def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        if (!Object.prototype.hasOwnProperty.call(propValues, key)) {
          assignProp(propValues, key, new Set);
        }
        for (const v of field.values)
          propValues[key].add(v);
        if (field.optin !== undefined)
          propValues[key].add(undefined);
      }
    }
    return propValues;
  });
  const isObject2 = isObject;
  const catchall = def.catchall;
  let value;
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
    const proms = [];
    const shape = value.shape;
    const abortEarly = ctx?.abortEarly;
    let seen = payload.issues.length;
    for (const key of value.allKeys) {
      if (abortEarly && payload.issues.length !== seen) {
        if (aborted(payload, seen))
          break;
        seen = payload.issues.length;
      }
      if (key === "__proto__")
        continue;
      const el = shape[key];
      const optin = el._zod.optin;
      const optout = el._zod.optout;
      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
      } else {
        handlePropertyResult(r, payload, key, input, optin, optout);
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst, abortEarly === true);
  };
});
var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
  $ZodObject.init(inst, def);
  const superParse = inst._zod.parse;
  const _normalized = cached(() => normalizeDef(def));
  const memo = globalConfig.memoizer;
  const generateFastpass = (shape) => {
    const normalized = _normalized.value;
    const syms = normalized.symbolKeys;
    const doc = new Doc(["payload", "ctx"], { shape, inst, memo, syms });
    const parseStr = (k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    const prefixStr = (id, k) => `
          let ${id}_ab = false;
          for (let i = 0; i < ${id}.issues.length; i++) {
            const iss = ${id}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${id}_ab = true;
          }
          if (${id}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
    doc.write(`const input = payload.value;`);
    const ids = Object.create(null);
    let counter = 0;
    for (const key of normalized.allKeys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(memo ? `const newResult = memo.alloc(inst, payload, {}, ctx);` : `const newResult = {};`);
    for (const key of normalized.allKeys) {
      if (key === "__proto__")
        continue;
      const id = ids[key];
      const k = typeof key === "symbol" ? `syms[${syms.indexOf(key)}]` : esc(key);
      const isPresent = `${k} in input`;
      const schema = shape[key];
      const optin = schema?._zod?.optin;
      const isOptionalIn = optin !== undefined;
      const isOptionalOut = schema?._zod?.optout === "optional";
      doc.write(`const ${id} = ${parseStr(k)};`);
      if (isOptionalIn && isOptionalOut) {
        const assign = optin === "optional" ? `${id}_present` : `${id}.value !== undefined || ${id}_present`;
        doc.write(`
        const ${id}_present = ${isPresent};
        if (!${id}.issues.length || ${id}_present) {
          if (${id}.issues.length) {${prefixStr(id, k)}
          }

          if (${assign}) {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
      } else if (!isOptionalIn) {
        doc.write(`
        const ${id}_present = ${isPresent};
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${id}_present) {
          newResult[${k}] = ${id}.value;
        }

      `);
      } else {
        doc.write(`
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
      `);
        if (optin === "defaulted") {
          doc.write(`newResult[${k}] = ${id}.value;`);
        } else {
          doc.write(`
        if (${id}.value !== undefined || ${isPresent}) {
          newResult[${k}] = ${id}.value;
        }
      `);
        }
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    return doc.compile();
  };
  let fastpass;
  const isObject2 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval2 = allowsEval;
  const fastEnabled = jit && allowsEval2.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass)
        fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
      if (!catchall)
        return payload;
      return handleCatchall([], input, payload, ctx, value, inst, ctx?.abortEarly === true);
    }
    return superParse(payload, ctx);
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  const nonaborted = results.filter((r) => !aborted(r));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "optin", (zod) => zod.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : zod.def.options.some((o) => o._zod.optin !== undefined) ? "optional" : undefined);
  defineLazyInternal(inst, "optout", (zod) => zod.def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined);
  defineLazyInternal(inst, "values", (zod) => {
    if (zod.def.options.every((o) => o._zod.values)) {
      return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return;
  });
  defineLazyInternal(inst, "pattern", (zod) => {
    if (zod.def.options.every((o) => o._zod.pattern)) {
      const patterns = zod.def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return;
  });
  const first = def.options.length === 1 ? def.options[0]._zod.run : null;
  inst._zod.parse = (payload, ctx) => {
    if (first) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results) => {
      return handleUnionResults(results, payload, inst, ctx);
    });
  };
});
function handleExclusiveUnionResults(results, final, inst, ctx) {
  const matches = [];
  for (let i = 0;i < results.length; i++) {
    if (results[i].issues.length === 0)
      matches.push(i);
  }
  if (matches.length === 1) {
    final.value = results[matches[0]].value;
    return final;
  }
  if (matches.length === 0) {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
    });
  } else {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: [],
      inclusive: false,
      matches
    });
  }
  return final;
}
var $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
  $ZodUnion.init(inst, def);
  def.inclusive = false;
  const first = def.options.length === 1 ? def.options[0]._zod.run : null;
  inst._zod.parse = (payload, ctx) => {
    if (first) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        results.push(result);
      }
    }
    if (!async)
      return handleExclusiveUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results) => {
      return handleExclusiveUnionResults(results, payload, inst, ctx);
    });
  };
});
function getDiscriminatedOption(union, value) {
  const internals = union._zod;
  let map = internals.bag.optionsMap;
  if (!map) {
    map = discriminatorMap(internals.def);
    internals.bag.optionsMap = map;
  }
  const option = map.get(value);
  if (option === null)
    throw new Error(`Ambiguous discriminator value "${String(value)}"`);
  return option;
}
function discriminatorMap(def) {
  const map = new Map;
  for (const option of def.options) {
    const values = option._zod.propValues?.[def.discriminator];
    if (!values || values.size === 0)
      throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
    for (const value of values) {
      if (map.has(value)) {
        if (value !== undefined)
          throw new Error(`Duplicate discriminator value "${String(value)}"`);
        map.set(value, null);
      } else {
        map.set(value, option);
      }
    }
  }
  return map;
}
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
  def.inclusive = false;
  $ZodUnion.init(inst, def);
  const _super = inst._zod.parse;
  defineLazyInternal(inst, "propValues", (zod) => {
    const propValues = {};
    let undefinedCount = 0;
    for (const option of zod.def.options) {
      const pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(`Invalid discriminated union option at index "${zod.def.options.indexOf(option)}"`);
      if (pv[zod.def.discriminator]?.has(undefined))
        undefinedCount++;
      for (const [k, v] of Object.entries(pv)) {
        if (!Object.prototype.hasOwnProperty.call(propValues, k)) {
          assignProp(propValues, k, new Set);
        }
        for (const val of v) {
          propValues[k].add(val);
        }
      }
    }
    if (!zod.def.unionFallback && undefinedCount > 1)
      propValues[zod.def.discriminator]?.delete(undefined);
    return propValues;
  });
  def.options.forEach((option, i) => {
    const propShape = rawShape(option._zod.def);
    if (propShape && !Object.prototype.hasOwnProperty.call(propShape, def.discriminator)) {
      throw new Error(`Invalid discriminated union option at index "${i}"`);
    }
  });
  const disc = cached(() => discriminatorMap(def));
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isObject(input)) {
      payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input,
        inst
      });
      return payload;
    }
    const value = input?.[def.discriminator];
    const opt = disc.value.get(value);
    if (opt && (value !== undefined || ctx.direction !== "backward")) {
      return opt._zod.run(payload, ctx);
    }
    if (def.unionFallback || ctx.direction === "backward") {
      return _super(payload, ctx);
    }
    payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: def.discriminator,
      options: Array.from(disc.value.keys()).filter((value) => disc.value.get(value) !== null),
      input,
      path: [def.discriminator],
      inst
    });
    return payload;
  };
});
var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left, right]) => {
        return handleIntersectionResults(payload, left, right);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    if (Object.prototype.hasOwnProperty.call(newObj, "__proto__"))
      delete newObj.__proto__;
    for (const key of sharedKeys) {
      if (key === "__proto__")
        continue;
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0;index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  const unrecKeys = new Map;
  let unrecIssue;
  const keyIssues = new Map;
  const collect = (iss, side) => {
    let keys;
    if (iss.code === "unrecognized_keys" && !iss.path?.length) {
      unrecIssue ?? (unrecIssue = iss);
      keys = iss.keys;
    } else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
      const k = String(iss.path[0]);
      if (!keyIssues.has(k))
        keyIssues.set(k, iss);
      keys = [k];
    } else {
      return false;
    }
    for (const k of keys) {
      if (!unrecKeys.has(k))
        unrecKeys.set(k, {});
      unrecKeys.get(k)[side] = true;
    }
    return true;
  };
  for (const iss of left.issues) {
    if (!collect(iss, "l"))
      result.issues.push(iss);
  }
  for (const iss of right.issues) {
    if (!collect(iss, "r"))
      result.issues.push(iss);
  }
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length) {
    const aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
    if (aggregated.length)
      result.issues.push({ ...unrecIssue, keys: aggregated });
    for (const k of bothKeys) {
      if (!aggregated.includes(k) && keyIssues.has(k))
        result.issues.push(keyIssues.get(k));
    }
  }
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    if (aborted(result))
      return result;
    throw new Error(`Unmergable intersection. Error path: ` + `${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
var $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
  $ZodType.init(inst, def);
  const items = def.items;
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        input,
        inst,
        expected: "tuple",
        code: "invalid_type"
      });
      return payload;
    }
    payload.value = memo ? memo.alloc(inst, payload, [], ctx) : [];
    const proms = [];
    const optinStart = getTupleOptStart(items, "optin");
    const optoutStart = getTupleOptStart(items, "optout");
    if (!def.rest) {
      if (input.length < optinStart) {
        payload.issues.push({
          code: "too_small",
          minimum: optinStart,
          inclusive: true,
          input,
          inst,
          origin: "array"
        });
        return payload;
      }
      if (input.length > items.length) {
        payload.issues.push({
          code: "too_big",
          maximum: items.length,
          inclusive: true,
          input,
          inst,
          origin: "array"
        });
      }
    }
    const itemResults = new Array(items.length);
    const abortEarly = def.rest ? ctx?.abortEarly : undefined;
    let itemAborted = false;
    for (let i = 0;i < items.length; i++) {
      const r = items[i]._zod.run({ value: input[i], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((rr) => {
          itemResults[i] = rr;
        }));
      } else {
        itemResults[i] = r;
        if (abortEarly && !itemAborted && r.issues.length)
          itemAborted = aborted(r);
      }
    }
    if (def.rest && !itemAborted) {
      let i = items.length - 1;
      const rest = input.slice(items.length);
      let seen = payload.issues.length;
      for (const el of rest) {
        if (abortEarly && payload.issues.length !== seen) {
          if (aborted(payload, seen))
            break;
          seen = payload.issues.length;
        }
        i++;
        const result = def.rest._zod.run({ value: el, issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((r) => handleTupleResult(r, payload, i)));
        } else {
          handleTupleResult(result, payload, i);
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => handleTupleResults(itemResults, payload, items, input, optoutStart));
    }
    return handleTupleResults(itemResults, payload, items, input, optoutStart);
  };
});
function getTupleOptStart(items, key) {
  for (let i = items.length - 1;i >= 0; i--) {
    const omittable = key === "optin" ? items[i]._zod.optin !== undefined : items[i]._zod.optout === "optional";
    if (!omittable)
      return i + 1;
  }
  return 0;
}
function handleTupleResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
function handleTupleResults(itemResults, final, items, input, optoutStart) {
  for (let i = 0;i < items.length; i++) {
    const r = itemResults[i];
    const isPresent = i < input.length;
    if (!isPresent && i >= optoutStart && items[i]._zod.optin === "optional") {
      final.value.length = i;
      break;
    }
    if (r.issues.length) {
      if (!isPresent && i >= optoutStart) {
        final.value.length = i;
        break;
      }
      final.issues.push(...prefixIssues(i, r.issues));
    }
    final.value[i] = r.value;
  }
  for (let i = final.value.length - 1;i >= input.length; i--) {
    if (items[i]._zod.optout === "optional" && final.value[i] === undefined) {
      final.value.length = i;
    } else {
      break;
    }
  }
  return final;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    const values = def.keyType._zod.values;
    if (values && !def.partial) {
      payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
      const recordKeys = new Set;
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          recordKeys.add(typeof key === "number" ? key.toString() : key);
          if (key === "__proto__")
            continue;
          const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
          if (keyResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (keyResult.issues.length) {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst
            });
            continue;
          }
          const outKey = keyResult.value;
          if (outKey === "__proto__")
            continue;
          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result) => {
              if (result.issues.length) {
                payload.issues.push(...prefixIssues(key, result.issues));
              }
              payload.value[outKey] = result.value;
            }));
          } else {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[outKey] = result.value;
          }
        }
      }
      let unrecognized;
      for (const key in input) {
        if (!recordKeys.has(key)) {
          if (def.mode === "loose") {
            if (key === "__proto__")
              continue;
            payload.value[key] = input[key];
          } else {
            unrecognized = unrecognized ?? [];
            unrecognized.push(key);
          }
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized,
          continue: true
        });
      }
    } else {
      payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
      let unrecognized;
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__")
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(input, key))
          continue;
        let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        const checkNumericKey = typeof key === "string" && number.test(key) && keyResult.issues.length;
        if (checkNumericKey) {
          const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
          if (retryResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (retryResult.issues.length === 0) {
            keyResult = retryResult;
          }
        }
        if (keyResult.issues.length) {
          if (def.mode === "loose") {
            payload.value[key] = input[key];
          } else if (values) {
            unrecognized = unrecognized ?? [];
            unrecognized.push(key);
          } else {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst
            });
          }
          continue;
        }
        const outKey = keyResult.value;
        if (outKey === "__proto__")
          continue;
        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result) => {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[outKey] = result.value;
          }));
        } else {
          if (result.issues.length) {
            payload.issues.push(...prefixIssues(key, result.issues));
          }
          payload.value[outKey] = result.value;
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized,
          continue: true
        });
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
var $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
  $ZodType.init(inst, def);
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Map)) {
      payload.issues.push({
        expected: "map",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    payload.value = memo ? memo.alloc(inst, payload, new Map, ctx) : new Map;
    const abortEarly = ctx?.abortEarly;
    let seen = payload.issues.length;
    for (const [key, value] of input) {
      if (abortEarly && payload.issues.length !== seen) {
        if (aborted(payload, seen))
          break;
        seen = payload.issues.length;
      }
      const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
      const valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
      if (keyResult instanceof Promise || valueResult instanceof Promise) {
        proms.push(Promise.all([keyResult, valueResult]).then(([keyResult, valueResult]) => {
          handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
        }));
      } else {
        handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
  if (keyResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, keyResult.issues));
    } else {
      final.issues.push({
        code: "invalid_key",
        origin: "map",
        input,
        inst,
        issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  if (valueResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, valueResult.issues));
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_element",
        input,
        inst,
        key,
        issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  final.value.set(keyResult.value, valueResult.value);
}
var $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
  $ZodType.init(inst, def);
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Set)) {
      payload.issues.push({
        input,
        inst,
        expected: "set",
        code: "invalid_type"
      });
      return payload;
    }
    const proms = [];
    payload.value = memo ? memo.alloc(inst, payload, new Set, ctx) : new Set;
    const abortEarly = ctx?.abortEarly;
    let seen = payload.issues.length;
    for (const item of input) {
      if (abortEarly && payload.issues.length !== seen) {
        if (aborted(payload, seen))
          break;
        seen = payload.issues.length;
      }
      const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result) => handleSetResult(result, payload)));
      } else
        handleSetResult(result, payload);
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleSetResult(result, final) {
  if (result.issues.length) {
    final.issues.push(...result.issues);
  }
  final.value.add(result.value);
}
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  const valuesSet = new Set(values);
  inst._zod.values = valuesSet;
  defineLazyInternal(inst, "pattern", (zod) => {
    const patternValues = getEnumValues(zod.def.entries).filter((k) => propertyKeyTypes.has(typeof k));
    return new RegExp(patternValues.length ? `^(${patternValues.map((o) => escapeRegex(o.toString())).join("|")})$` : "^[^\\s\\S]$");
  });
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (valuesSet.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  const values = new Set(def.values);
  inst._zod.values = values;
  defineLazyInternal(inst, "pattern", (zod) => {
    const vals = zod.def.values;
    return new RegExp(vals.length ? `^(${vals.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$` : "^[^\\s\\S]$");
  });
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input instanceof File)
      return payload;
    payload.issues.push({
      expected: "file",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  globalConfig.memoizer?.guard(inst);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    const _out = def.transform(payload.value, payload);
    if (ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output) => {
        payload.value = output;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError;
    }
    payload.value = _out;
    return payload;
  };
});
function handleOptionalResult(payload, result) {
  payload.value = result.issues.length ? undefined : result.value;
  return payload;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
  inst._zod.optout = "optional";
  defineLazyInternal(inst, "values", (zod) => {
    const values = zod.def.innerType._zod.values;
    return values ? new Set([...values, undefined]) : undefined;
  });
  defineLazyInternal(inst, "pattern", (zod) => {
    const pattern = zod.def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === undefined) {
      if (def.innerType._zod.optin !== "defaulted")
        return payload;
      const result = def.innerType._zod.run({ value: payload.value, issues: [] }, ctx);
      if (result instanceof Promise)
        return result.then((result) => handleOptionalResult(payload, result));
      return handleOptionalResult(payload, result);
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  defineLazyInternal(inst, "pattern", (zod) => zod.def.innerType._zod.pattern);
  inst._zod.parse = (payload, ctx) => {
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin);
  defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
  defineLazyInternal(inst, "pattern", (zod) => {
    const pattern = zod.def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : undefined;
  });
  defineLazyInternal(inst, "values", (zod) => {
    return zod.def.innerType._zod.values ? new Set([...zod.def.innerType._zod.values, null]) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "defaulted";
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result) => handleDefaultResult(result, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === undefined) {
    payload.value = def.defaultValue;
  }
  return payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "defaulted";
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "values", (zod) => {
    const v = zod.def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== undefined)) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result) => handleNonOptionalResult(result, inst));
    }
    return handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === undefined) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
var $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError("ZodSuccess");
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result) => {
        payload.value = result.issues.length === 0;
        return payload;
      });
    }
    payload.value = result.issues.length === 0;
    return payload;
  };
});
function handleCatchResult(payload, result, def, ctx) {
  if (!result.issues.length) {
    payload.value = result.value;
    if (result.memo)
      payload.memo = true;
    return payload;
  }
  payload.value = def.catchValue({
    ...result,
    value: payload.value,
    error: {
      issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
    },
    input: payload.value
  });
  return payload;
}
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
  defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run({ value: payload.value, issues: [] }, ctx);
    if (result instanceof Promise) {
      return result.then((result) => handleCatchResult(payload, result, def, ctx));
    }
    return handleCatchResult(payload, result, def, ctx);
  };
});
var $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "nan",
        code: "invalid_type"
      });
      return payload;
    }
    return payload;
  };
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
  defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
  defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
  defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right) => handlePipeResult(right, def.in, ctx));
      }
      return handlePipeResult(right, def.in, ctx);
    }
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left) => handlePipeResult(left, def.out, ctx));
    }
    return handlePipeResult(left, def.out, ctx);
  };
});
function handlePipeResult(left, next, ctx) {
  if (left.issues.some((iss) => iss.code !== "unrecognized_keys")) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
var $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
  defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
  defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
  defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    const direction = ctx.direction || "forward";
    if (direction === "forward") {
      const left = def.in._zod.run(payload, ctx);
      if (left instanceof Promise) {
        return left.then((left) => handleCodecAResult(left, def, ctx));
      }
      return handleCodecAResult(left, def, ctx);
    } else {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right) => handleCodecAResult(right, def, ctx));
      }
      return handleCodecAResult(right, def, ctx);
    }
  };
});
function handleCodecAResult(result, def, ctx) {
  if (result.issues.length) {
    result.aborted = true;
    return result;
  }
  const direction = ctx.direction || "forward";
  if (direction === "forward") {
    const transformed = def.transform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
    }
    return handleCodecTxResult(result, transformed, def.out, ctx);
  } else {
    const transformed = def.reverseTransform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
    }
    return handleCodecTxResult(result, transformed, def.in, ctx);
  }
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return nextSchema._zod.run({ value, issues: left.issues }, ctx);
}
var $ZodPreprocess = /* @__PURE__ */ $constructor("$ZodPreprocess", (inst, def) => {
  $ZodPipe.init(inst, def);
});
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "propValues", (zod) => zod.def.innerType._zod.propValues);
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  defineLazyInternal(inst, "optin", (zod) => zod.def.innerType?._zod?.optin);
  defineLazyInternal(inst, "optout", (zod) => zod.def.innerType?._zod?.optout);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  if (!payload.memo)
    payload.value = Object.freeze(payload.value);
  return payload;
}
function leafPattern(schema) {
  const def = schema._zod.def;
  let pattern = def.pattern;
  let isInt = !!def.format?.includes("int");
  let minimum;
  let maximum;
  for (const ch of def.checks ?? []) {
    const d = ch._zod.def;
    if (d.pattern)
      pattern = d.pattern;
    isInt || (isInt = !!d.format?.includes("int"));
    const lo = d.minimum ?? d.length;
    const hi = d.maximum ?? d.length;
    if (lo !== undefined && (minimum === undefined || lo > minimum))
      minimum = lo;
    if (hi !== undefined && (maximum === undefined || hi < maximum))
      maximum = hi;
  }
  if (pattern)
    return pattern.source;
  if (minimum !== undefined && maximum !== undefined && minimum > maximum)
    return "(?!)";
  if (minimum !== undefined || maximum !== undefined)
    return string({ minimum, maximum }).source;
  const own = schema._zod.pattern;
  return (isInt && own === number ? integer : own)?.source;
}
function partPattern(schema) {
  const def = schema._zod.def;
  const own = schema._zod.pattern?.source;
  const inner = def.innerType ?? schema._zod.innerType;
  if (inner) {
    const before = inner._zod.pattern?.source;
    const after = partPattern(inner);
    if (own && before && after && after !== before) {
      return own.replace(cleanRegex(before), () => cleanRegex(after));
    }
    return own;
  }
  if (def.options) {
    const sources = def.options.map(partPattern);
    if (sources.every(Boolean))
      return `^(${sources.map((s) => cleanRegex(s)).join("|")})$`;
  }
  return leafPattern(schema);
}
var $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  const regexParts = [];
  for (const part of def.parts) {
    if (typeof part === "object" && part !== null) {
      const source = partPattern(part);
      if (!source) {
        throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
      }
      regexParts.push(cleanRegex(source));
    } else if (part === null || primitiveTypes.has(typeof part)) {
      regexParts.push(escapeRegex(`${part}`));
    } else {
      throw new Error(`Invalid template literal part: ${part}`);
    }
  }
  inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "string") {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "string",
        code: "invalid_type"
      });
      return payload;
    }
    inst._zod.pattern.lastIndex = 0;
    if (!inst._zod.pattern.test(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        code: "invalid_format",
        format: def.format ?? "template_literal",
        pattern: inst._zod.pattern.source
      });
      return payload;
    }
    return payload;
  };
});
var $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => {
  $ZodType.init(inst, def);
  Object.defineProperty(inst, "_def", { value: def });
  inst._zod.def = def;
  inst.implement = (func) => {
    if (typeof func !== "function") {
      throw new Error("implement() must be called with a function");
    }
    return Object.defineProperty(function(...args) {
      const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args;
      const result = Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return parse(inst._def.output, result);
      }
      return result;
    }, "_zod", { value: inst._zod, enumerable: false });
  };
  inst.implementAsync = (func) => {
    if (typeof func !== "function") {
      throw new Error("implementAsync() must be called with a function");
    }
    return Object.defineProperty(async function(...args) {
      const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args;
      const result = await Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return await parseAsync(inst._def.output, result);
      }
      return result;
    }, "_zod", { value: inst._zod, enumerable: false });
  };
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "function") {
      payload.issues.push({
        code: "invalid_type",
        expected: "function",
        input: payload.value,
        inst
      });
      return payload;
    }
    const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
    if (hasPromiseOutput) {
      payload.value = inst.implementAsync(payload.value);
    } else {
      payload.value = inst.implement(payload.value);
    }
    return payload;
  };
  inst.input = (...args) => {
    const F = inst.constructor;
    if (Array.isArray(args[0])) {
      return new F({
        type: "function",
        input: new $ZodTuple({
          type: "tuple",
          items: args[0],
          rest: args[1]
        }),
        output: inst._def.output
      });
    }
    return new F({
      type: "function",
      input: args[0],
      output: inst._def.output
    });
  };
  inst.output = (output) => {
    const F = inst.constructor;
    return new F({
      type: "function",
      input: inst._def.input,
      output
    });
  };
  return inst;
});
var $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
  };
});
var $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "innerType", () => {
    const d = def;
    if (!d._cachedInner)
      d._cachedInner = def.getter();
    return d._cachedInner;
  });
  defineLazyInternal(inst, "pattern", (zod) => zod.innerType?._zod?.pattern);
  defineLazyInternal(inst, "propValues", (zod) => zod.innerType?._zod?.propValues);
  defineLazyInternal(inst, "optin", (zod) => zod.innerType?._zod?.optin ?? undefined);
  defineLazyInternal(inst, "optout", (zod) => zod.innerType?._zod?.optout ?? undefined);
  inst._zod.parse = (payload, ctx) => {
    const inner = inst._zod.innerType;
    return inner._zod.run(payload, ctx);
  };
});
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r) => handleRefineResult(r, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      path: [...inst._zod.def.path ?? []],
      continue: !inst._zod.def.abort
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/memoizer.js
class $ZodCyclicError extends Error {
  constructor() {
    super(`Cannot parse a reference cycle that closes through a transform`);
    this.name = "ZodCyclicError";
  }
}
var STATE = "~memo";
var NO_ISSUES = [];
function isRef(value) {
  return value !== null && typeof value === "object";
}
function cloneIssues(issues) {
  return issues.map((iss) => iss.path ? { ...iss, path: iss.path.slice() } : { ...iss });
}
var recursive = /* @__PURE__ */ new WeakMap;
var NONE = 0;
var ASSUMED = 1;
var PROVEN = 2;
function isRecursive(inst, stack, resolve) {
  const cached = recursive.get(inst);
  if (cached !== undefined)
    return cached ? PROVEN : NONE;
  if (stack.has(inst))
    return PROVEN;
  stack.add(inst);
  let result = NONE;
  const check = (child) => {
    if (result !== PROVEN && child?._zod) {
      const answer = isRecursive(child, stack, resolve);
      if (answer > result)
        result = answer;
    }
  };
  const shape = (sh, spread) => {
    let answer = NONE;
    for (const key of Reflect.ownKeys(sh)) {
      const desc = Object.getOwnPropertyDescriptor(sh, key);
      if (spread && !desc.enumerable)
        continue;
      const child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack, resolve) : NONE;
      if (child > answer)
        answer = child;
    }
    return answer;
  };
  const merge = (answer) => {
    if (answer > result)
      result = answer;
  };
  const def = inst._zod.def;
  const kind = def.type;
  switch (kind) {
    case "object": {
      const raw = rawShape(def);
      merge(raw ? shape(raw, true) : ASSUMED);
      check(def.catchall);
      break;
    }
    case "array":
      check(def.element);
      break;
    case "tuple":
      for (const el of def.items)
        check(el);
      check(def.rest);
      break;
    case "record":
    case "map":
      check(def.keyType);
      check(def.valueType);
      break;
    case "set":
      check(def.valueType);
      break;
    case "union":
      for (const el of def.options)
        check(el);
      break;
    case "intersection":
      check(def.left);
      check(def.right);
      break;
    case "optional":
    case "nullable":
    case "default":
    case "prefault":
    case "catch":
    case "readonly":
    case "nonoptional":
    case "promise":
    case "success":
      check(def.innerType);
      break;
    case "pipe":
      check(def.in);
      check(def.out);
      break;
    case "function":
      check(def.input);
      check(def.output);
      break;
    case "lazy": {
      const inner = def._cachedInner ?? (resolve ? inst._zod.innerType : undefined);
      merge(inner ? isRecursive(inner, stack, false) : ASSUMED);
      break;
    }
    case "template_literal":
    case "string":
    case "number":
    case "int":
    case "boolean":
    case "bigint":
    case "symbol":
    case "undefined":
    case "null":
    case "void":
    case "never":
    case "any":
    case "unknown":
    case "date":
    case "nan":
    case "enum":
    case "literal":
    case "file":
    case "transform":
    case "custom":
      break;
    default: {
      for (const key in def) {
        const desc = Object.getOwnPropertyDescriptor(def, key);
        if (!desc || desc.get)
          continue;
        const value = desc.value;
        if (!value || typeof value !== "object")
          continue;
        if (value._zod)
          check(value);
        else if (Array.isArray(value))
          for (const el of value)
            check(el);
      }
    }
  }
  stack.delete(inst);
  return settle(inst, result);
}
function settle(inst, answer) {
  if (answer !== ASSUMED)
    recursive.set(inst, answer === PROVEN);
  return answer;
}
function isRecursiveSchema(inst) {
  return isRecursive(inst, new Set, true) !== NONE;
}
function bucketFor(state, inst) {
  let bucket = state.buckets.get(inst);
  if (!bucket) {
    bucket = new WeakMap;
    state.buckets.set(inst, bucket);
  }
  return bucket;
}
var handoff;
var open = [];
var memo = {
  alloc(_inst, payload, empty) {
    const bucket = handoff;
    if (!bucket)
      return empty;
    handoff = undefined;
    const entry = { value: empty, issues: null };
    bucket.set(payload.value, entry);
    open.push(entry);
    return empty;
  },
  guard(inst) {
    var _a;
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred.push(() => {
      const base = inst._zod.parse;
      const wrapped = (payload, ctx) => {
        if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value))
          throw new $ZodCyclicError;
        return base(payload, ctx);
      };
      inst._zod.parse = wrapped;
      if (inst._zod.run === base)
        inst._zod.run = wrapped;
    });
  },
  attach(inst) {
    var _a;
    let isRecursiveInst;
    let rechecked = false;
    let lastCtx;
    let lastBucket;
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred.push(() => {
      const base = inst._zod.parse;
      const wrapped = (payload, ctx) => {
        if (isRecursiveInst === undefined) {
          const walked = isRecursive(inst, new Set, false);
          if (walked === NONE) {
            inst._zod.parse = base;
            if (inst._zod.run === wrapped)
              inst._zod.run = base;
            return base(payload, ctx);
          }
          if (walked === PROVEN || rechecked)
            isRecursiveInst = true;
          else
            rechecked = true;
        }
        const input = payload.value;
        if (!isRef(input))
          return base(payload, ctx);
        let state = ctx[STATE];
        if (!state) {
          state = { buckets: new WeakMap, backEdges: undefined };
          ctx[STATE] = state;
        }
        let bucket;
        if (lastCtx === ctx) {
          bucket = lastBucket;
        } else {
          bucket = bucketFor(state, inst);
          lastCtx = ctx;
          lastBucket = bucket;
        }
        const hit = bucket.get(input);
        if (hit) {
          payload.value = hit.value;
          if (hit.issues) {
            if (hit.issues.length)
              payload.issues.push(...cloneIssues(hit.issues));
          } else {
            payload.memo = true;
            state.backEdges ?? (state.backEdges = new WeakSet);
            state.backEdges.add(hit.value);
          }
          return payload;
        }
        handoff = bucket;
        const depth = open.length;
        const result = base(payload, ctx);
        handoff = undefined;
        const entry = open.length > depth ? open.pop() : undefined;
        if (result instanceof Promise) {
          return result.then((r) => {
            if (entry)
              entry.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES;
            return r;
          });
        }
        if (entry)
          entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES;
        return result;
      };
      inst._zod.parse = wrapped;
      if (inst._zod.run === base)
        inst._zod.run = wrapped;
    });
  }
};
function memoizer() {
  return memo;
}
function isBackEdge(ctx, value) {
  const backEdges = ctx[STATE]?.backEdges;
  return backEdges !== undefined && isRef(value) && backEdges.has(value);
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ar.js
var error = () => {
  const Sizable = {
    string: { unit: "حرف", verb: "أن يحوي" },
    file: { unit: "بايت", verb: "أن يحوي" },
    array: { unit: "عنصر", verb: "أن يحوي" },
    set: { unit: "عنصر", verb: "أن يحوي" },
    map: { unit: "عنصر", verb: "أن يحوي" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "مدخل",
    email: "بريد إلكتروني",
    url: "رابط",
    emoji: "إيموجي",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "تاريخ ووقت بمعيار ISO",
    date: "تاريخ بمعيار ISO",
    time: "وقت بمعيار ISO",
    duration: "مدة بمعيار ISO",
    ipv4: "عنوان IPv4",
    ipv6: "عنوان IPv6",
    mac: "عنوان MAC",
    cidrv4: "مدى عناوين بصيغة IPv4",
    cidrv6: "مدى عناوين بصيغة IPv6",
    base64: "نَص بترميز base64-encoded",
    base64url: "نَص بترميز base64url-encoded",
    json_string: "نَص على هيئة JSON",
    e164: "رقم هاتف بمعيار E.164",
    credit_card: "رقم بطاقة الائتمان",
    currency_code: "رمز العملة",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "مدخل"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `مدخلات غير مقبولة: يفترض إدخال instanceof ${issue.expected}، ولكن تم إدخال ${received}`;
        }
        return `مدخلات غير مقبولة: يفترض إدخال ${expected}، ولكن تم إدخال ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `مدخلات غير مقبولة: يفترض إدخال ${stringifyPrimitive(issue.values[0])}`;
        return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return ` أكبر من اللازم: يفترض أن تكون ${issue.origin ?? "القيمة"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "عنصر"}`;
        return `أكبر من اللازم: يفترض أن تكون ${issue.origin ?? "القيمة"} ${adj} ${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `أصغر من اللازم: يفترض لـ ${issue.origin} أن يكون ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `أصغر من اللازم: يفترض لـ ${issue.origin} أن يكون ${adj} ${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `نَص غير مقبول: يجب أن يبدأ بـ "${issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `نَص غير مقبول: يجب أن ينتهي بـ "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `نَص غير مقبول: يجب أن يتضمَّن "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `نَص غير مقبول: يجب أن يطابق النمط ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue.format} غير مقبول`;
      }
      case "not_multiple_of":
        return `رقم غير مقبول: يجب أن يكون من مضاعفات ${issue.divisor}`;
      case "unrecognized_keys":
        return `معرف${issue.keys.length > 1 ? "ات" : ""} غريب${issue.keys.length > 1 ? "ة" : ""}: ${joinValues(issue.keys, "، ")}`;
      case "invalid_key":
        return `معرف غير مقبول في ${issue.origin}`;
      case "invalid_union":
        return "مدخل غير مقبول";
      case "invalid_element":
        return `مدخل غير مقبول في ${issue.origin}`;
      default:
        return "مدخل غير مقبول";
    }
  };
};
function ar_default() {
  return {
    localeError: error()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/az.js
var error2 = () => {
  const Sizable = {
    string: { unit: "simvol", verb: "olmalıdır" },
    file: { unit: "bayt", verb: "olmalıdır" },
    array: { unit: "element", verb: "olmalıdır" },
    set: { unit: "element", verb: "olmalıdır" },
    map: { unit: "element", verb: "olmalıdır" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    credit_card: "kredit kartı nömrəsi",
    currency_code: "valyuta kodu",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Yanlış dəyər: gözlənilən instanceof ${issue.expected}, daxil olan ${received}`;
        }
        return `Yanlış dəyər: gözlənilən ${expected}, daxil olan ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Yanlış dəyər: gözlənilən ${stringifyPrimitive(issue.values[0])}`;
        return `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Çox böyük: gözlənilən ${issue.origin ?? "dəyər"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `Çox böyük: gözlənilən ${issue.origin ?? "dəyər"} ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Çox kiçik: gözlənilən ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        return `Çox kiçik: gözlənilən ${issue.origin} ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Yanlış mətn: "${_issue.prefix}" ilə başlamalıdır`;
        if (_issue.format === "ends_with")
          return `Yanlış mətn: "${_issue.suffix}" ilə bitməlidir`;
        if (_issue.format === "includes")
          return `Yanlış mətn: "${_issue.includes}" daxil olmalıdır`;
        if (_issue.format === "regex")
          return `Yanlış mətn: ${_issue.pattern} şablonuna uyğun olmalıdır`;
        return `Yanlış ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Yanlış ədəd: ${issue.divisor} ilə bölünə bilən olmalıdır`;
      case "unrecognized_keys":
        return `Tanınmayan açar${issue.keys.length > 1 ? "lar" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `${issue.origin} daxilində yanlış açar`;
      case "invalid_union":
        return "Yanlış dəyər";
      case "invalid_element":
        return `${issue.origin} daxilində yanlış dəyər`;
      default:
        return `Yanlış dəyər`;
    }
  };
};
function az_default() {
  return {
    localeError: error2()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/be.js
function getBelarusianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error3 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "сімвал",
        few: "сімвалы",
        many: "сімвалаў"
      },
      verb: "мець"
    },
    array: {
      unit: {
        one: "элемент",
        few: "элементы",
        many: "элементаў"
      },
      verb: "мець"
    },
    set: {
      unit: {
        one: "элемент",
        few: "элементы",
        many: "элементаў"
      },
      verb: "мець"
    },
    map: {
      unit: {
        one: "элемент",
        few: "элементы",
        many: "элементаў"
      },
      verb: "мець"
    },
    file: {
      unit: {
        one: "байт",
        few: "байты",
        many: "байтаў"
      },
      verb: "мець"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "увод",
    email: "email адрас",
    url: "URL",
    emoji: "эмодзі",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO дата і час",
    date: "ISO дата",
    time: "ISO час",
    duration: "ISO працягласць",
    ipv4: "IPv4 адрас",
    ipv6: "IPv6 адрас",
    mac: "MAC адрас",
    cidrv4: "IPv4 дыяпазон",
    cidrv6: "IPv6 дыяпазон",
    base64: "радок у фармаце base64",
    base64url: "радок у фармаце base64url",
    json_string: "JSON радок",
    e164: "нумар E.164",
    credit_card: "нумар крэдытнай карты",
    currency_code: "код валюты",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "увод"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "лік",
    array: "масіў"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Няправільны ўвод: чакаўся instanceof ${issue.expected}, атрымана ${received}`;
        }
        return `Няправільны ўвод: чакаўся ${expected}, атрымана ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Няправільны ўвод: чакалася ${stringifyPrimitive(issue.values[0])}`;
        return `Няправільны варыянт: чакаўся адзін з ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          const maxValue = Number(issue.maximum);
          const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Занадта вялікі: чакалася, што ${issue.origin ?? "значэнне"} павінна ${sizing.verb} ${adj}${issue.maximum.toString()} ${unit}`;
        }
        return `Занадта вялікі: чакалася, што ${issue.origin ?? "значэнне"} павінна быць ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          const minValue = Number(issue.minimum);
          const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Занадта малы: чакалася, што ${issue.origin} павінна ${sizing.verb} ${adj}${issue.minimum.toString()} ${unit}`;
        }
        return `Занадта малы: чакалася, што ${issue.origin} павінна быць ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Няправільны радок: павінен пачынацца з "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Няправільны радок: павінен заканчвацца на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Няправільны радок: павінен змяшчаць "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Няправільны радок: павінен адпавядаць шаблону ${_issue.pattern}`;
        return `Няправільны ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Няправільны лік: павінен быць кратным ${issue.divisor}`;
      case "unrecognized_keys":
        return `Нераспазнаны ${issue.keys.length > 1 ? "ключы" : "ключ"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Няправільны ключ у ${issue.origin}`;
      case "invalid_union":
        return "Няправільны ўвод";
      case "invalid_element":
        return `Няправільнае значэнне ў ${issue.origin}`;
      default:
        return `Няправільны ўвод`;
    }
  };
};
function be_default() {
  return {
    localeError: error3()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/bg.js
var error4 = () => {
  const Sizable = {
    string: { unit: "символа", verb: "да съдържа" },
    file: { unit: "байта", verb: "да съдържа" },
    array: { unit: "елемента", verb: "да съдържа" },
    set: { unit: "елемента", verb: "да съдържа" },
    map: { unit: "елемента", verb: "да съдържа" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "вход",
    email: "имейл адрес",
    url: "URL",
    emoji: "емоджи",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO време",
    date: "ISO дата",
    time: "ISO време",
    duration: "ISO продължителност",
    ipv4: "IPv4 адрес",
    ipv6: "IPv6 адрес",
    mac: "MAC адрес",
    cidrv4: "IPv4 диапазон",
    cidrv6: "IPv6 диапазон",
    base64: "base64-кодиран низ",
    base64url: "base64url-кодиран низ",
    json_string: "JSON низ",
    e164: "E.164 номер",
    credit_card: "номер на кредитна карта",
    currency_code: "код на валута",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "вход"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "число",
    array: "масив"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Невалиден вход: очакван instanceof ${issue.expected}, получен ${received}`;
        }
        return `Невалиден вход: очакван ${expected}, получен ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Невалиден вход: очакван ${stringifyPrimitive(issue.values[0])}`;
        return `Невалидна опция: очаквано едно от ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Твърде голямо: очаква се ${issue.origin ?? "стойност"} да съдържа ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елемента"}`;
        return `Твърде голямо: очаква се ${issue.origin ?? "стойност"} да бъде ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Твърде малко: очаква се ${issue.origin} да съдържа ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Твърде малко: очаква се ${issue.origin} да бъде ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Невалиден низ: трябва да започва с "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Невалиден низ: трябва да завършва с "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Невалиден низ: трябва да включва "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Невалиден низ: трябва да съвпада с ${_issue.pattern}`;
        let invalid_adj = "Невалиден";
        if (_issue.format === "emoji")
          invalid_adj = "Невалидно";
        if (_issue.format === "datetime")
          invalid_adj = "Невалидно";
        if (_issue.format === "date")
          invalid_adj = "Невалидна";
        if (_issue.format === "time")
          invalid_adj = "Невалидно";
        if (_issue.format === "duration")
          invalid_adj = "Невалидна";
        return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Невалидно число: трябва да бъде кратно на ${issue.divisor}`;
      case "unrecognized_keys":
        return `Неразпознат${issue.keys.length > 1 ? "и" : ""} ключ${issue.keys.length > 1 ? "ове" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Невалиден ключ в ${issue.origin}`;
      case "invalid_union":
        return "Невалиден вход";
      case "invalid_element":
        return `Невалидна стойност в ${issue.origin}`;
      default:
        return `Невалиден вход`;
    }
  };
};
function bg_default() {
  return {
    localeError: error4()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/bn.js
var error5 = () => {
  const Sizable = {
    string: { unit: "অক্ষর", verb: "থাকতে হবে" },
    file: { unit: "বাইট", verb: "থাকতে হবে" },
    array: { unit: "আইটেম", verb: "থাকতে হবে" },
    set: { unit: "আইটেম", verb: "থাকতে হবে" },
    map: { unit: "এন্ট্রি", verb: "থাকতে হবে" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ইনপুট",
    email: "ইমেইল ঠিকানা",
    url: "URL",
    emoji: "ইমোজি",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO তারিখ ও সময়",
    date: "ISO তারিখ",
    time: "ISO সময়",
    duration: "ISO সময়কাল",
    ipv4: "IPv4 ঠিকানা",
    ipv6: "IPv6 ঠিকানা",
    mac: "MAC ঠিকানা",
    cidrv4: "IPv4 রেঞ্জ",
    cidrv6: "IPv6 রেঞ্জ",
    base64: "base64-এনকোডেড স্ট্রিং",
    base64url: "base64url-এনকোডেড স্ট্রিং",
    json_string: "JSON স্ট্রিং",
    e164: "E.164 নম্বর",
    credit_card: "ক্রেডিট কার্ড নম্বর",
    currency_code: "মুদ্রা কোড",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ইনপুট"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `অবৈধ ইনপুট: প্রত্যাশিত ${expected}, প্রাপ্ত ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `অবৈধ ইনপুট: প্রত্যাশিত ${stringifyPrimitive(issue.values[0])}`;
        return `অবৈধ অপশন: ${joinValues(issue.values, " | ")} এর মধ্যে একটি প্রত্যাশিত`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `অনেক বড়: ${issue.origin ?? "মান"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "এলিমেন্ট"} হতে হবে`;
        return `অনেক বড়: ${issue.origin ?? "মান"} ${adj}${issue.maximum.toString()} হতে হবে`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `অনেক ছোট: ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} হতে হবে`;
        }
        return `অনেক ছোট: ${issue.origin} ${adj}${issue.minimum.toString()} হতে হবে`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `অবৈধ স্ট্রিং: "${_issue.prefix}" দিয়ে শুরু হতে হবে`;
        }
        if (_issue.format === "ends_with")
          return `অবৈধ স্ট্রিং: "${_issue.suffix}" দিয়ে শেষ হতে হবে`;
        if (_issue.format === "includes")
          return `অবৈধ স্ট্রিং: "${_issue.includes}" অন্তর্ভুক্ত থাকতে হবে`;
        if (_issue.format === "regex")
          return `অবৈধ স্ট্রিং: ${_issue.pattern} প্যাটার্ন মিলতে হবে`;
        return `অবৈধ ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `অবৈধ নম্বর: ${issue.divisor} এর গুণিতক হতে হবে`;
      case "unrecognized_keys":
        return `অচেনা কী${issue.keys.length > 1 ? "গুলো" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `${issue.origin} এ অবৈধ কী`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `অবৈধ ডিসক্রিমিনেটর মান। প্রত্যাশিত ${opts}`;
        }
        return "অবৈধ ইনপুট";
      case "invalid_element":
        return `${issue.origin} এ অবৈধ মান`;
      default:
        return "অবৈধ ইনপুট";
    }
  };
};
function bn_default() {
  return {
    localeError: error5()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ca.js
var error6 = () => {
  const Sizable = {
    string: { unit: "caràcters", verb: "contenir" },
    file: { unit: "bytes", verb: "contenir" },
    array: { unit: "elements", verb: "contenir" },
    set: { unit: "elements", verb: "contenir" },
    map: { unit: "elements", verb: "contenir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "adreça electrònica",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "durada ISO",
    ipv4: "adreça IPv4",
    ipv6: "adreça IPv6",
    mac: "adreça MAC",
    cidrv4: "rang IPv4",
    cidrv6: "rang IPv6",
    base64: "cadena codificada en base64",
    base64url: "cadena codificada en base64url",
    json_string: "cadena JSON",
    e164: "número E.164",
    credit_card: "número de targeta de crèdit",
    currency_code: "codi de moneda",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Tipus invàlid: s'esperava instanceof ${issue.expected}, s'ha rebut ${received}`;
        }
        return `Tipus invàlid: s'esperava ${expected}, s'ha rebut ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Valor invàlid: s'esperava ${stringifyPrimitive(issue.values[0])}`;
        return `Opció invàlida: s'esperava una de ${joinValues(issue.values, " o ")}`;
      case "too_big": {
        const adj = issue.inclusive ? "com a màxim" : "menys de";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Massa gran: s'esperava que ${issue.origin ?? "el valor"} contingués ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Massa gran: s'esperava que ${issue.origin ?? "el valor"} fos ${adj} ${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? "com a mínim" : "més de";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Massa petit: s'esperava que ${issue.origin} contingués ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Massa petit: s'esperava que ${issue.origin} fos ${adj} ${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Format invàlid: ha de començar amb "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Format invàlid: ha d'acabar amb "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Format invàlid: ha d'incloure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Format invàlid: ha de coincidir amb el patró ${_issue.pattern}`;
        return `Format invàlid per a ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Número invàlid: ha de ser múltiple de ${issue.divisor}`;
      case "unrecognized_keys":
        return `Clau${issue.keys.length > 1 ? "s" : ""} no reconeguda${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Clau invàlida a ${issue.origin}`;
      case "invalid_union":
        return "Entrada invàlida";
      case "invalid_element":
        return `Element invàlid a ${issue.origin}`;
      default:
        return `Entrada invàlida`;
    }
  };
};
function ca_default() {
  return {
    localeError: error6()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ckb.js
var error7 = () => {
  const Sizable = {
    string: { unit: "پیت", verb: "بێت" },
    file: { unit: "بایت", verb: "بێت" },
    array: { unit: "دانە", verb: "بێت" },
    set: { unit: "دانە", verb: "بێت" },
    map: { unit: "دانە", verb: "بێت" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regex",
    email: "ئیمەیڵ",
    url: "بەستەر (URL)",
    emoji: "ئیمۆجی",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ڕێکەوت و کات",
    date: "ڕێکەوت",
    time: "کات",
    duration: "ماوە",
    ipv4: "ناونیشانی IPv4",
    ipv6: "ناونیشانی IPv6",
    mac: "ناونیشانی MAC",
    cidrv4: "مەودای IPv4",
    cidrv6: "مەودای IPv6",
    base64: "دەقی base64",
    base64url: "دەقی base64url",
    json_string: "دەقی JSON",
    e164: "ژمارەی E.164",
    credit_card: "ژمارەی کارتی کرێدیت",
    currency_code: "کۆدی دراو",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "تێکردە"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "نووسین",
    number: "ژمارە",
    boolean: "boolean",
    array: "array",
    object: "object",
    date: "ڕێکەوت",
    integer: "ژمارە",
    float: "ژمارە",
    null: "null",
    undefined: "undefined",
    function: "function",
    symbol: "symbol",
    unknown: "unknown",
    promise: "promise",
    void: "void",
    never: "never",
    map: "map",
    set: "set"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        const postfix = ["ا", "و", "ۆ", "وو", "ە", "ی", "ێ"].some((p) => received.endsWith(p)) ? "یە" : "ە";
        const isEnglish = /^[a-zA-Z]+$/.test(received);
        if (receivedType === "null" || receivedType === "undefined")
          return `داواکراوە`;
        return `چاوەڕوانکراوە ${expected} بێت، بەڵام ${received}${isEnglish ? "" : postfix}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `بەهاکە نادرووستە: چاوەڕوانکراوە ${stringifyPrimitive(issue.values[0])} بێت`;
        return `هەڵبژاردەی نادروست: چاوەڕوانکراوە یەکێک بێت لە ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `پێویستە بە لایەنی زۆرەوە ${issue.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `پێویستە بە لایەنی زۆرەوە ${issue.maximum.toString()} بێت`;
      }
      case "too_small": {
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `پێویستە بە لایەنی کەمەوە ${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `پێویستە بە لایەنی کەمەوە ${issue.minimum.toString()} بێت`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `دەقی نادروست: پێویستە دەستپێبکات بە "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `دەقی نادروست: پێویستە کۆتاییبێت بە "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `دەقی نادروست: پێویستە "${_issue.includes}" لەخۆبگرێت`;
        if (_issue.format === "regex")
          return `دەقی نادروست: پێویستە لەگەڵ پاتێرنی ${_issue.pattern} بگونجێت`;
        return `بەهای ${FormatDictionary[_issue.format] ?? issue.format} نادروستە`;
      }
      case "not_multiple_of":
        return `ژمارەی نادروست: دەبێت چەند هێندە بێت بۆ ${issue.divisor}`;
      case "unrecognized_keys":
        return `کلیلی نەناسراو: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `کلیلی نادروست لە ${issue.origin}`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `بەهای نەناسراو هەیە. بەهای چاوەڕوانکراو: ${opts}`;
        }
        return "یەکگرتنی نادروست";
      case "invalid_element":
        return `${issue.origin} بەهاکە نادروستە`;
      default:
        return `تێکردەی نادروست`;
    }
  };
};
function ckb_default() {
  return {
    localeError: error7()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/cs.js
var error8 = () => {
  const Sizable = {
    string: { unit: "znaků", verb: "mít" },
    file: { unit: "bajtů", verb: "mít" },
    array: { unit: "prvků", verb: "mít" },
    set: { unit: "prvků", verb: "mít" },
    map: { unit: "prvků", verb: "mít" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regulární výraz",
    email: "e-mailová adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "datum a čas ve formátu ISO",
    date: "datum ve formátu ISO",
    time: "čas ve formátu ISO",
    duration: "doba trvání ISO",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    mac: "MAC adresa",
    cidrv4: "rozsah IPv4",
    cidrv6: "rozsah IPv6",
    base64: "řetězec zakódovaný ve formátu base64",
    base64url: "řetězec zakódovaný ve formátu base64url",
    json_string: "řetězec ve formátu JSON",
    e164: "číslo E.164",
    credit_card: "číslo kreditní karty",
    currency_code: "kód měny",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "vstup"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "číslo",
    string: "řetězec",
    function: "funkce",
    array: "pole"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Neplatný vstup: očekáváno instanceof ${issue.expected}, obdrženo ${received}`;
        }
        return `Neplatný vstup: očekáváno ${expected}, obdrženo ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Neplatný vstup: očekáváno ${stringifyPrimitive(issue.values[0])}`;
        return `Neplatná možnost: očekávána jedna z hodnot ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Hodnota je příliš velká: ${issue.origin ?? "hodnota"} musí mít ${adj}${issue.maximum.toString()} ${sizing.unit ?? "prvků"}`;
        }
        return `Hodnota je příliš velká: ${issue.origin ?? "hodnota"} musí být ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Hodnota je příliš malá: ${issue.origin ?? "hodnota"} musí mít ${adj}${issue.minimum.toString()} ${sizing.unit ?? "prvků"}`;
        }
        return `Hodnota je příliš malá: ${issue.origin ?? "hodnota"} musí být ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Neplatný řetězec: musí začínat na "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neplatný řetězec: musí končit na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neplatný řetězec: musí obsahovat "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neplatný řetězec: musí odpovídat vzoru ${_issue.pattern}`;
        return `Neplatný formát ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Neplatné číslo: musí být násobkem ${issue.divisor}`;
      case "unrecognized_keys":
        return `Neznámé klíče: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Neplatný klíč v ${issue.origin}`;
      case "invalid_union":
        return "Neplatný vstup";
      case "invalid_element":
        return `Neplatná hodnota v ${issue.origin}`;
      default:
        return `Neplatný vstup`;
    }
  };
};
function cs_default() {
  return {
    localeError: error8()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/da.js
var error9 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "havde" },
    file: { unit: "bytes", verb: "havde" },
    array: { unit: "elementer", verb: "indeholdt" },
    set: { unit: "elementer", verb: "indeholdt" },
    map: { unit: "elementer", verb: "indeholdt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-mailadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkeslæt",
    date: "ISO-dato",
    time: "ISO-klokkeslæt",
    duration: "ISO-varighed",
    ipv4: "IPv4-adresse",
    ipv6: "IPv6-adresse",
    mac: "MAC-adresse",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodet streng",
    base64url: "base64url-kodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    credit_card: "kreditkortnummer",
    currency_code: "valutakode",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "streng",
    number: "tal",
    boolean: "boolean",
    array: "liste",
    object: "objekt",
    set: "sæt",
    file: "fil"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Ugyldigt input: forventede instanceof ${issue.expected}, fik ${received}`;
        }
        return `Ugyldigt input: forventede ${expected}, fik ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Ugyldig værdi: forventede ${stringifyPrimitive(issue.values[0])}`;
        return `Ugyldigt valg: forventede en af følgende ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        const origin = TypeDictionary[issue.origin] ?? issue.origin;
        if (sizing)
          return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        const origin = TypeDictionary[issue.origin] ?? issue.origin;
        if (sizing) {
          return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `For lille: forventede ${origin} havde ${adj} ${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: skal matche mønsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal være deleligt med ${issue.divisor}`;
      case "unrecognized_keys":
        return `${issue.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøgle i ${issue.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig værdi i ${issue.origin}`;
      default:
        return `Ugyldigt input`;
    }
  };
};
function da_default() {
  return {
    localeError: error9()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/de.js
var error10 = () => {
  const Sizable = {
    string: { unit: "Zeichen", verb: "zu haben" },
    file: { unit: "Bytes", verb: "zu haben" },
    array: { unit: "Elemente", verb: "zu haben" },
    set: { unit: "Elemente", verb: "zu haben" },
    map: { unit: "Elemente", verb: "zu haben" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "Eingabe",
    email: "E-Mail-Adresse",
    url: "URL",
    emoji: "Emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-Datum und -Uhrzeit",
    date: "ISO-Datum",
    time: "ISO-Uhrzeit",
    duration: "ISO-Dauer",
    ipv4: "IPv4-Adresse",
    ipv6: "IPv6-Adresse",
    mac: "MAC-Adresse",
    cidrv4: "IPv4-Bereich",
    cidrv6: "IPv6-Bereich",
    base64: "Base64-codierter String",
    base64url: "Base64-URL-codierter String",
    json_string: "JSON-String",
    e164: "E.164-Nummer",
    credit_card: "Kreditkartennummer",
    currency_code: "Währungscode",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "Eingabe"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "Zahl",
    array: "Array"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Ungültige Eingabe: erwartet instanceof ${issue.expected}, erhalten ${received}`;
        }
        return `Ungültige Eingabe: erwartet ${expected}, erhalten ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Ungültige Eingabe: erwartet ${stringifyPrimitive(issue.values[0])}`;
        return `Ungültige Option: erwartet eine von ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Zu groß: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
        return `Zu groß: erwartet, dass ${issue.origin ?? "Wert"} ${adj}${issue.maximum.toString()} ist`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} hat`;
        }
        return `Zu klein: erwartet, dass ${issue.origin} ${adj}${issue.minimum.toString()} ist`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Ungültiger String: muss mit "${_issue.prefix}" beginnen`;
        if (_issue.format === "ends_with")
          return `Ungültiger String: muss mit "${_issue.suffix}" enden`;
        if (_issue.format === "includes")
          return `Ungültiger String: muss "${_issue.includes}" enthalten`;
        if (_issue.format === "regex")
          return `Ungültiger String: muss dem Muster ${_issue.pattern} entsprechen`;
        return `Ungültig: ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Ungültige Zahl: muss ein Vielfaches von ${issue.divisor} sein`;
      case "unrecognized_keys":
        return `${issue.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Ungültiger Schlüssel in ${issue.origin}`;
      case "invalid_union":
        return "Ungültige Eingabe";
      case "invalid_element":
        return `Ungültiger Wert in ${issue.origin}`;
      default:
        return `Ungültige Eingabe`;
    }
  };
};
function de_default() {
  return {
    localeError: error10()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/el.js
var error11 = () => {
  const Sizable = {
    string: { unit: "χαρακτήρες", verb: "να έχει" },
    file: { unit: "bytes", verb: "να έχει" },
    array: { unit: "στοιχεία", verb: "να έχει" },
    set: { unit: "στοιχεία", verb: "να έχει" },
    map: { unit: "καταχωρήσεις", verb: "να έχει" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "είσοδος",
    email: "διεύθυνση email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO ημερομηνία και ώρα",
    date: "ISO ημερομηνία",
    time: "ISO ώρα",
    duration: "ISO διάρκεια",
    ipv4: "διεύθυνση IPv4",
    ipv6: "διεύθυνση IPv6",
    mac: "διεύθυνση MAC",
    cidrv4: "εύρος IPv4",
    cidrv6: "εύρος IPv6",
    base64: "συμβολοσειρά κωδικοποιημένη σε base64",
    base64url: "συμβολοσειρά κωδικοποιημένη σε base64url",
    json_string: "συμβολοσειρά JSON",
    e164: "αριθμός E.164",
    credit_card: "αριθμός πιστωτικής κάρτας",
    currency_code: "κωδικός νομίσματος",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "είσοδος"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (typeof issue.expected === "string" && /^[A-Z]/.test(issue.expected)) {
          return `Μη έγκυρη είσοδος: αναμενόταν instanceof ${issue.expected}, λήφθηκε ${received}`;
        }
        return `Μη έγκυρη είσοδος: αναμενόταν ${expected}, λήφθηκε ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Μη έγκυρη είσοδος: αναμενόταν ${stringifyPrimitive(issue.values[0])}`;
        return `Μη έγκυρη επιλογή: αναμενόταν ένα από ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Πολύ μεγάλο: αναμενόταν ${issue.origin ?? "τιμή"} να έχει ${adj}${issue.maximum.toString()} ${sizing.unit ?? "στοιχεία"}`;
        return `Πολύ μεγάλο: αναμενόταν ${issue.origin ?? "τιμή"} να είναι ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Πολύ μικρό: αναμενόταν ${issue.origin} να έχει ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Πολύ μικρό: αναμενόταν ${issue.origin} να είναι ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Μη έγκυρη συμβολοσειρά: πρέπει να ξεκινά με "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Μη έγκυρη συμβολοσειρά: πρέπει να τελειώνει με "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Μη έγκυρη συμβολοσειρά: πρέπει να περιέχει "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Μη έγκυρη συμβολοσειρά: πρέπει να ταιριάζει με το μοτίβο ${_issue.pattern}`;
        return `Μη έγκυρο: ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Μη έγκυρος αριθμός: πρέπει να είναι πολλαπλάσιο του ${issue.divisor}`;
      case "unrecognized_keys":
        return `Άγνωστ${issue.keys.length > 1 ? "α" : "ο"} κλειδ${issue.keys.length > 1 ? "ιά" : "ί"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Μη έγκυρο κλειδί στο ${issue.origin}`;
      case "invalid_union":
        return "Μη έγκυρη είσοδος";
      case "invalid_element":
        return `Μη έγκυρη τιμή στο ${issue.origin}`;
      default:
        return `Μη έγκυρη είσοδος`;
    }
  };
};
function el_default() {
  return {
    localeError: error11()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/en.js
var error12 = () => {
  const Sizable = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    currency_code: "currency code",
    credit_card: "credit card number",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  function getTypeName(type, input) {
    if (type === "number" && typeof input === "number" && !Number.isFinite(input)) {
      return String(input);
    }
    return TypeDictionary[type] ?? type;
  }
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = getTypeName(issue.expected);
        const receivedType = parsedType(issue.input);
        const received = getTypeName(receivedType, issue.input);
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.exact ? "exactly " : issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.exact ? "exactly " : issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Invalid string: must start with "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Invalid string: must end with "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Invalid string: must include "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Invalid string: must match pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue.origin}`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `Invalid discriminator value. Expected ${opts}`;
        }
        if (issue.inclusive === false) {
          return "Invalid input: more than one option matched";
        }
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue.origin}`;
      default:
        return `Invalid input`;
    }
  };
};
function en_default() {
  return {
    localeError: error12()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/eo.js
var error13 = () => {
  const Sizable = {
    string: { unit: "karaktrojn", verb: "havi" },
    file: { unit: "bajtojn", verb: "havi" },
    array: { unit: "elementojn", verb: "havi" },
    set: { unit: "elementojn", verb: "havi" },
    map: { unit: "elementojn", verb: "havi" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "enigo",
    email: "retadreso",
    url: "URL",
    emoji: "emoĝio",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datotempo",
    date: "ISO-dato",
    time: "ISO-tempo",
    duration: "ISO-daŭro",
    ipv4: "IPv4-adreso",
    ipv6: "IPv6-adreso",
    mac: "MAC-adreso",
    cidrv4: "IPv4-rango",
    cidrv6: "IPv6-rango",
    base64: "64-ume kodita karaktraro",
    base64url: "URL-64-ume kodita karaktraro",
    json_string: "JSON-karaktraro",
    e164: "E.164-nombro",
    credit_card: "kreditkarta numero",
    currency_code: "valuta kodo",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "enigo"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombro",
    array: "tabelo",
    null: "senvalora"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Nevalida enigo: atendiĝis instanceof ${issue.expected}, riceviĝis ${received}`;
        }
        return `Nevalida enigo: atendiĝis ${expected}, riceviĝis ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Nevalida enigo: atendiĝis ${stringifyPrimitive(issue.values[0])}`;
        return `Nevalida opcio: atendiĝis unu el ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Tro granda: atendiĝis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
        return `Tro granda: atendiĝis ke ${issue.origin ?? "valoro"} havu ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Tro malgranda: atendiĝis ke ${issue.origin} havu ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Tro malgranda: atendiĝis ke ${issue.origin} estu ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Nevalida karaktraro: devas komenciĝi per "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nevalida karaktraro: devas finiĝi per "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
        return `Nevalida ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Nevalida nombro: devas esti oblo de ${issue.divisor}`;
      case "unrecognized_keys":
        return `Nekonata${issue.keys.length > 1 ? "j" : ""} ŝlosilo${issue.keys.length > 1 ? "j" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Nevalida ŝlosilo en ${issue.origin}`;
      case "invalid_union":
        return "Nevalida enigo";
      case "invalid_element":
        return `Nevalida valoro en ${issue.origin}`;
      default:
        return `Nevalida enigo`;
    }
  };
};
function eo_default() {
  return {
    localeError: error13()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/es.js
var error14 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "tener" },
    file: { unit: "bytes", verb: "tener" },
    array: { unit: "elementos", verb: "tener" },
    set: { unit: "elementos", verb: "tener" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "dirección de correo electrónico",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "fecha y hora ISO",
    date: "fecha ISO",
    time: "hora ISO",
    duration: "duración ISO",
    ipv4: "dirección IPv4",
    ipv6: "dirección IPv6",
    mac: "dirección MAC",
    cidrv4: "rango IPv4",
    cidrv6: "rango IPv6",
    base64: "cadena codificada en base64",
    base64url: "URL codificada en base64",
    json_string: "cadena JSON",
    e164: "número E.164",
    credit_card: "número de tarjeta de crédito",
    currency_code: "código de moneda",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "texto",
    number: "número",
    boolean: "booleano",
    array: "arreglo",
    object: "objeto",
    set: "conjunto",
    file: "archivo",
    date: "fecha",
    bigint: "número grande",
    symbol: "símbolo",
    undefined: "indefinido",
    null: "nulo",
    function: "función",
    map: "mapa",
    record: "registro",
    tuple: "tupla",
    enum: "enumeración",
    union: "unión",
    literal: "literal",
    promise: "promesa",
    void: "vacío",
    never: "nunca",
    unknown: "desconocido",
    any: "cualquiera"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Entrada inválida: se esperaba instanceof ${issue.expected}, recibido ${received}`;
        }
        return `Entrada inválida: se esperaba ${expected}, recibido ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Entrada inválida: se esperaba ${stringifyPrimitive(issue.values[0])}`;
        return `Opción inválida: se esperaba una de ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        const origin = TypeDictionary[issue.origin] ?? issue.origin;
        if (sizing)
          return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        const origin = TypeDictionary[issue.origin] ?? issue.origin;
        if (sizing) {
          return `Demasiado pequeño: se esperaba que ${origin} tuviera ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Demasiado pequeño: se esperaba que ${origin} fuera ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Cadena inválida: debe comenzar con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cadena inválida: debe terminar en "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cadena inválida: debe incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cadena inválida: debe coincidir con el patrón ${_issue.pattern}`;
        return `Inválido ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Número inválido: debe ser múltiplo de ${issue.divisor}`;
      case "unrecognized_keys":
        return `Llave${issue.keys.length > 1 ? "s" : ""} desconocida${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Llave inválida en ${TypeDictionary[issue.origin] ?? issue.origin}`;
      case "invalid_union":
        return "Entrada inválida";
      case "invalid_element":
        return `Valor inválido en ${TypeDictionary[issue.origin] ?? issue.origin}`;
      default:
        return `Entrada inválida`;
    }
  };
};
function es_default() {
  return {
    localeError: error14()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/fa.js
var error15 = () => {
  const Sizable = {
    string: { unit: "کاراکتر", verb: "داشته باشد" },
    file: { unit: "بایت", verb: "داشته باشد" },
    array: { unit: "آیتم", verb: "داشته باشد" },
    set: { unit: "آیتم", verb: "داشته باشد" },
    map: { unit: "آیتم", verb: "داشته باشد" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ورودی",
    email: "آدرس ایمیل",
    url: "URL",
    emoji: "ایموجی",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "تاریخ و زمان ایزو",
    date: "تاریخ ایزو",
    time: "زمان ایزو",
    duration: "مدت زمان ایزو",
    ipv4: "IPv4 آدرس",
    ipv6: "IPv6 آدرس",
    mac: "MAC آدرس",
    cidrv4: "IPv4 دامنه",
    cidrv6: "IPv6 دامنه",
    base64: "base64-encoded رشته",
    base64url: "base64url-encoded رشته",
    json_string: "JSON رشته",
    e164: "E.164 عدد",
    credit_card: "شماره کارت اعتباری",
    currency_code: "کد ارز",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ورودی"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "عدد",
    array: "آرایه"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `ورودی نامعتبر: می‌بایست instanceof ${issue.expected} می‌بود، ${received} دریافت شد`;
        }
        return `ورودی نامعتبر: می‌بایست ${expected} می‌بود، ${received} دریافت شد`;
      }
      case "invalid_value":
        if (issue.values.length === 1) {
          return `ورودی نامعتبر: می‌بایست ${stringifyPrimitive(issue.values[0])} می‌بود`;
        }
        return `گزینه نامعتبر: می‌بایست یکی از ${joinValues(issue.values, "|")} می‌بود`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `خیلی بزرگ: ${issue.origin ?? "مقدار"} باید ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عنصر"} باشد`;
        }
        return `خیلی بزرگ: ${issue.origin ?? "مقدار"} باید ${adj}${issue.maximum.toString()} باشد`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `خیلی کوچک: ${issue.origin} باید ${adj}${issue.minimum.toString()} ${sizing.unit} باشد`;
        }
        return `خیلی کوچک: ${issue.origin} باید ${adj}${issue.minimum.toString()} باشد`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `رشته نامعتبر: باید با "${_issue.prefix}" شروع شود`;
        }
        if (_issue.format === "ends_with") {
          return `رشته نامعتبر: باید با "${_issue.suffix}" تمام شود`;
        }
        if (_issue.format === "includes") {
          return `رشته نامعتبر: باید شامل "${_issue.includes}" باشد`;
        }
        if (_issue.format === "regex") {
          return `رشته نامعتبر: باید با الگوی ${_issue.pattern} مطابقت داشته باشد`;
        }
        return `${FormatDictionary[_issue.format] ?? issue.format} نامعتبر`;
      }
      case "not_multiple_of":
        return `عدد نامعتبر: باید مضرب ${issue.divisor} باشد`;
      case "unrecognized_keys":
        return `کلید${issue.keys.length > 1 ? "های" : ""} ناشناس: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `کلید ناشناس در ${issue.origin}`;
      case "invalid_union":
        return `ورودی نامعتبر`;
      case "invalid_element":
        return `مقدار نامعتبر در ${issue.origin}`;
      default:
        return `ورودی نامعتبر`;
    }
  };
};
function fa_default() {
  return {
    localeError: error15()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/fi.js
var error16 = () => {
  const Sizable = {
    string: { unit: "merkkiä", subject: "merkkijonon" },
    file: { unit: "tavua", subject: "tiedoston" },
    array: { unit: "alkiota", subject: "listan" },
    set: { unit: "alkiota", subject: "joukon" },
    map: { unit: "alkiota", subject: "kuvauksen" },
    number: { unit: "", subject: "luvun" },
    bigint: { unit: "", subject: "suuren kokonaisluvun" },
    int: { unit: "", subject: "kokonaisluvun" },
    date: { unit: "", subject: "päivämäärän" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "säännöllinen lauseke",
    email: "sähköpostiosoite",
    url: "URL-osoite",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-aikaleima",
    date: "ISO-päivämäärä",
    time: "ISO-aika",
    duration: "ISO-kesto",
    ipv4: "IPv4-osoite",
    ipv6: "IPv6-osoite",
    mac: "MAC-osoite",
    cidrv4: "IPv4-alue",
    cidrv6: "IPv6-alue",
    base64: "base64-koodattu merkkijono",
    base64url: "base64url-koodattu merkkijono",
    json_string: "JSON-merkkijono",
    e164: "E.164-luku",
    credit_card: "luottokortin numero",
    currency_code: "valuuttakoodi",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "templaattimerkkijono"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Virheellinen tyyppi: odotettiin instanceof ${issue.expected}, oli ${received}`;
        }
        return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Virheellinen syöte: täytyy olla ${stringifyPrimitive(issue.values[0])}`;
        return `Virheellinen valinta: täytyy olla yksi seuraavista: ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Liian suuri: ${sizing.subject} täytyy olla ${adj}${issue.maximum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian suuri: arvon täytyy olla ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Liian pieni: ${sizing.subject} täytyy olla ${adj}${issue.minimum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian pieni: arvon täytyy olla ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Virheellinen syöte: täytyy alkaa "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Virheellinen syöte: täytyy loppua "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Virheellinen syöte: täytyy sisältää "${_issue.includes}"`;
        if (_issue.format === "regex") {
          return `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${_issue.pattern}`;
        }
        return `Virheellinen ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: täytyy olla luvun ${issue.divisor} monikerta`;
      case "unrecognized_keys":
        return `${issue.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return `Virheellinen syöte`;
    }
  };
};
function fi_default() {
  return {
    localeError: error16()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/fr.js
var error17 = () => {
  const Sizable = {
    string: { unit: "caractères", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "éléments", verb: "avoir" },
    set: { unit: "éléments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "expression régulière",
    email: "adresse e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date et heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "durée ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    mac: "adresse MAC",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "chaîne de caractères encodée en base64",
    base64url: "chaîne de caractères encodée en base64url",
    json_string: "chaîne de caractères JSON",
    e164: "numéro au format E.164",
    credit_card: "numéro de carte de crédit",
    currency_code: "code de devise",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "entrée"
  };
  const TypeDictionary = {
    string: "chaîne de caractères",
    number: "nombre",
    int: "entier",
    boolean: "booléen",
    bigint: "grand entier",
    symbol: "symbole",
    undefined: "indéfini",
    null: "null",
    never: "jamais",
    void: "vide",
    date: "date",
    array: "tableau",
    object: "objet",
    tuple: "tuple",
    record: "record",
    map: "map",
    set: "ensemble",
    file: "fichier",
    nonoptional: "non optionnel",
    nan: "NaN",
    function: "fonction"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Entrée invalide : instance de ${issue.expected} attendu, ${received} reçu`;
        }
        return `Entrée invalide : ${expected} attendu, ${received} reçu`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Entrée invalide : ${stringifyPrimitive(issue.values[0])} attendu`;
        return `Option invalide : une valeur parmi ${joinValues(issue.values, "|")} attendue`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Trop grand : ${TypeDictionary[issue.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "élément(s)"}`;
        return `Trop grand : ${TypeDictionary[issue.origin] ?? "valeur"} doit être ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Trop petit : ${TypeDictionary[issue.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        return `Trop petit : ${TypeDictionary[issue.origin] ?? "valeur"} doit être ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Chaîne de caractères invalide : doit commencer par "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chaîne de caractères invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chaîne de caractères invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chaîne de caractères invalide : doit correspondre au motif ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit être un multiple de ${issue.divisor}`;
      case "unrecognized_keys":
        return `Clé${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Clé invalide dans ${issue.origin}`;
      case "invalid_union":
        return "Entrée invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue.origin}`;
      default:
        return `Entrée invalide`;
    }
  };
};
function fr_default() {
  return {
    localeError: error17()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/fr-CA.js
var error18 = () => {
  const Sizable = {
    string: { unit: "caractères", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "éléments", verb: "avoir" },
    set: { unit: "éléments", verb: "avoir" },
    map: { unit: "éléments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrée",
    email: "adresse courriel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date-heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "durée ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    mac: "adresse MAC",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "chaîne encodée en base64",
    base64url: "chaîne encodée en base64url",
    json_string: "chaîne JSON",
    e164: "numéro E.164",
    credit_card: "numéro de carte de crédit",
    currency_code: "code de devise",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "entrée"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Entrée invalide : attendu instanceof ${issue.expected}, reçu ${received}`;
        }
        return `Entrée invalide : attendu ${expected}, reçu ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Entrée invalide : attendu ${stringifyPrimitive(issue.values[0])}`;
        return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "≤" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Trop grand : attendu que ${issue.origin ?? "la valeur"} ait ${adj}${issue.maximum.toString()} ${sizing.unit}`;
        return `Trop grand : attendu que ${issue.origin ?? "la valeur"} soit ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? "≥" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Trop petit : attendu que ${issue.origin} ait ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : attendu que ${issue.origin} soit ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chaîne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chaîne invalide : doit correspondre au motif ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit être un multiple de ${issue.divisor}`;
      case "unrecognized_keys":
        return `Clé${issue.keys.length > 1 ? "s" : ""} non reconnue${issue.keys.length > 1 ? "s" : ""} : ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Clé invalide dans ${issue.origin}`;
      case "invalid_union":
        return "Entrée invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue.origin}`;
      default:
        return `Entrée invalide`;
    }
  };
};
function fr_CA_default() {
  return {
    localeError: error18()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/gu.js
var error19 = () => {
  const Sizable = {
    string: { unit: "અક્ષર", verb: "હોવા જોઈએ" },
    file: { unit: "બાયટ", verb: "હોવા જોઈએ" },
    array: { unit: "આઇટમ", verb: "હોવા જોઈએ" },
    set: { unit: "આઇટમ", verb: "હોવા જોઈએ" },
    map: { unit: "એન્ટ્રી", verb: "હોવા જોઈએ" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ઇનપુટ",
    email: "ઈમેઇલ એડ્રેસ",
    url: "URL",
    emoji: "ઇમોજી",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO તારીખ અને સમય",
    date: "ISO તારીખ",
    time: "ISO સમય",
    duration: "ISO અવધિ",
    ipv4: "IPv4 એડ્રેસ",
    ipv6: "IPv6 એડ્રેસ",
    mac: "MAC એડ્રેસ",
    cidrv4: "IPv4 શ્રેણી",
    cidrv6: "IPv6 શ્રેણી",
    base64: "base64-એન્કોડેડ સ્ટ્રિંગ",
    base64url: "base64url-એન્કોડેડ સ્ટ્રિંગ",
    json_string: "JSON સ્ટ્રિંગ",
    e164: "E.164 નંબર",
    credit_card: "ક્રેડિટ કાર્ડ નંબર",
    currency_code: "ચલણ કોડ",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ઇનપુટ"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `અમાન્ય ઇનપુટ: અપેક્ષિત ${expected}, પ્રાપ્ત ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `અમાન્ય ઇનપુટ: અપેક્ષિત ${stringifyPrimitive(issue.values[0])}`;
        return `અમાન્ય વિકલ્પ: ${joinValues(issue.values, " | ")} માધ્યમથી એક અપેક્ષિત`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `ખૂબ મોટું: ${issue.origin ?? "મૂલ્ય"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "એલિમેન્ટ"} હોવા જોઈએ`;
        return `ખૂબ મોટું: ${issue.origin ?? "મૂલ્ય"} ${adj}${issue.maximum.toString()} હોવું જોઈએ`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `ખૂબ નાનું: ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} હોવા જોઈએ`;
        }
        return `ખૂબ નાનું: ${issue.origin} ${adj}${issue.minimum.toString()} હોવું જોઈએ`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `અમાન્ય સ્ટ્રિંગ: "${_issue.prefix}" થી શરૂ થવું જોઈએ`;
        }
        if (_issue.format === "ends_with")
          return `અમાન્ય સ્ટ્રિંગ: "${_issue.suffix}" પર સમાપ્ત થવું જોઈએ`;
        if (_issue.format === "includes")
          return `અમાન્ય સ્ટ્રિંગ: "${_issue.includes}" શામેલ હોવું જોઈએ`;
        if (_issue.format === "regex")
          return `અમાન્ય સ્ટ્રિંગ: પેટર્ન ${_issue.pattern} સાથે મેળ ખાવું જોઈએ`;
        return `અમાન્ય ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `અમાન્ય નંબર: ${issue.divisor} નો ગુણાંક હોવો જોઈએ`;
      case "unrecognized_keys":
        return `ઓળખી શકાતા નહીં તે કી${issue.keys.length > 1 ? "ઓ" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `${issue.origin} માં અમાન્ય કી`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `અમાન્ય ડિસ્ક્રિમિનેટર મૂલ્ય. અપેક્ષિત ${opts}`;
        }
        return "અમાન્ય ઇનપુટ";
      case "invalid_element":
        return `${issue.origin} માં અમાન્ય મૂલ્ય`;
      default:
        return "અમાન્ય ઇનપુટ";
    }
  };
};
function gu_default() {
  return {
    localeError: error19()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/he.js
var error20 = () => {
  const TypeNames = {
    string: { label: "מחרוזת", gender: "f" },
    number: { label: "מספר", gender: "m" },
    boolean: { label: "ערך בוליאני", gender: "m" },
    bigint: { label: "BigInt", gender: "m" },
    date: { label: "תאריך", gender: "m" },
    array: { label: "מערך", gender: "m" },
    object: { label: "אובייקט", gender: "m" },
    null: { label: "ערך ריק (null)", gender: "m" },
    undefined: { label: "ערך לא מוגדר (undefined)", gender: "m" },
    symbol: { label: "סימבול (Symbol)", gender: "m" },
    function: { label: "פונקציה", gender: "f" },
    map: { label: "מפה (Map)", gender: "f" },
    set: { label: "קבוצה (Set)", gender: "f" },
    file: { label: "קובץ", gender: "m" },
    promise: { label: "Promise", gender: "m" },
    NaN: { label: "NaN", gender: "m" },
    unknown: { label: "ערך לא ידוע", gender: "m" },
    value: { label: "ערך", gender: "m" }
  };
  const Sizable = {
    string: { unit: "תווים", shortLabel: "קצר", longLabel: "ארוך" },
    file: { unit: "בייטים", shortLabel: "קטן", longLabel: "גדול" },
    array: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
    set: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
    number: { unit: "", shortLabel: "קטן", longLabel: "גדול" }
  };
  const typeEntry = (t) => t ? TypeNames[t] : undefined;
  const typeLabel = (t) => {
    const e = typeEntry(t);
    if (e)
      return e.label;
    return t ?? TypeNames.unknown.label;
  };
  const withDefinite = (t) => `ה${typeLabel(t)}`;
  const verbFor = (t) => {
    const e = typeEntry(t);
    const gender = e?.gender ?? "m";
    return gender === "f" ? "צריכה להיות" : "צריך להיות";
  };
  const getSizing = (origin) => {
    if (!origin)
      return null;
    return Sizable[origin] ?? null;
  };
  const FormatDictionary = {
    regex: { label: "קלט", gender: "m" },
    email: { label: "כתובת אימייל", gender: "f" },
    url: { label: "כתובת רשת", gender: "f" },
    emoji: { label: "אימוג'י", gender: "m" },
    uuid: { label: "UUID", gender: "m" },
    uuidv4: { label: "UUIDv4", gender: "m" },
    uuidv6: { label: "UUIDv6", gender: "m" },
    nanoid: { label: "nanoid", gender: "m" },
    guid: { label: "GUID", gender: "m" },
    cuid: { label: "cuid", gender: "m" },
    cuid2: { label: "cuid2", gender: "m" },
    ulid: { label: "ULID", gender: "m" },
    xid: { label: "XID", gender: "m" },
    ksuid: { label: "KSUID", gender: "m" },
    datetime: { label: "תאריך וזמן ISO", gender: "m" },
    date: { label: "תאריך ISO", gender: "m" },
    time: { label: "זמן ISO", gender: "m" },
    duration: { label: "משך זמן ISO", gender: "m" },
    ipv4: { label: "כתובת IPv4", gender: "f" },
    ipv6: { label: "כתובת IPv6", gender: "f" },
    mac: { label: "כתובת MAC", gender: "f" },
    cidrv4: { label: "טווח IPv4", gender: "m" },
    cidrv6: { label: "טווח IPv6", gender: "m" },
    base64: { label: "מחרוזת בבסיס 64", gender: "f" },
    base64url: { label: "מחרוזת בבסיס 64 לכתובות רשת", gender: "f" },
    json_string: { label: "מחרוזת JSON", gender: "f" },
    e164: { label: "מספר E.164", gender: "m" },
    credit_card: { label: "מספר כרטיס אשראי", gender: "m" },
    currency_code: { label: "קוד מטבע", gender: "m" },
    iban: { label: "IBAN", gender: "m" },
    jwt: { label: "JWT", gender: "m" },
    template_literal: { label: "קלט", gender: "m" },
    ends_with: { label: "קלט", gender: "m" },
    includes: { label: "קלט", gender: "m" },
    lowercase: { label: "קלט", gender: "m" },
    starts_with: { label: "קלט", gender: "m" },
    uppercase: { label: "קלט", gender: "m" }
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expectedKey = issue.expected;
        const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `קלט לא תקין: צריך להיות instanceof ${issue.expected}, התקבל ${received}`;
        }
        return `קלט לא תקין: צריך להיות ${expected}, התקבל ${received}`;
      }
      case "invalid_value": {
        if (issue.values.length === 1) {
          return `ערך לא תקין: הערך חייב להיות ${stringifyPrimitive(issue.values[0])}`;
        }
        const stringified = issue.values.map((v) => stringifyPrimitive(v));
        if (issue.values.length === 2) {
          return `ערך לא תקין: האפשרויות המתאימות הן ${stringified[0]} או ${stringified[1]}`;
        }
        const lastValue = stringified[stringified.length - 1];
        const restValues = stringified.slice(0, -1).join(", ");
        return `ערך לא תקין: האפשרויות המתאימות הן ${restValues} או ${lastValue}`;
      }
      case "too_big": {
        const sizing = getSizing(issue.origin);
        const subject = withDefinite(issue.origin ?? "value");
        if (issue.origin === "string") {
          return `${sizing?.longLabel ?? "ארוך"} מדי: ${subject} צריכה להכיל ${issue.maximum.toString()} ${sizing?.unit ?? ""} ${issue.inclusive ? "או פחות" : "לכל היותר"}`.trim();
        }
        if (issue.origin === "number") {
          const comparison = issue.inclusive ? `קטן או שווה ל-${issue.maximum}` : `קטן מ-${issue.maximum}`;
          return `גדול מדי: ${subject} צריך להיות ${comparison}`;
        }
        if (issue.origin === "array" || issue.origin === "set") {
          const verb = issue.origin === "set" ? "צריכה" : "צריך";
          const comparison = issue.inclusive ? `${issue.maximum} ${sizing?.unit ?? ""} או פחות` : `פחות מ-${issue.maximum} ${sizing?.unit ?? ""}`;
          return `גדול מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
        }
        const adj = issue.inclusive ? "<=" : "<";
        const be = verbFor(issue.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.longLabel} מדי: ${subject} ${be} ${adj}${issue.maximum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.longLabel ?? "גדול"} מדי: ${subject} ${be} ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const sizing = getSizing(issue.origin);
        const subject = withDefinite(issue.origin ?? "value");
        if (issue.origin === "string") {
          return `${sizing?.shortLabel ?? "קצר"} מדי: ${subject} צריכה להכיל ${issue.minimum.toString()} ${sizing?.unit ?? ""} ${issue.inclusive ? "או יותר" : "לפחות"}`.trim();
        }
        if (issue.origin === "number") {
          const comparison = issue.inclusive ? `גדול או שווה ל-${issue.minimum}` : `גדול מ-${issue.minimum}`;
          return `קטן מדי: ${subject} צריך להיות ${comparison}`;
        }
        if (issue.origin === "array" || issue.origin === "set") {
          const verb = issue.origin === "set" ? "צריכה" : "צריך";
          if (issue.minimum === 1 && issue.inclusive) {
            const singularPhrase = issue.origin === "set" ? "לפחות פריט אחד" : "לפחות פריט אחד";
            return `קטן מדי: ${subject} ${verb} להכיל ${singularPhrase}`;
          }
          const comparison = issue.inclusive ? `${issue.minimum} ${sizing?.unit ?? ""} או יותר` : `יותר מ-${issue.minimum} ${sizing?.unit ?? ""}`;
          return `קטן מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
        }
        const adj = issue.inclusive ? ">=" : ">";
        const be = verbFor(issue.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.shortLabel} מדי: ${subject} ${be} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.shortLabel ?? "קטן"} מדי: ${subject} ${be} ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `המחרוזת חייבת להתחיל ב "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `המחרוזת חייבת להסתיים ב "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `המחרוזת חייבת לכלול "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `המחרוזת חייבת להתאים לתבנית ${_issue.pattern}`;
        const nounEntry = FormatDictionary[_issue.format];
        const noun = nounEntry?.label ?? _issue.format;
        const gender = nounEntry?.gender ?? "m";
        const adjective = gender === "f" ? "תקינה" : "תקין";
        return `${noun} לא ${adjective}`;
      }
      case "not_multiple_of":
        return `מספר לא תקין: חייב להיות מכפלה של ${issue.divisor}`;
      case "unrecognized_keys":
        return `מפתח${issue.keys.length > 1 ? "ות" : ""} לא מזוה${issue.keys.length > 1 ? "ים" : "ה"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key": {
        return `שדה לא תקין באובייקט`;
      }
      case "invalid_union":
        return "קלט לא תקין";
      case "invalid_element": {
        const place = withDefinite(issue.origin ?? "array");
        return `ערך לא תקין ב${place}`;
      }
      default:
        return `קלט לא תקין`;
    }
  };
};
function he_default() {
  return {
    localeError: error20()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/hi.js
var error21 = () => {
  const Sizable = {
    string: { unit: "अक्षर", verb: "रखने के लिए" },
    file: { unit: "बाइट्स", verb: "रखने के लिए" },
    array: { unit: "तत्व", verb: "रखने के लिए" },
    set: { unit: "तत्व", verb: "रखने के लिए" },
    map: { unit: "प्रविष्टियाँ", verb: "रखने के लिए" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "इनपुट",
    email: "ईमेल पता",
    url: "URL",
    emoji: "इमोजी",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO तिथि और समय",
    date: "ISO तिथि",
    time: "ISO समय",
    duration: "ISO अवधि",
    ipv4: "IPv4 पता",
    ipv6: "IPv6 पता",
    mac: "MAC पता",
    cidrv4: "IPv4 श्रेणी",
    cidrv6: "IPv6 श्रेणी",
    base64: "Base64-एन्कोडेड स्ट्रिंग",
    base64url: "Base64URL-एन्कोडेड स्ट्रिंग",
    json_string: "JSON स्ट्रिंग",
    e164: "E.164 संख्या",
    credit_card: "क्रेडिट कार्ड संख्या",
    currency_code: "मुद्रा कोड",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "इनपुट"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `अमान्य इनपुट: अपेक्षित ${expected}, प्राप्त ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `अमान्य इनपुट: अपेक्षित ${stringifyPrimitive(issue.values[0])}`;
        return `अमान्य विकल्प: अपेक्षित मानों में से एक ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `बहुत बड़ा: अपेक्षित था कि ${issue.origin ?? "मान"} में ${adj}${issue.maximum} ${sizing.unit} हों`;
        return `बहुत बड़ा: अपेक्षित था कि ${issue.origin ?? "मान"} ${adj}${issue.maximum} हो`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `बहुत छोटा: अपेक्षित था कि ${issue.origin} में ${adj}${issue.minimum} ${sizing.unit} हों`;
        return `बहुत छोटा: अपेक्षित था कि ${issue.origin} ${adj}${issue.minimum} हो`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `अमान्य स्ट्रिंग: "${_issue.prefix}" से शुरू होना चाहिए`;
        if (_issue.format === "ends_with")
          return `अमान्य स्ट्रिंग: "${_issue.suffix}" पर समाप्त होना चाहिए`;
        if (_issue.format === "includes")
          return `अमान्य स्ट्रिंग: इसमें "${_issue.includes}" शामिल होना चाहिए`;
        if (_issue.format === "regex")
          return `अमान्य स्ट्रिंग: पैटर्न ${_issue.pattern} से मेल खाना चाहिए`;
        return `अमान्य ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `अमान्य संख्या: यह ${issue.divisor} का गुणज होना चाहिए`;
      case "unrecognized_keys":
        return `अपरिचित कुंजी${issue.keys.length > 1 ? "याँ" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `अमान्य कुंजी: ${issue.origin} में`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `अमान्य डिस्क्रिमिनेटर मान: अपेक्षित ${opts}`;
        }
        return "अमान्य इनपुट";
      case "invalid_element":
        return `अमान्य मान: ${issue.origin} में`;
      default:
        return `अमान्य इनपुट`;
    }
  };
};
function hi_default() {
  return {
    localeError: error21()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/hr.js
var error22 = () => {
  const Sizable = {
    string: { unit: "znakova", verb: "imati" },
    file: { unit: "bajtova", verb: "imati" },
    array: { unit: "stavki", verb: "imati" },
    set: { unit: "stavki", verb: "imati" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "unos",
    email: "email adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum i vrijeme",
    date: "ISO datum",
    time: "ISO vrijeme",
    duration: "ISO trajanje",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    mac: "MAC adresa",
    cidrv4: "IPv4 raspon",
    cidrv6: "IPv6 raspon",
    base64: "base64 kodirani tekst",
    base64url: "base64url kodirani tekst",
    json_string: "JSON tekst",
    e164: "E.164 broj",
    credit_card: "broj kreditne kartice",
    currency_code: "kod valute",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "unos"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "tekst",
    number: "broj",
    boolean: "boolean",
    array: "niz",
    object: "objekt",
    set: "skup",
    file: "datoteka",
    date: "datum",
    bigint: "bigint",
    symbol: "simbol",
    undefined: "undefined",
    null: "null",
    function: "funkcija",
    map: "mapa"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Neispravan unos: očekuje se instanceof ${issue.expected}, a primljeno je ${received}`;
        }
        return `Neispravan unos: očekuje se ${expected}, a primljeno je ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Neispravna vrijednost: očekivano ${stringifyPrimitive(issue.values[0])}`;
        return `Neispravna opcija: očekivano jedno od ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        const origin = TypeDictionary[issue.origin] ?? issue.origin;
        if (sizing)
          return `Preveliko: očekivano da ${origin ?? "vrijednost"} ima ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemenata"}`;
        return `Preveliko: očekivano da ${origin ?? "vrijednost"} bude ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        const origin = TypeDictionary[issue.origin] ?? issue.origin;
        if (sizing) {
          return `Premalo: očekivano da ${origin} ima ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Premalo: očekivano da ${origin} bude ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Neispravan tekst: mora započinjati s "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neispravan tekst: mora završavati s "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neispravan tekst: mora sadržavati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neispravan tekst: mora odgovarati uzorku ${_issue.pattern}`;
        return `Neispravna ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Neispravan broj: mora biti višekratnik od ${issue.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznat${issue.keys.length > 1 ? "i ključevi" : " ključ"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Neispravan ključ u ${TypeDictionary[issue.origin] ?? issue.origin}`;
      case "invalid_union":
        return "Neispravan unos";
      case "invalid_element":
        return `Neispravna vrijednost u ${TypeDictionary[issue.origin] ?? issue.origin}`;
      default:
        return `Neispravan unos`;
    }
  };
};
function hr_default() {
  return {
    localeError: error22()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/hu.js
var error23 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "legyen" },
    file: { unit: "byte", verb: "legyen" },
    array: { unit: "elem", verb: "legyen" },
    set: { unit: "elem", verb: "legyen" },
    map: { unit: "elem", verb: "legyen" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "bemenet",
    email: "email cím",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO időbélyeg",
    date: "ISO dátum",
    time: "ISO idő",
    duration: "ISO időintervallum",
    ipv4: "IPv4 cím",
    ipv6: "IPv6 cím",
    mac: "MAC cím",
    cidrv4: "IPv4 tartomány",
    cidrv6: "IPv6 tartomány",
    base64: "base64-kódolt string",
    base64url: "base64url-kódolt string",
    json_string: "JSON string",
    e164: "E.164 szám",
    credit_card: "hitelkártyaszám",
    currency_code: "pénznemkód",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "bemenet"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "szám",
    array: "tömb"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Érvénytelen bemenet: a várt érték instanceof ${issue.expected}, a kapott érték ${received}`;
        }
        return `Érvénytelen bemenet: a várt érték ${expected}, a kapott érték ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Érvénytelen bemenet: a várt érték ${stringifyPrimitive(issue.values[0])}`;
        return `Érvénytelen opció: valamelyik érték várt ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Túl nagy: ${issue.origin ?? "érték"} mérete túl nagy ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elem"}`;
        return `Túl nagy: a bemeneti érték ${issue.origin ?? "érték"} túl nagy: ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Túl kicsi: a bemeneti érték ${issue.origin} mérete túl kicsi ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Túl kicsi: a bemeneti érték ${issue.origin} túl kicsi ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Érvénytelen string: "${_issue.prefix}" értékkel kell kezdődnie`;
        if (_issue.format === "ends_with")
          return `Érvénytelen string: "${_issue.suffix}" értékkel kell végződnie`;
        if (_issue.format === "includes")
          return `Érvénytelen string: "${_issue.includes}" értéket kell tartalmaznia`;
        if (_issue.format === "regex")
          return `Érvénytelen string: ${_issue.pattern} mintának kell megfelelnie`;
        return `Érvénytelen ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Érvénytelen szám: ${issue.divisor} többszörösének kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Érvénytelen kulcs ${issue.origin}`;
      case "invalid_union":
        return "Érvénytelen bemenet";
      case "invalid_element":
        return `Érvénytelen érték: ${issue.origin}`;
      default:
        return `Érvénytelen bemenet`;
    }
  };
};
function hu_default() {
  return {
    localeError: error23()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/hy.js
function getArmenianPlural(count, one, many) {
  return Math.abs(count) === 1 ? one : many;
}
function withDefiniteArticle(word) {
  if (!word)
    return "";
  const vowels = ["ա", "ե", "ը", "ի", "ո", "ու", "օ"];
  const lastChar = word[word.length - 1];
  return word + (vowels.includes(lastChar) ? "ն" : "ը");
}
var error24 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "նշան",
        many: "նշաններ"
      },
      verb: "ունենալ"
    },
    file: {
      unit: {
        one: "բայթ",
        many: "բայթեր"
      },
      verb: "ունենալ"
    },
    array: {
      unit: {
        one: "տարր",
        many: "տարրեր"
      },
      verb: "ունենալ"
    },
    set: {
      unit: {
        one: "տարր",
        many: "տարրեր"
      },
      verb: "ունենալ"
    },
    map: {
      unit: {
        one: "տարր",
        many: "տարրեր"
      },
      verb: "ունենալ"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "մուտք",
    email: "էլ. հասցե",
    url: "URL",
    emoji: "էմոջի",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO ամսաթիվ և ժամ",
    date: "ISO ամսաթիվ",
    time: "ISO ժամ",
    duration: "ISO տևողություն",
    ipv4: "IPv4 հասցե",
    ipv6: "IPv6 հասցե",
    mac: "MAC հասցե",
    cidrv4: "IPv4 միջակայք",
    cidrv6: "IPv6 միջակայք",
    base64: "base64 ձևաչափով տող",
    base64url: "base64url ձևաչափով տող",
    json_string: "JSON տող",
    e164: "E.164 համար",
    credit_card: "կրեդիտ քարտի համար",
    currency_code: "արժույթի կոդ",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "մուտք"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "թիվ",
    array: "զանգված"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Սխալ մուտքագրում․ սպասվում էր instanceof ${issue.expected}, ստացվել է ${received}`;
        }
        return `Սխալ մուտքագրում․ սպասվում էր ${expected}, ստացվել է ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Սխալ մուտքագրում․ սպասվում էր ${stringifyPrimitive(issue.values[1])}`;
        return `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          const maxValue = Number(issue.maximum);
          const unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
          return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin ?? "արժեք")} կունենա ${adj}${issue.maximum.toString()} ${unit}`;
        }
        return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin ?? "արժեք")} լինի ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          const minValue = Number(issue.minimum);
          const unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
          return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin)} կունենա ${adj}${issue.minimum.toString()} ${unit}`;
        }
        return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin)} լինի ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Սխալ տող․ պետք է սկսվի "${_issue.prefix}"-ով`;
        if (_issue.format === "ends_with")
          return `Սխալ տող․ պետք է ավարտվի "${_issue.suffix}"-ով`;
        if (_issue.format === "includes")
          return `Սխալ տող․ պետք է պարունակի "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Սխալ տող․ պետք է համապատասխանի ${_issue.pattern} ձևաչափին`;
        return `Սխալ ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${issue.divisor}-ի`;
      case "unrecognized_keys":
        return `Չճանաչված բանալի${issue.keys.length > 1 ? "ներ" : ""}. ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Սխալ բանալի ${withDefiniteArticle(issue.origin)}-ում`;
      case "invalid_union":
        return "Սխալ մուտքագրում";
      case "invalid_element":
        return `Սխալ արժեք ${withDefiniteArticle(issue.origin)}-ում`;
      default:
        return `Սխալ մուտքագրում`;
    }
  };
};
function hy_default() {
  return {
    localeError: error24()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/id.js
var error25 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "memiliki" },
    file: { unit: "byte", verb: "memiliki" },
    array: { unit: "item", verb: "memiliki" },
    set: { unit: "item", verb: "memiliki" },
    map: { unit: "item", verb: "memiliki" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tanggal dan waktu format ISO",
    date: "tanggal format ISO",
    time: "jam format ISO",
    duration: "durasi format ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    mac: "alamat MAC",
    cidrv4: "rentang alamat IPv4",
    cidrv6: "rentang alamat IPv6",
    base64: "string dengan enkode base64",
    base64url: "string dengan enkode base64url",
    json_string: "string JSON",
    e164: "angka E.164",
    credit_card: "nomor kartu kredit",
    currency_code: "kode mata uang",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Input tidak valid: diharapkan instanceof ${issue.expected}, diterima ${received}`;
        }
        return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Input tidak valid: diharapkan ${stringifyPrimitive(issue.values[0])}`;
        return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Terlalu besar: diharapkan ${issue.origin ?? "value"} memiliki ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: diharapkan ${issue.origin ?? "value"} menjadi ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Terlalu kecil: diharapkan ${issue.origin} memiliki ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: diharapkan ${issue.origin} menjadi ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak valid: harus menyertakan "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${issue.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${issue.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${issue.origin}`;
      default:
        return `Input tidak valid`;
    }
  };
};
function id_default() {
  return {
    localeError: error25()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/is.js
var error26 = () => {
  const Sizable = {
    string: { unit: "stafi", verb: "að hafa" },
    file: { unit: "bæti", verb: "að hafa" },
    array: { unit: "hluti", verb: "að hafa" },
    set: { unit: "hluti", verb: "að hafa" },
    map: { unit: "hluti", verb: "að hafa" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "gildi",
    email: "netfang",
    url: "vefslóð",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dagsetning og tími",
    date: "ISO dagsetning",
    time: "ISO tími",
    duration: "ISO tímalengd",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded strengur",
    base64url: "base64url-encoded strengur",
    json_string: "JSON strengur",
    e164: "E.164 tölugildi",
    credit_card: "kreditkortanúmer",
    currency_code: "gjaldmiðilskóði",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "gildi"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "númer",
    array: "fylki"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera instanceof ${issue.expected}`;
        }
        return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera ${expected}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Rangt gildi: gert ráð fyrir ${stringifyPrimitive(issue.values[0])}`;
        return `Ógilt val: má vera eitt af eftirfarandi ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Of stórt: gert er ráð fyrir að ${issue.origin ?? "gildi"} hafi ${adj}${issue.maximum.toString()} ${sizing.unit ?? "hluti"}`;
        return `Of stórt: gert er ráð fyrir að ${issue.origin ?? "gildi"} sé ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Of lítið: gert er ráð fyrir að ${issue.origin} hafi ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Of lítið: gert er ráð fyrir að ${issue.origin} sé ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Ógildur strengur: verður að byrja á "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ógildur strengur: verður að enda á "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ógildur strengur: verður að innihalda "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ógildur strengur: verður að fylgja mynstri ${_issue.pattern}`;
        return `Rangt ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Röng tala: verður að vera margfeldi af ${issue.divisor}`;
      case "unrecognized_keys":
        return `Óþekkt ${issue.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Rangur lykill í ${issue.origin}`;
      case "invalid_union":
        return "Rangt gildi";
      case "invalid_element":
        return `Rangt gildi í ${issue.origin}`;
      default:
        return `Rangt gildi`;
    }
  };
};
function is_default() {
  return {
    localeError: error26()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/it.js
var error27 = () => {
  const Sizable = {
    string: { unit: "caratteri", verb: "avere" },
    file: { unit: "byte", verb: "avere" },
    array: { unit: "elementi", verb: "avere" },
    set: { unit: "elementi", verb: "avere" },
    map: { unit: "elementi", verb: "avere" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "indirizzo email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e ora ISO",
    date: "data ISO",
    time: "ora ISO",
    duration: "durata ISO",
    ipv4: "indirizzo IPv4",
    ipv6: "indirizzo IPv6",
    mac: "indirizzo MAC",
    cidrv4: "intervallo IPv4",
    cidrv6: "intervallo IPv6",
    base64: "stringa codificata in base64",
    base64url: "URL codificata in base64",
    json_string: "stringa JSON",
    e164: "numero E.164",
    credit_card: "numero di carta di credito",
    currency_code: "codice valuta",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numero",
    array: "vettore"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Input non valido: atteso instanceof ${issue.expected}, ricevuto ${received}`;
        }
        return `Input non valido: atteso ${expected}, ricevuto ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Input non valido: atteso ${stringifyPrimitive(issue.values[0])}`;
        return `Opzione non valida: atteso uno tra ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Troppo grande: ${issue.origin ?? "valore"} deve avere ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementi"}`;
        return `Troppo grande: ${issue.origin ?? "valore"} deve essere ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Troppo piccolo: ${issue.origin} deve avere ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Troppo piccolo: ${issue.origin} deve essere ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Stringa non valida: deve includere "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
        return `Input non valido: ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${issue.divisor}`;
      case "unrecognized_keys":
        return `Chiav${issue.keys.length > 1 ? "i" : "e"} non riconosciut${issue.keys.length > 1 ? "e" : "a"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${issue.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${issue.origin}`;
      default:
        return `Input non valido`;
    }
  };
};
function it_default() {
  return {
    localeError: error27()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ja.js
var error28 = () => {
  const Sizable = {
    string: { unit: "文字", verb: "である" },
    file: { unit: "バイト", verb: "である" },
    array: { unit: "要素", verb: "である" },
    set: { unit: "要素", verb: "である" },
    map: { unit: "要素", verb: "である" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "入力値",
    email: "メールアドレス",
    url: "URL",
    emoji: "絵文字",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO日時",
    date: "ISO日付",
    time: "ISO時刻",
    duration: "ISO期間",
    ipv4: "IPv4アドレス",
    ipv6: "IPv6アドレス",
    mac: "MACアドレス",
    cidrv4: "IPv4範囲",
    cidrv6: "IPv6範囲",
    base64: "base64エンコード文字列",
    base64url: "base64urlエンコード文字列",
    json_string: "JSON文字列",
    e164: "E.164番号",
    credit_card: "クレジットカード番号",
    currency_code: "通貨コード",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "入力値"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "数値",
    array: "配列"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `無効な入力: instanceof ${issue.expected}が期待されましたが、${received}が入力されました`;
        }
        return `無効な入力: ${expected}が期待されましたが、${received}が入力されました`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `無効な入力: ${stringifyPrimitive(issue.values[0])}が期待されました`;
        return `無効な選択: ${joinValues(issue.values, "、")}のいずれかである必要があります`;
      case "too_big": {
        const adj = issue.inclusive ? "以下である" : "より小さい";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `大きすぎる値: ${issue.origin ?? "値"}は${issue.maximum.toString()}${sizing.unit ?? "要素"}${adj}必要があります`;
        return `大きすぎる値: ${issue.origin ?? "値"}は${issue.maximum.toString()}${adj}必要があります`;
      }
      case "too_small": {
        const adj = issue.inclusive ? "以上である" : "より大きい";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `小さすぎる値: ${issue.origin}は${issue.minimum.toString()}${sizing.unit}${adj}必要があります`;
        return `小さすぎる値: ${issue.origin}は${issue.minimum.toString()}${adj}必要があります`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `無効な文字列: "${_issue.prefix}"で始まる必要があります`;
        if (_issue.format === "ends_with")
          return `無効な文字列: "${_issue.suffix}"で終わる必要があります`;
        if (_issue.format === "includes")
          return `無効な文字列: "${_issue.includes}"を含む必要があります`;
        if (_issue.format === "regex")
          return `無効な文字列: パターン${_issue.pattern}に一致する必要があります`;
        return `無効な${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `無効な数値: ${issue.divisor}の倍数である必要があります`;
      case "unrecognized_keys":
        return `認識されていないキー${issue.keys.length > 1 ? "群" : ""}: ${joinValues(issue.keys, "、")}`;
      case "invalid_key":
        return `${issue.origin}内の無効なキー`;
      case "invalid_union":
        return "無効な入力";
      case "invalid_element":
        return `${issue.origin}内の無効な値`;
      default:
        return `無効な入力`;
    }
  };
};
function ja_default() {
  return {
    localeError: error28()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ka.js
var error29 = () => {
  const Sizable = {
    string: { unit: "სიმბოლო", verb: "უნდა შეიცავდეს" },
    file: { unit: "ბაიტი", verb: "უნდა შეიცავდეს" },
    array: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
    set: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
    map: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "შეყვანა",
    email: "ელ-ფოსტის მისამართი",
    url: "URL",
    emoji: "ემოჯი",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "თარიღი-დრო",
    date: "თარიღი",
    time: "დრო",
    duration: "ხანგრძლივობა",
    ipv4: "IPv4 მისამართი",
    ipv6: "IPv6 მისამართი",
    mac: "MAC მისამართი",
    cidrv4: "IPv4 დიაპაზონი",
    cidrv6: "IPv6 დიაპაზონი",
    base64: "base64-კოდირებული ველი",
    base64url: "base64url-კოდირებული ველი",
    json_string: "JSON ველი",
    e164: "E.164 ნომერი",
    credit_card: "საკრედიტო ბარათის ნომერი",
    currency_code: "ვალუტის კოდი",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "შეყვანა"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "რიცხვი",
    string: "ველი",
    boolean: "ბულეანი",
    function: "ფუნქცია",
    array: "მასივი"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `არასწორი შეყვანა: მოსალოდნელი instanceof ${issue.expected}, მიღებული ${received}`;
        }
        return `არასწორი შეყვანა: მოსალოდნელი ${expected}, მიღებული ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `არასწორი შეყვანა: მოსალოდნელი ${stringifyPrimitive(issue.values[0])}`;
        return `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${joinValues(issue.values, "|")}-დან`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `ზედმეტად დიდი: მოსალოდნელი ${issue.origin ?? "მნიშვნელობა"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit}`;
        return `ზედმეტად დიდი: მოსალოდნელი ${issue.origin ?? "მნიშვნელობა"} იყოს ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `ზედმეტად პატარა: მოსალოდნელი ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `ზედმეტად პატარა: მოსალოდნელი ${issue.origin} იყოს ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `არასწორი ველი: უნდა იწყებოდეს "${_issue.prefix}"-ით`;
        }
        if (_issue.format === "ends_with")
          return `არასწორი ველი: უნდა მთავრდებოდეს "${_issue.suffix}"-ით`;
        if (_issue.format === "includes")
          return `არასწორი ველი: უნდა შეიცავდეს "${_issue.includes}"-ს`;
        if (_issue.format === "regex")
          return `არასწორი ველი: უნდა შეესაბამებოდეს შაბლონს ${_issue.pattern}`;
        return `არასწორი ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `არასწორი რიცხვი: უნდა იყოს ${issue.divisor}-ის ჯერადი`;
      case "unrecognized_keys":
        return `უცნობი გასაღებ${issue.keys.length > 1 ? "ები" : "ი"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `არასწორი გასაღები ${issue.origin}-ში`;
      case "invalid_union":
        return "არასწორი შეყვანა";
      case "invalid_element":
        return `არასწორი მნიშვნელობა ${issue.origin}-ში`;
      default:
        return `არასწორი შეყვანა`;
    }
  };
};
function ka_default() {
  return {
    localeError: error29()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/km.js
var error30 = () => {
  const Sizable = {
    string: { unit: "តួអក្សរ", verb: "គួរមាន" },
    file: { unit: "បៃ", verb: "គួរមាន" },
    array: { unit: "ធាតុ", verb: "គួរមាន" },
    set: { unit: "ធាតុ", verb: "គួរមាន" },
    map: { unit: "ធាតុ", verb: "គួរមាន" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ទិន្នន័យបញ្ចូល",
    email: "អាសយដ្ឋានអ៊ីមែល",
    url: "URL",
    emoji: "សញ្ញាអារម្មណ៍",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
    date: "កាលបរិច្ឆេទ ISO",
    time: "ម៉ោង ISO",
    duration: "រយៈពេល ISO",
    ipv4: "អាសយដ្ឋាន IPv4",
    ipv6: "អាសយដ្ឋាន IPv6",
    mac: "អាសយដ្ឋាន MAC",
    cidrv4: "ដែនអាសយដ្ឋាន IPv4",
    cidrv6: "ដែនអាសយដ្ឋាន IPv6",
    base64: "ខ្សែអក្សរអ៊ិកូដ base64",
    base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
    json_string: "ខ្សែអក្សរ JSON",
    e164: "លេខ E.164",
    credit_card: "លេខប័ណ្ណឥណទាន",
    currency_code: "កូដរូបិយប័ណ្ណ",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ទិន្នន័យបញ្ចូល"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "លេខ",
    array: "អារេ (Array)",
    null: "គ្មានតម្លៃ (null)"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${issue.expected} ប៉ុន្តែទទួលបាន ${received}`;
        }
        return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${expected} ប៉ុន្តែទទួលបាន ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${stringifyPrimitive(issue.values[0])}`;
        return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `ធំពេក៖ ត្រូវការ ${issue.origin ?? "តម្លៃ"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "ធាតុ"}`;
        return `ធំពេក៖ ត្រូវការ ${issue.origin ?? "តម្លៃ"} ${adj} ${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `តូចពេក៖ ត្រូវការ ${issue.origin} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `តូចពេក៖ ត្រូវការ ${issue.origin} ${adj} ${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${_issue.pattern}`;
        return `មិនត្រឹមត្រូវ៖ ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${issue.divisor}`;
      case "unrecognized_keys":
        return `រកឃើញសោមិនស្គាល់៖ ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `សោមិនត្រឹមត្រូវនៅក្នុង ${issue.origin}`;
      case "invalid_union":
        return `ទិន្នន័យមិនត្រឹមត្រូវ`;
      case "invalid_element":
        return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${issue.origin}`;
      default:
        return `ទិន្នន័យមិនត្រឹមត្រូវ`;
    }
  };
};
function km_default() {
  return {
    localeError: error30()
  };
}

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/kh.js
function kh_default() {
  return km_default();
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/kn.js
var error31 = () => {
  const Sizable = {
    string: { unit: "ಅಕ್ಷರಗಳು", verb: "ಹೊಂದಲು" },
    file: { unit: "ಬೈಟ್‌ಗಳು", verb: "ಹೊಂದಲು" },
    array: { unit: "ವಸ್ತುಗಳು", verb: "ಹೊಂದಲು" },
    set: { unit: "ವಸ್ತುಗಳು", verb: "ಹೊಂದಲು" },
    map: { unit: "entries", verb: "ಹೊಂದಲು" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ಇನ್ಪುಟ್",
    email: "email ವಿಳಾಸ",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO ದಿನಾಂಕದ ಸಮಯ",
    date: "ISO ದಿನಾಂಕ",
    time: "ISO ಸಮಯ",
    duration: "ISO ಅವಧಿ",
    ipv4: "IPv4 ವಿಳಾಸ",
    ipv6: "IPv6 ವಿಳಾಸ",
    mac: "MAC ವಿಳಾಸ",
    cidrv4: "IPv4 ವ್ಯಾಪ್ತಿಯ",
    cidrv6: "IPv6 ವ್ಯಾಪ್ತಿಯ",
    base64: "base64-encodedಸ್ಟ್ರಿಂಗ್",
    base64url: "base64url-encodedಸ್ಟ್ರಿಂಗ್",
    json_string: "JSONಸ್ಟ್ರಿಂಗ್",
    e164: "E.164 ಸಂಖ್ಯೆ",
    credit_card: "ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ",
    currency_code: "ಕರೆನ್ಸಿ ಕೋಡ್",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ಇನ್ಪುಟ್"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${expected}, ಸ್ವೀಕರಿಸಿದನು ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${stringifyPrimitive(issue.values[0])}`;
        return `ಅಮಾನ್ಯ ಆಯ್ಕೆ: ಇವುಗಳಲ್ಲಿ ಒಂದನ್ನು ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `ತುಂಬಾ ದೊಡ್ಡದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${issue.origin ?? "value"} ಹೊಂದಲು ${adj}${issue.maximum.toString()} ${sizing.unit ?? "ಅಂಶಗಳು"}`;
        return `ತುಂಬಾ ದೊಡ್ಡದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${issue.origin ?? "value"} ಎಂದು ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `ತುಂಬಾ ಚಿಕ್ಕದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${issue.origin} ಹೊಂದಲು ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `ತುಂಬಾ ಚಿಕ್ಕದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${issue.origin} ಎಂದು ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `ಅಮಾನ್ಯವಾದ ಸ್ಟ್ರಿಂಗ್: ಇದರೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಬೇಕು "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `ಅಮಾನ್ಯವಾದ ಸ್ಟ್ರಿಂಗ್: ಇದರೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳಬೇಕು "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `ಅಮಾನ್ಯ ಸ್ಟ್ರಿಂಗ್: ಒಳಗೊಂಡಿರಬೇಕು "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `ಅಮಾನ್ಯವಾದ ಸ್ಟ್ರಿಂಗ್: ಮಾದರಿಗೆ ಹೊಂದಿಕೆಯಾಗಬೇಕು ${_issue.pattern}`;
        return `ಅಮಾನ್ಯ ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `ಅಮಾನ್ಯ ಸಂಖ್ಯೆ: ಬಹುಸಂಖ್ಯೆಯಾಗಿರಬೇಕು ${issue.divisor}`;
      case "unrecognized_keys":
        return `ಗುರುತಿಸಲಾಗದ ಕೀ ${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `ಅಮಾನ್ಯವಾದ ಕೀ ಇನ್ ${issue.origin}`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `ಅಮಾನ್ಯ ತಾರತಮ್ಯ ಮೌಲ್ಯ. ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${opts}`;
        }
        return "ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್";
      case "invalid_element":
        return `ರಲ್ಲಿ ಅಮಾನ್ಯ ಮೌಲ್ಯ ${issue.origin}`;
      default:
        return `ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್`;
    }
  };
};
function kn_default() {
  return {
    localeError: error31()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ko.js
var error32 = () => {
  const Sizable = {
    string: { unit: "문자", verb: "to have" },
    file: { unit: "바이트", verb: "to have" },
    array: { unit: "개", verb: "to have" },
    set: { unit: "개", verb: "to have" },
    map: { unit: "개", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "입력",
    email: "이메일 주소",
    url: "URL",
    emoji: "이모지",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO 날짜시간",
    date: "ISO 날짜",
    time: "ISO 시간",
    duration: "ISO 기간",
    ipv4: "IPv4 주소",
    ipv6: "IPv6 주소",
    mac: "MAC 주소",
    cidrv4: "IPv4 범위",
    cidrv6: "IPv6 범위",
    base64: "base64 인코딩 문자열",
    base64url: "base64url 인코딩 문자열",
    json_string: "JSON 문자열",
    e164: "E.164 번호",
    credit_card: "신용카드 번호",
    currency_code: "통화 코드",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "입력"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `잘못된 입력: 예상 타입은 instanceof ${issue.expected}, 받은 타입은 ${received}입니다`;
        }
        return `잘못된 입력: 예상 타입은 ${expected}, 받은 타입은 ${received}입니다`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `잘못된 입력: 값은 ${stringifyPrimitive(issue.values[0])} 이어야 합니다`;
        return `잘못된 옵션: ${joinValues(issue.values, "또는 ")} 중 하나여야 합니다`;
      case "too_big": {
        const adj = issue.inclusive ? "이하" : "미만";
        const suffix = adj === "미만" ? "이어야 합니다" : "여야 합니다";
        const sizing = getSizing(issue.origin);
        const unit = sizing?.unit ?? "요소";
        if (sizing)
          return `${issue.origin ?? "값"}이 너무 큽니다: ${issue.maximum.toString()}${unit} ${adj}${suffix}`;
        return `${issue.origin ?? "값"}이 너무 큽니다: ${issue.maximum.toString()} ${adj}${suffix}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? "이상" : "초과";
        const suffix = adj === "이상" ? "이어야 합니다" : "여야 합니다";
        const sizing = getSizing(issue.origin);
        const unit = sizing?.unit ?? "요소";
        if (sizing) {
          return `${issue.origin ?? "값"}이 너무 작습니다: ${issue.minimum.toString()}${unit} ${adj}${suffix}`;
        }
        return `${issue.origin ?? "값"}이 너무 작습니다: ${issue.minimum.toString()} ${adj}${suffix}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `잘못된 문자열: "${_issue.prefix}"(으)로 시작해야 합니다`;
        }
        if (_issue.format === "ends_with")
          return `잘못된 문자열: "${_issue.suffix}"(으)로 끝나야 합니다`;
        if (_issue.format === "includes")
          return `잘못된 문자열: "${_issue.includes}"을(를) 포함해야 합니다`;
        if (_issue.format === "regex")
          return `잘못된 문자열: 정규식 ${_issue.pattern} 패턴과 일치해야 합니다`;
        return `잘못된 ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `잘못된 숫자: ${issue.divisor}의 배수여야 합니다`;
      case "unrecognized_keys":
        return `인식할 수 없는 키: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `잘못된 키: ${issue.origin}`;
      case "invalid_union":
        return `잘못된 입력`;
      case "invalid_element":
        return `잘못된 값: ${issue.origin}`;
      default:
        return `잘못된 입력`;
    }
  };
};
function ko_default() {
  return {
    localeError: error32()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/lt.js
var capitalizeFirstCharacter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
function getUnitTypeFromNumber(number) {
  const abs = Math.abs(number);
  const last = abs % 10;
  const last2 = abs % 100;
  if (last2 >= 11 && last2 <= 19 || last === 0)
    return "many";
  if (last === 1)
    return "one";
  return "few";
}
var error33 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "simbolis",
        few: "simboliai",
        many: "simbolių"
      },
      verb: {
        smaller: {
          inclusive: "turi būti ne ilgesnė kaip",
          notInclusive: "turi būti trumpesnė kaip"
        },
        bigger: {
          inclusive: "turi būti ne trumpesnė kaip",
          notInclusive: "turi būti ilgesnė kaip"
        }
      }
    },
    file: {
      unit: {
        one: "baitas",
        few: "baitai",
        many: "baitų"
      },
      verb: {
        smaller: {
          inclusive: "turi būti ne didesnis kaip",
          notInclusive: "turi būti mažesnis kaip"
        },
        bigger: {
          inclusive: "turi būti ne mažesnis kaip",
          notInclusive: "turi būti didesnis kaip"
        }
      }
    },
    array: {
      unit: {
        one: "elementą",
        few: "elementus",
        many: "elementų"
      },
      verb: {
        smaller: {
          inclusive: "turi turėti ne daugiau kaip",
          notInclusive: "turi turėti mažiau kaip"
        },
        bigger: {
          inclusive: "turi turėti ne mažiau kaip",
          notInclusive: "turi turėti daugiau kaip"
        }
      }
    },
    set: {
      unit: {
        one: "elementą",
        few: "elementus",
        many: "elementų"
      },
      verb: {
        smaller: {
          inclusive: "turi turėti ne daugiau kaip",
          notInclusive: "turi turėti mažiau kaip"
        },
        bigger: {
          inclusive: "turi turėti ne mažiau kaip",
          notInclusive: "turi turėti daugiau kaip"
        }
      }
    }
  };
  function getSizing(origin, unitType, inclusive, targetShouldBe) {
    const result = Sizable[origin] ?? null;
    if (result === null)
      return result;
    return {
      unit: result.unit[unitType],
      verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
    };
  }
  const FormatDictionary = {
    regex: "įvestis",
    email: "el. pašto adresas",
    url: "URL",
    emoji: "jaustukas",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO data ir laikas",
    date: "ISO data",
    time: "ISO laikas",
    duration: "ISO trukmė",
    ipv4: "IPv4 adresas",
    ipv6: "IPv6 adresas",
    mac: "MAC adresas",
    cidrv4: "IPv4 tinklo prefiksas (CIDR)",
    cidrv6: "IPv6 tinklo prefiksas (CIDR)",
    base64: "base64 užkoduota eilutė",
    base64url: "base64url užkoduota eilutė",
    json_string: "JSON eilutė",
    e164: "E.164 numeris",
    credit_card: "kredito kortelės numeris",
    currency_code: "valiutos kodas",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "įvestis"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "skaičius",
    bigint: "sveikasis skaičius",
    string: "eilutė",
    boolean: "loginė reikšmė",
    undefined: "neapibrėžta reikšmė",
    function: "funkcija",
    symbol: "simbolis",
    array: "masyvas",
    object: "objektas",
    null: "nulinė reikšmė"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Gautas tipas ${received}, o tikėtasi - instanceof ${issue.expected}`;
        }
        return `Gautas tipas ${received}, o tikėtasi - ${expected}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Privalo būti ${stringifyPrimitive(issue.values[0])}`;
        return `Privalo būti vienas iš ${joinValues(issue.values, "|")} pasirinkimų`;
      case "too_big": {
        const origin = TypeDictionary[issue.origin] ?? issue.origin;
        const sizing = getSizing(issue.origin, getUnitTypeFromNumber(Number(issue.maximum)), issue.inclusive ?? false, "smaller");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} ${sizing.verb} ${issue.maximum.toString()} ${sizing.unit ?? "elementų"}`;
        const adj = issue.inclusive ? "ne didesnis kaip" : "mažesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} turi būti ${adj} ${issue.maximum.toString()} ${sizing?.unit}`;
      }
      case "too_small": {
        const origin = TypeDictionary[issue.origin] ?? issue.origin;
        const sizing = getSizing(issue.origin, getUnitTypeFromNumber(Number(issue.minimum)), issue.inclusive ?? false, "bigger");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} ${sizing.verb} ${issue.minimum.toString()} ${sizing.unit ?? "elementų"}`;
        const adj = issue.inclusive ? "ne mažesnis kaip" : "didesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} turi būti ${adj} ${issue.minimum.toString()} ${sizing?.unit}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Eilutė privalo prasidėti "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Eilutė privalo pasibaigti "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Eilutė privalo įtraukti "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Eilutė privalo atitikti ${_issue.pattern}`;
        return `Neteisingas ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Skaičius privalo būti ${issue.divisor} kartotinis.`;
      case "unrecognized_keys":
        return `Neatpažint${issue.keys.length > 1 ? "i" : "as"} rakt${issue.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return "Rastas klaidingas raktas";
      case "invalid_union":
        return "Klaidinga įvestis";
      case "invalid_element": {
        const origin = TypeDictionary[issue.origin] ?? issue.origin;
        return `${capitalizeFirstCharacter(origin ?? issue.origin ?? "reikšmė")} turi klaidingą įvestį`;
      }
      default:
        return "Klaidinga įvestis";
    }
  };
};
function lt_default() {
  return {
    localeError: error33()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/mk.js
var error34 = () => {
  const Sizable = {
    string: { unit: "знаци", verb: "да имаат" },
    file: { unit: "бајти", verb: "да имаат" },
    array: { unit: "ставки", verb: "да имаат" },
    set: { unit: "ставки", verb: "да имаат" },
    map: { unit: "ставки", verb: "да имаат" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "внес",
    email: "адреса на е-пошта",
    url: "URL",
    emoji: "емоџи",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO датум и време",
    date: "ISO датум",
    time: "ISO време",
    duration: "ISO времетраење",
    ipv4: "IPv4 адреса",
    ipv6: "IPv6 адреса",
    mac: "MAC адреса",
    cidrv4: "IPv4 опсег",
    cidrv6: "IPv6 опсег",
    base64: "base64-енкодирана низа",
    base64url: "base64url-енкодирана низа",
    json_string: "JSON низа",
    e164: "E.164 број",
    credit_card: "број на кредитна картичка",
    currency_code: "код на валута",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "внес"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "број",
    array: "низа"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Грешен внес: се очекува instanceof ${issue.expected}, примено ${received}`;
        }
        return `Грешен внес: се очекува ${expected}, примено ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
        return `Грешана опција: се очекува една ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Премногу голем: се очекува ${issue.origin ?? "вредноста"} да има ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елементи"}`;
        return `Премногу голем: се очекува ${issue.origin ?? "вредноста"} да биде ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Премногу мал: се очекува ${issue.origin} да има ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Премногу мал: се очекува ${issue.origin} да биде ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Неважечка низа: мора да започнува со "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Неважечка низа: мора да завршува со "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неважечка низа: мора да вклучува "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неважечка низа: мора да одгоара на патернот ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Грешен број: мора да биде делив со ${issue.divisor}`;
      case "unrecognized_keys":
        return `${issue.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Грешен клуч во ${issue.origin}`;
      case "invalid_union":
        return "Грешен внес";
      case "invalid_element":
        return `Грешна вредност во ${issue.origin}`;
      default:
        return `Грешен внес`;
    }
  };
};
function mk_default() {
  return {
    localeError: error34()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ms.js
var error35 = () => {
  const Sizable = {
    string: { unit: "aksara", verb: "mempunyai" },
    file: { unit: "bait", verb: "mempunyai" },
    array: { unit: "elemen", verb: "mempunyai" },
    set: { unit: "elemen", verb: "mempunyai" },
    map: { unit: "elemen", verb: "mempunyai" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat e-mel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tarikh masa ISO",
    date: "tarikh ISO",
    time: "masa ISO",
    duration: "tempoh ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    mac: "alamat MAC",
    cidrv4: "julat IPv4",
    cidrv6: "julat IPv6",
    base64: "string dikodkan base64",
    base64url: "string dikodkan base64url",
    json_string: "string JSON",
    e164: "nombor E.164",
    credit_card: "nombor kad kredit",
    currency_code: "kod mata wang",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombor"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Input tidak sah: dijangka instanceof ${issue.expected}, diterima ${received}`;
        }
        return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Input tidak sah: dijangka ${stringifyPrimitive(issue.values[0])}`;
        return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Terlalu besar: dijangka ${issue.origin ?? "nilai"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: dijangka ${issue.origin ?? "nilai"} adalah ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Terlalu kecil: dijangka ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: dijangka ${issue.origin} adalah ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${issue.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${issue.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${issue.origin}`;
      default:
        return `Input tidak sah`;
    }
  };
};
function ms_default() {
  return {
    localeError: error35()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ne.js
var error36 = () => {
  const Sizable = {
    string: { unit: "अक्षर", verb: "हुनुपर्छ" },
    file: { unit: "बाइट", verb: "हुनुपर्छ" },
    array: { unit: "तत्व", verb: "हुनुपर्छ" },
    set: { unit: "तत्व", verb: "हुनुपर्छ" },
    map: { unit: "प्रविष्टि", verb: "हुनुपर्छ" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "इनपुट",
    email: "इमेल ठेगाना",
    url: "URL",
    emoji: "इमोजी",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO मिति र समय",
    date: "ISO मिति",
    time: "ISO समय",
    duration: "ISO अवधि",
    ipv4: "IPv4 ठेगाना",
    ipv6: "IPv6 ठेगाना",
    mac: "MAC ठेगाना",
    cidrv4: "IPv4 दायरा",
    cidrv6: "IPv6 दायरा",
    base64: "base64-इन्कोड गरिएको स्ट्रिङ",
    base64url: "base64url-इन्कोड गरिएको स्ट्रिङ",
    json_string: "JSON स्ट्रिङ",
    e164: "E.164 नम्बर",
    credit_card: "क्रेडिट कार्ड नम्बर",
    currency_code: "मुद्रा कोड",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "इनपुट"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `अमान्य इनपुट: अपेक्षित ${expected}, प्राप्त ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `अमान्य इनपुट: अपेक्षित ${stringifyPrimitive(issue.values[0])}`;
        return `अमान्य विकल्प: अपेक्षित मानहरू मध्ये एक ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `धेरै ठूलो: ${issue.origin ?? "मान"} मा ${adj}${issue.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `धेरै ठूलो: ${issue.origin ?? "मान"} ${adj}${issue.maximum.toString()} हुनुपर्छ`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `धेरै सानो: ${issue.origin} मा ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `धेरै सानो: ${issue.origin} ${adj}${issue.minimum.toString()} हुनुपर्छ`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `अमान्य स्ट्रिङ: "${_issue.prefix}" बाट सुरु हुनुपर्छ`;
        if (_issue.format === "ends_with")
          return `अमान्य स्ट्रिङ: "${_issue.suffix}" मा समाप्त हुनुपर्छ`;
        if (_issue.format === "includes")
          return `अमान्य स्ट्रिङ: "${_issue.includes}" समावेश हुनुपर्छ`;
        if (_issue.format === "regex")
          return `अमान्य स्ट्रिङ: ढाँचा ${_issue.pattern} सँग मेल खानुपर्छ`;
        return `अमान्य ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `अमान्य संख्या: ${issue.divisor} को गुणज हुनुपर्छ`;
      case "unrecognized_keys":
        return `अपरिचित कुञ्जी${issue.keys.length > 1 ? "हरू" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `अमान्य कुञ्जी: ${issue.origin} मा`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `अमान्य डिस्क्रिमिनेटर मान: अपेक्षित ${opts}`;
        }
        return "अमान्य इनपुट";
      case "invalid_element":
        return `अमान्य मान: ${issue.origin} मा`;
      default:
        return `अमान्य इनपुट`;
    }
  };
};
function ne_default() {
  return {
    localeError: error36()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/nl.js
var error37 = () => {
  const Sizable = {
    string: { unit: "tekens", verb: "heeft" },
    file: { unit: "bytes", verb: "heeft" },
    array: { unit: "elementen", verb: "heeft" },
    set: { unit: "elementen", verb: "heeft" },
    map: { unit: "elementen", verb: "heeft" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "invoer",
    email: "emailadres",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum en tijd",
    date: "ISO datum",
    time: "ISO tijd",
    duration: "ISO duur",
    ipv4: "IPv4-adres",
    ipv6: "IPv6-adres",
    mac: "MAC-adres",
    cidrv4: "IPv4-bereik",
    cidrv6: "IPv6-bereik",
    base64: "base64-gecodeerde tekst",
    base64url: "base64 URL-gecodeerde tekst",
    json_string: "JSON string",
    e164: "E.164-nummer",
    credit_card: "creditcardnummer",
    currency_code: "valutacode",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "invoer"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "getal"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Ongeldige invoer: verwacht instanceof ${issue.expected}, ontving ${received}`;
        }
        return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue.values[0])}`;
        return `Ongeldige optie: verwacht één van ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        const longName = issue.origin === "date" ? "laat" : issue.origin === "string" ? "lang" : "groot";
        if (sizing)
          return `Te ${longName}: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
        return `Te ${longName}: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} is`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        const shortName = issue.origin === "date" ? "vroeg" : issue.origin === "string" ? "kort" : "klein";
        if (sizing) {
          return `Te ${shortName}: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Te ${shortName}: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} is`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
        }
        if (_issue.format === "ends_with")
          return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
        if (_issue.format === "includes")
          return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
        if (_issue.format === "regex")
          return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
        return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${issue.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${issue.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${issue.origin}`;
      default:
        return `Ongeldige invoer`;
    }
  };
};
function nl_default() {
  return {
    localeError: error37()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/nn.js
var error38 = () => {
  const Sizable = {
    string: { unit: "teikn", verb: "å ha" },
    file: { unit: "bytes", verb: "å ha" },
    array: { unit: "element", verb: "å innehalde" },
    set: { unit: "element", verb: "å innehalde" },
    map: { unit: "element", verb: "å innehalde" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-postadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkeslett",
    date: "ISO-dato",
    time: "ISO-klokkeslett",
    duration: "ISO-varigheit",
    ipv4: "IPv4-adresse",
    ipv6: "IPv6-adresse",
    mac: "MAC-adresse",
    cidrv4: "IPv4-spekter",
    cidrv6: "IPv6-spekter",
    base64: "base64-enkoda streng",
    base64url: "base64url-enkoda streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    credit_card: "kredittkortnummer",
    currency_code: "valutakode",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "tal",
    array: "liste"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Ugyldig input: forventa instanceof ${issue.expected}, fekk ${received}`;
        }
        return `Ugyldig input: forventa ${expected}, fekk ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Ugyldig verdi: forventa ${stringifyPrimitive(issue.values[0])}`;
        return `Ugyldig val: forventa eitt av ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `For stor(t): forventa ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `For stor(t): forventa ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `For lite(n): forventa ${issue.origin} til å ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `For lite(n): forventa ${issue.origin} til å ha ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: må starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: må slutte med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: må innehalde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tal: må vere eit multiplum av ${issue.divisor}`;
      case "unrecognized_keys":
        return `${issue.keys.length > 1 ? "Ukjende nøklar" : "Ukjend nøkkel"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøkkel i ${issue.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${issue.origin}`;
      default:
        return `Ugyldig input`;
    }
  };
};
function nn_default() {
  return {
    localeError: error38()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/no.js
var error39 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "å ha" },
    file: { unit: "bytes", verb: "å ha" },
    array: { unit: "elementer", verb: "å inneholde" },
    set: { unit: "elementer", verb: "å inneholde" },
    map: { unit: "elementer", verb: "å inneholde" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-postadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkeslett",
    date: "ISO-dato",
    time: "ISO-klokkeslett",
    duration: "ISO-varighet",
    ipv4: "IPv4-adresse",
    ipv6: "IPv6-adresse",
    mac: "MAC-adresse",
    cidrv4: "IPv4-spekter",
    cidrv6: "IPv6-spekter",
    base64: "base64-enkodet streng",
    base64url: "base64url-enkodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    credit_card: "kredittkortnummer",
    currency_code: "valutakode",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "tall",
    array: "liste"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Ugyldig input: forventet instanceof ${issue.expected}, fikk ${received}`;
        }
        return `Ugyldig input: forventet ${expected}, fikk ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Ugyldig verdi: forventet ${stringifyPrimitive(issue.values[0])}`;
        return `Ugyldig valg: forventet en av ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `For stor(t): forventet ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor(t): forventet ${issue.origin ?? "value"} til å ha ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `For lite(n): forventet ${issue.origin} til å ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `For lite(n): forventet ${issue.origin} til å ha ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: må starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: må ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: må inneholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: må være et multiplum av ${issue.divisor}`;
      case "unrecognized_keys":
        return `${issue.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøkkel i ${issue.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${issue.origin}`;
      default:
        return `Ugyldig input`;
    }
  };
};
function no_default() {
  return {
    localeError: error39()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ota.js
var error40 = () => {
  const Sizable = {
    string: { unit: "harf", verb: "olmalıdır" },
    file: { unit: "bayt", verb: "olmalıdır" },
    array: { unit: "unsur", verb: "olmalıdır" },
    set: { unit: "unsur", verb: "olmalıdır" },
    map: { unit: "unsur", verb: "olmalıdır" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "giren",
    email: "epostagâh",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO hengâmı",
    date: "ISO tarihi",
    time: "ISO zamanı",
    duration: "ISO müddeti",
    ipv4: "IPv4 nişânı",
    ipv6: "IPv6 nişânı",
    mac: "MAC nişânı",
    cidrv4: "IPv4 menzili",
    cidrv6: "IPv6 menzili",
    base64: "base64-şifreli metin",
    base64url: "base64url-şifreli metin",
    json_string: "JSON metin",
    e164: "E.164 sayısı",
    credit_card: "i'tibâr kartı numarası",
    currency_code: "para birimi kodu",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "giren"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numara",
    array: "saf",
    null: "gayb"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Fâsit giren: umulan instanceof ${issue.expected}, alınan ${received}`;
        }
        return `Fâsit giren: umulan ${expected}, alınan ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Fâsit giren: umulan ${stringifyPrimitive(issue.values[0])}`;
        return `Fâsit tercih: mûteberler ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Fazla büyük: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmalıydı.`;
        return `Fazla büyük: ${issue.origin ?? "value"}, ${adj}${issue.maximum.toString()} olmalıydı.`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} ${sizing.unit} sahip olmalıydı.`;
        }
        return `Fazla küçük: ${issue.origin}, ${adj}${issue.minimum.toString()} olmalıydı.`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Fâsit metin: "${_issue.prefix}" ile başlamalı.`;
        if (_issue.format === "ends_with")
          return `Fâsit metin: "${_issue.suffix}" ile bitmeli.`;
        if (_issue.format === "includes")
          return `Fâsit metin: "${_issue.includes}" ihtivâ etmeli.`;
        if (_issue.format === "regex")
          return `Fâsit metin: ${_issue.pattern} nakşına uymalı.`;
        return `Fâsit ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Fâsit sayı: ${issue.divisor} katı olmalıydı.`;
      case "unrecognized_keys":
        return `Tanınmayan anahtar ${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `${issue.origin} için tanınmayan anahtar var.`;
      case "invalid_union":
        return "Giren tanınamadı.";
      case "invalid_element":
        return `${issue.origin} için tanınmayan kıymet var.`;
      default:
        return `Kıymet tanınamadı.`;
    }
  };
};
function ota_default() {
  return {
    localeError: error40()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ps.js
var error41 = () => {
  const Sizable = {
    string: { unit: "توکي", verb: "ولري" },
    file: { unit: "بایټس", verb: "ولري" },
    array: { unit: "توکي", verb: "ولري" },
    set: { unit: "توکي", verb: "ولري" },
    map: { unit: "توکي", verb: "ولري" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ورودي",
    email: "بریښنالیک",
    url: "یو آر ال",
    emoji: "ایموجي",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "نیټه او وخت",
    date: "نېټه",
    time: "وخت",
    duration: "موده",
    ipv4: "د IPv4 پته",
    ipv6: "د IPv6 پته",
    mac: "د MAC پته",
    cidrv4: "د IPv4 ساحه",
    cidrv6: "د IPv6 ساحه",
    base64: "base64-encoded متن",
    base64url: "base64url-encoded متن",
    json_string: "JSON متن",
    e164: "د E.164 شمېره",
    credit_card: "د کریډیټ کارت شمیره",
    currency_code: "د اسعارو کوډ",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ورودي"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "عدد",
    array: "ارې"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `ناسم ورودي: باید instanceof ${issue.expected} وای, مګر ${received} ترلاسه شو`;
        }
        return `ناسم ورودي: باید ${expected} وای, مګر ${received} ترلاسه شو`;
      }
      case "invalid_value":
        if (issue.values.length === 1) {
          return `ناسم ورودي: باید ${stringifyPrimitive(issue.values[0])} وای`;
        }
        return `ناسم انتخاب: باید یو له ${joinValues(issue.values, "|")} څخه وای`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `ډیر لوی: ${issue.origin ?? "ارزښت"} باید ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عنصرونه"} ولري`;
        }
        return `ډیر لوی: ${issue.origin ?? "ارزښت"} باید ${adj}${issue.maximum.toString()} وي`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `ډیر کوچنی: ${issue.origin} باید ${adj}${issue.minimum.toString()} ${sizing.unit} ولري`;
        }
        return `ډیر کوچنی: ${issue.origin} باید ${adj}${issue.minimum.toString()} وي`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `ناسم متن: باید د "${_issue.prefix}" سره پیل شي`;
        }
        if (_issue.format === "ends_with") {
          return `ناسم متن: باید د "${_issue.suffix}" سره پای ته ورسيږي`;
        }
        if (_issue.format === "includes") {
          return `ناسم متن: باید "${_issue.includes}" ولري`;
        }
        if (_issue.format === "regex") {
          return `ناسم متن: باید د ${_issue.pattern} سره مطابقت ولري`;
        }
        return `${FormatDictionary[_issue.format] ?? issue.format} ناسم دی`;
      }
      case "not_multiple_of":
        return `ناسم عدد: باید د ${issue.divisor} مضرب وي`;
      case "unrecognized_keys":
        return `ناسم ${issue.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `ناسم کلیډ په ${issue.origin} کې`;
      case "invalid_union":
        return `ناسمه ورودي`;
      case "invalid_element":
        return `ناسم عنصر په ${issue.origin} کې`;
      default:
        return `ناسمه ورودي`;
    }
  };
};
function ps_default() {
  return {
    localeError: error41()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/pl.js
var error42 = () => {
  const Sizable = {
    string: { unit: "znaków", verb: "mieć" },
    file: { unit: "bajtów", verb: "mieć" },
    array: { unit: "elementów", verb: "mieć" },
    set: { unit: "elementów", verb: "mieć" },
    map: { unit: "elementów", verb: "mieć" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "wyrażenie",
    email: "adres email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i godzina w formacie ISO",
    date: "data w formacie ISO",
    time: "godzina w formacie ISO",
    duration: "czas trwania ISO",
    ipv4: "adres IPv4",
    ipv6: "adres IPv6",
    mac: "adres MAC",
    cidrv4: "zakres IPv4",
    cidrv6: "zakres IPv6",
    base64: "ciąg znaków zakodowany w formacie base64",
    base64url: "ciąg znaków zakodowany w formacie base64url",
    json_string: "ciąg znaków w formacie JSON",
    e164: "liczba E.164",
    credit_card: "numer karty kredytowej",
    currency_code: "kod waluty",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "wejście"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "liczba",
    array: "tablica"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Nieprawidłowe dane wejściowe: oczekiwano instanceof ${issue.expected}, otrzymano ${received}`;
        }
        return `Nieprawidłowe dane wejściowe: oczekiwano ${expected}, otrzymano ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Nieprawidłowe dane wejściowe: oczekiwano ${stringifyPrimitive(issue.values[0])}`;
        return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Za duża wartość: oczekiwano, że ${issue.origin ?? "wartość"} będzie mieć ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementów"}`;
        }
        return `Zbyt duż(y/a/e): oczekiwano, że ${issue.origin ?? "wartość"} będzie wynosić ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Za mała wartość: oczekiwano, że ${issue.origin ?? "wartość"} będzie mieć ${adj}${issue.minimum.toString()} ${sizing.unit ?? "elementów"}`;
        }
        return `Zbyt mał(y/a/e): oczekiwano, że ${issue.origin ?? "wartość"} będzie wynosić ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Nieprawidłowy ciąg znaków: musi zaczynać się od "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nieprawidłowy ciąg znaków: musi kończyć się na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nieprawidłowy ciąg znaków: musi zawierać "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${_issue.pattern}`;
        return `Nieprawidłow(y/a/e) ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Nieprawidłowa liczba: musi być wielokrotnością ${issue.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawidłowy klucz w ${issue.origin}`;
      case "invalid_union":
        return "Nieprawidłowe dane wejściowe";
      case "invalid_element":
        return `Nieprawidłowa wartość w ${issue.origin}`;
      default:
        return `Nieprawidłowe dane wejściowe`;
    }
  };
};
function pl_default() {
  return {
    localeError: error42()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/pt.js
var error43 = () => {
  const Sizable = {
    string: { unit: "caracteres" },
    file: { unit: "bytes" },
    array: { unit: "elementos" },
    set: { unit: "elementos" },
    map: { unit: "entradas" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "a entrada",
    email: "o endereço de e-mail",
    url: "o URL",
    emoji: "o emoji",
    uuid: "o UUID",
    uuidv4: "o UUIDv4",
    uuidv6: "o UUIDv6",
    nanoid: "o nanoid",
    guid: "o GUID",
    cuid: "o cuid",
    cuid2: "o cuid2",
    ulid: "o ULID",
    xid: "o XID",
    ksuid: "o KSUID",
    datetime: "a data e hora ISO",
    date: "a data ISO",
    time: "a hora ISO",
    duration: "a duração ISO",
    ipv4: "o endereço IPv4",
    ipv6: "o endereço IPv6",
    mac: "o endereço MAC",
    cidrv4: "o intervalo de endereços IPv4",
    cidrv6: "o intervalo de endereços IPv6",
    base64: "o texto codificado em base64",
    base64url: "o texto codificado em base64url",
    json_string: "o texto JSON",
    e164: "o número E.164",
    credit_card: "o número de cartão de crédito",
    currency_code: "o código de moeda",
    iban: "o IBAN",
    jwt: "o JWT",
    template_literal: "a entrada"
  };
  const Gender = {
    masculine: { definite: "o", indefinite: "um" },
    feminine: { definite: "a", indefinite: "uma" }
  };
  const TypeDictionary = {
    string: { name: "texto", articles: Gender.masculine },
    number: { name: "número", articles: Gender.masculine },
    int: { name: "número inteiro", articles: Gender.masculine },
    boolean: { name: "valor booleano", articles: Gender.masculine },
    bigint: { name: "número bigint", articles: Gender.masculine },
    symbol: { name: "símbolo", articles: Gender.masculine },
    undefined: { name: 'valor "undefined"', articles: Gender.masculine },
    null: { name: 'valor "nulo"', articles: Gender.masculine },
    never: { name: 'valor "never"', articles: Gender.masculine },
    void: { name: 'valor "void"', articles: Gender.masculine },
    date: { name: "data", articles: Gender.feminine },
    array: { name: "vetor", articles: Gender.masculine },
    object: { name: "objeto", articles: Gender.masculine },
    tuple: { name: "tuplo", articles: Gender.masculine },
    record: { name: "registo", articles: Gender.masculine },
    map: { name: "mapa", articles: Gender.masculine },
    set: { name: "conjunto", articles: Gender.masculine },
    file: { name: "ficheiro", articles: Gender.masculine },
    nonoptional: { name: "valor não opcional", articles: Gender.masculine },
    nan: { name: 'valor "NaN"', articles: Gender.masculine },
    function: { name: "função", articles: Gender.feminine }
  };
  function translateOriginWithArticle(type, articleType) {
    const translatedValue = TypeDictionary[type] ?? { name: `valor "${type}"`, articles: Gender.masculine };
    return `${translatedValue.articles[articleType]} ${translatedValue.name}`;
  }
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = translateOriginWithArticle(issue.expected, "indefinite");
        const receivedType = parsedType(issue.input);
        const received = translateOriginWithArticle(receivedType, "indefinite");
        return `Entrada inválida: esperava ${expected}, recebeu ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Entrada inválida: esperava ${stringifyPrimitive(issue.values[0])}`;
        return `Opção inválida: esperava uma das seguintes opções: ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Demasiado grande: esperava que ${translateOriginWithArticle(issue.origin, "definite")} tivesse ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Demasiado grande: esperava que ${translateOriginWithArticle(issue.origin, "definite")} fosse ${adj} ${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Demasiado pequeno: esperava que ${translateOriginWithArticle(issue.origin, "definite")} tivesse ${adj} ${issue.minimum.toString()} ${sizing.unit ?? "elementos"}`;
        }
        return `Demasiado pequeno: esperava que ${translateOriginWithArticle(issue.origin, "definite")} fosse ${adj} ${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Texto inválido: deve começar por "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Texto inválido: deve terminar em "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Texto inválido: deve incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
        return `Formato d${FormatDictionary[_issue.format] ?? issue.format} inválido`;
      }
      case "not_multiple_of":
        return `Número inválido: deve ser múltiplo de ${issue.divisor}`;
      case "unrecognized_keys": {
        const plural = issue.keys.length > 1 ? "s" : "";
        return `Chave${plural} inválida${plural}: ${joinValues(issue.keys, ", ")}`;
      }
      case "invalid_key":
        return `Entrada inválida n${translateOriginWithArticle(issue.origin, "definite")}`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `Valor de discriminação inválido. Esperava ${opts}`;
        }
        return "Entrada inválida";
      case "invalid_element":
        return `Entrada inválida n${translateOriginWithArticle(issue.origin, "definite")}`;
      default:
        return `Entrada inválida`;
    }
  };
};
function pt_default() {
  return {
    localeError: error43()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/pt-BR.js
var error44 = () => {
  const Sizable = {
    string: { unit: "caracteres" },
    file: { unit: "bytes" },
    array: { unit: "elementos" },
    set: { unit: "elementos" },
    map: { unit: "entradas" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "a entrada",
    email: "o endereço de e-mail",
    url: "o URL",
    emoji: "o emoji",
    uuid: "o UUID",
    uuidv4: "o UUIDv4",
    uuidv6: "o UUIDv6",
    nanoid: "o nanoid",
    guid: "o GUID",
    cuid: "o cuid",
    cuid2: "o cuid2",
    ulid: "o ULID",
    xid: "o XID",
    ksuid: "o KSUID",
    datetime: "a data e hora ISO",
    date: "a data ISO",
    time: "a hora ISO",
    duration: "a duração ISO",
    ipv4: "o endereço IPv4",
    ipv6: "o endereço IPv6",
    mac: "o endereço MAC",
    cidrv4: "a faixa de endereços IPv4",
    cidrv6: "a faixa de endereços IPv6",
    base64: "o texto codificado em base64",
    base64url: "o texto codificado em base64url",
    json_string: "o texto JSON",
    e164: "o número E.164",
    credit_card: "o número de cartão de crédito",
    currency_code: "o código de moeda",
    iban: "o IBAN",
    jwt: "o JWT",
    template_literal: "a entrada"
  };
  const Gender = {
    masculine: { definite: "o", indefinite: "um" },
    feminine: { definite: "a", indefinite: "uma" }
  };
  const TypeDictionary = {
    string: { name: "texto", articles: Gender.masculine },
    number: { name: "número", articles: Gender.masculine },
    int: { name: "número inteiro", articles: Gender.masculine },
    boolean: { name: "valor booleano", articles: Gender.masculine },
    bigint: { name: "número bigint", articles: Gender.masculine },
    symbol: { name: "símbolo", articles: Gender.masculine },
    undefined: { name: 'valor "undefined"', articles: Gender.masculine },
    null: { name: 'valor "nulo"', articles: Gender.masculine },
    never: { name: 'valor "never"', articles: Gender.masculine },
    void: { name: 'valor "void"', articles: Gender.masculine },
    date: { name: "data", articles: Gender.feminine },
    array: { name: "vetor", articles: Gender.masculine },
    object: { name: "objeto", articles: Gender.masculine },
    tuple: { name: "tupla", articles: Gender.feminine },
    record: { name: "registro", articles: Gender.masculine },
    map: { name: "mapa", articles: Gender.masculine },
    set: { name: "conjunto", articles: Gender.masculine },
    file: { name: "arquivo", articles: Gender.masculine },
    nonoptional: { name: "valor não opcional", articles: Gender.masculine },
    nan: { name: 'valor "NaN"', articles: Gender.masculine },
    function: { name: "função", articles: Gender.feminine }
  };
  function translateOriginWithArticle(type, articleType) {
    const translatedValue = TypeDictionary[type] ?? { name: `valor "${type}"`, articles: Gender.masculine };
    return `${translatedValue.articles[articleType]} ${translatedValue.name}`;
  }
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = translateOriginWithArticle(issue.expected, "indefinite");
        const receivedType = parsedType(issue.input);
        const received = translateOriginWithArticle(receivedType, "indefinite");
        return `Entrada inválida: esperava ${expected}, recebeu ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Entrada inválida: esperava ${stringifyPrimitive(issue.values[0])}`;
        return `Opção inválida: esperava uma das seguintes opções: ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Grande demais: esperava que ${translateOriginWithArticle(issue.origin, "definite")} tivesse ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Grande demais: esperava que ${translateOriginWithArticle(issue.origin, "definite")} fosse ${adj} ${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Pequeno demais: esperava que ${translateOriginWithArticle(issue.origin, "definite")} tivesse ${adj} ${issue.minimum.toString()} ${sizing.unit ?? "elementos"}`;
        }
        return `Pequeno demais: esperava que ${translateOriginWithArticle(issue.origin, "definite")} fosse ${adj} ${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Texto inválido: deve começar com "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Texto inválido: deve terminar com "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Texto inválido: deve incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
        return `Formato d${FormatDictionary[_issue.format] ?? issue.format} inválido`;
      }
      case "not_multiple_of":
        return `Número inválido: deve ser múltiplo de ${issue.divisor}`;
      case "unrecognized_keys": {
        const plural = issue.keys.length > 1 ? "s" : "";
        return `Chave${plural} inválida${plural}: ${joinValues(issue.keys, ", ")}`;
      }
      case "invalid_key":
        return `Entrada inválida n${translateOriginWithArticle(issue.origin, "definite")}`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `Valor de discriminação inválido. Esperava ${opts}`;
        }
        return "Entrada inválida";
      case "invalid_element":
        return `Entrada inválida n${translateOriginWithArticle(issue.origin, "definite")}`;
      default:
        return `Entrada inválida`;
    }
  };
};
function pt_BR_default() {
  return {
    localeError: error44()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ro.js
var error45 = () => {
  const Sizable = {
    string: { unit: "caractere", verb: "să aibă" },
    file: { unit: "octeți", verb: "să aibă" },
    array: { unit: "elemente", verb: "să aibă" },
    set: { unit: "elemente", verb: "să aibă" },
    map: { unit: "intrări", verb: "să aibă" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "intrare",
    email: "adresă de email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "dată și oră ISO",
    date: "dată ISO",
    time: "oră ISO",
    duration: "durată ISO",
    ipv4: "adresă IPv4",
    ipv6: "adresă IPv6",
    mac: "adresă MAC",
    cidrv4: "interval IPv4",
    cidrv6: "interval IPv6",
    base64: "șir codat base64",
    base64url: "șir codat base64url",
    json_string: "șir JSON",
    e164: "număr E.164",
    credit_card: "număr de card de credit",
    currency_code: "cod valutar",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "intrare"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "șir",
    number: "număr",
    boolean: "boolean",
    function: "funcție",
    array: "matrice",
    object: "obiect",
    undefined: "nedefinit",
    symbol: "simbol",
    bigint: "număr mare",
    void: "void",
    never: "never",
    map: "hartă",
    set: "set"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Intrare invalidă: așteptat ${expected}, primit ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Intrare invalidă: așteptat ${stringifyPrimitive(issue.values[0])}`;
        return `Opțiune invalidă: așteptat una dintre ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Prea mare: așteptat ca ${issue.origin ?? "valoarea"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemente"}`;
        return `Prea mare: așteptat ca ${issue.origin ?? "valoarea"} să fie ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Prea mic: așteptat ca ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Prea mic: așteptat ca ${issue.origin} să fie ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Șir invalid: trebuie să înceapă cu "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Șir invalid: trebuie să se termine cu "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Șir invalid: trebuie să includă "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Șir invalid: trebuie să se potrivească cu modelul ${_issue.pattern}`;
        return `Format invalid: ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Număr invalid: trebuie să fie multiplu de ${issue.divisor}`;
      case "unrecognized_keys":
        return `Chei nerecunoscute: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Cheie invalidă în ${issue.origin}`;
      case "invalid_union":
        return "Intrare invalidă";
      case "invalid_element":
        return `Valoare invalidă în ${issue.origin}`;
      default:
        return `Intrare invalidă`;
    }
  };
};
function ro_default() {
  return {
    localeError: error45()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ru.js
function getRussianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error46 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "символ",
        few: "символа",
        many: "символов"
      },
      verb: "иметь"
    },
    file: {
      unit: {
        one: "байт",
        few: "байта",
        many: "байт"
      },
      verb: "иметь"
    },
    array: {
      unit: {
        one: "элемент",
        few: "элемента",
        many: "элементов"
      },
      verb: "иметь"
    },
    set: {
      unit: {
        one: "элемент",
        few: "элемента",
        many: "элементов"
      },
      verb: "иметь"
    },
    map: {
      unit: {
        one: "элемент",
        few: "элемента",
        many: "элементов"
      },
      verb: "иметь"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ввод",
    email: "email адрес",
    url: "URL",
    emoji: "эмодзи",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO дата и время",
    date: "ISO дата",
    time: "ISO время",
    duration: "ISO длительность",
    ipv4: "IPv4 адрес",
    ipv6: "IPv6 адрес",
    mac: "MAC адрес",
    cidrv4: "IPv4 диапазон",
    cidrv6: "IPv6 диапазон",
    base64: "строка в формате base64",
    base64url: "строка в формате base64url",
    json_string: "JSON строка",
    e164: "номер E.164",
    credit_card: "номер кредитной карты",
    currency_code: "код валюты",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ввод"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "число",
    array: "массив"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Неверный ввод: ожидалось instanceof ${issue.expected}, получено ${received}`;
        }
        return `Неверный ввод: ожидалось ${expected}, получено ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Неверный ввод: ожидалось ${stringifyPrimitive(issue.values[0])}`;
        return `Неверный вариант: ожидалось одно из ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          const maxValue = Number(issue.maximum);
          const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Слишком большое значение: ожидалось, что ${issue.origin ?? "значение"} будет иметь ${adj}${issue.maximum.toString()} ${unit}`;
        }
        return `Слишком большое значение: ожидалось, что ${issue.origin ?? "значение"} будет ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          const minValue = Number(issue.minimum);
          const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Слишком маленькое значение: ожидалось, что ${issue.origin} будет иметь ${adj}${issue.minimum.toString()} ${unit}`;
        }
        return `Слишком маленькое значение: ожидалось, что ${issue.origin} будет ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Неверная строка: должна начинаться с "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Неверная строка: должна заканчиваться на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неверная строка: должна содержать "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неверная строка: должна соответствовать шаблону ${_issue.pattern}`;
        return `Неверный ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Неверное число: должно быть кратным ${issue.divisor}`;
      case "unrecognized_keys":
        return `Нераспознанн${issue.keys.length > 1 ? "ые" : "ый"} ключ${issue.keys.length > 1 ? "и" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Неверный ключ в ${issue.origin}`;
      case "invalid_union":
        return "Неверные входные данные";
      case "invalid_element":
        return `Неверное значение в ${issue.origin}`;
      default:
        return `Неверные входные данные`;
    }
  };
};
function ru_default() {
  return {
    localeError: error46()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/sk.js
var error47 = () => {
  const Sizable = {
    string: { unit: "znakov", verb: "mať" },
    file: { unit: "bajtov", verb: "mať" },
    array: { unit: "prvkov", verb: "mať" },
    set: { unit: "prvkov", verb: "mať" },
    map: { unit: "položiek", verb: "mať" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regulárny výraz",
    email: "e-mailová adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "dátum a čas vo formáte ISO",
    date: "dátum vo formáte ISO",
    time: "čas vo formáte ISO",
    duration: "doba trvania ISO",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    mac: "MAC adresa",
    cidrv4: "rozsah IPv4",
    cidrv6: "rozsah IPv6",
    base64: "reťazec zakódovaný vo formáte base64",
    base64url: "reťazec zakódovaný vo formáte base64url",
    json_string: "reťazec vo formáte JSON",
    e164: "číslo E.164",
    credit_card: "číslo kreditnej karty",
    currency_code: "kód meny",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "vstup"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "číslo",
    string: "reťazec",
    function: "funkcia",
    array: "pole"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Neplatný vstup: očakávané instanceof ${issue.expected}, obdržané ${received}`;
        }
        return `Neplatný vstup: očakávané ${expected}, obdržané ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Neplatný vstup: očakávané ${stringifyPrimitive(issue.values[0])}`;
        return `Neplatný vstup: očakávaná jedna z hodnôt ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Hodnota je príliš veľká: ${issue.origin ?? "hodnota"} musí mať ${adj}${issue.maximum.toString()} ${sizing.unit ?? "prvkov"}`;
        }
        return `Hodnota je príliš veľká: ${issue.origin ?? "hodnota"} musí byť ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Hodnota je príliš malá: ${issue.origin ?? "hodnota"} musí mať ${adj}${issue.minimum.toString()} ${sizing.unit ?? "prvkov"}`;
        }
        return `Hodnota je príliš malá: ${issue.origin ?? "hodnota"} musí byť ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Neplatný reťazec: musí začínať na "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neplatný reťazec: musí končiť na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neplatný reťazec: musí obsahovať "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neplatný reťazec: musí zodpovedať vzoru ${_issue.pattern}`;
        return `Neplatný formát ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Neplatné číslo: musí byť násobkom ${issue.divisor}`;
      case "unrecognized_keys":
        return `Neznáme klúče: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Neplatný klúč v ${issue.origin}`;
      case "invalid_union":
        return "Neplatný vstup";
      case "invalid_element":
        return `Neplatná hodnota v ${issue.origin}`;
      default:
        return `Neplatný vstup`;
    }
  };
};
function sk_default() {
  return {
    localeError: error47()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/sl.js
var error48 = () => {
  const Sizable = {
    string: { unit: "znakov", verb: "imeti" },
    file: { unit: "bajtov", verb: "imeti" },
    array: { unit: "elementov", verb: "imeti" },
    set: { unit: "elementov", verb: "imeti" },
    map: { unit: "elementov", verb: "imeti" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "vnos",
    email: "e-poštni naslov",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum in čas",
    date: "ISO datum",
    time: "ISO čas",
    duration: "ISO trajanje",
    ipv4: "IPv4 naslov",
    ipv6: "IPv6 naslov",
    mac: "MAC naslov",
    cidrv4: "obseg IPv4",
    cidrv6: "obseg IPv6",
    base64: "base64 kodiran niz",
    base64url: "base64url kodiran niz",
    json_string: "JSON niz",
    e164: "E.164 številka",
    credit_card: "številka kreditne kartice",
    currency_code: "koda valute",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "vnos"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "število",
    array: "tabela"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Neveljaven vnos: pričakovano instanceof ${issue.expected}, prejeto ${received}`;
        }
        return `Neveljaven vnos: pričakovano ${expected}, prejeto ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Neveljaven vnos: pričakovano ${stringifyPrimitive(issue.values[0])}`;
        return `Neveljavna možnost: pričakovano eno izmed ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Preveliko: pričakovano, da bo ${issue.origin ?? "vrednost"} imelo ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementov"}`;
        return `Preveliko: pričakovano, da bo ${issue.origin ?? "vrednost"} ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Premajhno: pričakovano, da bo ${issue.origin} imelo ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Premajhno: pričakovano, da bo ${issue.origin} ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Neveljaven niz: mora se začeti z "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Neveljaven niz: mora se končati z "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
        return `Neveljaven ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno število: mora biti večkratnik ${issue.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${issue.keys.length > 1 ? "i ključi" : " ključ"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven ključ v ${issue.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${issue.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function sl_default() {
  return {
    localeError: error48()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/sv.js
var error49 = () => {
  const Sizable = {
    string: { unit: "tecken", verb: "att ha" },
    file: { unit: "bytes", verb: "att ha" },
    array: { unit: "objekt", verb: "att innehålla" },
    set: { unit: "objekt", verb: "att innehålla" },
    map: { unit: "objekt", verb: "att innehålla" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "reguljärt uttryck",
    email: "e-postadress",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datum och tid",
    date: "ISO-datum",
    time: "ISO-tid",
    duration: "ISO-varaktighet",
    ipv4: "IPv4-adress",
    ipv6: "IPv6-adress",
    mac: "MAC-adress",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodad sträng",
    base64url: "base64url-kodad sträng",
    json_string: "JSON-sträng",
    e164: "E.164-nummer",
    credit_card: "kreditkortsnummer",
    currency_code: "valutakod",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "mall-literal"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "antal",
    array: "lista"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Ogiltig inmatning: förväntat instanceof ${issue.expected}, fick ${received}`;
        }
        return `Ogiltig inmatning: förväntat ${expected}, fick ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Ogiltig inmatning: förväntat ${stringifyPrimitive(issue.values[0])}`;
        return `Ogiltigt val: förväntade en av ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `För stor(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
        }
        return `För stor(t): förväntat ${issue.origin ?? "värdet"} att ha ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `För lite(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `För lite(t): förväntade ${issue.origin ?? "värdet"} att ha ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Ogiltig sträng: måste börja med "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ogiltig sträng: måste sluta med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ogiltig sträng: måste innehålla "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ogiltig sträng: måste matcha mönstret "${_issue.pattern}"`;
        return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: måste vara en multipel av ${issue.divisor}`;
      case "unrecognized_keys":
        return `${issue.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${issue.origin ?? "värdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt värde i ${issue.origin ?? "värdet"}`;
      default:
        return `Ogiltig input`;
    }
  };
};
function sv_default() {
  return {
    localeError: error49()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ta.js
var error50 = () => {
  const Sizable = {
    string: { unit: "எழுத்துக்கள்", verb: "கொண்டிருக்க வேண்டும்" },
    file: { unit: "பைட்டுகள்", verb: "கொண்டிருக்க வேண்டும்" },
    array: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
    set: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
    map: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "உள்ளீடு",
    email: "மின்னஞ்சல் முகவரி",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO தேதி நேரம்",
    date: "ISO தேதி",
    time: "ISO நேரம்",
    duration: "ISO கால அளவு",
    ipv4: "IPv4 முகவரி",
    ipv6: "IPv6 முகவரி",
    mac: "MAC முகவரி",
    cidrv4: "IPv4 வரம்பு",
    cidrv6: "IPv6 வரம்பு",
    base64: "base64-encoded சரம்",
    base64url: "base64url-encoded சரம்",
    json_string: "JSON சரம்",
    e164: "E.164 எண்",
    credit_card: "கடன் அட்டை எண்",
    currency_code: "நாணயக் குறியீடு",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "எண்",
    array: "அணி",
    null: "வெறுமை"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${issue.expected}, பெறப்பட்டது ${received}`;
        }
        return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${expected}, பெறப்பட்டது ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${stringifyPrimitive(issue.values[0])}`;
        return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${joinValues(issue.values, "|")} இல் ஒன்று`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue.origin ?? "மதிப்பு"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
        }
        return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue.origin ?? "மதிப்பு"} ${adj}${issue.maximum.toString()} ஆக இருக்க வேண்டும்`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ஆக இருக்க வேண்டும்`;
        }
        return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue.origin} ${adj}${issue.minimum.toString()} ஆக இருக்க வேண்டும்`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `தவறான சரம்: "${_issue.prefix}" இல் தொடங்க வேண்டும்`;
        if (_issue.format === "ends_with")
          return `தவறான சரம்: "${_issue.suffix}" இல் முடிவடைய வேண்டும்`;
        if (_issue.format === "includes")
          return `தவறான சரம்: "${_issue.includes}" ஐ உள்ளடக்க வேண்டும்`;
        if (_issue.format === "regex")
          return `தவறான சரம்: ${_issue.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
        return `தவறான ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `தவறான எண்: ${issue.divisor} இன் பலமாக இருக்க வேண்டும்`;
      case "unrecognized_keys":
        return `அடையாளம் தெரியாத விசை${issue.keys.length > 1 ? "கள்" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `${issue.origin} இல் தவறான விசை`;
      case "invalid_union":
        return "தவறான உள்ளீடு";
      case "invalid_element":
        return `${issue.origin} இல் தவறான மதிப்பு`;
      default:
        return `தவறான உள்ளீடு`;
    }
  };
};
function ta_default() {
  return {
    localeError: error50()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/tg.js
var error51 = () => {
  const Sizable = {
    string: { unit: "аломат", verb: "дошта бошад" },
    file: { unit: "байт", verb: "дошта бошад" },
    array: { unit: "унсур", verb: "дошта бошад" },
    set: { unit: "унсур", verb: "дошта бошад" },
    map: { unit: "сабт", verb: "дошта бошад" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "вуруд",
    email: "суроғаи email",
    url: "URL",
    emoji: "эмоҷи",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "санаву вақти ISO",
    date: "санаи ISO",
    time: "вақти ISO",
    duration: "давомнокии ISO",
    ipv4: "суроғаи IPv4",
    ipv6: "суроғаи IPv6",
    mac: "суроғаи MAC",
    cidrv4: "маҳдудаи IPv4",
    cidrv6: "маҳдудаи IPv6",
    base64: "сатри дар формати base64",
    base64url: "сатри дар формати base64url",
    json_string: "сатри JSON",
    e164: "рақами E.164",
    credit_card: "рақами корти кредитӣ",
    currency_code: "рамзи асъор",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "вуруд"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "рақам",
    string: "сатр",
    array: "массив",
    object: "объект",
    date: "сана"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Вуруди нодуруст: ${expected} интизор мерафт, ${received} гирифта шуд`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Вуруди нодуруст: ${stringifyPrimitive(issue.values[0])} интизор мерафт`;
        return `Интихоби нодуруст: яке аз ${joinValues(issue.values, "|")} интизор мерафт`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Хеле калон: ${issue.origin ?? "қимат"} бояд ${adj}${issue.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `Хеле калон: ${issue.origin ?? "қимат"} бояд ${adj}${issue.maximum.toString()} бошад`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Хеле хурд: ${issue.origin} бояд ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `Хеле хурд: ${issue.origin} бояд ${adj}${issue.minimum.toString()} бошад`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Сатри нодуруст: бояд бо "${_issue.prefix}" оғоз шавад`;
        if (_issue.format === "ends_with")
          return `Сатри нодуруст: бояд бо "${_issue.suffix}" анҷом ёбад`;
        if (_issue.format === "includes")
          return `Сатри нодуруст: бояд "${_issue.includes}"-ро дар бар гирад`;
        if (_issue.format === "regex")
          return `Сатри нодуруст: бояд ба намунаи ${_issue.pattern} мувофиқат кунад`;
        return `${FormatDictionary[_issue.format] ?? issue.format}-и нодуруст`;
      }
      case "not_multiple_of":
        return `Рақами нодуруст: бояд ба ${issue.divisor} бе бақия тақсим шавад`;
      case "unrecognized_keys":
        return `Калид${issue.keys.length > 1 ? "ҳои" : "и"} номаълум: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Калиди нодуруст дар ${issue.origin}`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `Қимати нодурусти дискриминатор: ${opts} интизор мерафт`;
        }
        return "Вуруди нодуруст";
      case "invalid_element":
        return `Қимати нодуруст дар ${issue.origin}`;
      default:
        return `Вуруди нодуруст`;
    }
  };
};
function tg_default() {
  return {
    localeError: error51()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/th.js
var error52 = () => {
  const Sizable = {
    string: { unit: "ตัวอักษร", verb: "ควรมี" },
    file: { unit: "ไบต์", verb: "ควรมี" },
    array: { unit: "รายการ", verb: "ควรมี" },
    set: { unit: "รายการ", verb: "ควรมี" },
    map: { unit: "รายการ", verb: "ควรมี" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ข้อมูลที่ป้อน",
    email: "ที่อยู่อีเมล",
    url: "URL",
    emoji: "อิโมจิ",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "วันที่เวลาแบบ ISO",
    date: "วันที่แบบ ISO",
    time: "เวลาแบบ ISO",
    duration: "ช่วงเวลาแบบ ISO",
    ipv4: "ที่อยู่ IPv4",
    ipv6: "ที่อยู่ IPv6",
    mac: "ที่อยู่ MAC",
    cidrv4: "ช่วง IP แบบ IPv4",
    cidrv6: "ช่วง IP แบบ IPv6",
    base64: "ข้อความแบบ Base64",
    base64url: "ข้อความแบบ Base64 สำหรับ URL",
    json_string: "ข้อความแบบ JSON",
    e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
    credit_card: "หมายเลขบัตรเครดิต",
    currency_code: "รหัสสกุลเงิน",
    iban: "IBAN",
    jwt: "โทเคน JWT",
    template_literal: "ข้อมูลที่ป้อน"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "ตัวเลข",
    array: "อาร์เรย์ (Array)",
    null: "ไม่มีค่า (null)"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${issue.expected} แต่ได้รับ ${received}`;
        }
        return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${expected} แต่ได้รับ ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `ค่าไม่ถูกต้อง: ควรเป็น ${stringifyPrimitive(issue.values[0])}`;
        return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "ไม่เกิน" : "น้อยกว่า";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `เกินกำหนด: ${issue.origin ?? "ค่า"} ควรมี${adj} ${issue.maximum.toString()} ${sizing.unit ?? "รายการ"}`;
        return `เกินกำหนด: ${issue.origin ?? "ค่า"} ควรมี${adj} ${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? "อย่างน้อย" : "มากกว่า";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `น้อยกว่ากำหนด: ${issue.origin} ควรมี${adj} ${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `น้อยกว่ากำหนด: ${issue.origin} ควรมี${adj} ${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${_issue.includes}" อยู่ในข้อความ`;
        if (_issue.format === "regex")
          return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${_issue.pattern}`;
        return `รูปแบบไม่ถูกต้อง: ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${issue.divisor} ได้ลงตัว`;
      case "unrecognized_keys":
        return `พบคีย์ที่ไม่รู้จัก: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `คีย์ไม่ถูกต้องใน ${issue.origin}`;
      case "invalid_union":
        return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
      case "invalid_element":
        return `ข้อมูลไม่ถูกต้องใน ${issue.origin}`;
      default:
        return `ข้อมูลไม่ถูกต้อง`;
    }
  };
};
function th_default() {
  return {
    localeError: error52()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/tk.js
var error53 = () => {
  const Sizable = {
    string: { unit: "simwol", verb: "bolmaly" },
    file: { unit: "baýt", verb: "bolmaly" },
    array: { unit: "elementler", verb: "bolmaly" },
    set: { unit: "elementler", verb: "bolmaly" },
    map: { unit: "elementler", verb: "bolmaly" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "giriş",
    email: "e-poçta salgysy",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO sene we wagt",
    date: "ISO sene",
    time: "ISO wagt",
    duration: "ISO wagt aralygy",
    ipv4: "IPv4 salgysy",
    ipv6: "IPv6 salgysy",
    mac: "MAC salgysy",
    cidrv4: "IPv4 aralygy",
    cidrv6: "IPv6 aralygy",
    base64: "base64 bilen şifrlenen setir",
    base64url: "base64url bilen şifrlenen setir",
    json_string: "JSON setiri",
    e164: "E.164 nomeri",
    credit_card: "kredit kartynyň nomeri",
    currency_code: "walýuta kody",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "şablon"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Nädogry baha: garaşylan ${expected} ýerine ${received} alyndy`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Nädogry baha: ${stringifyPrimitive(issue.values[0])} bolmaly`;
        return `Nädogry saýlaw: aşakdakylardan biri bolmaly: ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Has uly: garaşylýan ${issue.origin ?? "baha"} ${adj} ${issue.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `Has uly: garaşylýan ${issue.origin ?? "baha"} ${adj} ${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Has kiçi: garaşylýan ${issue.origin} ${adj} ${issue.minimum.toString()} ${sizing.unit}`;
        return `Has kiçi: garaşylýan ${issue.origin} ${adj} ${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Nädogry setir: "${_issue.prefix}" bilen başlamaly`;
        if (_issue.format === "ends_with")
          return `Nädogry setir: "${_issue.suffix}" bilen gutarmaly`;
        if (_issue.format === "includes")
          return `Nädogry setir: "${_issue.includes}" saklamaly`;
        if (_issue.format === "regex")
          return `Nädogry setir: ${_issue.pattern} nusga laýyk bolmaly`;
        return `Nädogry ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Nädogry san: ${issue.divisor} bilen galyndysyz bölünmeli`;
      case "unrecognized_keys":
        return `Tanalmaýan açar${issue.keys.length > 1 ? "lar" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `${issue.origin} içinde nädogry açar`;
      case "invalid_union":
        return "Nädogry baha";
      case "invalid_element":
        return `${issue.origin} içinde nädogry baha`;
      default:
        return `Nädogry baha`;
    }
  };
};
function tk_default() {
  return {
    localeError: error53()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/tr.js
var error54 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "olmalı" },
    file: { unit: "bayt", verb: "olmalı" },
    array: { unit: "öğe", verb: "olmalı" },
    set: { unit: "öğe", verb: "olmalı" },
    map: { unit: "öğe", verb: "olmalı" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "girdi",
    email: "e-posta adresi",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO tarih ve saat",
    date: "ISO tarih",
    time: "ISO saat",
    duration: "ISO süre",
    ipv4: "IPv4 adresi",
    ipv6: "IPv6 adresi",
    mac: "MAC adresi",
    cidrv4: "IPv4 aralığı",
    cidrv6: "IPv6 aralığı",
    base64: "base64 ile şifrelenmiş metin",
    base64url: "base64url ile şifrelenmiş metin",
    json_string: "JSON dizesi",
    e164: "E.164 sayısı",
    credit_card: "kredi kartı numarası",
    currency_code: "para birimi kodu",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "Şablon dizesi"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Geçersiz değer: beklenen instanceof ${issue.expected}, alınan ${received}`;
        }
        return `Geçersiz değer: beklenen ${expected}, alınan ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Geçersiz değer: beklenen ${stringifyPrimitive(issue.values[0])}`;
        return `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Çok büyük: beklenen ${issue.origin ?? "değer"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "öğe"}`;
        return `Çok büyük: beklenen ${issue.origin ?? "değer"} ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Çok küçük: beklenen ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        return `Çok küçük: beklenen ${issue.origin} ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Geçersiz metin: "${_issue.prefix}" ile başlamalı`;
        if (_issue.format === "ends_with")
          return `Geçersiz metin: "${_issue.suffix}" ile bitmeli`;
        if (_issue.format === "includes")
          return `Geçersiz metin: "${_issue.includes}" içermeli`;
        if (_issue.format === "regex")
          return `Geçersiz metin: ${_issue.pattern} desenine uymalı`;
        return `Geçersiz ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Geçersiz sayı: ${issue.divisor} ile tam bölünebilmeli`;
      case "unrecognized_keys":
        return `Tanınmayan anahtar${issue.keys.length > 1 ? "lar" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `${issue.origin} içinde geçersiz anahtar`;
      case "invalid_union":
        return "Geçersiz değer";
      case "invalid_element":
        return `${issue.origin} içinde geçersiz değer`;
      default:
        return `Geçersiz değer`;
    }
  };
};
function tr_default() {
  return {
    localeError: error54()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/uk.js
var error55 = () => {
  const Sizable = {
    string: { unit: "символів", verb: "матиме" },
    file: { unit: "байтів", verb: "матиме" },
    array: { unit: "елементів", verb: "матиме" },
    set: { unit: "елементів", verb: "матиме" },
    map: { unit: "елементів", verb: "матиме" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "вхідні дані",
    email: "адреса електронної пошти",
    url: "URL",
    emoji: "емодзі",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "дата та час ISO",
    date: "дата ISO",
    time: "час ISO",
    duration: "тривалість ISO",
    ipv4: "адреса IPv4",
    ipv6: "адреса IPv6",
    mac: "адреса MAC",
    cidrv4: "діапазон IPv4",
    cidrv6: "діапазон IPv6",
    base64: "рядок у кодуванні base64",
    base64url: "рядок у кодуванні base64url",
    json_string: "рядок JSON",
    e164: "номер E.164",
    credit_card: "номер кредитної картки",
    currency_code: "код валюти",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "вхідні дані"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "число",
    array: "масив"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Неправильні вхідні дані: очікується instanceof ${issue.expected}, отримано ${received}`;
        }
        return `Неправильні вхідні дані: очікується ${expected}, отримано ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Неправильні вхідні дані: очікується ${stringifyPrimitive(issue.values[0])}`;
        return `Неправильна опція: очікується одне з ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Занадто велике: очікується, що ${issue.origin ?? "значення"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "елементів"}`;
        return `Занадто велике: очікується, що ${issue.origin ?? "значення"} буде ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Занадто мале: очікується, що ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Занадто мале: очікується, що ${issue.origin} буде ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Неправильний рядок: повинен починатися з "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Неправильний рядок: повинен закінчуватися на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неправильний рядок: повинен містити "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неправильний рядок: повинен відповідати шаблону ${_issue.pattern}`;
        return `Неправильний ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Неправильне число: повинно бути кратним ${issue.divisor}`;
      case "unrecognized_keys":
        return `Нерозпізнаний ключ${issue.keys.length > 1 ? "і" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Неправильний ключ у ${issue.origin}`;
      case "invalid_union":
        return "Неправильні вхідні дані";
      case "invalid_element":
        return `Неправильне значення у ${issue.origin}`;
      default:
        return `Неправильні вхідні дані`;
    }
  };
};
function uk_default() {
  return {
    localeError: error55()
  };
}

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ua.js
function ua_default() {
  return uk_default();
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/ur.js
var error56 = () => {
  const Sizable = {
    string: { unit: "حروف", verb: "ہونا" },
    file: { unit: "بائٹس", verb: "ہونا" },
    array: { unit: "آئٹمز", verb: "ہونا" },
    set: { unit: "آئٹمز", verb: "ہونا" },
    map: { unit: "آئٹمز", verb: "ہونا" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ان پٹ",
    email: "ای میل ایڈریس",
    url: "یو آر ایل",
    emoji: "ایموجی",
    uuid: "یو یو آئی ڈی",
    uuidv4: "یو یو آئی ڈی وی 4",
    uuidv6: "یو یو آئی ڈی وی 6",
    nanoid: "نینو آئی ڈی",
    guid: "جی یو آئی ڈی",
    cuid: "سی یو آئی ڈی",
    cuid2: "سی یو آئی ڈی 2",
    ulid: "یو ایل آئی ڈی",
    xid: "ایکس آئی ڈی",
    ksuid: "کے ایس یو آئی ڈی",
    datetime: "آئی ایس او ڈیٹ ٹائم",
    date: "آئی ایس او تاریخ",
    time: "آئی ایس او وقت",
    duration: "آئی ایس او مدت",
    ipv4: "آئی پی وی 4 ایڈریس",
    ipv6: "آئی پی وی 6 ایڈریس",
    mac: "ایم اے سی ایڈریس",
    cidrv4: "آئی پی وی 4 رینج",
    cidrv6: "آئی پی وی 6 رینج",
    base64: "بیس 64 ان کوڈڈ سٹرنگ",
    base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
    json_string: "جے ایس او این سٹرنگ",
    e164: "ای 164 نمبر",
    credit_card: "کریڈٹ کارڈ نمبر",
    currency_code: "کرنسی کوڈ",
    iban: "IBAN",
    jwt: "جے ڈبلیو ٹی",
    template_literal: "ان پٹ"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "نمبر",
    array: "آرے",
    null: "نل"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `غلط ان پٹ: instanceof ${issue.expected} متوقع تھا، ${received} موصول ہوا`;
        }
        return `غلط ان پٹ: ${expected} متوقع تھا، ${received} موصول ہوا`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `غلط ان پٹ: ${stringifyPrimitive(issue.values[0])} متوقع تھا`;
        return `غلط آپشن: ${joinValues(issue.values, "|")} میں سے ایک متوقع تھا`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `بہت بڑا: ${issue.origin ?? "ویلیو"} کے ${adj}${issue.maximum.toString()} ${sizing.unit ?? "عناصر"} ہونے متوقع تھے`;
        return `بہت بڑا: ${issue.origin ?? "ویلیو"} کا ${adj}${issue.maximum.toString()} ہونا متوقع تھا`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `بہت چھوٹا: ${issue.origin} کے ${adj}${issue.minimum.toString()} ${sizing.unit} ہونے متوقع تھے`;
        }
        return `بہت چھوٹا: ${issue.origin} کا ${adj}${issue.minimum.toString()} ہونا متوقع تھا`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `غلط سٹرنگ: "${_issue.prefix}" سے شروع ہونا چاہیے`;
        }
        if (_issue.format === "ends_with")
          return `غلط سٹرنگ: "${_issue.suffix}" پر ختم ہونا چاہیے`;
        if (_issue.format === "includes")
          return `غلط سٹرنگ: "${_issue.includes}" شامل ہونا چاہیے`;
        if (_issue.format === "regex")
          return `غلط سٹرنگ: پیٹرن ${_issue.pattern} سے میچ ہونا چاہیے`;
        return `غلط ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `غلط نمبر: ${issue.divisor} کا مضاعف ہونا چاہیے`;
      case "unrecognized_keys":
        return `غیر تسلیم شدہ کی${issue.keys.length > 1 ? "ز" : ""}: ${joinValues(issue.keys, "، ")}`;
      case "invalid_key":
        return `${issue.origin} میں غلط کی`;
      case "invalid_union":
        return "غلط ان پٹ";
      case "invalid_element":
        return `${issue.origin} میں غلط ویلیو`;
      default:
        return `غلط ان پٹ`;
    }
  };
};
function ur_default() {
  return {
    localeError: error56()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/uz.js
var error57 = () => {
  const Sizable = {
    string: { unit: "belgi", verb: "bo‘lishi kerak" },
    file: { unit: "bayt", verb: "bo‘lishi kerak" },
    array: { unit: "element", verb: "bo‘lishi kerak" },
    set: { unit: "element", verb: "bo‘lishi kerak" },
    map: { unit: "yozuv", verb: "bo‘lishi kerak" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "kirish",
    email: "elektron pochta manzili",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO sana va vaqti",
    date: "ISO sana",
    time: "ISO vaqt",
    duration: "ISO davomiylik",
    ipv4: "IPv4 manzil",
    ipv6: "IPv6 manzil",
    mac: "MAC manzil",
    cidrv4: "IPv4 diapazon",
    cidrv6: "IPv6 diapazon",
    base64: "base64 kodlangan satr",
    base64url: "base64url kodlangan satr",
    json_string: "JSON satr",
    e164: "E.164 raqam",
    credit_card: "kredit karta raqami",
    currency_code: "valyuta kodi",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "kirish"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "raqam",
    array: "massiv"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Noto‘g‘ri kirish: kutilgan instanceof ${issue.expected}, qabul qilingan ${received}`;
        }
        return `Noto‘g‘ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Noto‘g‘ri kirish: kutilgan ${stringifyPrimitive(issue.values[0])}`;
        return `Noto‘g‘ri variant: quyidagilardan biri kutilgan ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Juda katta: kutilgan ${issue.origin ?? "qiymat"} ${adj}${issue.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `Juda katta: kutilgan ${issue.origin ?? "qiymat"} ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Juda kichik: kutilgan ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Juda kichik: kutilgan ${issue.origin} ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Noto‘g‘ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
        if (_issue.format === "ends_with")
          return `Noto‘g‘ri satr: "${_issue.suffix}" bilan tugashi kerak`;
        if (_issue.format === "includes")
          return `Noto‘g‘ri satr: "${_issue.includes}" ni o‘z ichiga olishi kerak`;
        if (_issue.format === "regex")
          return `Noto‘g‘ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
        return `Noto‘g‘ri ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Noto‘g‘ri raqam: ${issue.divisor} ning karralisi bo‘lishi kerak`;
      case "unrecognized_keys":
        return `Noma’lum kalit${issue.keys.length > 1 ? "lar" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `${issue.origin} dagi kalit noto‘g‘ri`;
      case "invalid_union":
        return "Noto‘g‘ri kirish";
      case "invalid_element":
        return `${issue.origin} da noto‘g‘ri qiymat`;
      default:
        return `Noto‘g‘ri kirish`;
    }
  };
};
function uz_default() {
  return {
    localeError: error57()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/vi.js
var error58 = () => {
  const Sizable = {
    string: { unit: "ký tự", verb: "có" },
    file: { unit: "byte", verb: "có" },
    array: { unit: "phần tử", verb: "có" },
    set: { unit: "phần tử", verb: "có" },
    map: { unit: "phần tử", verb: "có" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "đầu vào",
    email: "địa chỉ email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ngày giờ ISO",
    date: "ngày ISO",
    time: "giờ ISO",
    duration: "khoảng thời gian ISO",
    ipv4: "địa chỉ IPv4",
    ipv6: "địa chỉ IPv6",
    mac: "địa chỉ MAC",
    cidrv4: "dải IPv4",
    cidrv6: "dải IPv6",
    base64: "chuỗi mã hóa base64",
    base64url: "chuỗi mã hóa base64url",
    json_string: "chuỗi JSON",
    e164: "số E.164",
    credit_card: "số thẻ tín dụng",
    currency_code: "mã tiền tệ",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "đầu vào"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "số",
    array: "mảng"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Đầu vào không hợp lệ: mong đợi instanceof ${issue.expected}, nhận được ${received}`;
        }
        return `Đầu vào không hợp lệ: mong đợi ${expected}, nhận được ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Đầu vào không hợp lệ: mong đợi ${stringifyPrimitive(issue.values[0])}`;
        return `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Quá lớn: mong đợi ${issue.origin ?? "giá trị"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "phần tử"}`;
        return `Quá lớn: mong đợi ${issue.origin ?? "giá trị"} ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Quá nhỏ: mong đợi ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Quá nhỏ: mong đợi ${issue.origin} ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Chuỗi không hợp lệ: phải bắt đầu bằng "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chuỗi không hợp lệ: phải kết thúc bằng "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chuỗi không hợp lệ: phải bao gồm "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chuỗi không hợp lệ: phải khớp với mẫu ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue.format} không hợp lệ`;
      }
      case "not_multiple_of":
        return `Số không hợp lệ: phải là bội số của ${issue.divisor}`;
      case "unrecognized_keys":
        return `Khóa không được nhận dạng: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Khóa không hợp lệ trong ${issue.origin}`;
      case "invalid_union":
        return "Đầu vào không hợp lệ";
      case "invalid_element":
        return `Giá trị không hợp lệ trong ${issue.origin}`;
      default:
        return `Đầu vào không hợp lệ`;
    }
  };
};
function vi_default() {
  return {
    localeError: error58()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/zh-CN.js
var error59 = () => {
  const Sizable = {
    string: { unit: "字符", verb: "包含" },
    file: { unit: "字节", verb: "包含" },
    array: { unit: "项", verb: "包含" },
    set: { unit: "项", verb: "包含" },
    map: { unit: "项", verb: "包含" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "输入",
    email: "电子邮件",
    url: "URL",
    emoji: "表情符号",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO日期时间",
    date: "ISO日期",
    time: "ISO时间",
    duration: "ISO时长",
    ipv4: "IPv4地址",
    ipv6: "IPv6地址",
    mac: "MAC地址",
    cidrv4: "IPv4网段",
    cidrv6: "IPv6网段",
    base64: "base64编码字符串",
    base64url: "base64url编码字符串",
    json_string: "JSON字符串",
    e164: "E.164号码",
    credit_card: "信用卡号",
    currency_code: "货币代码",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "输入"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "数字",
    array: "数组",
    null: "空值(null)"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `无效输入：期望 instanceof ${issue.expected}，实际接收 ${received}`;
        }
        return `无效输入：期望 ${expected}，实际接收 ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `无效输入：期望 ${stringifyPrimitive(issue.values[0])}`;
        return `无效选项：期望以下之一 ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `数值过大：期望 ${issue.origin ?? "值"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "个元素"}`;
        return `数值过大：期望 ${issue.origin ?? "值"} ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `数值过小：期望 ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `数值过小：期望 ${issue.origin} ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `无效字符串：必须以 "${_issue.prefix}" 开头`;
        if (_issue.format === "ends_with")
          return `无效字符串：必须以 "${_issue.suffix}" 结尾`;
        if (_issue.format === "includes")
          return `无效字符串：必须包含 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `无效字符串：必须满足正则表达式 ${_issue.pattern}`;
        return `无效${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `无效数字：必须是 ${issue.divisor} 的倍数`;
      case "unrecognized_keys":
        return `出现未知的键(key): ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `${issue.origin} 中的键(key)无效`;
      case "invalid_union":
        return "无效输入";
      case "invalid_element":
        return `${issue.origin} 中包含无效值(value)`;
      default:
        return `无效输入`;
    }
  };
};
function zh_CN_default() {
  return {
    localeError: error59()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/zh-TW.js
var error60 = () => {
  const Sizable = {
    string: { unit: "字元", verb: "擁有" },
    file: { unit: "位元組", verb: "擁有" },
    array: { unit: "項目", verb: "擁有" },
    set: { unit: "項目", verb: "擁有" },
    map: { unit: "項目", verb: "擁有" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "輸入",
    email: "郵件地址",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO 日期時間",
    date: "ISO 日期",
    time: "ISO 時間",
    duration: "ISO 期間",
    ipv4: "IPv4 位址",
    ipv6: "IPv6 位址",
    mac: "MAC 位址",
    cidrv4: "IPv4 範圍",
    cidrv6: "IPv6 範圍",
    base64: "base64 編碼字串",
    base64url: "base64url 編碼字串",
    json_string: "JSON 字串",
    e164: "E.164 數值",
    credit_card: "信用卡號",
    currency_code: "貨幣代碼",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "輸入"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `無效的輸入值：預期為 instanceof ${issue.expected}，但收到 ${received}`;
        }
        return `無效的輸入值：預期為 ${expected}，但收到 ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `無效的輸入值：預期為 ${stringifyPrimitive(issue.values[0])}`;
        return `無效的選項：預期為以下其中之一 ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `數值過大：預期 ${issue.origin ?? "值"} 應為 ${adj}${issue.maximum.toString()} ${sizing.unit ?? "個元素"}`;
        return `數值過大：預期 ${issue.origin ?? "值"} 應為 ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `數值過小：預期 ${issue.origin} 應為 ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `數值過小：預期 ${issue.origin} 應為 ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `無效的字串：必須以 "${_issue.prefix}" 開頭`;
        }
        if (_issue.format === "ends_with")
          return `無效的字串：必須以 "${_issue.suffix}" 結尾`;
        if (_issue.format === "includes")
          return `無效的字串：必須包含 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `無效的字串：必須符合格式 ${_issue.pattern}`;
        return `無效的 ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `無效的數字：必須為 ${issue.divisor} 的倍數`;
      case "unrecognized_keys":
        return `無法識別的鍵值${issue.keys.length > 1 ? "們" : ""}：${joinValues(issue.keys, "、")}`;
      case "invalid_key":
        return `${issue.origin} 中有無效的鍵值`;
      case "invalid_union":
        return "無效的輸入值";
      case "invalid_element":
        return `${issue.origin} 中有無效的值`;
      default:
        return `無效的輸入值`;
    }
  };
};
function zh_TW_default() {
  return {
    localeError: error60()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/locales/yo.js
var error61 = () => {
  const Sizable = {
    string: { unit: "àmi", verb: "ní" },
    file: { unit: "bytes", verb: "ní" },
    array: { unit: "nkan", verb: "ní" },
    set: { unit: "nkan", verb: "ní" },
    map: { unit: "nkan", verb: "ní" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ẹ̀rọ ìbáwọlé",
    email: "àdírẹ́sì ìmẹ́lì",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "àkókò ISO",
    date: "ọjọ́ ISO",
    time: "àkókò ISO",
    duration: "àkókò tó pé ISO",
    ipv4: "àdírẹ́sì IPv4",
    ipv6: "àdírẹ́sì IPv6",
    mac: "àdírẹ́sì MAC",
    cidrv4: "àgbègbè IPv4",
    cidrv6: "àgbègbè IPv6",
    base64: "ọ̀rọ̀ tí a kọ́ ní base64",
    base64url: "ọ̀rọ̀ base64url",
    json_string: "ọ̀rọ̀ JSON",
    e164: "nọ́mbà E.164",
    credit_card: "nọmba kaadi gbese",
    currency_code: "koodu owó",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ẹ̀rọ ìbáwọlé"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nọ́mbà",
    array: "akopọ"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Ìbáwọlé aṣìṣe: a ní láti fi instanceof ${issue.expected}, àmọ̀ a rí ${received}`;
        }
        return `Ìbáwọlé aṣìṣe: a ní láti fi ${expected}, àmọ̀ a rí ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Ìbáwọlé aṣìṣe: a ní láti fi ${stringifyPrimitive(issue.values[0])}`;
        return `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Tó pọ̀ jù: a ní láti jẹ́ pé ${issue.origin ?? "iye"} ${sizing.verb} ${adj}${issue.maximum} ${sizing.unit}`;
        return `Tó pọ̀ jù: a ní láti jẹ́ ${adj}${issue.maximum}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Kéré ju: a ní láti jẹ́ pé ${issue.origin} ${sizing.verb} ${adj}${issue.minimum} ${sizing.unit}`;
        return `Kéré ju: a ní láti jẹ́ ${adj}${issue.minimum}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${_issue.pattern}`;
        return `Aṣìṣe: ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${issue.divisor}`;
      case "unrecognized_keys":
        return `Bọtìnì àìmọ̀: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Bọtìnì aṣìṣe nínú ${issue.origin}`;
      case "invalid_union":
        return "Ìbáwọlé aṣìṣe";
      case "invalid_element":
        return `Iye aṣìṣe nínú ${issue.origin}`;
      default:
        return "Ìbáwọlé aṣìṣe";
    }
  };
};
function yo_default() {
  return {
    localeError: error61()
  };
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/registries.js
var _a2;
var $output = /* @__PURE__ */ Symbol("ZodOutput");
var $input = /* @__PURE__ */ Symbol("ZodInput");

class $ZodRegistry {
  constructor() {
    this._map = new WeakMap;
    this._idmap = new Map;
  }
  add(schema, ..._meta) {
    const meta = _meta[0];
    this._map.set(schema, meta);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.set(meta.id, schema);
    }
    return this;
  }
  clear() {
    this._map = new WeakMap;
    this._idmap = new Map;
    return this;
  }
  remove(schema) {
    const meta = this._map.get(schema);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.delete(meta.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      const f = { ...pm, ...this._map.get(schema) };
      return Object.keys(f).length ? f : undefined;
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
}
function registry() {
  return new $ZodRegistry;
}
(_a2 = globalThis).__zod_globalRegistry ?? (_a2.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/compile.js
var INVALID = Symbol.for("zod.compile.invalid");
var FALLBACK_FLAG = Symbol.for("zod.compile.fallback");

class ZodCompileAsyncError extends Error {
  constructor(message = "z.compile does not support async refinements, transforms, or checks") {
    super(message);
    this.name = "ZodCompileAsyncError";
  }
}

class ZodCompileUnsupportedError extends Error {
  constructor(feature, islandable = true) {
    super(`z.compile does not support ${feature}; this schema must use the runtime parser`);
    this.name = "ZodCompileUnsupportedError";
    this.islandable = islandable;
  }
}
function compileValidator(schema, parser) {
  try {
    return compileFn(schema, { assertOnly: true });
  } catch {
    return parser;
  }
}
function compile(schema, options) {
  try {
    const parser = compileFn(schema);
    const clone = withParser(schema, parser);
    clone._zod.bag.validator = compileValidator(schema, parser);
    return clone;
  } catch (err) {
    if (options?.strict)
      throw err;
    return schema;
  }
}
function withParser(schema, parser) {
  if (isRecursiveSchema(schema)) {
    throw new ZodCompileUnsupportedError("a schema whose subtree contains a reference cycle");
  }
  const clone2 = clone(schema);
  const liveRun = schema._zod.run;
  const originalRun = liveRun.__originalRun ?? liveRun;
  const wrapped = (payload, ctx) => {
    if (ctx?.async || ctx?.direction === "backward" || ctx?.skipChecks || ctx?.[FALLBACK_FLAG]) {
      return originalRun(payload, ctx);
    }
    if (ctx && isBackEdge(ctx, payload.value)) {
      return originalRun(payload, ctx);
    }
    const out = parser(payload.value);
    if (out !== INVALID) {
      payload.value = out;
      return payload;
    }
    if (ctx)
      ctx[FALLBACK_FLAG] = true;
    return originalRun(payload, ctx);
  };
  wrapped.__originalRun = originalRun;
  clone2._zod.bag.fallbackRun = originalRun;
  clone2._zod.bag.validator = parser;
  clone2._zod.run = wrapped;
  if (!liveRun.__originalRun)
    installCompiledUserMethods(clone2, schema, parser);
  return clone2;
}
function installCompiledUserMethods(target, source, parser) {
  const targetAny = target;
  const sourceAny = source;
  if (typeof sourceAny.safeParse === "function") {
    const originalSafeParse = sourceAny.safeParse;
    targetAny.safeParse = (data, params) => {
      const out = parser(data);
      if (out !== INVALID) {
        return { success: true, data: out };
      }
      return originalSafeParse(data, params);
    };
  }
  if (typeof sourceAny.parse === "function") {
    const originalParse = sourceAny.parse;
    targetAny.parse = (data, params) => {
      const out = parser(data);
      if (out !== INVALID) {
        return out;
      }
      return originalParse(data, params);
    };
  }
}
function compileFn(schema, options) {
  let recursive = true;
  try {
    recursive = isRecursiveSchema(schema);
  } catch {}
  if (recursive) {
    throw new ZodCompileUnsupportedError("a schema whose subtree contains a reference cycle");
  }
  const ctx = {
    constants: new Map,
    constantCounter: 0,
    varCounter: 0,
    definite: true
  };
  const doc = new Doc(["input"]);
  const outputAccessor = generateCheck(doc, ctx, schema, "input", !options?.assertOnly);
  doc.write(outputAccessor === null ? `return true;` : `return ${outputAccessor};`);
  const constantNames = ["INVALID", ...ctx.constants.keys()];
  const constantValues = [INVALID, ...ctx.constants.values()];
  const code = doc.content.join(`
`);
  const fullCode = options?.debug ? constantNames.length > 0 ? `// Constants: ${constantNames.join(", ")}
${code}` : code : "";
  const F = Function;
  const factoryCode = `return (input) => {
${code}
}`;
  let fn;
  try {
    const factory = new F(...constantNames, factoryCode);
    fn = factory(...constantValues);
  } catch (err) {
    throw new ZodCompileUnsupportedError(`this schema (generated code failed to evaluate: ${err.message})`);
  }
  if (options?.debug) {
    fn.code = fullCode;
  }
  fn.definite = ctx.definite;
  return fn;
}
function addConstant(ctx, value) {
  for (const [name, v] of ctx.constants) {
    if (v === value)
      return name;
  }
  const name = `c${ctx.constantCounter++}`;
  ctx.constants.set(name, value);
  return name;
}
function addUserConstant(ctx, fn) {
  ctx.definite = false;
  return addConstant(ctx, fn);
}
function newVar(ctx) {
  return `v${ctx.varCounter++}`;
}
function runtimeRun(schema, value) {
  const result = schema._zod.run({ value, issues: [] }, {});
  if (result && typeof result.then === "function")
    return INVALID;
  const r = result;
  return r.issues.length === 0 ? r.value : INVALID;
}
function compileChild(doc, ctx, schema, accessor, needsValue = true) {
  const contentLen = doc.content.length;
  const constantCount = ctx.constants.size;
  const constantCounter = ctx.constantCounter;
  const varCounter = ctx.varCounter;
  try {
    return generateCheck(doc, ctx, schema, accessor, needsValue);
  } catch (err) {
    if (!(err instanceof ZodCompileUnsupportedError) || !err.islandable)
      throw err;
    doc.content.length = contentLen;
    if (ctx.constants.size > constantCount) {
      const trailing = Array.from(ctx.constants.keys()).slice(constantCount);
      for (const k of trailing)
        ctx.constants.delete(k);
    }
    ctx.constantCounter = constantCounter;
    ctx.varCounter = varCounter;
    return emitRuntimeIsland(doc, ctx, schema, accessor);
  }
}
function emitRuntimeIsland(doc, ctx, schema, accessor) {
  ctx.definite = false;
  const schemaConst = addConstant(ctx, schema);
  const runConst = addConstant(ctx, runtimeRun);
  const outVar = newVar(ctx);
  doc.write(`const ${outVar} = ${runConst}(${schemaConst}, ${accessor});`);
  doc.write(`if (${outVar} === INVALID) return INVALID;`);
  return outVar;
}
var WHEN_DEFAULTED_CHECKS = new Set([
  "max_size",
  "min_size",
  "size_equals",
  "max_length",
  "min_length",
  "length_equals"
]);
function generateChecks(doc, ctx, schema, accessor) {
  const schemaChecks = schema._zod.def.checks;
  if (!schemaChecks || schemaChecks.length === 0)
    return accessor;
  let currentAccessor = accessor;
  for (const check of schemaChecks) {
    const def = check._zod.def;
    if (def.when && !WHEN_DEFAULTED_CHECKS.has(def.check)) {
      throw new ZodCompileUnsupportedError(`check with a custom "when" condition`);
    }
    switch (def.check) {
      case "greater_than":
        generateGreaterThanCheck(doc, ctx, def, currentAccessor);
        break;
      case "less_than":
        generateLessThanCheck(doc, ctx, def, currentAccessor);
        break;
      case "multiple_of":
        generateMultipleOfCheck(doc, ctx, def, currentAccessor);
        break;
      case "number_format":
        generateNumberFormatCheck(doc, def, currentAccessor);
        break;
      case "min_length": {
        const min = numericOperand(def.minimum, "min_length");
        const len = codePointLengthVar(doc, ctx, currentAccessor, `${currentAccessor}.length >= ${min} && ${currentAccessor}.length < ${def.minimum * 2}`);
        doc.write(`if (${len} < ${min}) return INVALID;`);
        break;
      }
      case "max_length": {
        const max = numericOperand(def.maximum, "max_length");
        const len = codePointLengthVar(doc, ctx, currentAccessor, `${currentAccessor}.length > ${max}`);
        doc.write(`if (${len} > ${max}) return INVALID;`);
        break;
      }
      case "length_equals": {
        const exact = numericOperand(def.length, "length_equals");
        const len = codePointLengthVar(doc, ctx, currentAccessor, `${currentAccessor}.length >= ${exact} && ${currentAccessor}.length <= ${def.length * 2}`);
        doc.write(`if (${len} !== ${exact}) return INVALID;`);
        break;
      }
      case "min_size":
        doc.write(`if (${currentAccessor}.size < ${numericOperand(def.minimum, "min_size")}) return INVALID;`);
        break;
      case "max_size":
        doc.write(`if (${currentAccessor}.size > ${numericOperand(def.maximum, "max_size")}) return INVALID;`);
        break;
      case "size_equals":
        doc.write(`if (${currentAccessor}.size !== ${numericOperand(def.size, "size_equals")}) return INVALID;`);
        break;
      case "string_format":
        currentAccessor = generateStringFormatCheck(doc, ctx, def, currentAccessor);
        break;
      case "custom":
        currentAccessor = generateCustomRefineCheck(doc, ctx, check, currentAccessor);
        break;
      case "bigint_format":
        generateBigIntFormatCheck(doc, def, currentAccessor);
        break;
      case "mime_type":
        generateMimeTypeCheck(doc, ctx, def, currentAccessor);
        break;
      case "property":
        generatePropertyCheck(doc, ctx, def, currentAccessor);
        break;
      case "properties":
        generatePropertiesChecks(doc, ctx, def, currentAccessor);
        break;
      case "overwrite": {
        const newAccessor = newVar(ctx);
        generateOverwriteCheck(doc, ctx, check, currentAccessor, newAccessor);
        currentAccessor = newAccessor;
        break;
      }
      default: {
        throw new ZodCompileUnsupportedError(`check type ${def.check}`);
      }
    }
  }
  return currentAccessor;
}
function codePointLengthVar(doc, ctx, accessor, inDoubt) {
  const cpLen = addConstant(ctx, codePointLength);
  const v = newVar(ctx);
  doc.write(`const ${v} = typeof ${accessor} === "string" && ${inDoubt} ? ${cpLen}(${accessor}) : ${accessor}.length;`);
  return v;
}
function numericOperand(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new ZodCompileUnsupportedError(`${label} bound of type ${typeof value}`);
  }
  return `${value}`;
}
function comparisonOperand(ctx, value) {
  if (typeof value === "bigint")
    return `${value}n`;
  if (typeof value === "number") {
    if (Number.isNaN(value))
      throw new ZodCompileUnsupportedError("comparison check with NaN bound");
    return `${value}`;
  }
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new ZodCompileUnsupportedError("comparison check with Invalid Date bound");
    }
    return addConstant(ctx, value);
  }
  throw new ZodCompileUnsupportedError(`comparison check bound of type ${typeof value}`);
}
function generateGreaterThanCheck(doc, ctx, def, accessor) {
  const op = def.inclusive ? "<" : "<=";
  doc.write(`if (${accessor} ${op} ${comparisonOperand(ctx, def.value)}) return INVALID;`);
}
function generateLessThanCheck(doc, ctx, def, accessor) {
  const op = def.inclusive ? ">" : ">=";
  doc.write(`if (${accessor} ${op} ${comparisonOperand(ctx, def.value)}) return INVALID;`);
}
function generateMultipleOfCheck(doc, ctx, def, accessor) {
  if (typeof def.value === "bigint") {
    if (def.value === BigInt(0))
      throw new ZodCompileUnsupportedError("multiple_of check with a zero divisor");
    doc.write(`if (${accessor} % ${def.value}n !== 0n) return INVALID;`);
  } else {
    const remainder = addConstant(ctx, floatSafeRemainder);
    doc.write(`if (${remainder}(${accessor}, ${numericOperand(def.value, "multiple_of")}) !== 0) return INVALID;`);
  }
}
function generateNumberFormatCheck(doc, def, accessor) {
  const format = def.format;
  switch (format) {
    case "safeint":
      doc.write(`if (!Number.isSafeInteger(${accessor})) return INVALID;`);
      break;
    case "int32":
      doc.write(`if (!Number.isInteger(${accessor}) || ${accessor} < -2147483648 || ${accessor} > 2147483647) return INVALID;`);
      break;
    case "uint32":
      doc.write(`if (!Number.isInteger(${accessor}) || ${accessor} < 0 || ${accessor} > 4294967295) return INVALID;`);
      break;
    case "float32":
      doc.write(`if (!Number.isFinite(${accessor}) || ${accessor} < -3.4028234663852886e38 || ${accessor} > 3.4028234663852886e38) return INVALID;`);
      break;
    case "float64":
      doc.write(`if (!Number.isFinite(${accessor})) return INVALID;`);
      break;
    default: {
      throw new ZodCompileUnsupportedError(`number format ${format}`);
    }
  }
}
function generateBigIntFormatCheck(doc, def, accessor) {
  const format = def.format;
  if (!format)
    return;
  switch (format) {
    case "int64":
      doc.write(`if (${accessor} < -9223372036854775808n || ${accessor} > 9223372036854775807n) return INVALID;`);
      break;
    case "uint64":
      doc.write(`if (${accessor} < 0n || ${accessor} > 18446744073709551615n) return INVALID;`);
      break;
    default: {
      throw new ZodCompileUnsupportedError(`bigint format ${format}`);
    }
  }
}
function generateMimeTypeCheck(doc, ctx, def, accessor) {
  const mimeTypes = def.mime;
  if (mimeTypes && mimeTypes.length > 0) {
    const mimeSet = addConstant(ctx, new Set(mimeTypes));
    doc.write(`if (!${mimeSet}.has(${accessor}.type)) return INVALID;`);
  }
}
function generatePropertiesChecks(doc, ctx, def, accessor) {
  if (def.when) {
    throw new ZodCompileUnsupportedError(`check with a custom "when" condition`);
  }
  doc.write(`if (${accessor} == null) return INVALID;`);
  const shape = def.shape;
  for (const key of Reflect.ownKeys(shape)) {
    const keyExpr = typeof key === "symbol" ? addConstant(ctx, key) : esc(key);
    const inputVar = newVar(ctx);
    doc.write(`const ${inputVar} = ${accessor}[${keyExpr}];`);
    compileChild(doc, ctx, shape[key], inputVar, false);
  }
}
function generatePropertyCheck(doc, ctx, def, accessor) {
  const propAccessor = `${accessor}[${JSON.stringify(def.property)}]`;
  generateCheck(doc, ctx, def.schema, propAccessor);
}
function generateOverwriteCheck(doc, ctx, check, currentAccessor, newAccessor) {
  const tx = check._zod.def.tx;
  if (!tx) {
    throw new ZodCompileUnsupportedError("overwrite check without a transform function");
  }
  if (isAsyncFunction(tx)) {
    throw new ZodCompileAsyncError("z.compile: async overwrite transforms are not supported");
  }
  const txConst = addConstant(ctx, tx);
  doc.write(`const ${newAccessor} = ${txConst}(${currentAccessor});`);
}
function throwAsync() {
  throw new $ZodAsyncError;
}
function pushIssue(issue) {
  this.issues.push(issue);
}
function generateCustomRefineCheck(doc, ctx, check, accessor) {
  const def = check._zod.def;
  if (def.fn) {
    if (isAsyncFunction(def.fn)) {
      throw new ZodCompileAsyncError("z.compile: async .refine() predicates are not supported");
    }
    const fnConst = addUserConstant(ctx, def.fn);
    const throwAsyncConst = addConstant(ctx, throwAsync);
    const resVar = newVar(ctx);
    doc.write(`const ${resVar} = ${fnConst}(${accessor});`);
    doc.write(`if (${resVar} instanceof Promise) ${throwAsyncConst}();`);
    doc.write(`if (!${resVar}) return INVALID;`);
    return accessor;
  }
  if (check._zod.check) {
    if (isAsyncFunction(check._zod.check)) {
      throw new ZodCompileAsyncError("z.compile: async .superRefine() / check functions are not supported");
    }
    const checkFn = check._zod.check;
    const helperFn = (value) => {
      const fakePayload = { value, issues: [], addIssue: pushIssue };
      const result = checkFn(fakePayload);
      if (result instanceof Promise)
        throwAsync();
      return fakePayload.issues.length === 0 ? fakePayload.value : INVALID;
    };
    const helperConst = addUserConstant(ctx, helperFn);
    const outVar = newVar(ctx);
    doc.write(`const ${outVar} = ${helperConst}(${accessor});`);
    doc.write(`if (${outVar} === INVALID) return INVALID;`);
    return outVar;
  }
  throw new ZodCompileUnsupportedError("custom check without a predicate or check function");
}
var PATTERN_IS_COMPLETE = new Set([
  "cidrv4",
  "cuid",
  "cuid2",
  "date",
  "datetime",
  "duration",
  "e164",
  "email",
  "emoji",
  "ends_with",
  "guid",
  "includes",
  "ipv4",
  "ksuid",
  "lowercase",
  "mac",
  "nanoid",
  "regex",
  "starts_with",
  "time",
  "ulid",
  "uppercase",
  "uuid",
  "xid"
]);
function generateStringFormatCheck(doc, ctx, def, accessor, needsValue = true) {
  const fmt = def.format;
  if (fmt === "base64") {
    const validator = addConstant(ctx, isValidBase64);
    doc.write(`if (!${validator}(${accessor})) return INVALID;`);
    return accessor;
  }
  if (fmt === "base64url") {
    const validator = addConstant(ctx, isValidBase64URL);
    doc.write(`if (!${validator}(${accessor})) return INVALID;`);
    return accessor;
  }
  if (fmt === "jwt") {
    const validator = addConstant(ctx, isValidJWT);
    const alg = addConstant(ctx, def.alg ?? null);
    doc.write(`if (!${validator}(${accessor}, ${alg})) return INVALID;`);
    return accessor;
  }
  if (fmt === "ipv6") {
    const validator = addConstant(ctx, isValidIPv6);
    doc.write(`if (!${validator}(${accessor})) return INVALID;`);
    return accessor;
  }
  if (fmt === "cidrv6") {
    const validator = addConstant(ctx, isValidCIDRv6);
    doc.write(`if (!${validator}(${accessor})) return INVALID;`);
    return accessor;
  }
  if (fmt === "credit_card") {
    const validator = addConstant(ctx, isValidCreditCard);
    doc.write(`if (!${validator}(${accessor})) return INVALID;`);
    return accessor;
  }
  if (fmt === "iban") {
    const validator = addConstant(ctx, isValidIBAN);
    doc.write(`if (!${validator}(${accessor})) return INVALID;`);
    return accessor;
  }
  const formatDef = def;
  if (fmt === "url" || fmt === "httpurl" || formatDef.normalize || formatDef.hostname !== undefined || formatDef.protocol !== undefined) {
    const parseConst = addConstant(ctx, validateURL);
    const defConst = addConstant(ctx, def);
    const trimVar = newVar(ctx);
    const urlVar = newVar(ctx);
    doc.write(`const ${trimVar} = ${accessor}.trim();`);
    doc.write(`const ${urlVar} = ${parseConst}(${trimVar}, ${defConst});`);
    doc.write(`if (typeof ${urlVar} === "number") return INVALID;`);
    if (formatDef.hostname !== undefined) {
      const hostnameConst = addConstant(ctx, urlHostnameOk);
      doc.write(`if (!${hostnameConst}(${urlVar}, ${defConst}.hostname)) return INVALID;`);
    }
    if (formatDef.protocol !== undefined) {
      const protocolConst = addConstant(ctx, urlProtocolOk);
      doc.write(`if (!${protocolConst}(${urlVar}, ${defConst}.protocol)) return INVALID;`);
    }
    if (!needsValue)
      return null;
    const outputVar = newVar(ctx);
    const outputExpr = formatDef.normalize ? `${urlVar}.href` : `${addConstant(ctx, stripTabAndNewline)}(${trimVar})`;
    doc.write(`const ${outputVar} = ${outputExpr};`);
    return outputVar;
  }
  const customFn = def.fn;
  if (customFn) {
    if (isAsyncFunction(customFn))
      throw new ZodCompileUnsupportedError(`async string format ${fmt}`);
    const fnConst = addConstant(ctx, customFn);
    doc.write(`if (!${fnConst}(${accessor})) return INVALID;`);
    return accessor;
  }
  if (PATTERN_IS_COMPLETE.has(fmt) && def.pattern) {
    const patternConst = addConstant(ctx, def.pattern);
    doc.write(`${patternConst}.lastIndex = 0;`);
    doc.write(`if (!${patternConst}.test(${accessor})) return INVALID;`);
    return accessor;
  }
  const format = def.format;
  switch (format) {
    case "regex":
      throw new ZodCompileUnsupportedError("regex format without a pattern");
    case "lowercase":
      doc.write(`if (${accessor} !== ${accessor}.toLowerCase()) return INVALID;`);
      break;
    case "uppercase":
      doc.write(`if (${accessor} !== ${accessor}.toUpperCase()) return INVALID;`);
      break;
    case "includes":
      doc.write(`if (!${accessor}.includes(${esc(def.includes)})) return INVALID;`);
      break;
    case "starts_with": {
      const prefix = def.prefix;
      doc.write(`if (${accessor}.slice(0, ${prefix.length}) !== ${esc(prefix)}) return INVALID;`);
      break;
    }
    case "ends_with": {
      const suffix = def.suffix;
      doc.write(`if (${accessor}.slice(-${suffix.length}) !== ${esc(suffix)}) return INVALID;`);
      break;
    }
    default: {
      throw new ZodCompileUnsupportedError(`string format ${format}`);
    }
  }
  return accessor;
}
function generateCheck(doc, ctx, schema, accessor, needsValue = true) {
  const def = schema._zod.def;
  const type = def.type;
  if (def.coerce) {
    throw new ZodCompileUnsupportedError(`coercion (z.coerce.${type}())`);
  }
  const buildsValue = needsValue || !!def.checks?.length;
  let typeAccessor;
  switch (type) {
    case "string":
      typeAccessor = generateStringCheck(doc, ctx, schema, accessor, buildsValue);
      break;
    case "number":
      typeAccessor = generateNumberCheck(doc, schema, accessor);
      break;
    case "boolean":
      typeAccessor = generateBooleanCheck(doc, accessor);
      break;
    case "bigint":
      typeAccessor = generateBigIntCheck(doc, schema, accessor);
      break;
    case "symbol":
      typeAccessor = generateSymbolCheck(doc, accessor);
      break;
    case "undefined":
      typeAccessor = generateUndefinedCheck(doc, accessor);
      break;
    case "null":
      typeAccessor = generateNullCheck(doc, accessor);
      break;
    case "any":
    case "unknown":
      typeAccessor = accessor;
      break;
    case "never":
      doc.write("return INVALID;");
      typeAccessor = accessor;
      break;
    case "void":
      typeAccessor = generateVoidCheck(doc, accessor);
      break;
    case "nan":
      typeAccessor = generateNaNCheck(doc, accessor);
      break;
    case "date":
      typeAccessor = generateDateCheck(doc, accessor);
      break;
    case "object":
      typeAccessor = generateObjectCheck(doc, ctx, schema, accessor, buildsValue);
      break;
    case "optional":
      typeAccessor = generateOptionalCheck(doc, ctx, schema, accessor, buildsValue);
      break;
    case "nullable":
      typeAccessor = generateNullableCheck(doc, ctx, schema, accessor, buildsValue);
      break;
    case "array":
      typeAccessor = generateArrayCheck(doc, ctx, schema, accessor, buildsValue);
      break;
    case "literal":
      typeAccessor = generateLiteralCheck(doc, ctx, schema, accessor);
      break;
    case "enum":
      typeAccessor = generateEnumCheck(doc, ctx, schema, accessor);
      break;
    case "readonly": {
      const innerOut = generateWrapperCheck(doc, ctx, schema, accessor);
      const frozenVar = newVar(ctx);
      doc.write(`const ${frozenVar} = Object.freeze(${innerOut});`);
      typeAccessor = frozenVar;
      break;
    }
    case "success":
      generateWrapperCheck(doc, ctx, schema, accessor);
      typeAccessor = "true";
      break;
    case "default":
    case "prefault":
      typeAccessor = generateDefaultCheck(doc, ctx, schema, accessor);
      break;
    case "nonoptional":
      typeAccessor = generateNonOptionalCheck(doc, ctx, schema, accessor);
      break;
    case "tuple":
      typeAccessor = generateTupleCheck(doc, ctx, schema, accessor);
      break;
    case "union":
      typeAccessor = generateUnionCheck(doc, ctx, schema, accessor);
      break;
    case "intersection":
      typeAccessor = generateIntersectionCheck(doc, ctx, schema, accessor);
      break;
    case "record":
      typeAccessor = generateRecordCheck(doc, ctx, schema, accessor);
      break;
    case "map":
      typeAccessor = generateMapCheck(doc, ctx, schema, accessor);
      break;
    case "set":
      typeAccessor = generateSetCheck(doc, ctx, schema, accessor);
      break;
    case "file":
      typeAccessor = generateFileCheck(doc, accessor);
      break;
    case "template_literal":
      typeAccessor = generateTemplateLiteralCheck(doc, ctx, schema, accessor);
      break;
    case "lazy":
      typeAccessor = generateLazyCheck(doc, ctx, schema, accessor);
      break;
    case "pipe":
      typeAccessor = generatePipeCheck(doc, ctx, schema, accessor);
      break;
    case "custom":
      typeAccessor = generateCustomCheck(doc, ctx, schema, accessor);
      break;
    case "transform":
      typeAccessor = generateTransformCheck(doc, ctx, schema, accessor);
      break;
    case "catch":
      typeAccessor = generateCatchCheck(doc, ctx, schema, accessor);
      break;
    default: {
      throw new ZodCompileUnsupportedError(`schema type ${type}`);
    }
  }
  if (typeAccessor === null)
    return null;
  return generateChecks(doc, ctx, schema, typeAccessor);
}
function generateStringCheck(doc, ctx, schema, accessor, needsValue = true) {
  doc.write(`if (typeof ${accessor} !== "string") return INVALID;`);
  const def = schema._zod.def;
  if (def.format === undefined)
    return accessor;
  return generateStringFormatCheck(doc, ctx, def, accessor, needsValue);
}
function generateNumberCheck(doc, schema, accessor) {
  doc.write(`if (typeof ${accessor} !== "number" || !Number.isFinite(${accessor})) return INVALID;`);
  const def = schema._zod.def;
  if (def.check === "number_format" && def.format) {
    generateNumberFormatCheck(doc, { format: def.format }, accessor);
  }
  return accessor;
}
function generateBooleanCheck(doc, accessor) {
  doc.write(`if (typeof ${accessor} !== "boolean") return INVALID;`);
  return accessor;
}
function generateBigIntCheck(doc, schema, accessor) {
  doc.write(`if (typeof ${accessor} !== "bigint") return INVALID;`);
  const def = schema._zod.def;
  if (def.format) {
    switch (def.format) {
      case "int64":
        doc.write(`if (${accessor} < -9223372036854775808n || ${accessor} > 9223372036854775807n) return INVALID;`);
        break;
      case "uint64":
        doc.write(`if (${accessor} < 0n || ${accessor} > 18446744073709551615n) return INVALID;`);
        break;
    }
  }
  return accessor;
}
function generateSymbolCheck(doc, accessor) {
  doc.write(`if (typeof ${accessor} !== "symbol") return INVALID;`);
  return accessor;
}
function generateUndefinedCheck(doc, accessor) {
  doc.write(`if (${accessor} !== undefined) return INVALID;`);
  return accessor;
}
function generateNullCheck(doc, accessor) {
  doc.write(`if (${accessor} !== null) return INVALID;`);
  return accessor;
}
function generateVoidCheck(doc, accessor) {
  doc.write(`if (${accessor} !== undefined) return INVALID;`);
  return accessor;
}
function generateNaNCheck(doc, accessor) {
  doc.write(`if (typeof ${accessor} !== "number" || !Number.isNaN(${accessor})) return INVALID;`);
  return accessor;
}
function generateDateCheck(doc, accessor) {
  doc.write(`if (!(${accessor} instanceof Date) || Number.isNaN(${accessor}.getTime())) return INVALID;`);
  return accessor;
}
function generateObjectCheck(doc, ctx, schema, accessor, buildsValue = true) {
  const def = schema._zod.def;
  doc.write(`if (typeof ${accessor} !== "object" || ${accessor} === null || Array.isArray(${accessor})) return INVALID;`);
  const shape = def.shape;
  const keys = Object.keys(shape);
  const symbolKeys = Object.getOwnPropertySymbols(shape);
  const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
  const keyExpr = (k) => typeof k === "symbol" ? addConstant(ctx, k) : esc(k);
  const propKey = (k) => typeof k === "symbol" ? `[${keyExpr(k)}]` : esc(k);
  const propShape = shape;
  if (keys.includes("__proto__")) {
    throw new ZodCompileUnsupportedError('object shape key "__proto__"');
  }
  const propOutputs = new Map;
  for (const key of allKeys) {
    const propSchema = propShape[key];
    const kx = keyExpr(key);
    const inputVar = newVar(ctx);
    doc.write(`const ${inputVar} = ${accessor}[${kx}];`);
    if (propSchema._zod.optin !== undefined) {
      const outputVar = newVar(ctx);
      doc.write(`let ${outputVar} = (() => {`);
      doc.indented((d) => {
        const outputAccessor = compileChild(d, ctx, propSchema, inputVar);
        d.write(`return ${outputAccessor};`);
      });
      doc.write(`})();`);
      if (propSchema._zod.optout === "optional") {
        doc.write(`if (${outputVar} === INVALID) {`);
        doc.indented((d) => {
          d.write(`if (${kx} in ${accessor}) return INVALID;`);
          d.write(`${outputVar} = undefined;`);
        });
        doc.write(`}`);
      } else {
        doc.write(`if (${outputVar} === INVALID) return INVALID;`);
      }
      propOutputs.set(key, outputVar);
    } else {
      if (requiresPresenceCheck(propSchema)) {
        doc.write(`if (!(${kx} in ${accessor})) return INVALID;`);
      }
      const outputAccessor = compileChild(doc, ctx, propSchema, inputVar, buildsValue);
      if (outputAccessor !== null)
        propOutputs.set(key, outputAccessor);
    }
  }
  const catchall = def.catchall;
  let unknownKeysMode = "none";
  if (catchall) {
    const catchallType = catchall._zod.def.type;
    if (catchallType === "never") {
      const condition = keys.map((k) => `k !== ${esc(k)}`).join(" && ") || "true";
      doc.write(`for (const k in ${accessor}) {`);
      doc.indented((d) => {
        d.write(`if (${condition}) return INVALID;`);
      });
      doc.write(`}`);
    } else if ((catchallType === "unknown" || catchallType === "any") && !catchall._zod.def.checks?.length) {
      unknownKeysMode = "passthrough";
    } else {
      unknownKeysMode = "schema";
    }
  }
  const outputVar = newVar(ctx);
  const hasConditionalKeys = allKeys.some((k) => mayOmitUndefined(propShape[k]) || dropsWhenAbsent(propShape[k]));
  if (!buildsValue) {
    if (unknownKeysMode === "schema") {
      const knownSet = keys.length > 0 ? addConstant(ctx, new Set(keys)) : null;
      doc.write(`for (const k in ${accessor}) {`);
      doc.indented((d) => {
        d.write(`if (k === "__proto__") continue;`);
        if (knownSet)
          d.write(`if (${knownSet}.has(k)) continue;`);
        const valVar = newVar(ctx);
        d.write(`const ${valVar} = ${accessor}[k];`);
        compileChild(d, ctx, catchall, valVar, false);
      });
      doc.write(`}`);
    }
    return null;
  }
  if (!hasConditionalKeys) {
    const propLiterals = allKeys.map((k) => `${propKey(k)}: ${propOutputs.get(k)}`).join(", ");
    doc.write(`const ${outputVar} = { ${propLiterals} };`);
  } else {
    doc.write(`const ${outputVar} = {};`);
    for (const k of allKeys) {
      const kx = keyExpr(k);
      const out = propOutputs.get(k);
      if (dropsWhenAbsent(propShape[k])) {
        doc.write(`if (${kx} in ${accessor}) ${outputVar}[${kx}] = ${out};`);
      } else if (mayOmitUndefined(propShape[k])) {
        doc.write(`if (${out} !== undefined || ${kx} in ${accessor}) ${outputVar}[${kx}] = ${out};`);
      } else {
        doc.write(`${outputVar}[${kx}] = ${out};`);
      }
    }
  }
  if (unknownKeysMode !== "none") {
    const knownSet = keys.length > 0 ? addConstant(ctx, new Set(keys)) : null;
    doc.write(`for (const k in ${accessor}) {`);
    doc.indented((d) => {
      d.write(`if (k === "__proto__") continue;`);
      if (knownSet)
        d.write(`if (${knownSet}.has(k)) continue;`);
      if (unknownKeysMode === "passthrough") {
        d.write(`${outputVar}[k] = ${accessor}[k];`);
      } else {
        const valVar = newVar(ctx);
        d.write(`const ${valVar} = ${accessor}[k];`);
        const catchallOut = compileChild(d, ctx, catchall, valVar);
        d.write(`${outputVar}[k] = ${catchallOut};`);
      }
    });
    doc.write(`}`);
  }
  return outputVar;
}
function generateOptionalCheck(doc, ctx, schema, accessor, buildsValue = true) {
  const def = schema._zod.def;
  if (isExactOptional(schema)) {
    return generateCheck(doc, ctx, def.innerType, accessor, buildsValue);
  }
  if (def.innerType._zod.optin === "defaulted") {
    const outputVar = newVar(ctx);
    const branchVar = newVar(ctx);
    doc.write(`let ${outputVar};`);
    doc.write(`if (${accessor} === undefined) {`);
    doc.indented((d) => {
      d.write(`const ${branchVar} = (() => {`);
      d.indented((d2) => {
        const innerOutput = generateCheck(d2, ctx, def.innerType, accessor);
        d2.write(`return ${innerOutput};`);
      });
      d.write(`})();`);
      d.write(`if (${branchVar} !== INVALID) ${outputVar} = ${branchVar};`);
    });
    doc.write(`} else {`);
    doc.indented((d) => {
      const innerOutput = generateCheck(d, ctx, def.innerType, accessor);
      d.write(`${outputVar} = ${innerOutput};`);
    });
    doc.write(`}`);
    return outputVar;
  }
  const outputVar = buildsValue ? newVar(ctx) : null;
  if (outputVar)
    doc.write(`let ${outputVar};`);
  doc.write(`if (${accessor} !== undefined) {`);
  doc.indented((d) => {
    const innerOutput = generateCheck(d, ctx, def.innerType, accessor, buildsValue);
    if (outputVar && innerOutput !== null)
      d.write(`${outputVar} = ${innerOutput};`);
  });
  doc.write(`}`);
  return outputVar;
}
function isExactOptional(schema) {
  return schema._zod.traits?.has("$ZodExactOptional") === true;
}
function requiresPresenceCheck(schema) {
  return schema._zod.optin === undefined && fastPathAcceptsAbsence(schema);
}
function fastPathAcceptsAbsence(schema) {
  if (schema._zod.def.coerce)
    return true;
  const def = schema._zod.def;
  switch (def.type) {
    case "any":
    case "unknown":
    case "undefined":
    case "void":
    case "default":
    case "prefault":
    case "transform":
    case "custom":
    case "lazy":
      return true;
    case "string":
    case "number":
    case "boolean":
    case "bigint":
    case "symbol":
    case "null":
    case "never":
    case "nan":
    case "date":
    case "object":
    case "array":
    case "tuple":
    case "record":
    case "map":
    case "set":
    case "file":
    case "template_literal":
      return false;
    case "nonoptional":
      return def.innerType ? fastPathAcceptsAbsence(def.innerType) : false;
    case "literal":
      return !!def.values?.includes(undefined);
    case "enum":
      return !!schema._zod.values?.has(undefined);
    case "optional":
    case "nullable":
    case "readonly":
    case "success":
      return def.innerType ? fastPathAcceptsAbsence(def.innerType) : true;
    case "catch":
      return true;
    case "union":
      return def.options ? def.options.some(fastPathAcceptsAbsence) : true;
    case "intersection":
      if (!def.left || !def.right)
        return true;
      return fastPathAcceptsAbsence(def.left) && fastPathAcceptsAbsence(def.right);
    case "pipe":
      return def.in ? fastPathAcceptsAbsence(def.in) : true;
    default:
      return true;
  }
}
function dropsWhenAbsent(schema) {
  return schema._zod.optin === "optional" && schema._zod.optout === "optional";
}
function mayOmitUndefined(schema) {
  return (schema._zod.optin !== "defaulted" || schema._zod.optout === "optional") && mayOutputUndefined(schema);
}
function mayOutputUndefined(schema) {
  const def = schema._zod.def;
  switch (def.type) {
    case "string":
    case "number":
    case "boolean":
    case "bigint":
    case "symbol":
    case "null":
    case "nan":
    case "date":
    case "object":
    case "array":
    case "tuple":
    case "record":
    case "map":
    case "set":
    case "file":
    case "template_literal":
    case "never":
    case "success":
      return false;
    case "literal":
      return !!def.values?.includes(undefined);
    case "enum":
      return !!schema._zod.values?.has(undefined);
    case "optional":
      return true;
    case "nullable":
    case "readonly":
    case "nonoptional":
      return def.innerType ? mayOutputUndefined(def.innerType) : true;
    case "union":
      return def.options ? def.options.some(mayOutputUndefined) : true;
    case "intersection":
      return !def.left || !def.right || mayOutputUndefined(def.left) || mayOutputUndefined(def.right);
    case "pipe":
      return def.out ? mayOutputUndefined(def.out) : true;
    default:
      return true;
  }
}
function generateNullableCheck(doc, ctx, schema, accessor, buildsValue = true) {
  const def = schema._zod.def;
  const outputVar = buildsValue ? newVar(ctx) : null;
  if (outputVar)
    doc.write(`let ${outputVar} = null;`);
  doc.write(`if (${accessor} !== null) {`);
  doc.indented((d) => {
    const innerOutput = generateCheck(d, ctx, def.innerType, accessor, buildsValue);
    if (outputVar && innerOutput !== null)
      d.write(`${outputVar} = ${innerOutput};`);
  });
  doc.write(`}`);
  return outputVar;
}
function generateArrayCheck(doc, ctx, schema, accessor, buildsValue = true) {
  const def = schema._zod.def;
  doc.write(`if (!Array.isArray(${accessor})) return INVALID;`);
  const outputVar = buildsValue ? newVar(ctx) : null;
  const iVar = newVar(ctx);
  const elemVar = newVar(ctx);
  if (outputVar)
    doc.write(`const ${outputVar} = new Array(${accessor}.length);`);
  doc.write(`for (let ${iVar} = 0; ${iVar} < ${accessor}.length; ${iVar}++) {`);
  doc.indented((d) => {
    d.write(`const ${elemVar} = ${accessor}[${iVar}];`);
    const elemOutput = compileChild(d, ctx, def.element, elemVar, buildsValue);
    if (outputVar && elemOutput !== null)
      d.write(`${outputVar}[${iVar}] = ${elemOutput};`);
  });
  doc.write(`}`);
  return outputVar;
}
function generateLiteralCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const values = def.values;
  if (values.length !== 1) {
    const literalSet = addConstant(ctx, new Set(values));
    doc.write(`if (!${literalSet}.has(${accessor})) return INVALID;`);
    return accessor;
  }
  const value = values[0];
  if (typeof value === "number" && Number.isNaN(value)) {
    const literalSet = addConstant(ctx, new Set(values));
    doc.write(`if (!${literalSet}.has(${accessor})) return INVALID;`);
    return accessor;
  }
  if (typeof value === "string") {
    doc.write(`if (${accessor} !== ${esc(value)}) return INVALID;`);
  } else if (typeof value === "number" || typeof value === "boolean") {
    doc.write(`if (${accessor} !== ${value}) return INVALID;`);
  } else if (value === null) {
    doc.write(`if (${accessor} !== null) return INVALID;`);
  } else if (value === undefined) {
    doc.write(`if (${accessor} !== undefined) return INVALID;`);
  } else if (typeof value === "bigint") {
    doc.write(`if (${accessor} !== ${value}n) return INVALID;`);
  } else {
    throw new ZodCompileUnsupportedError(`literal type ${typeof value}`);
  }
  return accessor;
}
function generateEnumCheck(doc, ctx, schema, accessor) {
  const values = schema._zod.values;
  if (!values) {
    throw new ZodCompileUnsupportedError("enum schema without enumerated values");
  }
  const enumSet = addConstant(ctx, values);
  doc.write(`if (!${enumSet}.has(${accessor})) return INVALID;`);
  return accessor;
}
function generateWrapperCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  return generateCheck(doc, ctx, def.innerType, accessor);
}
function generateDefaultCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const descriptor = Object.getOwnPropertyDescriptor(schema._zod.def, "defaultValue");
  const defaultGetter = descriptor ? () => schema._zod.def.defaultValue : undefined;
  if (schema._zod.def.type === "prefault") {
    if (!defaultGetter) {
      return generateCheck(doc, ctx, def.innerType, accessor);
    }
    const defaultFn = addConstant(ctx, defaultGetter);
    const inputVar = newVar(ctx);
    doc.write(`let ${inputVar} = ${accessor};`);
    doc.write(`if (${accessor} === undefined) ${inputVar} = ${defaultFn}();`);
    return generateCheck(doc, ctx, def.innerType, inputVar);
  }
  const outputVar = newVar(ctx);
  if (defaultGetter) {
    const defaultFn = addConstant(ctx, defaultGetter);
    const cloneFn = addConstant(ctx, shallowClone);
    doc.write(`let ${outputVar};`);
    doc.write(`if (${accessor} === undefined) {`);
    doc.indented((d) => {
      d.write(`${outputVar} = ${cloneFn}(${defaultFn}());`);
    });
    doc.write(`} else {`);
    doc.indented((d) => {
      const innerOutput = generateCheck(d, ctx, def.innerType, accessor);
      d.write(`${outputVar} = ${innerOutput} === undefined ? ${cloneFn}(${defaultFn}()) : ${innerOutput};`);
    });
    doc.write(`}`);
  } else {
    doc.write(`let ${outputVar};`);
    doc.write(`if (${accessor} !== undefined) {`);
    doc.indented((d) => {
      const innerOutput = generateCheck(d, ctx, def.innerType, accessor);
      d.write(`${outputVar} = ${innerOutput};`);
    });
    doc.write(`}`);
  }
  return outputVar;
}
function generateNonOptionalCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const innerOutput = generateCheck(doc, ctx, def.innerType, accessor);
  const outputVar = newVar(ctx);
  doc.write(`const ${outputVar} = ${innerOutput};`);
  doc.write(`if (${outputVar} === undefined) return INVALID;`);
  return outputVar;
}
function generateTupleCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const items = def.items;
  const rest = def.rest;
  doc.write(`if (!Array.isArray(${accessor})) return INVALID;`);
  const optinStart = getTupleOptStart2(items, "optin");
  const optoutStart = getTupleOptStart2(items, "optout");
  if (rest) {
    doc.write(`if (${accessor}.length < ${optinStart}) return INVALID;`);
  } else {
    doc.write(`if (${accessor}.length < ${optinStart} || ${accessor}.length > ${items.length}) return INVALID;`);
  }
  const outputVar = newVar(ctx);
  doc.write(`const ${outputVar} = [];`);
  for (let i = 0;i < items.length; i++) {
    const itemSchema = items[i];
    if (i >= optoutStart) {
      doc.write(`if (${outputVar}.length === ${i}) {`);
      doc.indented((d) => {
        d.write(`if (${i} < ${accessor}.length) {`);
        d.indented((d2) => {
          const elemVar = newVar(ctx);
          d2.write(`const ${elemVar} = ${accessor}[${i}];`);
          const elemOutput = compileChild(d2, ctx, itemSchema, elemVar);
          d2.write(`${outputVar}[${i}] = ${elemOutput};`);
        });
        d.write(`} else {`);
        d.indented((d2) => {
          if (dropsWhenAbsent(itemSchema)) {
            d2.write(`${outputVar}.length = ${i};`);
            return;
          }
          const elemVar = newVar(ctx);
          const branchVar = newVar(ctx);
          d2.write(`const ${elemVar} = undefined;`);
          d2.write(`const ${branchVar} = (() => {`);
          d2.indented((d3) => {
            const elemOutput = compileChild(d3, ctx, itemSchema, elemVar);
            d3.write(`return ${elemOutput};`);
          });
          d2.write(`})();`);
          d2.write(`if (${branchVar} === INVALID || ${branchVar} === undefined) ${outputVar}.length = ${i};`);
          d2.write(`else ${outputVar}[${i}] = ${branchVar};`);
        });
        d.write(`}`);
      });
      doc.write(`}`);
    } else {
      const elemVar = newVar(ctx);
      doc.write(`const ${elemVar} = ${accessor}[${i}];`);
      const elemOutput = compileChild(doc, ctx, itemSchema, elemVar);
      doc.write(`${outputVar}[${i}] = ${elemOutput};`);
    }
  }
  if (rest) {
    const iVar = newVar(ctx);
    const elemVar = newVar(ctx);
    doc.write(`for (let ${iVar} = ${items.length}; ${iVar} < ${accessor}.length; ${iVar}++) {`);
    doc.indented((d) => {
      d.write(`const ${elemVar} = ${accessor}[${iVar}];`);
      const elemOutput = compileChild(d, ctx, rest, elemVar);
      d.write(`${outputVar}[${iVar}] = ${elemOutput};`);
    });
    doc.write(`}`);
  }
  return outputVar;
}
function getTupleOptStart2(items, key) {
  for (let i = items.length - 1;i >= 0; i--) {
    const omittable = key === "optin" ? items[i]._zod.optin !== undefined : items[i]._zod.optout === "optional";
    if (!omittable)
      return i + 1;
  }
  return 0;
}
function generateUnionCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const options = def.options;
  if (def.discriminator) {
    return generateDiscriminatedUnionCheck(doc, ctx, def, accessor);
  }
  if (def.inclusive === false) {
    throw new ZodCompileUnsupportedError("exclusive unions (z.xor)");
  }
  if (options.length === 0) {
    doc.write("return INVALID;");
    return accessor;
  }
  if (options.length === 1) {
    return generateCheck(doc, ctx, options[0], accessor);
  }
  const allLiterals = options.every((opt) => opt._zod.def.type === "literal" && !opt._zod.def.checks?.length);
  if (allLiterals) {
    const values = new Set(options.flatMap((opt) => opt._zod.def.values));
    const valuesConst = addConstant(ctx, values);
    doc.write(`if (!${valuesConst}.has(${accessor})) return INVALID;`);
    return accessor;
  }
  const outputVar = newVar(ctx);
  doc.write(`let ${outputVar};`);
  for (let i = 0;i < options.length; i++) {
    const opt = options[i];
    if (i === 0) {
      doc.write(`${outputVar} = (() => {`);
    } else {
      doc.write(`if (${outputVar} === INVALID) ${outputVar} = (() => {`);
    }
    doc.indented((d) => {
      const branchOutput = generateCheck(d, ctx, opt, accessor);
      d.write(`return ${branchOutput};`);
    });
    doc.write(`})();`);
  }
  doc.write(`if (${outputVar} === INVALID) return INVALID;`);
  return outputVar;
}
function generateDiscriminatedUnionCheck(doc, ctx, def, accessor) {
  if (def.unionFallback) {
    throw new ZodCompileUnsupportedError("discriminated union with unionFallback");
  }
  if (def.options.length === 0) {
    doc.write("return INVALID;");
    return accessor;
  }
  const discVar = newVar(ctx);
  const outputVar = newVar(ctx);
  doc.write(`const ${discVar} = ${accessor}?.[${esc(def.discriminator)}];`);
  doc.write(`let ${outputVar};`);
  let firstBranch = true;
  const claimed = new Set;
  for (const option of def.options) {
    const values = option._zod.propValues?.[def.discriminator];
    if (!values || values.size === 0) {
      throw new ZodCompileUnsupportedError("discriminated union option without static discriminator values");
    }
    for (const value of values) {
      if (claimed.has(value)) {
        throw new ZodCompileUnsupportedError(`duplicate discriminator value ${String(value)}`);
      }
      claimed.add(value);
    }
    const conditions = Array.from(values, (value) => literalEquality(ctx, discVar, value));
    const prefix = firstBranch ? "if" : "else if";
    doc.write(`${prefix} (${conditions.join(" || ")}) {`);
    doc.indented((d) => {
      const branchOutput = generateCheck(d, ctx, option, accessor);
      d.write(`${outputVar} = ${branchOutput};`);
    });
    doc.write(`}`);
    firstBranch = false;
  }
  doc.write(`else { return INVALID; }`);
  return outputVar;
}
function literalEquality(ctx, accessor, value) {
  if (typeof value === "string")
    return `${accessor} === ${esc(value)}`;
  if (typeof value === "number") {
    if (Number.isNaN(value))
      return `Number.isNaN(${accessor})`;
    return `${accessor} === ${value}`;
  }
  if (typeof value === "boolean")
    return `${accessor} === ${value}`;
  if (value === null)
    return `${accessor} === null`;
  if (value === undefined)
    return `${accessor} === undefined`;
  if (typeof value === "bigint")
    return `${accessor} === ${value}n`;
  if (typeof value === "symbol") {
    const symbolConst = addConstant(ctx, value);
    return `${accessor} === ${symbolConst}`;
  }
  throw new ZodCompileUnsupportedError(`literal discriminator value ${String(value)}`);
}
function generateIntersectionCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  ctx.definite = false;
  const leftOutput = compileChild(doc, ctx, def.left, accessor);
  const rightOutput = compileChild(doc, ctx, def.right, accessor);
  const mergeConst = addConstant(ctx, mergeValues);
  const mergedVar = newVar(ctx);
  doc.write(`const ${mergedVar} = ${mergeConst}(${leftOutput}, ${rightOutput});`);
  doc.write(`if (!${mergedVar}.valid) return INVALID;`);
  return `${mergedVar}.data`;
}
function generateRecordCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const isPlainObjectConst = addConstant(ctx, isPlainObject);
  doc.write(`if (!${isPlainObjectConst}(${accessor})) return INVALID;`);
  const outputVar = newVar(ctx);
  const kVar = newVar(ctx);
  const valVar = newVar(ctx);
  doc.write(`const ${outputVar} = {};`);
  const recordDef = def;
  const keyValues = recordDef.partial ? undefined : def.keyType._zod.values;
  if (keyValues) {
    const inputKeys = [];
    for (const key of keyValues) {
      if (!(typeof key === "string" || typeof key === "number" || typeof key === "symbol")) {
        throw new ZodCompileUnsupportedError(`record key value ${String(key)}`);
      }
      const inputKey = typeof key === "number" ? key.toString() : key;
      if (inputKey === "__proto__") {
        throw new ZodCompileUnsupportedError('record key "__proto__"');
      }
      inputKeys.push(inputKey);
      const keyConst = addConstant(ctx, key);
      const outKey = generateCheck(doc, ctx, def.keyType, keyConst);
      const valueVar = newVar(ctx);
      doc.write(`const ${valueVar} = ${accessor}[${literalPropertyKey(ctx, inputKey)}];`);
      const valOutput = compileChild(doc, ctx, def.valueType, valueVar);
      doc.write(`${outputVar}[${outKey}] = ${valOutput};`);
    }
    const knownKeysConst = addConstant(ctx, new Set(inputKeys));
    doc.write(`for (const ${kVar} in ${accessor}) {`);
    doc.indented((d) => {
      d.write(`if (${knownKeysConst}.has(${kVar})) continue;`);
      if (recordDef.mode === "loose") {
        d.write(`if (${kVar} !== "__proto__") ${outputVar}[${kVar}] = ${accessor}[${kVar}];`);
      } else {
        d.write(`return INVALID;`);
      }
    });
    doc.write(`}`);
    return outputVar;
  }
  const keyDef = def.keyType._zod.def;
  const keyIsBareString = keyDef.type === "string" && keyDef.format === undefined && !keyDef.coerce && (keyDef.checks?.length ?? 0) === 0;
  if (!keyIsBareString) {
    const isLoose = def.mode === "loose";
    const keyFn = compileFn(def.keyType);
    if (keyFn.definite === false)
      ctx.definite = false;
    const keyFast = addConstant(ctx, keyFn);
    const numericConst = addConstant(ctx, number);
    const outKeyVar = newVar(ctx);
    emitOwnKeys(doc, ctx, accessor, kVar, (d) => {
      d.write(`let ${outKeyVar} = ${keyFast}(${kVar});`);
      d.write(`if (${outKeyVar} === INVALID && typeof ${kVar} === "string" && ${numericConst}.test(${kVar})) ${outKeyVar} = ${keyFast}(Number(${kVar}));`);
      if (isLoose) {
        d.write(`if (${outKeyVar} === INVALID) { ${outputVar}[${kVar}] = ${accessor}[${kVar}]; continue; }`);
      } else {
        d.write(`if (${outKeyVar} === INVALID) return INVALID;`);
      }
      d.write(`if (${outKeyVar} === "__proto__") continue;`);
      const valueVar = newVar(ctx);
      d.write(`const ${valueVar} = ${accessor}[${kVar}];`);
      const valOutput = compileChild(d, ctx, def.valueType, valueVar);
      d.write(`${outputVar}[${outKeyVar}] = ${valOutput};`);
    });
    return outputVar;
  }
  emitOwnKeys(doc, ctx, accessor, kVar, (d) => {
    d.write(`const ${valVar} = ${accessor}[${kVar}];`);
    const valOutput = compileChild(d, ctx, def.valueType, valVar);
    d.write(`${outputVar}[${kVar}] = ${valOutput};`);
  }, `return INVALID;`);
  return outputVar;
}
function emitOwnKeys(doc, ctx, accessor, kVar, body, onSymbol) {
  const propIsEnumerableConst = addConstant(ctx, Object.prototype.propertyIsEnumerable);
  const symsVar = newVar(ctx);
  const keysVar = newVar(ctx);
  const iVar = newVar(ctx);
  doc.write(`const ${symsVar} = Object.getOwnPropertySymbols(${accessor});`);
  doc.write(`const ${keysVar} = Object.getOwnPropertyNames(${accessor});`);
  doc.write(`for (let ${iVar} = 0; ${iVar} < ${keysVar}.length; ${iVar}++) {`);
  doc.indented((d) => {
    d.write(`const ${kVar} = ${keysVar}[${iVar}];`);
    d.write(`if (${kVar} === "__proto__" || !${propIsEnumerableConst}.call(${accessor}, ${kVar})) continue;`);
    body(d);
  });
  doc.write(`}`);
  doc.write(`for (let ${iVar} = 0; ${iVar} < ${symsVar}.length; ${iVar}++) {`);
  doc.indented((d) => {
    d.write(`const ${kVar} = ${symsVar}[${iVar}];`);
    d.write(`if (!${propIsEnumerableConst}.call(${accessor}, ${kVar})) continue;`);
    if (onSymbol)
      d.write(onSymbol);
    else
      body(d);
  });
  doc.write(`}`);
}
function literalPropertyKey(ctx, key) {
  if (typeof key === "string")
    return esc(key);
  return addConstant(ctx, key);
}
function generateMapCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  doc.write(`if (!(${accessor} instanceof Map)) return INVALID;`);
  const outputVar = newVar(ctx);
  const kVar = newVar(ctx);
  const valVar = newVar(ctx);
  doc.write(`const ${outputVar} = new Map();`);
  doc.write(`for (const [${kVar}, ${valVar}] of ${accessor}) {`);
  doc.indented((d) => {
    const keyOutput = generateCheck(d, ctx, def.keyType, kVar);
    const valOutput = generateCheck(d, ctx, def.valueType, valVar);
    d.write(`${outputVar}.set(${keyOutput}, ${valOutput});`);
  });
  doc.write(`}`);
  return outputVar;
}
function generateSetCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  doc.write(`if (!(${accessor} instanceof Set)) return INVALID;`);
  const outputVar = newVar(ctx);
  const valVar = newVar(ctx);
  doc.write(`const ${outputVar} = new Set();`);
  doc.write(`for (const ${valVar} of ${accessor}) {`);
  doc.indented((d) => {
    const valOutput = generateCheck(d, ctx, def.valueType, valVar);
    d.write(`${outputVar}.add(${valOutput});`);
  });
  doc.write(`}`);
  return outputVar;
}
function generateFileCheck(doc, accessor) {
  doc.write(`if (!(${accessor} instanceof File)) return INVALID;`);
  return accessor;
}
function generateTemplateLiteralCheck(doc, ctx, schema, accessor) {
  doc.write(`if (typeof ${accessor} !== "string") return INVALID;`);
  const pattern = schema._zod.pattern;
  if (pattern) {
    const patternConst = addConstant(ctx, pattern);
    doc.write(`${patternConst}.lastIndex = 0;`);
    doc.write(`if (!${patternConst}.test(${accessor})) return INVALID;`);
  }
  return accessor;
}
function generateLazyCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const getterConst = addUserConstant(ctx, def.getter);
  const cacheConst = addConstant(ctx, { parser: null });
  doc.write(`if (!${cacheConst}.parser) {`);
  doc.indented((d) => {
    d.write(`const inner = ${getterConst}();`);
    d.write(`${cacheConst}.parser = function(input) {`);
    d.indented((d2) => {
      d2.write(`const result = inner._zod.run({ value: input, issues: [] }, {});`);
      d2.write(`return result.issues.length === 0 ? result.value : INVALID;`);
    });
    d.write(`};`);
  });
  doc.write(`}`);
  const outputVar = newVar(ctx);
  doc.write(`const ${outputVar} = ${cacheConst}.parser(${accessor});`);
  doc.write(`if (${outputVar} === INVALID) return INVALID;`);
  return outputVar;
}
function generatePipeCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const inputOutput = generateCheck(doc, ctx, def.in, accessor);
  if (def.transform) {
    if (isAsyncFunction(def.transform)) {
      throw new ZodCompileAsyncError("z.compile: async transforms in pipes are not supported");
    }
    const transformFn = def.transform;
    const helperFn = (value) => {
      const fakePayload = { value, issues: [], addIssue: pushIssue };
      const result = transformFn(value, fakePayload);
      if (result instanceof Promise)
        return INVALID;
      return fakePayload.issues.length === 0 ? result : INVALID;
    };
    const helperConst = addUserConstant(ctx, helperFn);
    const transformedVar = newVar(ctx);
    doc.write(`const ${transformedVar} = ${helperConst}(${inputOutput});`);
    doc.write(`if (${transformedVar} === INVALID) return INVALID;`);
    return generateCheck(doc, ctx, def.out, transformedVar);
  } else {
    return generateCheck(doc, ctx, def.out, inputOutput);
  }
}
function isAsyncFunction(fn) {
  return typeof fn === "function" && (fn.constructor.name === "AsyncFunction" || fn[Symbol.toStringTag] === "AsyncFunction");
}
function generateCustomCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  if (def.fn) {
    if (isAsyncFunction(def.fn)) {
      throw new ZodCompileAsyncError("z.compile: async custom predicates are not supported");
    }
    const fnConst = addUserConstant(ctx, def.fn);
    const throwAsyncConst = addConstant(ctx, throwAsync);
    const resVar = newVar(ctx);
    doc.write(`const ${resVar} = ${fnConst}(${accessor});`);
    doc.write(`if (${resVar} instanceof Promise) ${throwAsyncConst}();`);
    doc.write(`if (!${resVar}) return INVALID;`);
  } else {
    throw new ZodCompileUnsupportedError("custom schema without a predicate function");
  }
  return accessor;
}
function runtimeCatch(innerSchema, catchValue, value) {
  const result = innerSchema._zod.run({ value, issues: [] }, {});
  if (result && typeof result.then === "function")
    return INVALID;
  const r = result;
  if (r.issues.length === 0)
    return r.value;
  return catchValue();
}
function generateCatchCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  if (!def.catchValue[CONSTANT_CATCH]) {
    throw new ZodCompileUnsupportedError("catch with a callback (only a constant catch value compiles)", false);
  }
  const outputVar = newVar(ctx);
  doc.write(`let ${outputVar} = (() => {`);
  doc.indented((d) => {
    const innerOut = compileChild(d, ctx, def.innerType, accessor);
    d.write(`return ${innerOut};`);
  });
  doc.write(`})();`);
  const innerConst = addConstant(ctx, def.innerType);
  const catchConst = addUserConstant(ctx, def.catchValue);
  const catchHelperConst = addConstant(ctx, runtimeCatch);
  doc.write(`if (${outputVar} === INVALID) {`);
  doc.indented((d) => {
    d.write(`${outputVar} = ${catchHelperConst}(${innerConst}, ${catchConst}, ${accessor});`);
    d.write(`if (${outputVar} === INVALID) return INVALID;`);
  });
  doc.write(`}`);
  return outputVar;
}
function generateTransformCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  if (def.transform) {
    if (isAsyncFunction(def.transform)) {
      throw new ZodCompileAsyncError("z.compile: async transforms are not supported");
    }
    const transformFn = def.transform;
    const helperFn = (value) => {
      const fakePayload = { value, issues: [], addIssue: pushIssue };
      const result = transformFn(value, fakePayload);
      if (result instanceof Promise)
        return INVALID;
      return fakePayload.issues.length === 0 ? result : INVALID;
    };
    const helperConst = addUserConstant(ctx, helperFn);
    const outputVar = newVar(ctx);
    doc.write(`const ${outputVar} = ${helperConst}(${accessor});`);
    doc.write(`if (${outputVar} === INVALID) return INVALID;`);
    return outputVar;
  }
  return accessor;
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/api.js
function snapshotChecks(def) {
  if (def.checks)
    def.checks = [...def.checks];
  return def;
}
function _string(Class, params) {
  return new Class(snapshotChecks({ type: "string", ...normalizeParams(params) }));
}
function _coercedString(Class, params) {
  return new Class(snapshotChecks({ type: "string", coerce: true, ...normalizeParams(params) }));
}
function _email(Class, params) {
  return new Class({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _guid(Class, params) {
  return new Class({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuid(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuidv4(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
function _uuidv6(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
function _uuidv7(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
function _url(Class, params) {
  return new Class({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _emoji2(Class, params) {
  return new Class({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _nanoid(Class, params) {
  return new Class({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid(Class, params) {
  return new Class({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid2(Class, params) {
  return new Class({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ulid(Class, params) {
  return new Class({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _xid(Class, params) {
  return new Class({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ksuid(Class, params) {
  return new Class({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv4(Class, params) {
  return new Class({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv6(Class, params) {
  return new Class({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _mac(Class, params) {
  return new Class({
    type: "string",
    format: "mac",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv4(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv6(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64(Class, params) {
  return new Class({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64url(Class, params) {
  return new Class({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _e164(Class, params) {
  return new Class({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _creditCard(Class, params) {
  return new Class({
    type: "string",
    format: "credit_card",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _iban(Class, params) {
  return new Class({
    type: "string",
    format: "iban",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _jwt(Class, params) {
  return new Class({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
var TimePrecision = {
  Any: null,
  Minute: -1,
  Second: 0,
  Millisecond: 3,
  Microsecond: 6
};
function _isoDateTime(Class, params) {
  return new Class({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDate(Class, params) {
  return new Class({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _isoTime(Class, params) {
  return new Class({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDuration(Class, params) {
  return new Class({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _number(Class, params) {
  return new Class(snapshotChecks({ type: "number", checks: [], ...normalizeParams(params) }));
}
function _coercedNumber(Class, params) {
  return new Class(snapshotChecks({ type: "number", coerce: true, checks: [], ...normalizeParams(params) }));
}
function _int(Class, params) {
  return new Class({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
function _float32(Class, params) {
  return new Class({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float32",
    ...normalizeParams(params)
  });
}
function _float64(Class, params) {
  return new Class({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float64",
    ...normalizeParams(params)
  });
}
function _int32(Class, params) {
  return new Class({
    type: "number",
    check: "number_format",
    abort: false,
    format: "int32",
    ...normalizeParams(params)
  });
}
function _uint32(Class, params) {
  return new Class({
    type: "number",
    check: "number_format",
    abort: false,
    format: "uint32",
    ...normalizeParams(params)
  });
}
function _boolean(Class, params) {
  return new Class({
    type: "boolean",
    ...normalizeParams(params)
  });
}
function _coercedBoolean(Class, params) {
  return new Class({
    type: "boolean",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _bigint(Class, params) {
  return new Class({
    type: "bigint",
    ...normalizeParams(params)
  });
}
function _coercedBigint(Class, params) {
  return new Class({
    type: "bigint",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _int64(Class, params) {
  return new Class({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "int64",
    ...normalizeParams(params)
  });
}
function _uint64(Class, params) {
  return new Class({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "uint64",
    ...normalizeParams(params)
  });
}
function _symbol(Class, params) {
  return new Class({
    type: "symbol",
    ...normalizeParams(params)
  });
}
function _undefined2(Class, params) {
  return new Class({
    type: "undefined",
    ...normalizeParams(params)
  });
}
function _null2(Class, params) {
  return new Class({
    type: "null",
    ...normalizeParams(params)
  });
}
function _any(Class) {
  return new Class({
    type: "any"
  });
}
function _unknown(Class) {
  return new Class({
    type: "unknown"
  });
}
function _never(Class, params) {
  return new Class({
    type: "never",
    ...normalizeParams(params)
  });
}
function _void(Class, params) {
  return new Class({
    type: "void",
    ...normalizeParams(params)
  });
}
function _date(Class, params) {
  return new Class({
    type: "date",
    ...normalizeParams(params)
  });
}
function _coercedDate(Class, params) {
  return new Class({
    type: "date",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _nan(Class, params) {
  return new Class({
    type: "nan",
    ...normalizeParams(params)
  });
}
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _positive(params) {
  return _gt(0, params);
}
function _negative(params) {
  return _lt(0, params);
}
function _nonpositive(params) {
  return _lte(0, params);
}
function _nonnegative(params) {
  return _gte(0, params);
}
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
function _maxSize(maximum, params) {
  return new $ZodCheckMaxSize({
    check: "max_size",
    ...normalizeParams(params),
    maximum
  });
}
function _minSize(minimum, params) {
  return new $ZodCheckMinSize({
    check: "min_size",
    ...normalizeParams(params),
    minimum
  });
}
function _size(size, params) {
  return new $ZodCheckSizeEquals({
    check: "size_equals",
    ...normalizeParams(params),
    size
  });
}
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
function _property(property, schema, params) {
  return new $ZodCheckProperty({
    check: "property",
    property,
    schema,
    ...normalizeParams(params)
  });
}
function _properties(shape, params) {
  return new $ZodCheckProperties({
    check: "properties",
    shape,
    ...normalizeParams(params)
  });
}
function _mime(types, params) {
  return new $ZodCheckMimeType({
    check: "mime_type",
    mime: types,
    ...normalizeParams(params)
  });
}
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
function _normalize(form) {
  return _overwrite((input) => input.normalize(form));
}
function _trim() {
  return _overwrite((input) => input.trim());
}
function _toLowerCase() {
  return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
  return _overwrite((input) => input.toUpperCase());
}
function _slugify() {
  return _overwrite((input) => slugify(input));
}
function _array(Class, element, params) {
  return new Class({
    type: "array",
    element,
    ...normalizeParams(params)
  });
}
function _union(Class, options, params) {
  return new Class({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
function _xor(Class, options, params) {
  return new Class({
    type: "union",
    options,
    inclusive: false,
    ...normalizeParams(params)
  });
}
function _discriminatedUnion(Class, discriminator, options, params) {
  return new Class({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
function _intersection(Class, left, right) {
  return new Class({
    type: "intersection",
    left,
    right
  });
}
function _tuple(Class, items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new Class({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
  });
}
function _record(Class, keyType, valueType, params) {
  return new Class({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function _map(Class, keyType, valueType, params) {
  return new Class({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function _set(Class, valueType, params) {
  return new Class({
    type: "set",
    valueType,
    ...normalizeParams(params)
  });
}
function _enum(Class, values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new Class({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function _nativeEnum(Class, entries, params) {
  return new Class({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function _literal(Class, value, params) {
  return new Class({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
function _file(Class, params) {
  return new Class({
    type: "file",
    ...normalizeParams(params)
  });
}
function _transform(Class, fn) {
  return new Class({
    type: "transform",
    transform: fn
  });
}
function _optional(Class, innerType) {
  return new Class({
    type: "optional",
    innerType
  });
}
function _nullable(Class, innerType) {
  return new Class({
    type: "nullable",
    innerType
  });
}
function _default(Class, innerType, defaultValue) {
  return new Class({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
function _nonoptional(Class, innerType, params) {
  return new Class({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
function _success(Class, innerType) {
  return new Class({
    type: "success",
    innerType
  });
}
function _catch(Class, innerType, catchValue) {
  return new Class({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : constantCatch(catchValue)
  });
}
function _pipe(Class, in_, out) {
  return new Class({
    type: "pipe",
    in: in_,
    out
  });
}
function _readonly(Class, innerType) {
  return new Class({
    type: "readonly",
    innerType
  });
}
function _templateLiteral(Class, parts, params) {
  return new Class({
    type: "template_literal",
    parts,
    ...normalizeParams(params)
  });
}
function _lazy(Class, getter) {
  return new Class({
    type: "lazy",
    getter
  });
}
function _promise(Class, innerType) {
  return new Class({
    type: "promise",
    innerType
  });
}
function _custom(Class, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema = new Class({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
  return schema;
}
function _refine(Class, fn, _params) {
  const schema = new Class({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
function _superRefine(fn, params) {
  const ch = _check((payload) => {
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        if (!("input" in _issue))
          _issue.input = payload.value;
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  }, params);
  return ch;
}
function _check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
function describe(description) {
  const ch = new $ZodCheck({ check: "describe" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, description });
    }
  ];
  ch._zod.check = () => {};
  return ch;
}
function meta(metadata) {
  const ch = new $ZodCheck({ check: "meta" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, ...metadata });
    }
  ];
  ch._zod.check = () => {};
  return ch;
}
function _stringbool(Classes, _params) {
  const params = normalizeParams(_params);
  let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
  let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  if (params.case !== "sensitive") {
    truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
    falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
  }
  const truthySet = new Set(truthyArray);
  const falsySet = new Set(falsyArray);
  const _Codec = Classes.Codec ?? $ZodCodec;
  const _Boolean = Classes.Boolean ?? $ZodBoolean;
  const _String = Classes.String ?? $ZodString;
  const stringSchema = new _String({ type: "string", error: params.error });
  const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
  const codec = new _Codec({
    type: "pipe",
    in: stringSchema,
    out: booleanSchema,
    transform: (input, payload) => {
      let data = input;
      if (params.case !== "sensitive")
        data = data.toLowerCase();
      if (truthySet.has(data)) {
        return true;
      } else if (falsySet.has(data)) {
        return false;
      } else {
        payload.issues.push({
          code: "invalid_value",
          expected: "stringbool",
          values: [...truthySet, ...falsySet],
          input: payload.value,
          inst: codec,
          continue: false
        });
        return {};
      }
    },
    reverseTransform: (input, _payload) => {
      if (input === true) {
        return truthyArray[0] || "true";
      } else {
        return falsyArray[0] || "false";
      }
    },
    error: params.error
  });
  codec._zod.bag.truthy = truthyArray;
  codec._zod.bag.falsy = falsyArray;
  codec._zod.bag.case = params.case ?? "insensitive";
  return codec;
}
function _stringFormat(Class, format, fnOrRegex, _params = {}) {
  const params = normalizeParams(_params);
  const def = {
    check: "string_format",
    type: "string",
    format,
    fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
    ...params
  };
  if (fnOrRegex instanceof RegExp) {
    def.pattern = fnOrRegex;
  }
  const inst = new Class(def);
  return inst;
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/to-json-schema.js
function assignProps(target, ...sources) {
  for (const source of sources) {
    for (const key of Reflect.ownKeys(source)) {
      if (Object.prototype.propertyIsEnumerable.call(source, key)) {
        assignProp(target, key, source[key]);
      }
    }
  }
  return target;
}
function initializeContext(params) {
  let target = params?.target ?? "draft-2020-12";
  if (target === "draft-4")
    target = "draft-04";
  if (target === "draft-7")
    target = "draft-07";
  return {
    processors: params.processors ?? {},
    metadataRegistry: params?.metadata ?? globalRegistry,
    target,
    unrepresentable: params?.unrepresentable ?? "throw",
    override: params?.override ?? (() => {}),
    io: params?.io ?? "output",
    counter: 0,
    seen: new Map,
    sharedDefsExtractedFor: undefined,
    sharedEmitDoneFor: undefined,
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    intersections: [],
    deferred: [],
    external: params?.external ?? undefined
  };
}
function handleUnrepresentable(schema, ctx, json, params, message) {
  const result = typeof ctx.unrepresentable === "function" ? ctx.unrepresentable({ zodSchema: schema, path: params.path, message }) : ctx.unrepresentable;
  if (result === "any")
    return false;
  if (result === undefined || result === "throw")
    throw new Error(message);
  Object.assign(json, result);
  return true;
}
function processSchema(schema, ctx, _params = { path: [], schemaPath: [] }) {
  var _a;
  const def = schema._zod.def;
  const seen = ctx.seen.get(schema);
  if (seen) {
    seen.count++;
    const isCycle = _params.schemaPath.includes(schema);
    if (isCycle) {
      seen.cycle = _params.path;
    }
    return seen.schema;
  }
  const result = { schema: {}, count: 1, cycle: undefined, path: _params.path };
  ctx.seen.set(schema, result);
  ctx.sharedDefsExtractedFor = undefined;
  ctx.sharedEmitDoneFor = undefined;
  const overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema) {
    result.schema = overrideSchema;
  } else {
    const params = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path
    };
    if (schema._zod.processJSONSchema) {
      schema._zod.processJSONSchema(ctx, result.schema, params);
    } else {
      const _json = result.schema;
      const processor = ctx.processors[def.type];
      if (!processor) {
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
      }
      processor(schema, ctx, _json, params);
    }
    const parent = schema._zod.parent;
    if (parent) {
      if (!result.ref)
        result.ref = parent;
      processSchema(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta = ctx.metadataRegistry.get(schema);
  if (meta)
    assignProps(result.schema, meta);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && "_prefault" in result.schema)
    (_a = result.schema).default ?? (_a.default = result.schema._prefault);
  delete result.schema._prefault;
  const _result = ctx.seen.get(schema);
  return _result.schema;
}
function encodeJSONPointerSegment(segment) {
  return segment.replace(/~/g, "~0").replace(/\//g, "~1");
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external)
    return;
  const idToSchema = new Map;
  for (const entry of ctx.seen.entries()) {
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      const existing = idToSchema.get(id);
      if (existing && existing !== entry[0]) {
        throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      }
      idToSchema.set(id, entry[0]);
    }
  }
  const makeURI = (entry) => {
    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      const externalId = ctx.external.registry.get(entry[0])?.id;
      const uriGenerator = ctx.external.uri ?? ((id) => id);
      if (externalId) {
        return { ref: uriGenerator(externalId) };
      }
      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
      entry[1].defId = id;
      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}` };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    if (entry[1] === root && !entry[1].schema.id) {
      return { ref: uriPrefix };
    }
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + encodeJSONPointerSegment(defId) };
  };
  const extractToDef = (entry) => {
    if (entry[1].schema.$ref) {
      return;
    }
    const seen = entry[1];
    const { ref, defId } = makeURI(entry);
    seen.def = { ...seen.schema };
    if (defId)
      seen.defId = defId;
    const schema = seen.schema;
    for (const key in schema) {
      delete schema[key];
    }
    schema.$ref = ref;
  };
  if (ctx.cycles === "throw") {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.cycle) {
        throw new Error("Cycle detected: " + `#/${seen.cycle?.join("/")}/<root>` + '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.');
      }
    }
  }
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (schema === entry[0]) {
      extractToDef(entry);
      continue;
    }
    if (ctx.external) {
      const ext = ctx.external.registry.get(entry[0])?.id;
      if (schema !== entry[0] && ext) {
        extractToDef(entry);
        continue;
      }
    }
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      extractToDef(entry);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry);
      continue;
    }
    if (seen.count > 1) {
      if (ctx.reused === "ref") {
        extractToDef(entry);
      }
    }
  }
  if (ctx.external)
    ctx.sharedDefsExtractedFor = ctx.external;
}
function compactTypeUnion(schema) {
  const options = schema.anyOf;
  if (!Array.isArray(options) || options.length === 0 || schema.type !== undefined)
    return;
  const types = [];
  for (const option of options) {
    if (!option || typeof option !== "object")
      return;
    compactTypeUnion(option);
    const keys = Object.keys(option);
    if (keys.length !== 1 || keys[0] !== "type")
      return;
    const type = option.type;
    for (const member of Array.isArray(type) ? type : [type]) {
      if (typeof member !== "string")
        return;
      if (!types.includes(member))
        types.push(member);
    }
  }
  delete schema.anyOf;
  schema.type = types.length === 1 ? types[0] : types;
}
var FOLDABLE_KEYS = new Set(["type", "properties", "required", "additionalProperties"]);
var UNION_KEYS = ["oneOf", "anyOf"];
function undeclaredConstraint(member) {
  const extra = member.additionalProperties;
  if (extra === undefined || extra === false || typeof extra !== "object" || extra === null)
    return null;
  return Object.keys(extra).length ? extra : null;
}
function foldObjects(members) {
  const objects = [];
  for (const member of members) {
    if (typeof member !== "object" || member.type !== "object")
      return null;
    for (const key in member) {
      if (!FOLDABLE_KEYS.has(key))
        return null;
    }
    objects.push(member);
  }
  const properties = {};
  const required = new Set;
  for (const object of objects) {
    for (const key in object.properties) {
      if (Object.prototype.hasOwnProperty.call(properties, key))
        continue;
      const parts = [];
      for (const other of objects) {
        const part = other.properties?.[key] ?? undeclaredConstraint(other);
        if (part === null || part === undefined)
          continue;
        if (!parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part)))
          parts.push(part);
      }
      const merged = parts.length === 1 ? parts[0] : foldObjects(parts) ?? { allOf: parts };
      assignProp(properties, key, merged);
    }
    for (const key of object.required ?? [])
      required.add(key);
  }
  const folded = { type: "object", properties };
  if (required.size)
    folded.required = [...required];
  if (objects.every((object) => object.additionalProperties === false)) {
    folded.additionalProperties = false;
  } else {
    const constraints = [];
    for (const object of objects) {
      const constraint = undeclaredConstraint(object);
      if (constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint)))
        constraints.push(constraint);
    }
    if (constraints.length === 1)
      folded.additionalProperties = constraints[0];
    else if (constraints.length > 1)
      folded.additionalProperties = { allOf: constraints };
  }
  return folded;
}
function foldIntersection(json) {
  const allOf = json.allOf;
  if (!Array.isArray(allOf) || allOf.length < 2)
    return;
  for (const key of FOLDABLE_KEYS)
    if (key in json)
      return;
  const unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k])));
  let folded = null;
  if (!unions.length) {
    folded = foldObjects(allOf);
  } else {
    const union = unions[0];
    const keyword = UNION_KEYS.find((k) => Array.isArray(union[k]));
    if (Object.keys(union).length !== 1)
      return;
    const rest = allOf.filter((m) => m !== union);
    const branches = union[keyword].map((branch) => foldObjects([...rest, branch]));
    if (branches.some((b) => !b))
      return;
    folded = { [keyword]: branches };
  }
  if (!folded)
    return;
  delete json.allOf;
  assignProps(json, folded);
}
function finalize(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const flattenRef = (zodSchema) => {
    const seen = ctx.seen.get(zodSchema);
    if (seen.ref === null)
      return;
    const schema = seen.def ?? seen.schema;
    const _cached = { ...schema };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
        schema.allOf = schema.allOf ?? [];
        schema.allOf.push(refSchema);
      } else {
        assignProps(schema, refSchema);
      }
      assignProps(schema, _cached);
      const isParentRef = zodSchema._zod.parent === ref;
      if (isParentRef) {
        for (const key in schema) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (!(key in _cached)) {
            delete schema[key];
          }
        }
      }
      if (refSchema.$ref && refSeen.def) {
        for (const key in schema) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) {
            delete schema[key];
          }
        }
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) {
          for (const key in schema) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) {
              delete schema[key];
            }
          }
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema,
      path: seen.path ?? []
    });
  };
  if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
    for (const entry of [...ctx.seen.entries()].reverse()) {
      flattenRef(entry[0]);
    }
    if (ctx.target !== "openapi-3.0") {
      for (const entry of ctx.seen.entries()) {
        compactTypeUnion(entry[1].def ?? entry[1].schema);
      }
    }
    for (const rewrite of ctx.deferred)
      rewrite();
    if (ctx.intersections.length) {
      const carriers = new Map;
      for (const seen of ctx.seen.values()) {
        for (const json of [seen.schema, seen.def]) {
          const allOf = json?.allOf;
          if (!Array.isArray(allOf))
            continue;
          const existing = carriers.get(allOf);
          if (existing)
            existing.push(json);
          else
            carriers.set(allOf, [json]);
        }
      }
      for (const allOf of ctx.intersections) {
        for (const json of carriers.get(allOf) ?? [])
          foldIntersection(json);
      }
    }
  }
  const result = {};
  if (ctx.target === "draft-2020-12") {
    result.$schema = "https://json-schema.org/draft/2020-12/schema";
  } else if (ctx.target === "draft-07") {
    result.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (ctx.target === "draft-04") {
    result.$schema = "http://json-schema.org/draft-04/schema#";
  } else if (ctx.target === "openapi-3.0") {}
  if (ctx.external?.uri) {
    const id = ctx.external.registry.get(schema)?.id;
    if (!id)
      throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id);
  }
  assignProps(result, root.defId ? root.schema : root.def ?? root.schema);
  const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
  if (rootMetaId !== undefined && result.id === rootMetaId)
    delete result.id;
  const defs = ctx.external?.defs ?? {};
  if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.def && seen.defId) {
        if (seen.def.id === seen.defId)
          delete seen.def.id;
        assignProp(defs, seen.defId, seen.def);
      }
    }
  }
  if (ctx.external)
    ctx.sharedEmitDoneFor = ctx.external;
  if (ctx.external) {} else {
    if (Object.keys(defs).length > 0) {
      if (ctx.target === "draft-2020-12") {
        result.$defs = defs;
      } else {
        result.definitions = defs;
      }
    }
  }
  try {
    const finalized = JSON.parse(JSON.stringify(result));
    Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
        }
      },
      enumerable: false,
      writable: false
    });
    return finalized;
  } catch (_err) {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: new Set };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const def = _schema._zod.def;
  if (def.type === "transform")
    return true;
  if (def.type === "array")
    return isTransforming(def.element, ctx);
  if (def.type === "set")
    return isTransforming(def.valueType, ctx);
  if (def.type === "lazy")
    return isTransforming(def.getter(), ctx);
  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault" || def.type === "catch") {
    return isTransforming(def.innerType, ctx);
  }
  if (def.type === "intersection") {
    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  }
  if (def.type === "record" || def.type === "map") {
    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  }
  if (def.type === "pipe") {
    if (_schema._zod.traits.has("$ZodCodec"))
      return true;
    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
  }
  if (def.type === "object") {
    for (const key in def.shape) {
      if (isTransforming(def.shape[key], ctx))
        return true;
    }
    return false;
  }
  if (def.type === "union") {
    for (const option of def.options) {
      if (isTransforming(option, ctx))
        return true;
    }
    return false;
  }
  if (def.type === "tuple") {
    for (const item of def.items) {
      if (isTransforming(item, ctx))
        return true;
    }
    if (def.rest && isTransforming(def.rest, ctx))
      return true;
    return false;
  }
  return false;
}
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
  const ctx = initializeContext({ ...params, processors });
  processSchema(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
  const { libraryOptions, target } = params ?? {};
  const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
  processSchema(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/json-schema-processors.js
var narrowMin = (agg, key, value) => {
  if (agg[key] === undefined || value > agg[key])
    agg[key] = value;
};
var narrowMax = (agg, key, value) => {
  if (agg[key] === undefined || value < agg[key])
    agg[key] = value;
};
var narrowBoth = (agg, value) => {
  narrowMin(agg, "minimum", value);
  narrowMax(agg, "maximum", value);
};
var addDivisor = (agg, value) => {
  agg.multipleOf ?? (agg.multipleOf = []);
  if (!agg.multipleOf.includes(value))
    agg.multipleOf.push(value);
};
var addPattern = (agg, pattern) => {
  agg.patterns ?? (agg.patterns = new Set);
  agg.patterns.add(pattern);
};
var intersectMime = (agg, mime) => {
  agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
};
var setFormat = (agg, format) => {
  agg.format = format;
  if (format.includes("int"))
    agg.isInt = true;
};
var minContributor = (agg, def) => narrowMin(agg, "minimum", def.minimum);
var maxContributor = (agg, def) => narrowMax(agg, "maximum", def.maximum);
var formatContributor = (ranges) => (agg, def) => {
  setFormat(agg, def.format);
  const [minimum, maximum] = ranges[def.format];
  narrowMin(agg, "minimum", minimum);
  narrowMax(agg, "maximum", maximum);
};
var contributors = {
  greater_than: (agg, def) => narrowMin(agg, def.inclusive ? "minimum" : "exclusiveMinimum", def.value),
  less_than: (agg, def) => narrowMax(agg, def.inclusive ? "maximum" : "exclusiveMaximum", def.value),
  multiple_of: (agg, def) => addDivisor(agg, def.value),
  number_format: formatContributor(NUMBER_FORMAT_RANGES),
  bigint_format: formatContributor(BIGINT_FORMAT_RANGES),
  min_length: minContributor,
  max_length: maxContributor,
  length_equals: (agg, def) => narrowBoth(agg, def.length),
  min_size: minContributor,
  max_size: maxContributor,
  size_equals: (agg, def) => narrowBoth(agg, def.size),
  string_format: (agg, def) => {
    setFormat(agg, def.format);
    if (def.pattern)
      addPattern(agg, def.pattern);
    if (def.format === "base64" || def.format === "base64url")
      agg.contentEncoding = def.format;
    if (def.local || def.precision === -1)
      agg.laxFormat = true;
  },
  mime_type: (agg, def) => intersectMime(agg, def.mime)
};
function aggregateChecks(schema) {
  const agg = {};
  const def = schema._zod.def;
  const list = schema._zod.traits.has("$ZodCheck") ? [schema, ...def.checks ?? []] : def.checks ?? [];
  for (const ch of list)
    contributors[ch._zod.def.check]?.(agg, ch._zod.def);
  const bag = schema._zod.bag;
  if (bag.minimum !== undefined)
    narrowMin(agg, "minimum", bag.minimum);
  if (bag.exclusiveMinimum !== undefined)
    narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum);
  if (bag.maximum !== undefined)
    narrowMax(agg, "maximum", bag.maximum);
  if (bag.exclusiveMaximum !== undefined)
    narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum);
  if (bag.multipleOf !== undefined)
    addDivisor(agg, bag.multipleOf);
  if (bag.format !== undefined) {
    agg.format ?? (agg.format = bag.format);
    if (bag.format.includes("int"))
      agg.isInt = true;
  }
  if (bag.mime)
    intersectMime(agg, bag.mime);
  for (const pattern of bag.patterns ?? [])
    addPattern(agg, pattern);
  return agg;
}
var formatMap = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
};
var exactPatterns = new Map([
  [base64Charset, base64],
  [base64urlCharset, base64url]
]);
var exactPattern = (p) => exactPatterns.get(p) ?? p;
var stringProcessor = (schema, ctx, _json, _params) => {
  const json = _json;
  json.type = "string";
  const { minimum, maximum, format, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
  if (typeof minimum === "number")
    json.minLength = minimum;
  if (typeof maximum === "number")
    json.maxLength = maximum;
  if (format) {
    json.format = formatMap[format] ?? format;
    if (json.format === "")
      delete json.format;
    if (format === "time" || laxFormat) {
      delete json.format;
    }
  }
  if (contentEncoding)
    json.contentEncoding = contentEncoding;
  if (patterns && patterns.size > 0) {
    const patternList = [...patterns].map(exactPattern);
    if (patternList.length === 1)
      json.pattern = patternList[0].source;
    else if (patternList.length > 1) {
      json.allOf = [
        ...patternList.map((regex) => ({
          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
          pattern: regex.source
        }))
      ];
    }
  }
};
var numberProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const { minimum, maximum, multipleOf, exclusiveMaximum, exclusiveMinimum, isInt } = aggregateChecks(schema);
  json.type = isInt ? "integer" : "number";
  const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
  const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
  const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
  if (exMin) {
    if (legacy) {
      json.minimum = exclusiveMinimum;
      json.exclusiveMinimum = true;
    } else {
      json.exclusiveMinimum = exclusiveMinimum;
    }
  } else if (typeof minimum === "number") {
    json.minimum = minimum;
  }
  if (exMax) {
    if (legacy) {
      json.maximum = exclusiveMaximum;
      json.exclusiveMaximum = true;
    } else {
      json.exclusiveMaximum = exclusiveMaximum;
    }
  } else if (typeof maximum === "number") {
    json.maximum = maximum;
  }
  if (multipleOf) {
    const divisors = new Set;
    for (const divisor of multipleOf) {
      if (Number.isFinite(divisor) && divisor !== 0)
        divisors.add(Math.abs(divisor));
      else
        handleUnrepresentable(schema, ctx, json, params, `A multipleOf divisor of ${divisor} cannot be represented in JSON Schema`);
    }
    const [first, ...rest] = divisors;
    if (first !== undefined)
      json.multipleOf = first;
    if (rest.length)
      json.allOf = [...json.allOf ?? [], ...rest.map((m) => ({ multipleOf: m }))];
  }
};
var booleanProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var bigintProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "BigInt cannot be represented in JSON Schema");
};
var symbolProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Symbols cannot be represented in JSON Schema");
};
var nullProcessor = (_schema, ctx, json, _params) => {
  if (ctx.target === "openapi-3.0") {
    json.type = "string";
    json.nullable = true;
    json.enum = [null];
  } else {
    json.type = "null";
  }
};
var undefinedProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Undefined cannot be represented in JSON Schema");
};
var voidProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Void cannot be represented in JSON Schema");
};
var neverProcessor = (_schema, _ctx, json, _params) => {
  json.not = {};
};
var anyProcessor = (_schema, _ctx, _json, _params) => {};
var unknownProcessor = (_schema, _ctx, _json, _params) => {};
var dateProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Date cannot be represented in JSON Schema");
};
var enumProcessor = (schema, _ctx, json, _params) => {
  const def = schema._zod.def;
  const values = getEnumValues(def.entries);
  if (values.length === 0) {
    json.not = {};
    return;
  }
  if (values.every((v) => typeof v === "number"))
    json.type = "number";
  if (values.every((v) => typeof v === "string"))
    json.type = "string";
  json.enum = values;
};
var literalProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  if (def.values.length === 0) {
    json.not = {};
    return;
  }
  const vals = [];
  for (const val of def.values) {
    if (val === undefined) {
      if (handleUnrepresentable(schema, ctx, json, params, "Literal `undefined` cannot be represented in JSON Schema"))
        return;
    } else if (typeof val === "bigint") {
      if (handleUnrepresentable(schema, ctx, json, params, "BigInt literals cannot be represented in JSON Schema"))
        return;
      vals.push(Number(val));
    } else {
      vals.push(val);
    }
  }
  if (vals.length === 0) {} else if (vals.length === 1) {
    const val = vals[0];
    json.type = val === null ? "null" : typeof val;
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.enum = [val];
    } else {
      json.const = val;
    }
  } else {
    if (vals.every((v) => typeof v === "number"))
      json.type = "number";
    if (vals.every((v) => typeof v === "string"))
      json.type = "string";
    if (vals.every((v) => typeof v === "boolean"))
      json.type = "boolean";
    if (vals.every((v) => v === null))
      json.type = "null";
    json.enum = vals;
  }
};
var nanProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "NaN cannot be represented in JSON Schema");
};
var templateLiteralProcessor = (schema, _ctx, json, _params) => {
  const _json = json;
  const pattern = schema._zod.pattern;
  if (!pattern)
    throw new Error("Pattern not found in template literal");
  _json.type = "string";
  _json.pattern = pattern.source;
};
var fileProcessor = (schema, _ctx, json, _params) => {
  const _json = json;
  _json.type = "string";
  _json.format = "binary";
  _json.contentEncoding = "binary";
  const { minimum, maximum, mime } = aggregateChecks(schema);
  if (minimum !== undefined)
    _json.minLength = minimum;
  if (maximum !== undefined)
    _json.maxLength = maximum;
  if (!mime)
    return;
  if (mime.length === 0)
    _json.not = {};
  else if (mime.length === 1)
    _json.contentMediaType = mime[0];
  else
    _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
};
var successProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var customProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
};
var functionProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Function types cannot be represented in JSON Schema");
};
var transformProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
};
var mapProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Map cannot be represented in JSON Schema");
};
var setProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Set cannot be represented in JSON Schema");
};
var arrayProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  const { minimum, maximum } = aggregateChecks(schema);
  if (typeof minimum === "number")
    json.minItems = minimum;
  if (typeof maximum === "number")
    json.maxItems = maximum;
  json.type = "array";
  json.items = processSchema(def.element, ctx, {
    ...params,
    path: [...params.path, "items"]
  });
};
function inputOptin(schema) {
  const def = schema._zod.def;
  if (def.type === "pipe" && def.in._zod.traits.has("$ZodTransform")) {
    return inputOptin(def.out);
  }
  if (def.type === "catch") {
    return inputOptin(def.innerType);
  }
  return schema._zod.optin;
}
var objectProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  const shape = def.shape;
  const symbolKeys = Object.getOwnPropertySymbols(shape);
  if (symbolKeys.length && handleUnrepresentable(schema, ctx, json, params, "Symbol keys cannot be represented in JSON Schema")) {
    return;
  }
  json.type = "object";
  json.properties = {};
  for (const key in shape) {
    assignProp(json.properties, key, processSchema(shape[key], ctx, {
      ...params,
      path: [...params.path, "properties", key]
    }));
  }
  const requiredKeys = [];
  for (const key of Object.keys(shape)) {
    const field = def.shape[key];
    if (ctx.io === "input" ? inputOptin(field) === undefined : field._zod.optout === undefined) {
      requiredKeys.push(key);
    }
  }
  if (requiredKeys.length > 0) {
    json.required = requiredKeys;
  }
  if (def.catchall?._zod.def.type === "never") {
    json.additionalProperties = false;
  } else if (!def.catchall) {
    if (ctx.io === "output")
      json.additionalProperties = false;
  } else if (def.catchall) {
    json.additionalProperties = processSchema(def.catchall, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
};
var unionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const isExclusive = def.inclusive === false;
  const options = def.options.map((x, i) => processSchema(x, ctx, {
    ...params,
    path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
  }));
  if (isExclusive) {
    json.oneOf = options;
  } else {
    json.anyOf = options;
  }
};
var intersectionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const a = processSchema(def.left, ctx, {
    ...params,
    path: [...params.path, "allOf", 0]
  });
  const b = processSchema(def.right, ctx, {
    ...params,
    path: [...params.path, "allOf", 1]
  });
  const isSimpleIntersection = (val) => ("allOf" in val) && Object.keys(val).length === 1;
  const allOf = [
    ...isSimpleIntersection(a) ? a.allOf : [a],
    ...isSimpleIntersection(b) ? b.allOf : [b]
  ];
  json.allOf = allOf;
  ctx.intersections.push(allOf);
};
var tupleProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "array";
  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
  const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
  const prefixItems = def.items.map((x, i) => processSchema(x, ctx, {
    ...params,
    path: [...params.path, prefixPath, i]
  }));
  const rest = def.rest ? processSchema(def.rest, ctx, {
    ...params,
    path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
  }) : null;
  let minItems = def.items.length;
  while (minItems > 0) {
    const item = def.items[minItems - 1];
    const optional = ctx.io === "input" ? inputOptin(item) !== undefined : item._zod.optout === "optional";
    if (!optional)
      break;
    minItems--;
  }
  const maxItems = def.items.length;
  const isClosed = !def.rest;
  if (ctx.target === "draft-2020-12") {
    json.prefixItems = prefixItems;
    if (isClosed) {
      json.items = false;
    } else if (rest) {
      json.items = rest;
    }
    if (minItems > 0)
      json.minItems = minItems;
    if (isClosed)
      json.maxItems = maxItems;
  } else if (ctx.target === "openapi-3.0") {
    json.items = {
      anyOf: prefixItems
    };
    if (rest) {
      json.items.anyOf.push(rest);
    }
    if (minItems > 0)
      json.minItems = minItems;
    if (isClosed)
      json.maxItems = maxItems;
  } else {
    json.items = prefixItems;
    if (isClosed) {
      json.additionalItems = false;
    } else if (rest) {
      json.additionalItems = rest;
    }
    if (minItems > 0)
      json.minItems = minItems;
    if (isClosed)
      json.maxItems = maxItems;
  }
  const { minimum, maximum } = aggregateChecks(schema);
  if (typeof minimum === "number")
    json.minItems = minimum;
  if (typeof maximum === "number")
    json.maxItems = maximum;
};
function stringifyKeyNames(bySchema, json, visited) {
  if (json.$ref) {
    if (visited.has(json))
      return json;
    visited.add(json);
    const def = bySchema.get(json)?.def;
    if (!def)
      return json;
    const inlined = stringifyKeyNames(bySchema, def, visited);
    return inlined === def ? json : inlined;
  }
  for (const keyword of ["anyOf", "oneOf"]) {
    const branches = json[keyword];
    if (!Array.isArray(branches))
      continue;
    const mapped = branches.map((branch) => stringifyKeyNames(bySchema, branch, visited));
    if (mapped.some((branch, i) => branch !== branches[i]))
      json = { ...json, [keyword]: mapped };
  }
  const types = Array.isArray(json.type) ? json.type : [json.type];
  const numericType = !types.includes("string") && types.some((t) => t === "number" || t === "integer");
  const values = json.enum ?? (json.const !== undefined ? [json.const] : undefined);
  if (!numericType && !values?.some((v) => typeof v === "number"))
    return json;
  const { minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf, format, id, ...rest } = json;
  if (rest.enum)
    rest.enum = rest.enum.map((v) => typeof v === "number" ? String(v) : v);
  else if (typeof rest.const === "number")
    rest.const = String(rest.const);
  if (!numericType)
    return rest;
  rest.type = "string";
  if (!values)
    rest.pattern = (types.includes("number") ? number : integer).source;
  return rest;
}
var pendingRecords = new WeakMap;
function rewriteKeyNames(ctx) {
  const bySchema = new Map;
  for (const entry of ctx.seen.values()) {
    if (entry.def && !bySchema.has(entry.schema))
      bySchema.set(entry.schema, entry);
  }
  const rewrites = new Map;
  for (const record of pendingRecords.get(ctx) ?? []) {
    const seen = ctx.seen.get(record);
    const names = (seen?.def ?? seen?.schema)?.propertyNames;
    if (!names || names === true || rewrites.has(names))
      continue;
    const rewritten = stringifyKeyNames(bySchema, names, new Set);
    if (rewritten !== names)
      rewrites.set(names, rewritten);
  }
  if (!rewrites.size)
    return;
  for (const entry of ctx.seen.values()) {
    for (const carrier of [entry.schema, entry.def]) {
      const rewritten = carrier && rewrites.get(carrier.propertyNames);
      if (rewritten)
        carrier.propertyNames = rewritten;
    }
  }
}
var recordProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "object";
  const keyType = def.keyType;
  const patterns = aggregateChecks(keyType).patterns;
  if (def.mode === "loose" && patterns && patterns.size > 0) {
    const valueSchema = processSchema(def.valueType, ctx, {
      ...params,
      path: [...params.path, "patternProperties", "*"]
    });
    json.patternProperties = {};
    for (const pattern of patterns) {
      assignProp(json.patternProperties, exactPattern(pattern).source, valueSchema);
    }
  } else {
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json.propertyNames = processSchema(def.keyType, ctx, {
        ...params,
        path: [...params.path, "propertyNames"]
      });
      let pending = pendingRecords.get(ctx);
      if (!pending) {
        pending = [];
        pendingRecords.set(ctx, pending);
        ctx.deferred.push(() => rewriteKeyNames(ctx));
      }
      pending.push(schema);
    }
    json.additionalProperties = processSchema(def.valueType, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
  const keyValues = keyType._zod.values;
  const omittableOnInput = ctx.io === "input" && inputOptin(def.valueType) !== undefined;
  if (keyValues && !def.partial && !omittableOnInput) {
    const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
    if (validKeyValues.length > 0) {
      json.required = validKeyValues.map(String);
    }
  }
};
var nullableProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const inner = processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  if (ctx.target === "openapi-3.0") {
    seen.ref = def.innerType;
    json.nullable = true;
  } else {
    json.anyOf = [inner, { type: "null" }];
  }
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var UNREPRESENTABLE_DEFAULT = Symbol();
function serializeDefaultValue(value, schema, ctx, json, params) {
  let unrepresentable = false;
  const serialized = JSON.stringify(value, (_, val) => {
    if (typeof val !== "bigint")
      return val;
    unrepresentable = true;
    return null;
  });
  if (!unrepresentable)
    return JSON.parse(serialized);
  handleUnrepresentable(schema, ctx, json, params, "BigInt defaults cannot be represented in JSON Schema");
  return UNREPRESENTABLE_DEFAULT;
}
var defaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
  if (value !== UNREPRESENTABLE_DEFAULT)
    json.default = value;
};
var prefaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  if (ctx.io !== "input")
    return;
  const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
  if (value !== UNREPRESENTABLE_DEFAULT)
    json._prefault = value;
};
var catchProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  let catchValue;
  try {
    catchValue = def.catchValue(undefined);
  } catch {
    handleUnrepresentable(schema, ctx, json, params, "Dynamic catch values are not supported in JSON Schema");
    return;
  }
  json.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  const inIsTransform = def.in._zod.traits.has("$ZodTransform");
  const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
  processSchema(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json.readOnly = true;
};
var promiseProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var optionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
  const innerType = schema._zod.innerType;
  processSchema(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var allProcessors = {
  string: stringProcessor,
  number: numberProcessor,
  boolean: booleanProcessor,
  bigint: bigintProcessor,
  symbol: symbolProcessor,
  null: nullProcessor,
  undefined: undefinedProcessor,
  void: voidProcessor,
  never: neverProcessor,
  any: anyProcessor,
  unknown: unknownProcessor,
  date: dateProcessor,
  enum: enumProcessor,
  literal: literalProcessor,
  nan: nanProcessor,
  template_literal: templateLiteralProcessor,
  file: fileProcessor,
  success: successProcessor,
  custom: customProcessor,
  function: functionProcessor,
  transform: transformProcessor,
  map: mapProcessor,
  set: setProcessor,
  array: arrayProcessor,
  object: objectProcessor,
  union: unionProcessor,
  intersection: intersectionProcessor,
  tuple: tupleProcessor,
  record: recordProcessor,
  nullable: nullableProcessor,
  nonoptional: nonoptionalProcessor,
  default: defaultProcessor,
  prefault: prefaultProcessor,
  catch: catchProcessor,
  pipe: pipeProcessor,
  readonly: readonlyProcessor,
  promise: promiseProcessor,
  optional: optionalProcessor,
  lazy: lazyProcessor
};
function toJSONSchema(input, params) {
  if ("_idmap" in input) {
    const registry = input;
    const ctx = initializeContext({ ...params, processors: allProcessors });
    const defs = {};
    for (const entry of registry._idmap.entries()) {
      const [_, schema] = entry;
      processSchema(schema, ctx);
    }
    const schemas = {};
    const external = {
      registry,
      uri: params?.uri,
      defs
    };
    ctx.external = external;
    for (const entry of registry._idmap.entries()) {
      const [key, schema] = entry;
      extractDefs(ctx, schema);
      assignProp(schemas, key, finalize(ctx, schema));
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const ctx = initializeContext({ ...params, processors: allProcessors });
  processSchema(input, ctx);
  extractDefs(ctx, input);
  return finalize(ctx, input);
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/core/json-schema-generator.js
class JSONSchemaGenerator {
  get metadataRegistry() {
    return this.ctx.metadataRegistry;
  }
  get target() {
    return this.ctx.target;
  }
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  get override() {
    return this.ctx.override;
  }
  get io() {
    return this.ctx.io;
  }
  get counter() {
    return this.ctx.counter;
  }
  set counter(value) {
    this.ctx.counter = value;
  }
  get seen() {
    return this.ctx.seen;
  }
  constructor(params) {
    let normalizedTarget = params?.target ?? "draft-2020-12";
    if (normalizedTarget === "draft-4")
      normalizedTarget = "draft-04";
    if (normalizedTarget === "draft-7")
      normalizedTarget = "draft-07";
    this.ctx = initializeContext({
      processors: allProcessors,
      target: normalizedTarget,
      ...params?.metadata && { metadata: params.metadata },
      ...params?.unrepresentable && { unrepresentable: params.unrepresentable },
      ...params?.override && { override: params.override },
      ...params?.io && { io: params.io }
    });
  }
  process(schema, _params = { path: [], schemaPath: [] }) {
    return processSchema(schema, this.ctx, _params);
  }
  emit(schema, _params) {
    if (_params) {
      if (_params.cycles)
        this.ctx.cycles = _params.cycles;
      if (_params.reused)
        this.ctx.reused = _params.reused;
      if (_params.external)
        this.ctx.external = _params.external;
    }
    this.ctx.sharedDefsExtractedFor = undefined;
    this.ctx.sharedEmitDoneFor = undefined;
    extractDefs(this.ctx, schema);
    const result = finalize(this.ctx, schema);
    const { "~standard": _, ...plainResult } = result;
    return plainResult;
  }
}
// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/classic/errors.js
var _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function _lazyMethod(proto, key, make) {
  Object.defineProperty(proto, key, {
    configurable: true,
    enumerable: false,
    get() {
      const value = make(this);
      Object.defineProperty(this, key, { value, configurable: true, writable: true });
      return value;
    },
    set(value) {
      Object.defineProperty(this, key, { value, configurable: true, writable: true });
    }
  });
}
var initializer2 = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  const proto = Object.getPrototypeOf(inst);
  if (_installedErrorProtos.has(proto))
    return;
  _installedErrorProtos.add(proto);
  _lazyMethod(proto, "format", (self) => (mapper) => formatError(self, mapper));
  _lazyMethod(proto, "flatten", (self) => (mapper) => flattenError(self, mapper));
  _lazyMethod(proto, "addIssue", (self) => (issue) => {
    self.issues.push(issue);
    self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
  });
  _lazyMethod(proto, "addIssues", (self) => (issues) => {
    self.issues.push(...issues);
    self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
  });
  Object.defineProperty(proto, "isEmpty", {
    configurable: true,
    enumerable: false,
    get() {
      return this.issues.length === 0;
    }
  });
};
var ZodRealError = /* @__PURE__ */ $constructor("ZodError", initializer2, undefined, {
  Parent: Error
});

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/classic/parse.js
var parse3 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode2 = /* @__PURE__ */ _encode(ZodRealError);
var decode2 = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// ../../node_modules/.bun/zod@4.6.5/node_modules/zod/v4/classic/schemas.js
function _ensureDefaultLocale() {
  if (!globalConfig.localeError)
    config(en_default());
}
function _ensureDefaultMemoizer() {
  if (!globalConfig.memoizer)
    config({ memoizer: memoizer() });
}
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  _ensureDefaultLocale();
  $ZodType.init(inst, def);
  inst.def = def;
  inst.type = def.type;
  return inst;
}, {
  check(...chks) {
    const def = this.def;
    return this.clone(mergeDefs(def, {
      checks: [
        ...def.checks ?? [],
        ...chks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
      ]
    }), { parent: true });
  },
  with(...chks) {
    return this.check(...chks);
  },
  clone(def, params) {
    return clone(this, def, params);
  },
  brand() {
    return this;
  },
  register(reg, meta) {
    reg.add(this, meta);
    return this;
  },
  refine(check, params) {
    return this.check(refine(check, params));
  },
  superRefine(refinement, params) {
    return this.check(superRefine(refinement, params));
  },
  overwrite(fn) {
    return this.check(_overwrite(fn));
  },
  optional() {
    return optional(this);
  },
  exactOptional() {
    return exactOptional(this);
  },
  nullable() {
    return nullable(this);
  },
  nullish() {
    return optional(nullable(this));
  },
  nonoptional(params) {
    return nonoptional(this, params);
  },
  array() {
    return array(this);
  },
  or(arg) {
    return union([this, arg]);
  },
  and(arg) {
    return intersection(this, arg);
  },
  transform(tx) {
    return pipe(this, transform(tx));
  },
  default(d) {
    return _default2(this, d);
  },
  prefault(d) {
    return prefault(this, d);
  },
  catch(params) {
    return _catch2(this, params);
  },
  pipe(target) {
    return pipe(this, target);
  },
  readonly() {
    return readonly(this);
  },
  describe(description) {
    const cl = this.clone();
    globalRegistry.add(cl, { description });
    return cl;
  },
  meta(...args) {
    if (args.length === 0)
      return globalRegistry.get(this);
    const cl = this.clone();
    globalRegistry.add(cl, args[0]);
    return cl;
  },
  isOptional() {
    return this.safeParse(undefined).success;
  },
  isNullable() {
    return this.safeParse(null).success;
  },
  apply(fn, ...args) {
    return args.length === 0 ? fn(this) : fn(this, ...args);
  },
  get "~standard"() {
    return hide(this, "~standard", {
      ...standardProps(this),
      jsonSchema: {
        input: createStandardJSONSchemaMethod(this, "input"),
        output: createStandardJSONSchemaMethod(this, "output")
      }
    });
  },
  set "~standard"(value) {
    own(this, "~standard", value);
  },
  parse: function _parse(data, params) {
    return parse3(this, data, params, { callee: _parse });
  },
  parseAsync: async function _parseAsync(data, params) {
    return await parseAsync2(this, data, params, { callee: _parseAsync });
  },
  safeParse(data, params) {
    return safeParse2(this, data, params);
  },
  async safeParseAsync(data, params) {
    return safeParseAsync2(this, data, params);
  },
  get spa() {
    return this?.safeParseAsync;
  },
  set spa(value) {
    own(this, "spa", value);
  },
  validate(data, params) {
    return validate(this, data, params);
  },
  validateAsync(data, params) {
    return validateAsync(this, data, params);
  },
  encode: function _encode(data, params) {
    return encode2(this, data, params, { callee: _encode });
  },
  decode: function _decode(data, params) {
    return decode2(this, data, params, { callee: _decode });
  },
  encodeAsync: async function _encodeAsync(data, params) {
    return await encodeAsync2(this, data, params, { callee: _encodeAsync });
  },
  decodeAsync: async function _decodeAsync(data, params) {
    return await decodeAsync2(this, data, params, { callee: _decodeAsync });
  },
  safeEncode(data, params) {
    return safeEncode2(this, data, params);
  },
  safeDecode(data, params) {
    return safeDecode2(this, data, params);
  },
  async safeEncodeAsync(data, params) {
    return safeEncodeAsync2(this, data, params);
  },
  async safeDecodeAsync(data, params) {
    return safeDecodeAsync2(this, data, params);
  },
  toJSONSchema(params) {
    return createToJSONSchemaMethod(this, {})(params);
  },
  get description() {
    return globalRegistry.get(this)?.description;
  },
  get _def() {
    return this._zod.def;
  }
});
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
}, /* @__PURE__ */ derived({
  format: (inst) => aggregateChecks(inst).format ?? null,
  minLength: (inst) => aggregateChecks(inst).minimum ?? null,
  maxLength: (inst) => aggregateChecks(inst).maximum ?? null
}, {
  regex(...args) {
    return this.check(_regex(...args));
  },
  includes(...args) {
    return this.check(_includes(...args));
  },
  startsWith(...args) {
    return this.check(_startsWith(...args));
  },
  endsWith(...args) {
    return this.check(_endsWith(...args));
  },
  min(...args) {
    return this.check(_minLength(...args));
  },
  max(...args) {
    return this.check(_maxLength(...args));
  },
  length(...args) {
    return this.check(_length(...args));
  },
  nonempty(...args) {
    return this.check(_minLength(1, ...args));
  },
  lowercase(params) {
    return this.check(_lowercase(params));
  },
  uppercase(params) {
    return this.check(_uppercase(params));
  },
  trim() {
    return this.check(_trim());
  },
  normalize(...args) {
    return this.check(_normalize(...args));
  },
  toLowerCase() {
    return this.check(_toLowerCase());
  },
  toUpperCase() {
    return this.check(_toUpperCase());
  },
  slugify() {
    return this.check(_slugify());
  }
}));
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
}, {
  email(params) {
    return this.check(_email(ZodEmail, params));
  },
  url(params) {
    return this.check(_url(ZodURL, params));
  },
  jwt(params) {
    return this.check(_jwt(ZodJWT, params));
  },
  emoji(params) {
    return this.check(_emoji2(ZodEmoji, params));
  },
  guid(params) {
    return this.check(_guid(ZodGUID, params));
  },
  uuid(params) {
    return this.check(_uuid(ZodUUID, params));
  },
  uuidv4(params) {
    return this.check(_uuidv4(ZodUUID, params));
  },
  uuidv6(params) {
    return this.check(_uuidv6(ZodUUID, params));
  },
  uuidv7(params) {
    return this.check(_uuidv7(ZodUUID, params));
  },
  nanoid(params) {
    return this.check(_nanoid(ZodNanoID, params));
  },
  cuid(params) {
    return this.check(_cuid(ZodCUID, params));
  },
  cuid2(params) {
    return this.check(_cuid2(ZodCUID2, params));
  },
  ulid(params) {
    return this.check(_ulid(ZodULID, params));
  },
  base64(params) {
    return this.check(_base64(ZodBase64, params));
  },
  base64url(params) {
    return this.check(_base64url(ZodBase64URL, params));
  },
  xid(params) {
    return this.check(_xid(ZodXID, params));
  },
  ksuid(params) {
    return this.check(_ksuid(ZodKSUID, params));
  },
  ipv4(params) {
    return this.check(_ipv4(ZodIPv4, params));
  },
  ipv6(params) {
    return this.check(_ipv6(ZodIPv6, params));
  },
  cidrv4(params) {
    return this.check(_cidrv4(ZodCIDRv4, params));
  },
  cidrv6(params) {
    return this.check(_cidrv6(ZodCIDRv6, params));
  },
  e164(params) {
    return this.check(_e164(ZodE164, params));
  },
  datetime(params) {
    return this.check(_isoDateTime(ZodISODateTime, params));
  },
  date(params) {
    return this.check(_isoDate(ZodISODate, params));
  },
  time(params) {
    return this.check(_isoTime(ZodISOTime, params));
  },
  duration(params) {
    return this.check(_isoDuration(ZodISODuration, params));
  }
});
function string2(params) {
  return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
  inst.isFinite = true;
}, /* @__PURE__ */ derived({
  minValue: (inst) => {
    const { minimum, exclusiveMinimum } = aggregateChecks(inst);
    return Math.max(minimum ?? Number.NEGATIVE_INFINITY, exclusiveMinimum ?? Number.NEGATIVE_INFINITY);
  },
  maxValue: (inst) => {
    const { maximum, exclusiveMaximum } = aggregateChecks(inst);
    return Math.min(maximum ?? Number.POSITIVE_INFINITY, exclusiveMaximum ?? Number.POSITIVE_INFINITY);
  },
  isInt: (inst) => {
    const { isInt, multipleOf } = aggregateChecks(inst);
    return !!isInt || !!multipleOf?.some(Number.isSafeInteger);
  },
  format: (inst) => aggregateChecks(inst).format ?? null
}, {
  gt(value, params) {
    return this.check(_gt(value, params));
  },
  gte(value, params) {
    return this.check(_gte(value, params));
  },
  min(value, params) {
    return this.check(_gte(value, params));
  },
  lt(value, params) {
    return this.check(_lt(value, params));
  },
  lte(value, params) {
    return this.check(_lte(value, params));
  },
  max(value, params) {
    return this.check(_lte(value, params));
  },
  int(params) {
    return this.check(int(params));
  },
  safe(params) {
    return this.check(int(params));
  },
  positive(params) {
    return this.check(_gt(0, params));
  },
  nonnegative(params) {
    return this.check(_gte(0, params));
  },
  negative(params) {
    return this.check(_lt(0, params));
  },
  nonpositive(params) {
    return this.check(_lte(0, params));
  },
  multipleOf(value, params) {
    return this.check(_multipleOf(value, params));
  },
  step(value, params) {
    return this.check(_multipleOf(value, params));
  },
  finite() {
    return this;
  }
}));
function number2(params) {
  return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean2(params) {
  return _boolean(ZodBoolean, params);
}
var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nullProcessor(inst, ctx, json, params);
});
function _null3(params) {
  return _null2(ZodNull, params);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unknownProcessor(inst, ctx, json, params);
});
function unknown() {
  return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
  return _never(ZodNever, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
  inst.element = def.element;
}, {
  min(n, params) {
    return this.check(_minLength(n, params));
  },
  nonempty(params) {
    return this.check(_minLength(1, params));
  },
  max(n, params) {
    return this.check(_maxLength(n, params));
  },
  length(n, params) {
    return this.check(_length(n, params));
  },
  unwrap() {
    return this.element;
  }
});
function array(element, params) {
  return _array(ZodArray, element, params);
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
  installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
}, {
  keyof() {
    return _enum2(Object.keys(this._zod.def.shape));
  },
  catchall(catchall) {
    return this.clone(mergeDefs(this._zod.def, { catchall }));
  },
  passthrough() {
    return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
  },
  loose() {
    return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
  },
  strict() {
    return this.clone(mergeDefs(this._zod.def, { catchall: never() }));
  },
  strip() {
    return this.clone(mergeDefs(this._zod.def, { catchall: undefined }));
  },
  extend(incoming) {
    return extend(this, incoming);
  },
  safeExtend(incoming) {
    return safeExtend(this, incoming);
  },
  merge(other) {
    return merge(this, other);
  },
  pick(mask) {
    return pick(this, mask);
  },
  omit(mask) {
    return omit(this, mask);
  },
  partial(...args) {
    return partial(ZodOptional, this, args[0]);
  },
  exactPartial(...args) {
    return partial(ZodExactOptional, this, args[0], "exactPartial");
  },
  required(...args) {
    return required(ZodNonOptional, this, args[0]);
  }
});
function strictObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: never(),
    ...normalizeParams(params)
  });
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right
  });
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodRecord.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
  if (!valueType || !valueType._zod) {
    return new ZodRecord({
      type: "record",
      keyType: string2(),
      valueType: keyType,
      ...normalizeParams(valueType)
    });
  }
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
  inst.enum = def.entries;
  inst.options = [...inst._zod.values];
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum2(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    }
  });
});
function literal(value, params) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodTransform.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
  inst._zod.parse = (payload, _ctx) => {
    if (_ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        if (!("input" in _issue))
          _issue.input = payload.value;
        _issue.inst ?? (_issue.inst = inst);
        payload.issues.push(issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output) => {
        payload.value = output;
        return payload;
      });
    }
    payload.value = output;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType
  });
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
  $ZodExactOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType
  });
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType
  });
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default2(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch2(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : constantCatch(catchValue)
  });
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
  });
}
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType
  });
}
var ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => lazyProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
  return new ZodLazy({
    type: "lazy",
    getter
  });
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
  return _superRefine(fn, params);
}
// ../core/src/component.ts
function defineKind(kind) {
  return { children: () => [], ids: () => [], ...kind };
}

// ../core/src/text.ts
var numbers = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });
function formatNumber(value, unit) {
  const formatted = numbers.format(value);
  if (!unit)
    return formatted;
  if (/^[$€£¥]$/.test(unit))
    return formatted.startsWith("-") ? `-${unit}${formatted.slice(1)}` : `${unit}${formatted}`;
  return unit === "%" ? `${formatted}%` : `${formatted} ${unit}`;
}
function cellText(value) {
  if (value === null || value === undefined)
    return "";
  return (typeof value === "number" ? numbers.format(value) : String(value)).replaceAll(`
`, " ");
}
function cell(value) {
  return cellText(value).replaceAll("|", "\\|");
}
function markdownTable(headers, rows) {
  const line = (cells) => `| ${cells.join(" | ")} |`;
  return [line(headers), line(headers.map(() => "---")), ...rows.map(line)].join(`
`);
}

// ../core/src/reading.ts
var READING_KINDS = ["exact", "atLeast", "estimate", "unknown"];
var made_ = new WeakSet;
function made(reading) {
  made_.add(reading);
  return Object.freeze(reading);
}
function toWire(value) {
  if (typeof value !== "object" || value === null)
    return value;
  if (made_.has(value)) {
    const reading = value;
    return reading.kind === "exact" ? reading.value : { ...reading };
  }
  if (Array.isArray(value))
    return value.map(toWire);
  return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, toWire(inner)]));
}
function finite(name, value) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`Reading.${name}(${value}): a reading needs a finite number; if the source couldn't be read, use Reading.unknown()`);
  }
  return value;
}
var Reading = {
  exact: (value) => made({ kind: "exact", value: finite("exact", value) }),
  atLeast: (value) => made({ kind: "atLeast", value: finite("atLeast", value) }),
  estimate: (value) => made({ kind: "estimate", value: finite("estimate", value) }),
  unknown: () => made({ kind: "unknown" })
};
function readingText(reading, options = {}) {
  switch (reading.kind) {
    case "exact":
      return numberText(reading.value, options);
    case "atLeast":
      return `at least ${numberText(reading.value, options)}`;
    case "estimate":
      return `about ${numberText(reading.value, options)}`;
    case "unknown":
      return "unknown";
    default:
      return never2(reading);
  }
}
var shownNumber = (value) => Number(value.toFixed(2)) + 0;
function numberText(value, options) {
  const shown = shownNumber(value);
  return `${options.signed && shown > 0 ? "+" : ""}${formatNumber(shown, options.unit)}`;
}
function never2(value) {
  throw new Error(`unhandled reading ${JSON.stringify(value)}`);
}
var KIND_LIST = READING_KINDS.map((kind) => `"${kind}"`).join(", ");
var readingObject = discriminatedUnion("kind", [
  strictObject({ kind: literal("exact"), value: number2() }),
  strictObject({ kind: literal("atLeast"), value: number2() }),
  strictObject({ kind: literal("estimate"), value: number2() }),
  strictObject({ kind: literal("unknown") })
]).meta({ id: "ReadingObject" });
function parseReading(input) {
  if (typeof input === "number") {
    return number2().safeParse(input).success ? { ok: true, reading: Reading.exact(input) } : { ok: false, message: `${String(input)} isn't a finite number; give a finite number, or {"kind":"unknown"} if the source couldn't be read` };
  }
  const verdict = readingObject.safeParse(input);
  if (verdict.success) {
    const object = verdict.data;
    switch (object.kind) {
      case "exact":
        return { ok: true, reading: Reading.exact(object.value) };
      case "atLeast":
        return { ok: true, reading: Reading.atLeast(object.value) };
      case "estimate":
        return { ok: true, reading: Reading.estimate(object.value) };
      case "unknown":
        return { ok: true, reading: Reading.unknown() };
      default:
        return never2(object);
    }
  }
  return { ok: false, message: refusal(input) };
}
function refusal(input) {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return `expected a number or a reading object like {"kind":"atLeast","value":216}; got ${describe2(input)}`;
  }
  const object = input;
  const kind = object.kind;
  if (kind === undefined)
    return `a reading object needs a "kind"; add "kind" (one of ${KIND_LIST}) or write a bare number for an exact one`;
  if (typeof kind !== "string" || !READING_KINDS.includes(kind)) {
    return `kind ${typeof kind === "string" ? `"${kind}"` : describe2(kind)} isn't a reading; use one of ${KIND_LIST}`;
  }
  if (kind === "unknown") {
    if ("value" in object)
      return `kind "unknown" has no value; remove value, or use kind "atLeast" or "estimate" if you have a number`;
    return extras(object, ["kind"]);
  }
  if (!("value" in object))
    return `kind "${kind}" needs a value; add "value" (a number), or use kind "unknown" if the source couldn't be read`;
  const value = object.value;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return `kind "${kind}" needs "value" to be a finite number, got ${describe2(value)}; fix it, or use kind "unknown" if the source couldn't be read`;
  }
  return extras(object, ["kind", "value"]);
}
function extras(object, allowed) {
  const keys = Object.keys(object).filter((key) => !allowed.includes(key));
  if (keys.length === 0)
    return `this isn't a reading the schema allows; use {"kind":"exact"|"atLeast"|"estimate","value":number} or {"kind":"unknown"}`;
  return `${keys.map((key) => `"${key}"`).join(", ")} ${keys.length === 1 ? "isn't a known prop" : "aren't known props"} of kind "${String(object.kind)}"; remove ${keys.length === 1 ? "it" : "them"}`;
}
function describe2(value) {
  if (value === null)
    return "null";
  if (Array.isArray(value))
    return "a list";
  if (typeof value === "string")
    return `the string "${value.slice(0, 20)}"`;
  if (typeof value === "number")
    return String(value);
  return typeof value === "object" ? "an object" : typeof value;
}
var wireReading = unknown().meta({ id: "Reading", description: "A number, or an object saying how sure it is." });
wireReading._zod.processJSONSchema = (ctx, json, params) => {
  json.anyOf = [{ type: "number" }, exports_core2.process(readingObject, ctx, { ...params, path: [...params.path, "anyOf", 1] })];
};
var reading = wireReading.transform((input, ctx) => {
  const parsed = parseReading(input);
  if (parsed.ok)
    return parsed.reading;
  ctx.issues.push({ code: "custom", message: parsed.message, input });
  return NEVER;
});
var readingSchema = () => reading;

// ../core/src/components/chart.ts
var SERIES_ROLES = ["primary", "baseline", "comparison"];
var POINT_PERIODS = ["complete", "partial"];
var Chart = defineKind({
  type: "Chart",
  summary: "A line or bar chart of one or more series, with optional markers.",
  writer: "code",
  schema: () => strictObject({
    type: literal("Chart"),
    kind: _enum2(["line", "bar"]),
    title: string2().optional(),
    unit: string2().optional(),
    series: array(strictObject({
      label: string2().min(1),
      role: _enum2(SERIES_ROLES).default("primary"),
      points: array(strictObject({ x: union([string2(), number2()]), y: readingSchema(), period: _enum2(POINT_PERIODS).optional() }).meta({ id: "ChartPoint" })).min(1, "a series needs at least one point")
    }).meta({ id: "ChartSeries" })).min(1, "a Chart needs at least one series"),
    annotations: array(strictObject({ at: union([string2(), number2()]), label: string2().min(1) }).meta({ id: "ChartAnnotation" })).default([])
  }).meta({ id: "Chart" }),
  toText: (props) => {
    const xs = [...new Set(props.series.flatMap((series) => series.points.map((point) => point.x)))];
    const headers = ["", ...props.series.map(headerOf)];
    const rows = xs.map((x) => [
      cell(x),
      ...props.series.map((series) => {
        const point = series.points.find((p) => p.x === x);
        return point ? cell(pointText(point)) : "";
      })
    ]);
    const about = [`${props.kind} chart`, props.unit].filter(Boolean).join(", ");
    const parts = [props.title ? `**${props.title}** (${about})` : `(${about})`, markdownTable(headers, rows)];
    if (props.annotations.length > 0) {
      parts.push(`Markers: ${props.annotations.map((a) => `${a.at}: ${a.label}`).join("; ")}`);
    }
    return parts.join(`

`);
  },
  example: {
    type: "Chart",
    kind: "line",
    title: "Visitors",
    unit: "visitors",
    series: [
      { label: "This week", role: "primary", points: [{ x: "Mon", y: Reading.exact(120) }, { x: "Tue", y: Reading.exact(180) }, { x: "Wed", y: Reading.exact(90) }] },
      { label: "Usual", role: "baseline", points: [{ x: "Mon", y: Reading.exact(110) }, { x: "Tue", y: Reading.exact(115) }, { x: "Wed", y: Reading.exact(105) }] }
    ],
    annotations: [{ at: "Tue", label: "New pricing page" }]
  }
});
function pointText(point) {
  const text = readingText(point.y);
  return point.period === "partial" && point.y.kind !== "unknown" ? `${text} so far` : text;
}
function headerOf(series) {
  return cell(series.role === "primary" ? series.label : `${series.label} (${series.role})`);
}

// ../core/src/components/choice.ts
var Choice = defineKind({
  type: "Choice",
  summary: "Buttons. Pressing one sends an event back to the agent.",
  writer: "anyone",
  schema: () => strictObject({
    type: literal("Choice"),
    id: string2().min(1),
    prompt: string2().optional(),
    options: array(strictObject({ id: string2().min(1), label: string2().min(1).max(40), emphasis: literal("primary").optional() }).meta({ id: "ChoiceOption" })).min(1, "a Choice needs at least one option"),
    repeat: _enum2(["once", "many"]).default("once")
  }).meta({ id: "Choice" }),
  toText: (props) => {
    const buttons = props.options.map((option) => `[${option.label}]`).join(" ");
    return props.prompt ? `${props.prompt}

${buttons}` : buttons;
  },
  ids: (props) => [props.id],
  example: {
    type: "Choice",
    id: "next-step",
    prompt: "What next?",
    options: [
      { id: "explore", label: "Start exploring", emphasis: "primary" },
      { id: "park", label: "Park" }
    ],
    repeat: "once"
  }
});

// ../core/src/components/flow.ts
var Flow = defineKind({
  type: "Flow",
  summary: "Steps joined by arrows: a process, a pipeline, how parts of a system connect.",
  writer: "anyone",
  schema: () => strictObject({
    type: literal("Flow"),
    steps: array(strictObject({ id: string2().min(1), label: string2().min(1), detail: string2().optional() }).meta({ id: "FlowStep" })).min(2, "a Flow needs at least two steps; use a Text for one"),
    links: array(strictObject({ from: string2(), to: string2(), label: string2().optional() }).meta({ id: "FlowLink" })).default([])
  }).superRefine((flow, ctx) => {
    const ids = new Set(flow.steps.map((step) => step.id));
    flow.links.forEach((link, index) => {
      for (const end of ["from", "to"]) {
        if (!ids.has(link[end])) {
          ctx.addIssue({
            code: "custom",
            path: ["links", index, end],
            message: `link points at step "${link[end]}", which doesn't exist; use one of ${[...ids].join(", ")}`
          });
        }
      }
    });
  }).meta({ id: "Flow" }),
  toText: (props) => {
    const label = new Map(props.steps.map((step) => [step.id, step.label]));
    const shape = props.links.length === 0 ? props.steps.map((step) => step.label).join(" → ") : props.links.map((link) => `${label.get(link.from)} → ${label.get(link.to)}${link.label ? ` (${link.label})` : ""}`).join(`
`);
    const details = props.steps.filter((step) => step.detail).map((step) => `- **${step.label}:** ${step.detail}`);
    return [shape, ...details.length ? [details.join(`
`)] : []].join(`

`);
  },
  example: {
    type: "Flow",
    steps: [
      { id: "model", label: "Model tokens" },
      { id: "tree", label: "Component tree", detail: "Validated against the core schemas" },
      { id: "render", label: "Renderer", detail: "One per surface" }
    ],
    links: []
  }
});

// ../core/src/components/form.ts
var Form = defineKind({
  type: "Form",
  summary: "A few inputs and a submit button. Submitting sends the values back to the agent.",
  writer: "anyone",
  schema: () => strictObject({
    type: literal("Form"),
    id: string2().min(1),
    fields: array(strictObject({
      id: string2().min(1),
      label: string2().min(1),
      input: _enum2(["text", "number", "select", "checkbox"]),
      options: array(string2().min(1)).optional(),
      required: boolean2().default(false)
    }).refine((field) => field.input !== "select" || (field.options?.length ?? 0) > 0, {
      message: 'a select field needs options; add an options list or use input: "text"',
      path: ["options"]
    }).meta({ id: "FormField" })).min(1, "a Form needs at least one field"),
    submitLabel: string2().min(1).max(40).default("Submit")
  }).meta({ id: "Form" }),
  toText: (props) => {
    const fields = props.fields.map((field) => {
      const choices = field.options ? `: ${field.options.join(", ")}` : "";
      return `- ${field.label} (${field.input}${field.required ? ", required" : ""}${choices})`;
    });
    return `Form:
${fields.join(`
`)}

[${props.submitLabel}]`;
  },
  ids: (props) => [props.id],
  example: {
    type: "Form",
    id: "new-idea",
    fields: [
      { id: "title", label: "Title", input: "text", required: true },
      { id: "source", label: "Source", input: "select", options: ["self", "client"], required: false }
    ],
    submitLabel: "Add idea"
  }
});

// ../core/src/components/group.ts
var heading = { type: "Text", markdown: "**Ideas inbox**" };
var count = { type: "Label", text: "3 open", tone: "neutral" };
var Group = defineKind({
  type: "Group",
  summary: "Holds other components in a row or a column.",
  writer: "anyone",
  schema: (node) => strictObject({
    type: literal("Group"),
    direction: _enum2(["row", "column"]).default("column"),
    children: array(node).min(1, "a Group needs at least one child")
  }).meta({ id: "Group" }),
  toText: (props, childText) => {
    const parts = props.children.map(childText);
    const allShort = parts.every((part) => !part.includes(`
`));
    return props.direction === "row" && allShort ? parts.join(" · ") : parts.join(`

`);
  },
  children: (props) => props.children,
  example: { type: "Group", direction: "row", children: [heading, count] }
});

// ../core/src/components/label.ts
var TONES = ["neutral", "positive", "warning", "critical", "muted"];
var tone = _enum2(TONES).meta({ id: "Tone" });
var Label = defineKind({
  type: "Label",
  summary: "A short tag with a tone, such as a status.",
  writer: "anyone",
  schema: () => strictObject({
    type: literal("Label"),
    text: string2().min(1).max(40, "a Label is a short tag; put longer text in a Text"),
    tone: tone.default("neutral")
  }).meta({ id: "Label" }),
  toText: (props) => `[${props.text}]`,
  example: { type: "Label", text: "parked", tone: "muted" }
});

// ../core/src/components/marks.ts
var MAX_MARKS = 200;
var markKindSchema = strictObject({ id: string2().min(1), label: string2().min(1), one: string2().min(1).optional() }).meta({ id: "MarkDeclaredKind" });
var markStateSchema = strictObject({ id: string2().min(1), label: string2().min(1), tone: tone.default("neutral") }).meta({ id: "MarkDeclaredState" });
var markSchema = strictObject({ kind: string2().min(1), state: string2().min(1).optional(), detail: string2().min(1).optional() }).meta({ id: "Mark" });
function checkKindsAndStates(kinds, states, issue) {
  if (kinds.length < 1 || kinds.length > 3)
    issue(["kinds"], `there are ${kinds.length} kinds; declare one to three (the first is drawn filled, the second hollow, the third as a ring)`);
  const seen = new Set;
  kinds.forEach((kind, i) => {
    if (seen.has(kind.id))
      issue(["kinds", i, "id"], `kind "${kind.id}" is declared twice; give each kind its own id`);
    seen.add(kind.id);
  });
  const seenStates = new Set;
  states.forEach((state, i) => {
    if (seenStates.has(state.id))
      issue(["states", i, "id"], `state "${state.id}" is declared twice; give each state its own id`);
    seenStates.add(state.id);
  });
}
function checkMarks(path, marks, unknown, kinds, states, issue) {
  if (unknown !== undefined && marks.length > 0) {
    issue([...path, "unknown"], `an unknown row has no marks (this one has ${marks.length} and says "${unknown}"); say why it is unknown or give its marks, never both`);
  }
  if (marks.length > MAX_MARKS) {
    issue([...path, "marks"], `${marks.length} marks is more than ${MAX_MARKS}; a count that large is a number, so use a Chart, or give the count in text (\`count\`, or a \`halo\`)`);
  }
  const kindIds = new Set(kinds.map((kind) => kind.id));
  const stateIds = new Set(states.map((state) => state.id));
  marks.forEach((mark, i) => {
    if (!kindIds.has(mark.kind))
      issue([...path, "marks", i, "kind"], `mark kind "${mark.kind}" isn't declared; use one of ${[...kindIds].join(", ")}`);
    if (mark.state !== undefined && !stateIds.has(mark.state)) {
      issue([...path, "marks", i, "state"], `mark state "${mark.state}" isn't declared; use one of ${stateIds.size ? [...stateIds].join(", ") : "none (this component declares no states)"}`);
    }
  });
}
function kindCounts(marks, kinds) {
  const parts = kinds.flatMap((kind) => {
    const n = marks.filter((mark) => mark.kind === kind.id).length;
    return n === 0 ? [] : [`${n} ${n === 1 && kind.one ? kind.one : kind.label}`];
  });
  return parts.length ? parts.join(", ") : "none";
}
function stateCounts(marks, states) {
  return states.map((state) => [state, marks.filter((mark) => mark.state === state.id).length]).filter(([, n]) => n > 0).map(([state, n]) => `${n} ${state.label}`).join(", ");
}
var SHAPES = ["filled", "hollow", "ring"];
function keyText(kinds) {
  const parts = kinds.map((kind, i) => `${kind.label} (${SHAPES[i] ?? "ring"})`);
  return `Marks are ${parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : parts[0]}.`;
}
function haloText(halo) {
  return `${halo.label} ${halo.n}${halo.detail ? ` (${halo.detail})` : ""}`;
}
var Marks = defineKind({
  type: "Marks",
  summary: "Rows of small marks, one per thing counted, each in a state: for counts small enough to show one by one.",
  writer: "code",
  schema: () => strictObject({
    type: literal("Marks"),
    kinds: array(markKindSchema),
    states: array(markStateSchema).default([]),
    rows: array(strictObject({
      label: string2().min(1),
      note: string2().min(1).optional(),
      marks: array(markSchema).default([]),
      halo: strictObject({ label: string2().min(1), n: number2().int().min(0), detail: string2().min(1).optional() }).meta({ id: "MarksHalo" }).optional(),
      unknown: string2().min(1).optional()
    }).meta({ id: "MarksRow" })).min(1, "Marks needs at least one row; use a Text to say there is nothing to show")
  }).superRefine((marks, ctx) => {
    const issue = (path, message) => ctx.addIssue({ code: "custom", path, message });
    checkKindsAndStates(marks.kinds, marks.states, issue);
    marks.rows.forEach((row, i) => checkMarks(["rows", i], row.marks, row.unknown, marks.kinds, marks.states, issue));
  }).meta({ id: "Marks" }),
  toText: (props) => {
    const lines = props.rows.map((row) => {
      const head = `- **${row.label}**${row.note ? ` (${row.note})` : ""}:`;
      if (row.unknown !== undefined)
        return `${head} unknown, ${row.unknown}`;
      const states = stateCounts(row.marks, props.states);
      const halo = row.halo ? `; ${haloText(row.halo)}` : "";
      return `${head} ${kindCounts(row.marks, props.kinds)}${states ? `: ${states}` : ""}${halo}`;
    });
    return [keyText(props.kinds), ...lines].join(`
`);
  },
  example: {
    type: "Marks",
    kinds: [{ id: "person", label: "people", one: "person" }],
    states: [
      { id: "touched", label: "touched", tone: "neutral" },
      { id: "replied", label: "replied", tone: "positive" }
    ],
    rows: [
      {
        label: "Batch 1",
        note: "read their site, name their software",
        marks: [
          { kind: "person", state: "touched" },
          { kind: "person", state: "touched" },
          { kind: "person", state: "replied", detail: "asked about price" }
        ],
        halo: { label: "clicks with reading", n: 1, detail: "3 clicks in all; mail scanners click too" }
      }
    ]
  }
});

// ../core/src/components/ladder.ts
var unknownKindSchema = strictObject({ kind: string2().min(1), why: string2().min(1) }).meta({ id: "LadderUnknownKind" });
var Ladder = defineKind({
  type: "Ladder",
  summary: "Stages from the bottom up with marks in them and counted steps between them: how far things got.",
  writer: "code",
  schema: () => strictObject({
    type: literal("Ladder"),
    kinds: array(markKindSchema),
    states: array(markStateSchema).default([]),
    rungs: array(strictObject({
      id: string2().min(1),
      label: string2().min(1),
      nodes: array(strictObject({
        id: string2().min(1),
        label: string2().min(1),
        full: string2().min(1).optional(),
        group: string2().min(1).optional(),
        marks: array(markSchema).default([]),
        count: string2().min(1).optional(),
        unknown: string2().min(1).optional(),
        unknownKinds: array(unknownKindSchema).optional()
      }).meta({ id: "LadderNode" })).default([]),
      empty: string2().min(1).optional(),
      unknownKinds: array(unknownKindSchema).optional()
    }).meta({ id: "LadderRung" })).min(1, "a Ladder needs at least one rung; use a Text to say there is nothing to show"),
    steps: array(strictObject({ from: string2().min(1), to: string2().min(1), label: string2().min(1), n: number2().int().min(0).optional() }).meta({ id: "LadderStep" })).default([])
  }).superRefine((ladder, ctx) => {
    const issue = (path, message) => ctx.addIssue({ code: "custom", path, message });
    checkKindsAndStates(ladder.kinds, ladder.states, issue);
    const ids = new Map;
    const declared = new Set(ladder.kinds.map((kind) => kind.id));
    const unknownIn = (path, list) => (list ?? []).forEach((u, i) => {
      if (!declared.has(u.kind))
        issue([...path, "unknownKinds", i, "kind"], `unknown kind "${u.kind}" isn't declared; use one of ${[...declared].join(", ")}`);
    });
    ladder.rungs.forEach((rung, r) => {
      unknownIn(["rungs", r], rung.unknownKinds);
      rung.nodes.forEach((node, n) => {
        unknownIn(["rungs", r, "nodes", n], node.unknownKinds);
        for (const u of [...rung.unknownKinds ?? [], ...node.unknownKinds ?? []]) {
          if (node.marks.some((mark) => mark.kind === u.kind)) {
            issue(["rungs", r, "nodes", n, "marks"], `this node draws ${u.kind} marks but calls ${u.kind} unknown ("${u.why}"); drop the marks, or drop the unknown`);
          }
        }
        const path = ["rungs", r, "nodes", n];
        if (ids.has(node.id))
          issue([...path, "id"], `node id "${node.id}" is already used in rung ${ids.get(node.id)}; give each node its own id`);
        ids.set(node.id, rung.id);
        checkMarks(path, node.marks, node.unknown, ladder.kinds, ladder.states, issue);
        if (node.unknown !== undefined && node.count !== undefined) {
          issue([...path, "unknown"], `a node can't be both unknown ("${node.unknown}") and counted ("${node.count}"); keep one`);
        }
      });
    });
    ladder.steps.forEach((step, i) => {
      for (const end of ["from", "to"]) {
        if (!ids.has(step[end]))
          issue(["steps", i, end], `step points at node "${step[end]}", which doesn't exist; use one of ${[...ids.keys()].join(", ") || "none (this ladder has no nodes)"}`);
      }
    });
  }).meta({ id: "Ladder" }),
  toText: (props) => {
    const kindLabel = (id) => props.kinds.find((kind) => kind.id === id)?.label ?? id;
    const unknownText = (list) => (list ?? []).map((u) => `${kindLabel(u.kind)} unknown, ${u.why}`).join("; ");
    const nodeText = (node) => {
      const name = node.full ?? node.label;
      if (node.unknown !== undefined)
        return `${name}: unknown, ${node.unknown}`;
      const states = stateCounts(node.marks, props.states);
      const own = unknownText(node.unknownKinds);
      return `${name} ${node.count ?? kindCounts(node.marks, props.kinds)}${states && !node.count ? ` (${states})` : ""}${own ? ` (${own})` : ""}`;
    };
    const rungText = (rung) => {
      const note = unknownText(rung.unknownKinds);
      const tail = note ? ` (${note})` : "";
      if (rung.nodes.length === 0)
        return `- **${rung.label}:** ${rung.empty ?? "none"}${tail}`;
      const groups = [...new Set(rung.nodes.map((node) => node.group ?? ""))];
      const segments = groups.map((group) => {
        const nodes = rung.nodes.filter((node) => (node.group ?? "") === group).map(nodeText).join("; ");
        return group ? `${group}: ${nodes}` : nodes;
      });
      return `- **${rung.label}:** ${segments.join(". ")}${tail}`;
    };
    const label = new Map(props.rungs.flatMap((rung) => rung.nodes.map((node) => [node.id, node.full ?? node.label])));
    const steps = props.steps.map((step) => `- ${label.get(step.from)} → ${label.get(step.to)}: ${step.label}`);
    return [keyText(props.kinds), ...[...props.rungs].reverse().map(rungText), ...steps.length ? ["Steps:", ...steps] : []].join(`
`);
  },
  example: {
    type: "Ladder",
    kinds: [{ id: "visit", label: "visits", one: "visit" }],
    states: [],
    rungs: [
      { id: "pages", label: "Free pages", nodes: [{ id: "checklist", label: "Close checklist", group: "bookkeeping", marks: [{ kind: "visit" }, { kind: "visit" }] }] },
      { id: "lists", label: "Waitlists", nodes: [{ id: "kit", label: "Close kit", marks: [{ kind: "visit" }] }] },
      { id: "paid", label: "Paid", nodes: [], empty: "none yet" }
    ],
    steps: [{ from: "checklist", to: "kit", label: "1 visit went on" }]
  }
});

// ../core/src/components/stat.ts
var Stat = defineKind({
  type: "Stat",
  summary: "One number with a label, and optionally its change.",
  writer: "code",
  schema: () => strictObject({
    type: literal("Stat"),
    label: string2().min(1),
    value: readingSchema(),
    unit: string2().optional(),
    change: strictObject({ value: readingSchema(), as: _enum2(["amount", "percent"]) }).meta({ id: "StatChange" }).optional(),
    tone: tone.default("neutral"),
    note: string2().min(1).optional()
  }).meta({ id: "Stat" }),
  toText: (props) => {
    const value = readingText(props.value, { unit: props.unit });
    const figure = props.change ? `**${props.label}:** ${value} (${changeText(props.change)})` : `**${props.label}:** ${value}`;
    return props.note ? `${figure}; ${props.note}` : figure;
  },
  example: {
    type: "Stat",
    label: "Visitors",
    value: Reading.exact(1204),
    change: { value: Reading.exact(18), as: "percent" },
    tone: "positive"
  }
});
function changeText(change) {
  return readingText(change.value, { unit: change.as === "percent" ? "%" : undefined, signed: true });
}

// ../core/src/components/table.ts
var cellOf = (row, key) => Object.hasOwn(row, key) ? row[key] : undefined;
var Table = defineKind({
  type: "Table",
  summary: "Rows and columns of short values. For comparisons and lists of records.",
  writer: "anyone",
  schema: () => strictObject({
    type: literal("Table"),
    columns: array(strictObject({
      key: string2().min(1),
      label: string2().min(1),
      align: _enum2(["start", "end"]).optional()
    }).meta({ id: "TableColumn" })).min(1, "a Table needs at least one column"),
    rows: array(record(string2(), union([string2(), number2(), boolean2(), _null3()]))),
    caption: string2().optional()
  }).superRefine((table, ctx) => {
    const keys = new Set(table.columns.map((column) => column.key));
    table.rows.forEach((row, index) => {
      for (const key of Object.keys(row)) {
        if (!keys.has(key)) {
          ctx.addIssue({
            code: "custom",
            path: ["rows", index, key],
            message: `row has a value for "${key}", which isn't a column; add a column with key "${key}" or remove the value`
          });
        }
      }
    });
  }).meta({ id: "Table" }),
  toText: (props) => {
    const table = markdownTable(props.columns.map((column) => cell(column.label)), props.rows.map((row) => props.columns.map((column) => cell(cellOf(row, column.key)))));
    return props.caption ? `${props.caption}

${table}` : table;
  },
  example: {
    type: "Table",
    columns: [
      { key: "option", label: "Option" },
      { key: "streams", label: "Streams?" }
    ],
    rows: [
      { option: "Tool calls", streams: "No" },
      { option: "Markup in text", streams: "Yes" }
    ]
  }
});

// ../core/src/components/text.ts
var Text = defineKind({
  type: "Text",
  summary: "Markdown text. The default, and what every other component falls back to.",
  writer: "anyone",
  schema: () => strictObject({
    type: literal("Text"),
    markdown: string2().min(1, "Text needs some markdown; leave the Text out if there's nothing to say")
  }).meta({ id: "Text" }),
  toText: (props) => props.markdown,
  example: { type: "Text", markdown: "Traffic was **normal** this week." }
});

// ../core/src/catalog.ts
function make(kinds) {
  const node = lazy(() => discriminatedUnion("type", kinds.map((kind) => kind.schema(node)))).meta({ id: "Node" });
  return { kinds, byType: new Map(kinds.map((kind) => [kind.type, kind])), node };
}
var Catalog = {
  make,
  kindOf(catalog, node) {
    const kind = catalog.byType.get(node.type);
    if (!kind)
      throw new Error(`no component kind "${node.type}" in this catalog`);
    return kind;
  },
  writableBy(catalog, author) {
    return author === "code" ? catalog : make(catalog.kinds.filter((kind) => kind.writer === "anyone"));
  },
  types(catalog) {
    return catalog.kinds.map((kind) => kind.type);
  },
  jsonSchema(catalog) {
    return toJSONSchema(strictObject({ v: literal(1), root: catalog.node }).meta({ title: "IntuiTree" }), { io: "input" });
  },
  describe(catalog) {
    return catalog.kinds.map((kind) => `- ${kind.type}: ${kind.summary}`).join(`
`);
  }
};
var core2 = make([Text, Group, Label, Table, Chart, Stat, Flow, Marks, Ladder, Choice, Form]);
// ../core/src/problems.ts
function refusal2(summary, problems = []) {
  const message = problems.length === 0 ? summary : `${summary}
${problems.map((p) => `- ${p.path}: ${p.message}`).join(`
`)}`;
  return { kind: "refused", summary, problems, message };
}
var parsed = (value) => ({ kind: "parsed", value });
function problemsFrom(issues, input, prefix = []) {
  return issues.map((issue) => {
    const path = [...prefix, ...issue.path];
    return { path: describePath(path, input, prefix.length), message: messageFor(issue, input, path, prefix.length) };
  });
}
function messageFor(issue, input, path, skip) {
  if (issue.code === "invalid_union" && "discriminator" in issue && issue.discriminator === "type") {
    const at = path.slice(skip);
    const node = valueAt(input, at.at(-1) === "type" ? at.slice(0, -1) : at);
    const type = isRecord(node) ? node.type : undefined;
    const known = issue.options;
    const list = Array.isArray(known) && known.length > 0 ? `; use one of ${known.join(", ")}` : "";
    return type === undefined ? `a component needs a "type"${list}` : `"${String(type)}" isn't a component${list}`;
  }
  if (issue.code === "unrecognized_keys") {
    const keys = issue.keys.map((key) => `"${key}"`).join(", ");
    return `${keys} ${issue.keys.length === 1 ? "isn't a known prop" : "aren't known props"} here; check the spelling or remove ${issue.keys.length === 1 ? "it" : "them"}`;
  }
  if (issue.code === "invalid_type" && valueAt(input, path.slice(skip)) === undefined) {
    return `this is required; add "${String(path.at(-1))}" (${issue.expected})`;
  }
  return issue.message;
}
function describePath(path, input, skip) {
  let text = "";
  let value = input;
  path.forEach((key, index) => {
    if (index >= skip)
      value = isRecord(value) || Array.isArray(value) ? value[key] : undefined;
    text += typeof key === "number" ? `[${key}]` : `${text ? "." : ""}${String(key)}`;
    if (index >= skip && isRecord(value) && typeof value.type === "string")
      text += ` (${value.type})`;
  });
  return text || "(top level)";
}
function valueAt(input, path) {
  return path.reduce((value, key) => isRecord(value) || Array.isArray(value) ? value[key] : undefined, input);
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// ../core/src/event.ts
var fieldValue = union([string2(), number2(), boolean2()]).meta({ id: "FieldValue" });
var schema = discriminatedUnion("action", [
  strictObject({ v: literal(1), source: string2().min(1), target: string2().min(1), action: literal("press"), value: string2().min(1) }).meta({ id: "PressEvent" }),
  strictObject({
    v: literal(1),
    source: string2().min(1),
    target: string2().min(1),
    action: literal("submit"),
    value: record(string2(), fieldValue)
  }).meta({ id: "SubmitEvent" })
]).meta({ id: "IntuiEvent" });
var IntuiEvent = {
  press(source, choice, option) {
    return { v: 1, source, target: choice, action: "press", value: option };
  },
  submit(source, form, values) {
    return { v: 1, source, target: form, action: "submit", value: values };
  },
  jsonSchema() {
    return toJSONSchema(schema, { io: "input" });
  },
  parse(input) {
    const result = schema.safeParse(input);
    return result.success ? parsed(result.data) : refusal2("This event doesn't match the IntUI event schema:", problemsFrom(result.error.issues, input));
  },
  problemWith(event, component) {
    if (!component)
      return `nothing in it has the id "${event.target}"`;
    if (event.action === "press") {
      if (component.type !== "Choice")
        return `"${event.target}" is a ${component.type}, which can't be pressed`;
      const ids = component.options.map((option) => option.id);
      return ids.includes(event.value) ? null : `choice "${event.target}" has no option "${event.value}"; its options are ${ids.join(", ")}`;
    }
    if (component.type !== "Form")
      return `"${event.target}" is a ${component.type}, which can't be submitted`;
    const fields = new Map(component.fields.map((field) => [field.id, field]));
    for (const [id, value] of Object.entries(event.value)) {
      const field = fields.get(id);
      if (!field)
        return `form "${event.target}" has no field "${id}"`;
      const wrong = valueProblem(field, value);
      if (wrong)
        return wrong;
    }
    const missing = component.fields.filter((field) => field.required && !Object.hasOwn(event.value, field.id));
    return missing.length ? `required ${missing.length === 1 ? "field" : "fields"} ${missing.map((f) => `"${f.label}"`).join(", ")} left empty` : null;
  },
  describe(event, component) {
    const from = `(from ${event.source})`;
    if (event.action === "press") {
      const option = component?.type === "Choice" ? component.options.find((o) => o.id === event.value) : undefined;
      return `Pressed "${option?.label ?? event.value}" in ${event.target} ${from}.`;
    }
    const labels = component?.type === "Form" ? new Map(component.fields.map((f) => [f.id, f.label])) : new Map;
    const values = Object.entries(event.value).map(([id, value]) => `${labels.get(id) ?? id} = ${JSON.stringify(value)}`);
    return `Submitted ${event.target} ${from}: ${values.length ? values.join(", ") : "no values"}.`;
  }
};
function valueProblem(field, value) {
  const expected = field.input === "number" ? "number" : field.input === "checkbox" ? "boolean" : "string";
  if (typeof value !== expected)
    return `field "${field.label}" takes a ${expected}, got ${JSON.stringify(value)}`;
  if (field.input === "select" && !field.options?.includes(value)) {
    return `field "${field.label}" has no option ${JSON.stringify(value)}; its options are ${field.options?.join(", ")}`;
  }
  return null;
}
// ../core/src/control.ts
var WHY_LENGTH = 160;
function whyOf(error) {
  return (error instanceof Error ? error.message : String(error)).split(`
`)[0].slice(0, WHY_LENGTH);
}
function startControl(canSend, earlier) {
  if (earlier)
    return { kind: "sent", answer: earlier };
  return canSend ? { kind: "ready" } : { kind: "readOnly" };
}
function stepControl(at, state, event) {
  switch (event.kind) {
    case "answered": {
      if (state.kind === "readOnly")
        return ignore(state, "this view is read-only: there is nowhere to send an answer");
      if (state.kind === "sending")
        return ignore(state, "an answer is already being sent; wait for it to be accepted or refused");
      if (state.kind === "sent" && !repeats(at.control))
        return ignore(state, "this control was used once already and takes one answer");
      const sent = eventOf(at, event.answer);
      const problem = IntuiEvent.problemWith(sent, at.control);
      if (problem !== null)
        return go({ kind: "refused", answer: event.answer, why: problem.slice(0, WHY_LENGTH) });
      return go({ kind: "sending", answer: event.answer }, [{ kind: "send", event: sent }]);
    }
    case "accepted":
      if (state.kind !== "sending")
        return ignore(state, `nothing is being sent (the control is ${state.kind})`);
      return go({ kind: "sent", answer: state.answer });
    case "refused":
      if (state.kind !== "sending")
        return ignore(state, `nothing is being sent (the control is ${state.kind})`);
      return go({ kind: "refused", answer: state.answer, why: event.why.split(`
`)[0].slice(0, WHY_LENGTH) });
    default:
      return never3(event);
  }
}
function repeats(control) {
  return control.type === "Choice" && control.repeat === "many";
}
function eventOf(at, answer) {
  return answer.kind === "press" ? IntuiEvent.press(at.source, at.control.id, answer.option) : IntuiEvent.submit(at.source, at.control.id, { ...answer.values });
}
function go(state, effects = []) {
  return { ignored: false, state, effects };
}
function ignore(state, why) {
  return { ignored: true, state, effects: [], why };
}
function never3(value) {
  throw new Error(`unhandled control case ${JSON.stringify(value)}`);
}
// ../core/src/tree.ts
var VERSION = 1;
function walk(tree, catalog = core2) {
  const visit = (node, path) => [
    { node, path: `${path} (${node.type})` },
    ...Catalog.kindOf(catalog, node).children(node).flatMap((child, index) => visit(child, `${path}.children[${index}]`))
  ];
  return visit(tree.root, "root");
}
function textOf(node, catalog = core2) {
  const text = (child) => Catalog.kindOf(catalog, child).toText(child, text);
  return text(node);
}
function interactive(tree, id, catalog = core2) {
  return walk(tree, catalog).map(({ node }) => node).find((node) => (node.type === "Choice" || node.type === "Form") && node.id === id);
}
function parse5(input, options = {}) {
  const catalog = options.catalog ?? core2;
  const envelope = parseEnvelope(input);
  if (envelope.kind === "refused")
    return envelope;
  const result = catalog.node.safeParse(envelope.value.root);
  if (!result.success)
    return refusal2("This tree doesn't match the IntUI schemas:", problemsFrom(result.error.issues, envelope.value.root, ["root"]));
  const tree = { v: VERSION, root: result.data };
  return duplicateIds(tree, catalog) ?? (options.author ? notWritableBy(tree, options.author, catalog) : undefined) ?? parsed(tree);
}
var Tree = {
  of(root, catalog = core2) {
    const result = parse5({ v: VERSION, root }, { author: "code", catalog });
    if (result.kind === "refused")
      throw new Error(result.message);
    return result.value;
  },
  parse: parse5,
  walk,
  toText: (tree, catalog = core2) => textOf(tree.root, catalog),
  textOf,
  toJSON: (tree) => ({ v: VERSION, root: toWire(tree.root) }),
  interactive,
  problemWith(tree, event, catalog = core2) {
    const problem = IntuiEvent.problemWith(event, interactive(tree, event.target, catalog));
    return problem === null ? null : `This event doesn't fit the tree it came from: ${problem}`;
  },
  describe: (tree, event, catalog = core2) => IntuiEvent.describe(event, interactive(tree, event.target, catalog))
};
function notWritableBy(tree, author, catalog) {
  const allowed = new Set(Catalog.types(Catalog.writableBy(catalog, author)));
  const problems = walk(tree, catalog).filter(({ node }) => !allowed.has(node.type)).map(({ path }) => ({
    path,
    message: "this component shows numbers, which must come from code: call a tool that returns it, or show the figures in a Text or Table you can vouch for"
  }));
  return problems.length > 0 ? refusal2("The model can't write this tree directly:", problems) : undefined;
}
function duplicateIds(tree, catalog) {
  const seen = new Map;
  const problems = [];
  for (const { node, path } of walk(tree, catalog)) {
    for (const id of Catalog.kindOf(catalog, node).ids(node)) {
      const first = seen.get(id);
      if (first)
        problems.push({ path, message: `id "${id}" is already used at ${first}; give each Choice and Form its own id` });
      else
        seen.set(id, path);
    }
  }
  return problems.length > 0 ? refusal2("This tree has duplicate ids:", problems) : undefined;
}
function parseEnvelope(input) {
  if (typeof input !== "object" || input === null || !("root" in input)) {
    return refusal2(`A tree is an object like { "v": ${VERSION}, "root": { "type": "Text", ... } }; this one has no "root"`);
  }
  const v = input.v;
  if (v !== VERSION) {
    return refusal2(v === undefined ? `A tree needs a version: add "v": ${VERSION} next to "root"` : `This tree is version ${JSON.stringify(v)}, and this copy of IntUI reads version ${VERSION}; update @intui/core to draw it`);
  }
  return parsed(input);
}
// src/draw/drawer.ts
function defineDrawer(drawer) {
  return drawer;
}

// ../layout/src/chart-scale.ts
var clean = (n) => Number(n.toPrecision(12));
function niceStep(raw) {
  if (!(raw > 0))
    return 1;
  const power = 10 ** Math.floor(Math.log10(raw));
  const f = raw / power;
  return clean((f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * power);
}
function niceDomain(min, max, kind) {
  let lo = kind === "bar" ? Math.min(0, min) : min;
  let hi = kind === "bar" ? Math.max(0, max) : max;
  if (lo === hi) {
    if (kind === "bar" || lo === 0)
      hi = lo + 1;
    else {
      const pad = Math.abs(lo) * 0.1;
      lo -= pad;
      hi += pad;
    }
  }
  const step = niceStep((hi - lo) / 5);
  return { lo: clean(Math.floor(lo / step) * step), hi: clean(Math.ceil(hi / step) * step) };
}
function formatValue(value) {
  const abs = Math.abs(value);
  const trim = (n, digits) => String(Number(n.toFixed(digits)));
  if (abs >= 1e9)
    return `${trim(value / 1e9, 1)}B`;
  if (abs >= 1e6)
    return `${trim(value / 1e6, 1)}M`;
  if (abs >= 1e4)
    return `${trim(value / 1000, 1)}k`;
  if (abs >= 100)
    return trim(value, 0);
  if (abs >= 10)
    return trim(value, 1);
  if (abs >= 0.01 || abs === 0)
    return trim(value, 2);
  return String(Number(value.toPrecision(2)));
}
function withUnit(value, unit) {
  if (!unit)
    return value;
  if (/^[$€£¥]$/.test(unit))
    return `${unit}${value}`;
  if (/^[^\p{L}\p{N}]/u.test(unit))
    return `${value}${unit}`;
  return `${value} ${unit}`;
}
var project = (value, { lo, hi }, size) => (value - lo) / (hi - lo) * size;
function placeLabels(centers, widths, total, gap = 1) {
  const count = centers.length;
  if (count === 0)
    return [];
  const clamped = (i) => Math.max(0, Math.min(total - widths[i], Math.round(centers[i] - widths[i] / 2)));
  const placed = [{ index: 0, start: Math.max(0, Math.min(total - widths[0], Math.round(centers[0] - widths[0] / 2))) }];
  let leftEnd = placed[0].start + widths[0];
  let last;
  if (count > 1) {
    const start = clamped(count - 1);
    if (start >= leftEnd + gap)
      last = { index: count - 1, start };
  }
  const middle = [];
  const fill = (a, b, from, to) => {
    if (b - a < 2)
      return;
    const mid = Math.floor((a + b) / 2);
    const start = clamped(mid);
    if (start >= from + gap && start + widths[mid] + gap <= to) {
      middle.push({ index: mid, start });
      fill(a, mid, from, start);
      fill(mid, b, start + widths[mid], to);
    } else {
      fill(a, mid, from, to);
      fill(mid, b, from, to);
    }
  };
  if (count > 2)
    fill(0, count - 1, leftEnd, last ? last.start : total + gap);
  return [...placed, ...middle, ...last ? [last] : []].sort((x, y) => x.index - y.index);
}
function buildModel(props) {
  const xs = [...new Set(props.series.flatMap((series) => series.points.map((point) => point.x)))];
  const series = props.series.map((s) => ({
    label: s.label,
    role: s.role,
    values: xs.map((x) => {
      const y = s.points.find((point) => point.x === x)?.y;
      return y === undefined || y.kind === "unknown" ? undefined : y.value;
    }),
    kinds: xs.map((x) => s.points.find((point) => point.x === x)?.y.kind)
  }));
  const all = series.flatMap((s) => s.values).filter((v) => v !== undefined);
  const markers = props.annotations.map((a, i) => {
    const index = xs.indexOf(a.at);
    return { n: i + 1, at: a.at, label: a.label, ...index >= 0 ? { index } : {} };
  });
  return {
    kind: props.kind,
    ...props.unit ? { unit: props.unit } : {},
    xs,
    series,
    readable: all.length > 0,
    domain: all.length > 0 ? niceDomain(Math.min(...all), Math.max(...all), props.kind) : niceDomain(0, 1, props.kind),
    markers
  };
}
var markerGlyph = (n) => n <= 9 ? String(n) : "*";
// ../layout/src/flow-analysis.ts
function resolveEdges(steps, links) {
  if (links.length === 0)
    return steps.slice(1).map((_, i) => ({ from: i, to: i + 1 }));
  const index = new Map(steps.map((step, i) => [step.id, i]));
  const merged = new Map;
  for (const link of links) {
    const from = index.get(link.from);
    const to = index.get(link.to);
    if (from === undefined || to === undefined)
      continue;
    const key = `${from}>${to}`;
    const seen = merged.get(key);
    if (!seen)
      merged.set(key, { from, to, ...link.label ? { label: link.label } : {} });
    else if (link.label && seen.label !== link.label)
      seen.label = seen.label ? `${seen.label} / ${link.label}` : link.label;
  }
  return [...merged.values()];
}
function breakCycles(count, edges) {
  const out = Array.from({ length: count }, () => []);
  for (const edge of edges)
    out[edge.from].push(edge);
  const state = new Array(count).fill(0);
  const back = new Set;
  const visit = (node) => {
    state[node] = 1;
    for (const edge of out[node]) {
      if (state[edge.to] === 1)
        back.add(edge);
      else if (state[edge.to] === 0)
        visit(edge.to);
    }
    state[node] = 2;
  };
  for (let node = 0;node < count; node++)
    if (state[node] === 0)
      visit(node);
  return { forward: edges.filter((edge) => !back.has(edge)), back: edges.filter((edge) => back.has(edge)) };
}
function analyse(steps, links) {
  const count = steps.length;
  const { forward, back } = breakCycles(count, resolveEdges(steps, links));
  const layerOf = new Array(count).fill(0);
  const indegree = new Array(count).fill(0);
  for (const edge of forward)
    indegree[edge.to]++;
  const queue = [...Array(count).keys()].filter((node) => indegree[node] === 0);
  for (let head = 0;head < queue.length; head++) {
    const node = queue[head];
    for (const edge of forward.filter((e) => e.from === node)) {
      layerOf[edge.to] = Math.max(layerOf[edge.to], layerOf[node] + 1);
      if (--indegree[edge.to] === 0)
        queue.push(edge.to);
    }
  }
  const depth = Math.max(...layerOf);
  const layers = Array.from({ length: depth + 1 }, () => []);
  const position = new Array(count).fill(0);
  layers.forEach((_, l) => {
    const members = [...Array(count).keys()].filter((node) => layerOf[node] === l);
    const desire = (node) => {
      const before = forward.filter((e) => e.to === node).map((e) => position[e.from]);
      return before.length ? before.reduce((a, b) => a + b, 0) / before.length : 0;
    };
    members.sort((a, b) => desire(a) - desire(b) || a - b);
    members.forEach((node, i) => position[node] = i);
    layers[l] = members;
  });
  return { edges: forward, back, layers, layerOf };
}
// ../layout/src/logic.ts
function alignOf(column, rows) {
  if (column.align)
    return column.align;
  const values = rows.map((row) => cellOf(row, column.key)).filter((value) => value !== null && value !== undefined);
  return values.length > 0 && values.every((value) => typeof value === "number") ? "end" : "start";
}
var NUMBER = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;
function parseNumber(raw) {
  const trimmed = raw.trim();
  if (trimmed === "")
    return { kind: "cleared" };
  const value = NUMBER.test(trimmed) ? Number(trimmed) : NaN;
  return Number.isFinite(value) ? { kind: "value", value } : { kind: "invalid", note: `"${trimmed.slice(0, 20)}" is not a number` };
}
function chartLabel(model, title) {
  const parts = model.series.map((s) => {
    const values = s.values.filter((v) => v !== undefined);
    const range = values.length > 0 ? `from ${formatValue(Math.min(...values))} to ${formatValue(Math.max(...values))}` : "has no readable values";
    const count = (kind) => s.kinds.filter((k) => k === kind).length;
    const notes = [
      count("atLeast") > 0 ? `${count("atLeast")} at least` : "",
      count("estimate") > 0 ? `${count("estimate")} about` : "",
      count("unknown") > 0 ? `${count("unknown")} unknown` : ""
    ].filter(Boolean);
    return `${s.label} ${range}${notes.length > 0 ? ` (${notes.join(", ")})` : ""}`;
  });
  const markers = model.markers.length > 0 ? `; markers: ${model.markers.map((m) => `${m.at} ${m.label}`).join(", ")}` : "";
  return `${model.kind} chart${title ? ` "${title}"` : ""}${model.unit ? ` in ${model.unit}` : ""}: ${parts.join("; ")}${markers}`;
}
var READING_MARK = { exact: "", atLeast: "≥ ", estimate: "~", unknown: "" };
function changeShape(change) {
  const r = change.value;
  switch (r.kind) {
    case "unknown":
      return { kind: "unknown" };
    case "atLeast":
      return shownNumber(r.value) > 0 ? { way: "up", figure: shownNumber(r.value), kind: "atLeast" } : { figure: shownNumber(r.value), kind: "atLeast" };
    case "exact":
    case "estimate": {
      const shown = shownNumber(r.value);
      return { way: shown > 0 ? "up" : shown < 0 ? "down" : "flat", figure: Math.abs(shown), kind: r.kind };
    }
    default:
      return never2(r);
  }
}
// src/draw/chart-svg.ts
var CHAR_WIDTH = 6.5;
var FONT = 11;
var round = (n) => Number(n.toFixed(1));
var escapeXml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function pathData(points) {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${round(x)} ${round(y)}`).join(" ");
}
function buildSvg(model, width, height, colors) {
  const top = formatValue(model.domain.hi);
  const bottom = formatValue(model.domain.lo);
  const yTop = withUnit(top, model.unit);
  const yBottom = withUnit(bottom, model.unit);
  const left = Math.ceil(Math.max(yTop.length, yBottom.length) * CHAR_WIDTH) + 12;
  const x0 = left;
  const x1 = width - 10;
  const y0 = 16;
  const y1 = height - 24;
  const n = model.xs.length;
  const isBar = model.kind === "bar";
  const slot = (x1 - x0) / n;
  const pad = isBar ? 0 : 8;
  const xAt = (i) => isBar ? x0 + slot * (i + 0.5) : n === 1 ? (x0 + x1) / 2 : x0 + pad + i * (x1 - x0 - 2 * pad) / (n - 1);
  const yAt = (v) => y1 - project(v, model.domain, y1 - y0);
  const color = (role) => colors[role];
  const out = [];
  const floor = (x, y, stroke) => `<path d="M${round(x - 4)} ${round(y - 4)}L${round(x)} ${round(y - 8)}L${round(x + 4)} ${round(y - 4)}" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  const cross = (x, y, stroke) => `<path d="M${round(x - 3)} ${round(y - 7)}L${round(x + 3)} ${round(y - 1)}M${round(x + 3)} ${round(y - 7)}L${round(x - 3)} ${round(y - 1)}" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round"/>`;
  const text = (x, y, anchor, fill, body) => out.push(`<text x="${round(x)}" y="${round(y)}" text-anchor="${anchor}" fill="${fill}">${escapeXml(body)}</text>`);
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" font-family="sans-serif" font-size="${FONT}">`);
  for (const [y, label] of [[y0, yTop], [y1, yBottom]]) {
    out.push(`<line x1="${x0}" y1="${round(y)}" x2="${x1}" y2="${round(y)}" stroke="${colors.quiet}" stroke-opacity="0.35"/>`);
    text(x0 - 6, y + 4, "end", colors.quiet, label);
  }
  if (model.domain.lo < 0 && model.domain.hi > 0) {
    out.push(`<line x1="${x0}" y1="${round(yAt(0))}" x2="${x1}" y2="${round(yAt(0))}" stroke="${colors.quiet}" stroke-opacity="0.7"/>`);
  }
  for (const m of model.markers) {
    if (m.index === undefined)
      continue;
    const x = xAt(m.index);
    out.push(`<line x1="${round(x)}" y1="${y0}" x2="${round(x)}" y2="${y1}" stroke="${colors.marker}" stroke-dasharray="2 3"/>`);
    text(x, y0 - 4, "middle", colors.marker, markerGlyph(m.n));
  }
  if (isBar) {
    const bar = Math.max(2, slot * 0.8 / model.series.length);
    const zero = yAt(Math.max(model.domain.lo, Math.min(0, model.domain.hi)));
    model.series.forEach((series, s) => series.values.forEach((v, i) => {
      if (series.kinds[i] === "unknown")
        out.push(cross(xAt(i) - bar * model.series.length / 2 + s * bar + bar / 2, y1, colors.quiet));
      if (v === undefined)
        return;
      const x = xAt(i) - bar * model.series.length / 2 + s * bar;
      const y = yAt(v);
      const opacity = series.role === "primary" ? 1 : series.role === "comparison" ? 0.55 : 0.6;
      const kind = series.kinds[i];
      const look = kind === "estimate" ? ` fill-opacity="0.35" stroke="${color(series.role)}" stroke-dasharray="3 2"` : ` fill-opacity="${opacity}"`;
      out.push(`<rect x="${round(x)}" y="${round(Math.min(y, zero))}" width="${round(bar - 1)}" height="${round(Math.max(1, Math.abs(zero - y)))}" fill="${color(series.role)}"${look}/>`);
      if (kind === "atLeast")
        out.push(floor(x + (bar - 1) / 2, Math.min(y, zero) - 2, color(series.role)));
    }));
  } else {
    for (const series of model.series) {
      const runs = [[]];
      series.values.forEach((v, i) => {
        if (v === undefined) {
          if (runs[runs.length - 1].length > 0)
            runs.push([]);
          return;
        }
        runs[runs.length - 1].push([xAt(i), yAt(v)]);
      });
      const dash = series.role === "baseline" ? ' stroke-dasharray="6 4"' : "";
      const opacity = series.role === "comparison" ? ' stroke-opacity="0.55"' : "";
      const stroke = series.role === "primary" ? 2.5 : 1.75;
      for (const points of runs.filter((run) => run.length > 0)) {
        out.push(`<path d="${pathData(points)}" fill="none" stroke="${color(series.role)}" stroke-width="${stroke}" stroke-linejoin="round" stroke-linecap="round"${dash}${opacity}/>`);
      }
      series.kinds.forEach((kind, i) => {
        if (kind === "unknown")
          out.push(cross(xAt(i), y1, colors.quiet));
      });
      const r = series.role === "primary" ? 3 : 2;
      {
        series.values.forEach((v, i) => {
          if (v === undefined)
            return;
          if (n > 24 && (series.values[i - 1] !== undefined || series.values[i + 1] !== undefined))
            return;
          const kind = series.kinds[i];
          const fill = kind === "estimate" ? ` fill="none" stroke="${color(series.role)}"` : ` fill="${color(series.role)}"${opacity.replace("stroke", "fill")}`;
          out.push(`<circle cx="${round(xAt(i))}" cy="${round(yAt(v))}" r="${r}"${fill}/>`);
          if (kind === "atLeast")
            out.push(floor(xAt(i), yAt(v) - r - 2, color(series.role)));
        });
      }
    }
  }
  const labels = model.xs.map(String);
  const widths = labels.map((l) => Math.ceil(l.length * CHAR_WIDTH));
  for (const { index, start } of placeLabels(model.xs.map((_, i) => xAt(i)), widths, width, 6)) {
    text(start + widths[index] / 2, y1 + 16, "middle", colors.quiet, labels[index]);
  }
  out.push("</svg>");
  return out.join("");
}

// src/draw/chart-text.ts
var PLOT_ROWS = 8;
var BLANK = { ch: " ", style: "plain" };
var PRIORITY = { primary: 3, comparison: 2, baseline: 1 };
var BARS = [" ", "▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];
function toRow(cells) {
  const row = [];
  for (const { ch, style } of cells) {
    const last = row[row.length - 1];
    if (last && last.style === style)
      last.text += ch;
    else
      row.push({ text: ch, style });
  }
  return row;
}
function lineDots(x0, y0, x1, y1) {
  const dots = [];
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  let x = x0;
  let y = y0;
  for (;; ) {
    dots.push([x, y]);
    if (x === x1 && y === y1)
      return dots;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y += sy;
    }
  }
}
var BRAILLE_BIT = [[1, 2, 4, 64], [8, 16, 32, 128]];
function lineColumns(count, width) {
  const dotX = (i) => count === 1 ? Math.floor((width * 2 - 1) / 2) : Math.round(i * (width * 2 - 1) / (count - 1));
  return Array.from({ length: count }, (_, i) => Math.floor(dotX(i) / 2));
}
function plotLine(model, width, height = PLOT_ROWS) {
  const W = width * 2;
  const H = height * 4;
  const masks = Array.from({ length: height }, () => new Array(width).fill(0));
  const owner = Array.from({ length: height }, () => new Array(width).fill(0));
  const n = model.xs.length;
  const dotX = (i) => n === 1 ? Math.floor((W - 1) / 2) : Math.round(i * (W - 1) / (n - 1));
  const dotY = (v) => Math.round(H - 1 - project(v, model.domain, H - 1));
  for (const series of model.series) {
    const runs = [[]];
    series.values.forEach((v, i) => {
      if (v === undefined) {
        if (runs[runs.length - 1].length > 0)
          runs.push([]);
        return;
      }
      runs[runs.length - 1].push([dotX(i), dotY(v)]);
    });
    let step = 0;
    const mark = (x, y) => {
      if (series.role === "baseline" && step++ % 8 >= 5)
        return;
      const row = Math.floor(y / 4);
      const col = Math.floor(x / 2);
      masks[row][col] |= BRAILLE_BIT[x % 2][y % 4];
      owner[row][col] = Math.max(owner[row][col], PRIORITY[series.role]);
    };
    for (const points of runs) {
      if (points.length === 1)
        mark(...points[0]);
      points.slice(1).forEach(([x, y], i) => lineDots(...points[i], x, y).forEach(([px, py]) => mark(px, py)));
    }
  }
  const style = (p) => p === 3 ? "primary" : p === 2 ? "comparison" : "baseline";
  return masks.map((row, r) => row.map((mask, c) => mask === 0 ? BLANK : { ch: String.fromCodePoint(10240 + mask), style: style(owner[r][c]) }));
}
function barLayout(categories, seriesCount, width) {
  const slot = Math.floor(width / categories);
  if (slot < seriesCount)
    return;
  const bar = Math.max(1, Math.floor((slot - (slot > seriesCount ? 1 : 0)) / seriesCount));
  return { slot, bar, offset: Math.floor((slot - bar * seriesCount) / 2) };
}
function plotBars(model, width, height = PLOT_ROWS) {
  const layout = barLayout(model.xs.length, model.series.length, width);
  if (!layout)
    return;
  const cells = Array.from({ length: height }, () => new Array(width).fill(BLANK));
  model.xs.forEach((_, i) => {
    model.series.forEach((series, s) => {
      const value = series.values[i];
      if (value === undefined)
        return;
      let levels = Math.round(project(value, model.domain, height * 8));
      if (value > 0 && levels === 0)
        levels = 1;
      for (let r = 0;r < height; r++) {
        const fill = Math.max(0, Math.min(8, levels - (height - 1 - r) * 8));
        if (fill === 0)
          continue;
        for (let k = 0;k < layout.bar; k++) {
          cells[r][i * layout.slot + layout.offset + s * layout.bar + k] = { ch: BARS[fill], style: series.role };
        }
      }
    });
  });
  return { cells, columns: model.xs.map((_, i) => i * layout.slot + Math.floor(layout.slot / 2)) };
}
function axisRows(model, columns, width, indent) {
  const pad = " ".repeat(indent);
  const rows = [[{ text: `${pad}└${"─".repeat(width)}`, style: "axis" }]];
  const labels = model.xs.map(String);
  const line = new Array(width).fill(" ");
  const widths = labels.map((l) => l.length);
  for (const { index, start } of placeLabels(columns, widths, width)) {
    for (const [k, ch] of [...labels[index]].entries())
      line[start + k] = ch;
  }
  rows.push([{ text: `${pad} ${line.join("")}`, style: "axis" }]);
  const marks = model.markers.filter((m) => m.index !== undefined);
  if (marks.length > 0) {
    const cells = new Array(width).fill(BLANK);
    for (const m of marks)
      cells[columns[m.index]] = { ch: markerGlyph(m.n), style: "marker" };
    rows.push([{ text: `${pad} `, style: "plain" }, ...toRow(cells)]);
  }
  return rows;
}
function yLabels(model, withTheUnit) {
  const label = (v) => withTheUnit ? withUnit(formatValue(v), model.unit) : formatValue(v);
  const top = label(model.domain.hi);
  const bottom = label(model.domain.lo);
  return { top, bottom, gutter: Math.max(top.length, bottom.length) };
}
function plotRows(model, columns) {
  if (!model.readable)
    return;
  let labels = yLabels(model, true);
  const unitNote = labels.gutter > Math.floor(columns * 0.4) && model.unit;
  if (unitNote)
    labels = yLabels(model, false);
  const width = columns - labels.gutter - 2;
  if (width < 10)
    return;
  let cells;
  let xColumns;
  if (model.kind === "bar") {
    if (model.series.some((s) => s.values.some((v) => v !== undefined && v < 0)))
      return;
    const bars = plotBars(model, width);
    if (!bars)
      return;
    cells = bars.cells;
    xColumns = bars.columns;
  } else {
    cells = plotLine(model, width);
    xColumns = lineColumns(model.xs.length, width);
  }
  for (const m of model.markers) {
    if (m.index === undefined)
      continue;
    for (const row of cells)
      if (row[xColumns[m.index]].ch === " ")
        row[xColumns[m.index]] = { ch: "┊", style: "guide" };
  }
  const rows = cells.map((row, r) => {
    const label = r === 0 ? labels.top : r === cells.length - 1 ? labels.bottom : "";
    const edge = label ? "┤" : "│";
    return [{ text: `${label.padStart(labels.gutter)} ${edge}`, style: "axis" }, ...toRow(row)];
  });
  const head = unitNote ? [[{ text: `y: ${model.unit}`, style: "axis" }]] : [];
  return [...head, ...rows, ...axisRows(model, xColumns, width, labels.gutter + 1)];
}
function legendRows(model, columns) {
  const swatch = (role) => model.kind === "bar" ? "██" : role === "baseline" ? "╌╌" : "━━";
  const entries = model.series.map((s) => [
    { text: swatch(s.role), style: s.role },
    { text: ` ${s.label}${s.role === "primary" ? "" : ` (${s.role})`}`, style: "plain" }
  ]);
  const length = (row) => row.reduce((sum, run) => sum + run.text.length, 0);
  const joined = entries.flatMap((row, i) => i === 0 ? row : [{ text: "   ", style: "plain" }, ...row]);
  return length(joined) <= columns ? [joined] : entries;
}
function markerRows(model) {
  return model.markers.map((m) => [
    { text: m.index === undefined ? "·" : markerGlyph(m.n), style: "marker" },
    { text: ` ${m.at}: ${m.label}${m.index === undefined ? " (no matching x)" : ""}`, style: "plain" }
  ]);
}
function readingRows(model) {
  const lines = [
    ["atLeast", "≥ at least"],
    ["estimate", "~ about"],
    ["unknown", "— unknown (the line breaks)"]
  ];
  return lines.flatMap(([kind, head]) => {
    const where = model.series.flatMap((s) => s.kinds.flatMap((k, i) => k === kind ? [`${s.label} ${model.xs[i]}`] : []));
    return where.length === 0 ? [] : [[{ text: `${head}: ${where.join(", ")}`, style: "plain" }]];
  });
}

// src/draw/theme.ts
var TONE_COLOR = {
  neutral: undefined,
  positive: "green",
  warning: "yellow",
  critical: "red",
  muted: undefined
};
var isDim = (tone) => tone === "muted";
var ACCENT = "cyan";
var SVG = {
  accent: "#1fa2b8",
  quiet: "#888888",
  warning: "#c98a00"
};

// src/draw/chart.tsx
var MIN_COLUMNS = 30;
var PIXELS_PER_COLUMN = 8;
var MAX_SVG_WIDTH = 720;
var SVG_COLORS = {
  primary: SVG.accent,
  baseline: SVG.quiet,
  comparison: SVG.accent,
  marker: SVG.warning,
  quiet: SVG.quiet
};
var TEXT_STYLE = {
  primary: { color: ACCENT },
  comparison: { color: ACCENT, dimColor: true },
  baseline: { dimColor: true },
  guide: { dimColor: true },
  axis: { dimColor: true },
  marker: { color: TONE_COLOR.warning },
  plain: {}
};
var hasSvg = (el) => ("Svg" in el);
var chart = defineDrawer({
  type: "Chart",
  draw: (props, { el, columns, text, surface }) => {
    const fallback = /* @__PURE__ */ h(el.Markdown, {
      text: text(props)
    });
    if (columns < MIN_COLUMNS)
      return fallback;
    const model = buildModel(props);
    if (!model.readable)
      return fallback;
    const asRows = (rows) => rows.map((row) => /* @__PURE__ */ h(el.Box, {
      flexDirection: "row"
    }, row.map((run) => /* @__PURE__ */ h(el.Text, {
      ...TEXT_STYLE[run.style]
    }, run.text))));
    let plot;
    if (surface === "terminal" || !hasSvg(el)) {
      const rows = plotRows(model, columns);
      if (!rows)
        return fallback;
      plot = asRows(rows);
    } else {
      const width = Math.min(columns * PIXELS_PER_COLUMN, MAX_SVG_WIDTH);
      plot = /* @__PURE__ */ h(el.Svg, {
        source: buildSvg(model, width, Math.round(width * 0.45), SVG_COLORS),
        alt: chartLabel(model, props.title)
      });
    }
    return /* @__PURE__ */ h(el.Box, {
      flexDirection: "column"
    }, props.title ? /* @__PURE__ */ h(el.Text, {
      bold: true
    }, props.title) : null, asRows(legendRows(model, columns)), plot, asRows(markerRows(model)), asRows(readingRows(model)));
  }
});

// src/draw/choice-view.ts
function choiceView(props, state) {
  if (state.kind === "refused")
    return { kind: "open", refused: state.why };
  if (state.kind !== "sent" || props.repeat === "many" || state.answer.kind !== "press")
    return { kind: "open" };
  const pressed = state.answer.option;
  return { kind: "used", chosen: `✓ ${props.options.find((o) => o.id === pressed)?.label ?? pressed}` };
}
var variantOf = (emphasis) => emphasis === "primary" ? "primary" : undefined;

// src/draw/choice.tsx
var choice = defineDrawer({
  type: "Choice",
  draw: (props, ctx) => {
    const { el, key } = ctx;
    const view = choiceView(props, ctx.control(props.id));
    const prompt = props.prompt ? /* @__PURE__ */ h(el.Markdown, {
      text: props.prompt
    }) : null;
    if (view.kind === "used") {
      return /* @__PURE__ */ h(el.Box, {
        flexDirection: "column"
      }, prompt, /* @__PURE__ */ h(el.Text, {
        dimColor: true
      }, view.chosen));
    }
    return /* @__PURE__ */ h(el.Box, {
      flexDirection: "column"
    }, prompt, /* @__PURE__ */ h(el.Box, {
      flexDirection: "row",
      gap: 1,
      flexWrap: "wrap"
    }, props.options.map((option) => /* @__PURE__ */ h(el.Button, {
      key: key("option", option.id),
      label: option.label,
      variant: variantOf(option.emphasis),
      onPress: () => ctx.answer(props.id, { kind: "press", option: option.id })
    }))), view.refused ? /* @__PURE__ */ h(el.Text, {
      color: "red"
    }, `Could not send that: ${view.refused}`) : null);
  }
});

// src/draw/flow-layout.ts
function truncate(text, width) {
  const chars = [...text];
  if (chars.length <= width)
    return text;
  return width <= 1 ? chars.slice(0, Math.max(width, 0)).join("") : `${chars.slice(0, width - 1).join("")}…`;
}
function wrap(text, width) {
  const room = Math.max(1, width);
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    let rest = [...word];
    while (rest.length > room) {
      if (line)
        lines.push(line);
      line = "";
      lines.push(rest.slice(0, room).join(""));
      rest = rest.slice(room);
    }
    const piece = rest.join("");
    if (!line)
      line = piece;
    else if ([...line].length + 1 + rest.length <= room)
      line += ` ${piece}`;
    else {
      lines.push(line);
      line = piece;
    }
  }
  if (line)
    lines.push(line);
  return lines.length ? lines : [""];
}
function asSequence(analysis, count) {
  if (analysis.layers.length !== count)
    return;
  const order = analysis.layers.map((layer) => layer[0]);
  const straight = analysis.edges.every((edge) => analysis.layerOf[edge.to] === analysis.layerOf[edge.from] + 1);
  return straight ? order : undefined;
}
function boxLines(step, notes, cap) {
  return [
    ...wrap(step.label, cap).map((text) => ({ text, kind: "title" })),
    ...step.detail ? wrap(step.detail, cap).map((text) => ({ text, kind: "detail" })) : [],
    ...notes.flatMap((note) => wrap(note, cap).map((text) => ({ text, kind: "note" })))
  ];
}
function backNotes(steps, analysis) {
  return steps.map((_, i) => analysis.back.filter((edge) => edge.from === i).map((edge) => `↩ ${steps[edge.to].label}${edge.label ? ` (${edge.label})` : ""}`));
}
var boxWidth = (lines) => Math.max(...lines.map((line) => [...line.text].length)) + 4;
var ARROW_LABEL_MAX = 14;
var ROW_CAPS = [32, 22, 16];
var arrowText = (label) => label ? `─ ${truncate(label, ARROW_LABEL_MAX)} ─→` : "──→";
function planSequence(steps, notes, arrows, columns) {
  const arrowWidth = arrows.reduce((sum, label) => sum + [...arrowText(label)].length, 0);
  for (const cap of ROW_CAPS) {
    const boxes = steps.reduce((sum, step, i) => sum + boxWidth(boxLines(step, notes[i], cap)), 0);
    if (boxes + arrowWidth <= columns)
      return { direction: "row", cap };
  }
  return { direction: "column", cap: Math.max(1, columns - 4) };
}
var N = 1;
var E = 2;
var S = 4;
var W = 8;
var GLYPH = {
  [E]: "─",
  [W]: "─",
  [E | W]: "─",
  [N]: "│",
  [S]: "│",
  [N | S]: "│",
  [E | S]: "╭",
  [W | S]: "╮",
  [E | N]: "╰",
  [W | N]: "╯",
  [N | S | E]: "├",
  [N | S | W]: "┤",
  [E | W | S]: "┬",
  [E | W | N]: "┴",
  [N | S | E | W]: "┼"
};
var GRID_CAPS = [24, 16, 12];
function canvasOf(rows, cols) {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({ ch: " ", kind: "blank", mask: 0, edges: new Set })));
}
function put(canvas, row, col, ch, kind) {
  const cell = canvas[row]?.[col];
  if (cell)
    Object.assign(cell, { ch, kind });
}
function paintBox(canvas, top, left, width, lines) {
  const bottom = top + lines.length + 1;
  put(canvas, top, left, "╭", "border");
  put(canvas, top, left + width - 1, "╮", "border");
  put(canvas, bottom, left, "╰", "border");
  put(canvas, bottom, left + width - 1, "╯", "border");
  for (let c = 1;c < width - 1; c++) {
    put(canvas, top, left + c, "─", "border");
    put(canvas, bottom, left + c, "─", "border");
  }
  lines.forEach((line, k) => {
    put(canvas, top + 1 + k, left, "│", "border");
    put(canvas, top + 1 + k, left + width - 1, "│", "border");
    [...line.text].forEach((ch, c) => put(canvas, top + 1 + k, left + 2 + c, ch, line.kind));
  });
}
function laySegment(canvas, id, edges, row, a, b, vertical) {
  const [lo, hi] = [Math.min(a, b), Math.max(a, b)];
  for (let k = lo;k <= hi; k++) {
    const cell = vertical ? canvas[k]?.[row] : canvas[row]?.[k];
    if (!cell)
      return false;
    for (const other of cell.edges) {
      if (other !== id && edges[other].from !== edges[id].from && edges[other].to !== edges[id].to)
        return false;
    }
    cell.edges.add(id);
    const [before, after] = vertical ? [N, S] : [W, E];
    cell.mask |= (k > lo ? before : 0) | (k < hi ? after : 0);
  }
  return true;
}
function drawLines(canvas) {
  for (const row of canvas)
    for (const cell of row)
      if (cell.mask)
        Object.assign(cell, { ch: GLYPH[cell.mask] ?? "─", kind: "arrow" });
}
function paintLabel(canvas, row, col, text) {
  for (const [k, ch] of [...text].entries()) {
    const cell = canvas[row]?.[col + k];
    if (!cell || cell.kind !== "blank")
      return false;
    Object.assign(cell, { ch, kind: "edge" });
  }
  return true;
}
function runsOf(canvas) {
  return canvas.map((row) => toRuns(row));
}
function layoutGrid(steps, analysis, columns) {
  const notes = backNotes(steps, analysis);
  if (analysis.edges.some((edge) => analysis.layerOf[edge.to] !== analysis.layerOf[edge.from] + 1))
    return;
  for (const cap of GRID_CAPS) {
    const grid = tryGrid(steps, analysis, notes, cap, columns);
    if (grid)
      return grid;
  }
  return;
}
function placeVertically(analysis, height) {
  const { layers, edges } = analysis;
  const top = new Array(height.length).fill(0);
  const mid = (i) => top[i] + 1;
  const centre = (neighbours) => neighbours.length ? Math.round(neighbours.reduce((a, b) => a + b, 0) / neighbours.length) - 1 : 0;
  layers.forEach((layer) => {
    let next = 0;
    for (const i of layer) {
      top[i] = Math.max(next, centre(edges.filter((e) => e.to === i).map((e) => mid(e.from))));
      next = top[i] + height[i] + 1;
    }
  });
  for (let l = layers.length - 2;l >= 0; l--) {
    let next = 0;
    for (const i of layers[l]) {
      const after = edges.filter((e) => e.from === i).map((e) => mid(e.to));
      top[i] = Math.max(next, centre(after), after.length ? 0 : top[i]);
      next = top[i] + height[i] + 1;
    }
  }
  const shift = Math.min(...top);
  return top.map((t) => t - shift);
}
function tryGrid(steps, analysis, notes, cap, columns) {
  const { layers, edges, layerOf } = analysis;
  const lines = steps.map((step, i) => boxLines(step, notes[i], cap));
  const width = lines.map(boxWidth);
  const height = lines.map((l) => l.length + 2);
  const layerWidth = layers.map((layer) => Math.max(...layer.map((i) => width[i])));
  const gutter = layers.slice(1).map((_, l) => {
    const labels = edges.filter((e) => layerOf[e.from] === l).map((e) => [...e.label ?? ""].length);
    return Math.max(5, Math.max(0, ...labels) + 5);
  });
  const left = [];
  let total = 0;
  layers.forEach((_, l) => {
    left.push(total);
    total += layerWidth[l] + (gutter[l] ?? 0);
  });
  if (total > columns)
    return;
  const top = placeVertically(analysis, height);
  const canvas = canvasOf(Math.max(...steps.map((_, i) => top[i] + height[i])), total);
  layers.forEach((layer, l) => {
    for (const i of layer)
      paintBox(canvas, top[i], left[l], width[i], lines[i]);
  });
  const outdeg = (i) => edges.filter((e) => e.from === i).length;
  const indeg = (i) => edges.filter((e) => e.to === i).length;
  const labels = [];
  for (let id = 0;id < edges.length; id++) {
    const edge = edges[id];
    const l = layerOf[edge.from];
    const ys = top[edge.from] + 1;
    const yt = top[edge.to] + 1;
    const sourceRight = left[l] + width[edge.from];
    const gx = left[l] + layerWidth[l];
    const gw = gutter[l];
    const trunkAtTarget = outdeg(edge.from) === 1 && indeg(edge.to) > 1;
    const trunk = trunkAtTarget ? gx + gw - 3 : gx + 1;
    if (!laySegment(canvas, id, edges, ys, sourceRight, trunk, false))
      return;
    if (ys !== yt && !laySegment(canvas, id, edges, trunk, ys, yt, true))
      return;
    if (!laySegment(canvas, id, edges, yt, trunk, gx + gw - 1, false))
      return;
    if (edge.label)
      labels.push(trunkAtTarget ? { row: ys - 1, col: gx + 1, text: edge.label } : { row: yt - 1, col: gx + 3, text: edge.label });
  }
  drawLines(canvas);
  for (const edge of edges) {
    const l = layerOf[edge.from];
    put(canvas, top[edge.to] + 1, left[l] + layerWidth[l] + gutter[l] - 1, "→", "arrow");
  }
  for (const label of labels)
    if (!paintLabel(canvas, label.row, label.col, label.text))
      return;
  return runsOf(canvas);
}
function toRuns(row) {
  const runs = [];
  for (const cell of row) {
    const last = runs[runs.length - 1];
    if (last && last.kind === cell.kind)
      last.text += cell.ch;
    else
      runs.push({ text: cell.ch, kind: cell.kind });
  }
  if (runs[runs.length - 1]?.kind === "blank")
    runs.pop();
  return runs;
}
function linkLine(steps, edge, isBack, columns) {
  return truncate(`${isBack ? "↩" : "→"} ${steps[edge.to].label}${edge.label ? ` (${edge.label})` : ""}`, columns);
}

// src/draw/flow.tsx
var textProps = (kind) => kind === "title" ? { bold: true } : kind === "detail" || kind === "note" ? { dimColor: true } : kind === "arrow" ? { color: ACCENT } : {};
function stepBox(ctx, lines, key) {
  const { el } = ctx;
  return /* @__PURE__ */ h(el.Box, {
    key: ctx.key(key),
    flexDirection: "column",
    borderStyle: "round",
    paddingX: 1,
    flexShrink: 0
  }, lines.map((line, i) => /* @__PURE__ */ h(el.Text, {
    key: ctx.key(key, String(i)),
    ...textProps(line.kind)
  }, line.text)));
}
function drawSequence(props, order, ctx) {
  const { el, columns } = ctx;
  const analysis = analyse(props.steps, props.links);
  const notes = backNotes(props.steps, analysis);
  const steps = order.map((i) => props.steps[i]);
  const arrows = order.slice(1).map((to, k) => analysis.edges.find((e) => e.from === order[k] && e.to === to)?.label);
  const plan = planSequence(steps, order.map((i) => notes[i]), arrows, columns);
  const boxes = order.map((i) => boxLines(props.steps[i], notes[i], plan.cap));
  if (plan.direction === "row") {
    return /* @__PURE__ */ h(el.Box, {
      flexDirection: "row",
      alignItems: "center"
    }, boxes.flatMap((lines, k) => [
      ...k > 0 ? [/* @__PURE__ */ h(el.Text, {
        key: ctx.key("arrow", String(k)),
        color: ACCENT
      }, arrowText(arrows[k - 1]))] : [],
      stepBox(ctx, lines, `step${k}`)
    ]));
  }
  return /* @__PURE__ */ h(el.Box, {
    flexDirection: "column"
  }, boxes.flatMap((lines, k) => {
    const pad = Math.floor(boxWidth(lines) / 2);
    const label = arrows[k - 1];
    return [
      ...k > 0 ? [
        /* @__PURE__ */ h(el.Box, {
          key: ctx.key("arrow", String(k)),
          paddingLeft: pad
        }, /* @__PURE__ */ h(el.Text, {
          color: ACCENT
        }, truncate(label ? `↓ ${label}` : "↓", Math.max(1, columns - pad))))
      ] : [],
      stepBox(ctx, lines, `step${k}`)
    ];
  }));
}
function drawList(props, ctx) {
  const { el, columns } = ctx;
  const analysis = analyse(props.steps, props.links);
  return /* @__PURE__ */ h(el.Box, {
    flexDirection: "column"
  }, props.steps.map((step, i) => {
    const links = [
      ...analysis.edges.filter((e) => e.from === i).map((edge) => linkLine(props.steps, edge, false, columns - 2)),
      ...analysis.back.filter((e) => e.from === i).map((edge) => linkLine(props.steps, edge, true, columns - 2))
    ];
    return /* @__PURE__ */ h(el.Box, {
      key: ctx.key("step", String(i)),
      flexDirection: "column"
    }, stepBox(ctx, boxLines(step, [], Math.max(1, columns - 4)), `box${i}`), links.map((line, k) => /* @__PURE__ */ h(el.Text, {
      key: ctx.key("link", String(i), String(k)),
      color: ACCENT
    }, `  ${line}`)));
  }));
}
var flow = defineDrawer({
  type: "Flow",
  draw: (props, ctx) => {
    const { el } = ctx;
    const analysis = analyse(props.steps, props.links);
    const order = asSequence(analysis, props.steps.length);
    if (order)
      return drawSequence(props, order, ctx);
    const grid = layoutGrid(props.steps, analysis, ctx.columns);
    if (!grid)
      return drawList(props, ctx);
    return /* @__PURE__ */ h(el.Box, {
      flexDirection: "column"
    }, grid.map((runs, row) => /* @__PURE__ */ h(el.Box, {
      key: ctx.key("row", String(row)),
      flexDirection: "row"
    }, runs.length === 0 ? /* @__PURE__ */ h(el.Text, null, " ") : runs.map((run, i) => /* @__PURE__ */ h(el.Text, {
      key: ctx.key("run", String(row), String(i)),
      ...textProps(run.kind)
    }, run.text)))));
  }
});

// src/draw/form-logic.ts
var isEmpty = (value) => value === undefined || typeof value === "string" && value.trim() === "";
function missingRequired(fields, valueOf) {
  return fields.filter((field) => field.required && isEmpty(valueOf(field.id))).map((field) => field.label);
}
var show = (field, value) => field.input === "checkbox" ? value === true ? "yes" : "no" : isEmpty(value) ? "-" : String(value);
function summarize(fields, valueOf) {
  return fields.map((field) => `${field.label}: ${show(field, valueOf(field.id))}`);
}
function blockedNote(missing, invalid) {
  const parts = [
    missing.length ? `Still needed: ${missing.join(", ")}` : "",
    invalid.length ? `Fix: ${invalid.join("; ")}` : ""
  ].filter(Boolean);
  return parts.length ? parts.join(". ") : undefined;
}
var checkboxLabel = (field, checked) => `${checked ? "[x]" : "[ ]"} ${field.label}${field.required ? " *" : ""}`;
var fieldLabel = (field) => `${field.label}${field.required ? " *" : ""}`;

// src/draw/form.tsx
var fieldElements = (ctx) => ctx.surface === "mobile" ? undefined : ctx.el;
async function guarded(ctx, noteKey, run) {
  try {
    await ctx.setNote(noteKey, undefined);
    await run();
  } catch (error) {
    await ctx.setNote(noteKey, whyOf(error));
  }
}
var form = defineDrawer({
  type: "Form",
  draw: (props, ctx) => {
    const { el, key } = ctx;
    const valueOf = (fieldId) => ctx.field(props.id, fieldId);
    const state = ctx.control(props.id);
    if (state.kind === "sent") {
      return /* @__PURE__ */ h(el.Box, {
        flexDirection: "column"
      }, /* @__PURE__ */ h(el.Text, {
        dimColor: true
      }, "✓ Sent"), summarize(props.fields, valueOf).map((line, i) => /* @__PURE__ */ h(el.Text, {
        key: key("sent", String(i)),
        dimColor: true
      }, line)));
    }
    const inputs = fieldElements(ctx);
    if (!inputs) {
      return /* @__PURE__ */ h(el.Box, {
        flexDirection: "column"
      }, /* @__PURE__ */ h(el.Markdown, {
        text: ctx.text(props)
      }), /* @__PURE__ */ h(el.Text, {
        dimColor: true
      }, "This form can be filled in on the terminal or desktop."));
    }
    const numberKey = (field) => key("field", field.id, "number");
    const effective = (field) => ctx.note(numberKey(field)) !== undefined ? undefined : valueOf(field.id);
    const invalid = props.fields.filter((f) => f.input === "number" && ctx.note(numberKey(f)) !== undefined).map((f) => `${f.label} ${ctx.note(numberKey(f))}`);
    const missing = missingRequired(props.fields, (fieldId) => effective(props.fields.find((f) => f.id === fieldId)));
    const blocked = blockedNote(missing, invalid);
    const fieldFailure = (field) => ctx.note(key("field", field.id));
    const submitFailure = state.kind === "refused" ? state.why : undefined;
    const save = (fieldId, value) => ctx.setField(props.id, fieldId, value);
    const control = (field) => {
      const fieldKey = key("field", field.id);
      const label = fieldLabel(field);
      if (field.input === "checkbox") {
        const checked = valueOf(field.id) === true;
        return /* @__PURE__ */ h(el.Button, {
          key: fieldKey,
          label: checkboxLabel(field, checked),
          onPress: () => guarded(ctx, fieldKey, () => save(field.id, !checked))
        });
      }
      if (field.input === "select") {
        const current = valueOf(field.id);
        return /* @__PURE__ */ h(inputs.Select, {
          key: fieldKey,
          label,
          options: (field.options ?? []).map((value) => ({ value })),
          value: typeof current === "string" ? current : undefined,
          onSelect: (value) => guarded(ctx, fieldKey, () => save(field.id, value))
        });
      }
      if (field.input === "number") {
        const stored = valueOf(field.id);
        const commit = (raw) => guarded(ctx, fieldKey, async () => {
          const parsed = parseNumber(raw);
          if (parsed.kind === "value") {
            await ctx.setNote(numberKey(field), undefined);
            return save(field.id, parsed.value);
          }
          if (parsed.kind === "invalid")
            await ctx.setNote(numberKey(field), parsed.note);
          else
            await ctx.setNote(numberKey(field), stored !== undefined ? "needs a number" : undefined);
        });
        return /* @__PURE__ */ h(inputs.Input, {
          key: fieldKey,
          label,
          placeholder: "number",
          value: ctx.note(numberKey(field)) !== undefined || stored === undefined ? undefined : String(stored),
          onInput: commit,
          onSubmit: commit
        });
      }
      const commit = (value) => guarded(ctx, fieldKey, () => save(field.id, value));
      const stored = valueOf(field.id);
      return /* @__PURE__ */ h(inputs.Input, {
        key: fieldKey,
        label,
        value: typeof stored === "string" ? stored : undefined,
        onInput: commit,
        onSubmit: commit
      });
    };
    return /* @__PURE__ */ h(el.Box, {
      flexDirection: "column"
    }, props.fields.map((field) => /* @__PURE__ */ h(el.Box, {
      key: key("row", field.id),
      flexDirection: "column"
    }, control(field), fieldFailure(field) ? /* @__PURE__ */ h(el.Text, {
      color: "red"
    }, fieldFailure(field)) : null, field.input === "number" && ctx.note(numberKey(field)) !== undefined ? /* @__PURE__ */ h(el.Text, {
      color: "yellow"
    }, ctx.note(numberKey(field))) : null)), /* @__PURE__ */ h(el.Button, {
      key: key("submit"),
      label: props.submitLabel,
      variant: "primary",
      onPress: async () => {
        if (blocked)
          return;
        const values = Object.fromEntries(props.fields.flatMap((f) => valueOf(f.id) === undefined ? [] : [[f.id, valueOf(f.id)]]));
        await ctx.answer(props.id, { kind: "submit", values });
      }
    }), blocked ? /* @__PURE__ */ h(el.Text, {
      color: "yellow"
    }, blocked) : null, submitFailure ? /* @__PURE__ */ h(el.Text, {
      color: "red"
    }, `Could not send: ${submitFailure}`) : null);
  }
});

// src/draw/group.tsx
var ROW_MIN_COLUMNS = 60;
var group = defineDrawer({
  type: "Group",
  draw: (props, { el, columns, child }) => {
    const isRow = props.direction === "row" && columns >= ROW_MIN_COLUMNS;
    const each = isRow ? Math.floor(columns / props.children.length) - 2 : columns;
    return /* @__PURE__ */ h(el.Box, {
      flexDirection: isRow ? "row" : "column",
      gap: isRow ? 2 : 1,
      flexWrap: isRow ? "wrap" : "nowrap"
    }, props.children.map((node) => child(node, each)));
  }
});

// src/draw/label-shape.ts
function fit(text, columns) {
  const room = Math.max(1, columns);
  const chars = [...text];
  if (chars.length <= room)
    return text;
  return room === 1 ? "…" : chars.slice(0, room - 1).join("") + "…";
}
function tagText(text, columns) {
  if (columns < 3)
    return fit(text, columns);
  return `[${fit(text, columns - 2)}]`;
}

// src/draw/label.tsx
var label = defineDrawer({
  type: "Label",
  draw: (props, { el, columns }) => /* @__PURE__ */ h(el.Text, {
    color: TONE_COLOR[props.tone],
    dimColor: isDim(props.tone),
    bold: props.tone !== "muted",
    wrap: "truncate-end"
  }, tagText(props.text, columns))
});

// src/draw/stat-shape.ts
var MARKER = { up: "▲", down: "▼", flat: "–" };
function readingLine(reading, unit) {
  switch (reading.kind) {
    case "exact":
    case "atLeast":
    case "estimate":
      return `${READING_MARK[reading.kind]}${formatNumber(reading.value, unit)}`;
    case "unknown":
      return "— unknown";
    default:
      return reading;
  }
}
function changeText2(change) {
  const shape = changeShape(change);
  const unit = change.as === "percent" ? "%" : undefined;
  const figure = readingLine(shape.figure === undefined ? change.value : { kind: shape.kind, value: shape.figure }, unit);
  return shape.way ? `${MARKER[shape.way]} ${figure}` : figure;
}
function statLines(props, columns) {
  return {
    label: fit(props.label, columns),
    value: fit(readingLine(props.value, props.unit), columns),
    change: props.change ? fit(changeText2(props.change), columns) : undefined
  };
}

// src/draw/stat.tsx
var stat = defineDrawer({
  type: "Stat",
  draw: (props, { el, columns }) => {
    const lines = statLines(props, columns);
    return /* @__PURE__ */ h(el.Box, {
      flexDirection: "column"
    }, /* @__PURE__ */ h(el.Text, {
      dimColor: true,
      wrap: "truncate-end"
    }, lines.label), /* @__PURE__ */ h(el.Text, {
      bold: true,
      wrap: "truncate-end"
    }, lines.value), lines.change ? /* @__PURE__ */ h(el.Text, {
      color: TONE_COLOR[props.tone],
      dimColor: isDim(props.tone),
      wrap: "truncate-end"
    }, lines.change) : null, props.note ? /* @__PURE__ */ h(el.Text, {
      color: props.tone === "neutral" ? undefined : TONE_COLOR[props.tone],
      dimColor: props.tone === "neutral" || isDim(props.tone),
      wrap: "wrap"
    }, props.note) : null);
  }
});

// src/draw/table-layout.ts
var GAP = 2;
var MIN_WIDTH = 4;
var HEADER_KEEP = 10;
function truncate2(text, width) {
  if (width <= 0)
    return "";
  if (text.length <= width)
    return text;
  if (width === 1)
    return "…";
  return `${text.slice(0, width - 1)}…`;
}
function pad(text, width, align) {
  const cut = truncate2(text, width);
  return align === "end" ? cut.padStart(width) : cut.padEnd(width);
}
function allocateWidths(natural, min, columns) {
  const room = columns - GAP * (natural.length - 1);
  const floor = natural.map((width, i) => Math.min(width, min[i]));
  if (floor.reduce((a, b) => a + b, 0) > room)
    return;
  const widths = [...natural];
  let total = widths.reduce((a, b) => a + b, 0);
  while (total > room) {
    let pick = -1;
    widths.forEach((width, i) => {
      if (width > floor[i] && (pick < 0 || width > widths[pick]))
        pick = i;
    });
    widths[pick]--;
    total--;
  }
  return widths;
}
function layoutTable(columnDefs, rows, columns) {
  const cells = rows.map((row) => columnDefs.map((column) => cellText(cellOf(row, column.key))));
  const natural = columnDefs.map((column, i) => Math.max(column.label.length, ...cells.map((r) => r[i].length)));
  const min = columnDefs.map((column) => Math.max(MIN_WIDTH, Math.min(column.label.length, HEADER_KEEP)));
  const widths = allocateWidths(natural, min, columns);
  if (!widths)
    return { kind: "stacked", blocks: stack(columnDefs, cells, columns) };
  const aligns = columnDefs.map((column) => alignOf(column, rows));
  const line = (values) => values.map((value, i) => pad(value, widths[i], aligns[i])).join(" ".repeat(GAP));
  return {
    kind: "grid",
    widths,
    aligns,
    header: line(columnDefs.map((column) => column.label)),
    separator: widths.map((width) => "─".repeat(width)).join(" ".repeat(GAP)),
    rows: cells.map(line)
  };
}
function stack(columnDefs, cells, columns) {
  return cells.map((row) => columnDefs.map((column, i) => truncate2(`${column.label}: ${row[i]}`, columns)));
}

// src/draw/table.tsx
var table = defineDrawer({
  type: "Table",
  draw: (props, { el, columns, key }) => {
    const layout = layoutTable(props.columns, props.rows, columns);
    const caption = props.caption ? /* @__PURE__ */ h(el.Text, {
      key: key("caption"),
      dimColor: true,
      wrap: "truncate"
    }, props.caption) : null;
    if (layout.kind === "stacked") {
      return /* @__PURE__ */ h(el.Box, {
        flexDirection: "column",
        gap: 1
      }, caption, layout.blocks.map((lines, r) => /* @__PURE__ */ h(el.Box, {
        key: key("row", String(r)),
        flexDirection: "column"
      }, lines.map((line, i) => /* @__PURE__ */ h(el.Text, {
        key: key("row", String(r), String(i)),
        wrap: "truncate"
      }, line)))));
    }
    return /* @__PURE__ */ h(el.Box, {
      flexDirection: "column"
    }, caption, /* @__PURE__ */ h(el.Text, {
      key: key("header"),
      bold: true,
      wrap: "truncate"
    }, layout.header), /* @__PURE__ */ h(el.Text, {
      key: key("rule"),
      dimColor: true,
      wrap: "truncate"
    }, layout.separator), layout.rows.map((line, r) => /* @__PURE__ */ h(el.Text, {
      key: key("row", String(r)),
      wrap: "truncate"
    }, line)));
  }
});

// src/draw/text.tsx
var text = defineDrawer({
  type: "Text",
  draw: (props, { el }) => /* @__PURE__ */ h(el.Markdown, {
    text: props.markdown
  })
});

// src/draw/index.tsx
var DRAWERS = new Map([text, group, label, stat, table, chart, flow, choice, form].map((drawer) => [drawer.type, drawer]));
function drawTree(tree, around) {
  const text = (node) => Catalog.kindOf(core2, node).toText(node, text);
  const draw = (node, path, columns) => {
    let index = 0;
    const ctx = {
      surface: around.surface,
      el: around.el,
      columns,
      tree,
      child: (child, room = columns) => draw(child, `${path}.${index++}`, room),
      text,
      key: (...parts) => [around.source, path, ...parts].join(":"),
      control: around.control,
      answer: around.answer,
      field: around.field,
      setField: around.setField,
      note: around.note,
      setNote: around.setNote
    };
    const drawer = DRAWERS.get(node.type);
    return drawer ? drawer.draw(node, ctx) : /* @__PURE__ */ h(around.el.Markdown, {
      text: text(node)
    });
  };
  return draw(tree.root, "root", around.columns);
}
var drawnTypes = () => [...DRAWERS.keys()];

// src/demo.ts
var DEMO_TOOL_NAME = "demo_chart";
var DEMO_TOOL_FULL_NAME = `mcp__intui__${DEMO_TOOL_NAME}`;
var DEMO_TOOL = {
  name: DEMO_TOOL_NAME,
  description: "IntUI demo: returns a Chart and a Stat built by code from FIXED SAMPLE DATA (not real figures). Call it only to check that code-written trees draw.",
  inputSchema: { type: "object", properties: {} }
};
var DEMO_ROOT = {
  type: "Group",
  direction: "column",
  children: [
    { type: "Text", markdown: "**Demo: sample data, not real figures**" },
    { type: "Stat", label: "Sample visitors", value: Reading.exact(1204), change: { value: Reading.exact(18), as: "percent" }, tone: "positive" },
    { type: "Stat", label: "Sample logged events", value: Reading.atLeast(216), unit: "events", change: { value: Reading.estimate(4), as: "percent" }, tone: "neutral" },
    { type: "Stat", label: "Sample cost", value: Reading.unknown(), tone: "neutral" },
    {
      type: "Chart",
      kind: "line",
      title: "Sample visitors (demo)",
      unit: "visitors",
      series: [
        { label: "This week", role: "primary", points: [{ x: "Mon", y: Reading.exact(120) }, { x: "Tue", y: Reading.estimate(180) }, { x: "Wed", y: Reading.unknown() }] },
        { label: "Usual", role: "baseline", points: [{ x: "Mon", y: Reading.exact(110) }, { x: "Tue", y: Reading.exact(115) }, { x: "Wed", y: Reading.atLeast(105) }] }
      ]
    }
  ]
};
var demoTree = () => Tree.of(DEMO_ROOT);

// src/envelope.ts
var MAX_TREES = 50;
var ENVELOPE_KEY = "intui";
var isRecord2 = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
function json(text) {
  const trimmed = text.trim();
  if (!trimmed.startsWith("{"))
    return;
  try {
    return JSON.parse(trimmed);
  } catch {
    return;
  }
}
function candidates(output) {
  if (typeof output === "string")
    return [json(output)];
  if (Array.isArray(output))
    return output.flatMap(candidates);
  if (!isRecord2(output))
    return [];
  if (output.type === "text" && typeof output.text === "string")
    return [json(output.text)];
  const blocks = Array.isArray(output.content) ? output.content : [];
  return [output, output.structuredContent, ...blocks.flatMap(candidates)];
}
function treeFromOutput(output) {
  for (const candidate of candidates(output)) {
    if (!isRecord2(candidate) || !(ENVELOPE_KEY in candidate))
      continue;
    const result = Tree.parse(candidate[ENVELOPE_KEY], { author: "code" });
    return result.kind === "parsed" ? result.value : undefined;
  }
  return;
}

// src/tool.ts
var TOOL_NAME = "show";
var DESCRIPTION = `Show the person an interactive answer: components drawn in the transcript instead of plain text.

Use it when a component says it better than prose: a Flow instead of an ASCII diagram, a Table for a comparison, a Choice when you want the person to pick what happens next. Don't use it when a sentence or two is enough.

The input is a tree: {"v": 1, "root": <component>}. Components:
${Catalog.describe(Catalog.writableBy(core2, "model"))}

Group holds others in a row or column. Pressing a Choice option sends you a message saying what was pressed. Charts and stats with numbers can't be written here: they must come from a tool that ran a query. The tool result is the tree's text form, so you can refer back to what you showed.

If you wanted a component that doesn't exist, draw the closest thing and say what you wanted in "wanted" (one line). That's how IntUI learns what to add.`;
function inputSchema() {
  const schema = Catalog.jsonSchema(Catalog.writableBy(core2, "model"));
  return {
    ...schema,
    properties: {
      ...schema.properties,
      wanted: { type: "string", description: "Optional: a component you needed that IntUI lacks, in one line." }
    }
  };
}
var SHOW_TOOL = {
  name: TOOL_NAME,
  description: DESCRIPTION,
  inputSchema: inputSchema()
};
var estimatedToolTokens = () => Math.ceil(JSON.stringify(SHOW_TOOL).length / 4);

// src/usage.ts
var MAX_ENTRIES = 2000;
var MAX_START_DAYS = 60;
var TREND_DAYS = 14;
var INTERACTIVE = new Set(["Choice", "Form"]);
var PERSON = new Set(["composer", "bridge"]);
function shownEntry(tree, session, wanted, at = new Date, drawnNatively) {
  const types = {};
  for (const { node } of Tree.walk(tree))
    types[node.type] = (types[node.type] ?? 0) + 1;
  const native = drawnNatively ? new Set(drawnNatively) : undefined;
  const interactive = sum(Object.entries(types).filter(([type]) => INTERACTIVE.has(type)).map(([, n]) => n));
  const fallbacks = native ? sum(Object.entries(types).filter(([type]) => !native.has(type)).map(([, n]) => n)) : 0;
  return {
    at: at.toISOString(),
    session,
    outcome: "shown",
    types,
    ...interactive ? { interactive } : {},
    ...fallbacks ? { fallbacks } : {},
    ...wanted ? { wanted } : {}
  };
}
function codeEntry(tree, session, tool, at = new Date, drawnNatively) {
  return { ...shownEntry(tree, session, undefined, at, drawnNatively), author: "code", tool };
}
function refusedEntry(problems, session, wanted, at = new Date) {
  return { at: at.toISOString(), session, outcome: "refused", types: {}, problems, ...wanted ? { wanted } : {} };
}
function appended(log, entry) {
  return [...log, entry].slice(-MAX_ENTRIES);
}
function startCounted(starts, at = new Date) {
  const day = dayOf(at.toISOString());
  const next = { ...starts, [day]: (starts[day] ?? 0) + 1 };
  return Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)).slice(-MAX_START_DAYS));
}
function pendingAfterShow(pending, session, interactive) {
  const { [session]: _old, ...rest } = pending;
  return interactive > 0 ? { ...rest, [session]: interactive } : rest;
}
function pendingAfterAnswer(pending, session) {
  const { [session]: _old, ...rest } = pending;
  return rest;
}
function pendingAfterPrompt(pending, session, originKind) {
  if (!PERSON.has(originKind) || !pending[session])
    return { escaped: false, pending };
  return { escaped: true, pending: pendingAfterAnswer(pending, session) };
}
function retryPairs(log) {
  const open = new Map;
  const recovered = new Set;
  log.forEach((entry, index) => {
    if (entry.outcome === "refused")
      open.set(entry.session, [...open.get(entry.session) ?? [], index]);
    else {
      for (const i of open.get(entry.session) ?? [])
        recovered.add(i);
      open.delete(entry.session);
    }
  });
  return { recovered, abandoned: sum([...open.values()].map((run) => run.length)) };
}
function summary(all, input = {}) {
  const log = all.filter((entry) => entry.author !== "code");
  const code = all.filter((entry) => entry.author === "code");
  if (log.length === 0 && code.length === 0)
    return "No `show` calls recorded yet.";
  if (log.length === 0)
    return "No `show` calls recorded yet.";
  const now = input.now ?? new Date;
  const escapes = input.escapes ?? [];
  const starts = input.starts ?? {};
  const { recovered, abandoned } = retryPairs(log);
  const shown = log.filter((entry) => entry.outcome === "shown");
  const refused = log.length - shown.length;
  const sessions = new Set(log.map((entry) => entry.session)).size;
  const days = lastDays(now, TREND_DAYS);
  const rows = days.map((day) => {
    const calls = log.filter((entry) => dayOf(entry.at) === day);
    const ok = calls.filter((entry) => entry.outcome === "shown");
    const retried = log.filter((entry, i) => dayOf(entry.at) === day && recovered.has(i)).length;
    return {
      day,
      calls: calls.length,
      refused: calls.length - ok.length,
      ok: ok.length,
      retried,
      escapes: escapes.filter((escape) => dayOf(escape.at) === day).length,
      fallbacks: sum(ok.map((entry) => entry.fallbacks ?? 0))
    };
  });
  const interactiveShows = shown.filter((entry) => (entry.interactive ?? 0) > 0).length;
  const startCount = sum(Object.values(starts));
  const lines = [
    `**Last ${TREND_DAYS} days** (UTC, newest first). Read as a trend, not a gate.`,
    "",
    "| Day | Calls | Refused | Retries per success | Escapes | Fallbacks |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows.reverse().map((r) => `| ${r.day} | ${r.calls} | ${r.calls ? percent(r.refused, r.calls) : "-"} | ${ratio(r.retried, r.ok)} | ${r.escapes} | ${r.fallbacks} |`),
    "",
    "**Totals**",
    "",
    "| Signal | Value |",
    "| --- | --- |",
    `| Show calls | ${log.length} across ${sessions} ${sessions === 1 ? "session" : "sessions"} |`,
    `| Refused | ${refused} (${percent(refused, log.length)}) |`,
    `| Retries per success | ${ratio(recovered.size, shown.length)} (${abandoned} refused with no later success) |`,
    `| Escape rate | ${escapes.length} typed over ${interactiveShows} shows with a Choice or Form (${interactiveShows ? percent(escapes.length, interactiveShows) : "-"}) |`,
    `| Fallbacks | ${sum(shown.map((entry) => entry.fallbacks ?? 0))} nodes drawn as text because no drawer exists (width-based fallbacks are not observable) |`,
    `| Pinned tool cost | ${input.toolTokens === undefined ? "unknown" : `about ${input.toolTokens} tokens per session (estimate, ~4 characters per token)`} |`,
    `| Show calls per session | ${startCount ? (log.length / startCount).toFixed(2) : "-"} over ${startCount} recorded session starts |`
  ];
  const counts = new Map;
  for (const entry of shown)
    for (const [type, count] of Object.entries(entry.types))
      counts.set(type, (counts.get(type) ?? 0) + count);
  const ranked = [...counts].sort((a, b) => b[1] - a[1]);
  lines.push("", "| Component | Times used |", "| --- | --- |", ...ranked.map(([type, count]) => `| ${type} | ${count} |`));
  const wanted = log.flatMap((entry) => entry.wanted ? [entry.wanted] : []).slice(-10);
  if (wanted.length > 0)
    lines.push("", "**Wanted but missing** (latest first):", ...wanted.reverse().map((text) => `- ${text}`));
  lines.push(...codeLines(code));
  return lines.join(`
`);
}
function codeLines(code) {
  if (code.length === 0)
    return [];
  const counts = new Map;
  for (const entry of code)
    for (const [type, count] of Object.entries(entry.types))
      counts.set(type, (counts.get(type) ?? 0) + count);
  const tools = new Map;
  for (const entry of code)
    tools.set(entry.tool ?? "unknown", (tools.get(entry.tool ?? "unknown") ?? 0) + 1);
  return [
    "",
    "**Code-written trees** (returned by tools, not `show`)",
    "",
    "| Signal | Value |",
    "| --- | --- |",
    `| Trees | ${code.length} across ${new Set(code.map((entry) => entry.session)).size} sessions |`,
    `| Fallbacks | ${sum(code.map((entry) => entry.fallbacks ?? 0))} nodes drawn as text |`,
    "",
    "| Tool | Trees |",
    "| --- | --- |",
    ...[...tools].sort((a, b) => b[1] - a[1]).map(([tool, count]) => `| ${tool} | ${count} |`),
    "",
    "| Component | Times used (code-written) |",
    "| --- | --- |",
    ...[...counts].sort((a, b) => b[1] - a[1]).map(([type, count]) => `| ${type} | ${count} |`)
  ];
}
var sum = (numbers) => numbers.reduce((a, b) => a + b, 0);
var dayOf = (iso) => iso.slice(0, 10);
var percent = (part, whole) => `${Math.round(part / whole * 100)}%`;
var ratio = (part, whole) => whole ? (part / whole).toFixed(2) : "-";
var lastDays = (now, count) => Array.from({ length: count }, (_, i) => new Date(now.getTime() - (count - 1 - i) * 86400000).toISOString().slice(0, 10));

// src/register.tsx
var LOG = "usage";
var ESCAPES = "escapes";
var STARTS = "starts";
var PENDING = "pending";
var used = atom({ plugin: "intui", key: "used" }, {});
var controls = atom({ plugin: "intui", key: "controls" }, {});
var forms = atom({ plugin: "intui", key: "forms" }, {});
var trees = atom({ plugin: "intui", key: "trees" }, {});
var notes = atom({ plugin: "intui", key: "notes" }, {});
function showInput(input) {
  const { tool, tool_use_id, consent, agentId, wanted, ...tree } = input;
  return { tree, wanted: typeof wanted === "string" && wanted.trim() ? wanted.trim().slice(0, 200) : undefined };
}
async function drawForRow($, e, tree) {
  const source = e.props.tool_use_id;
  const answered = async () => $.store.set(PENDING, pendingAfterAnswer(await $.store.get(PENDING) ?? {}, await $.session.id()));
  const controlsNow = await read($, controls);
  const formsNow = await read($, forms);
  const notesNow = await read($, notes);
  const at = (id) => `${source}:${id}`;
  const fresh = startControl(true, undefined);
  const advance = async (controlId, event) => {
    const control = Tree.interactive(tree, controlId);
    if (!control)
      return;
    const step = stepControl({ source, control }, (await read($, controls))[at(controlId)] ?? fresh, event);
    if (!step.ignored)
      await update($, controls, (all) => ({ ...all, [at(controlId)]: step.state }));
    return step;
  };
  return drawTree(tree, {
    surface: e.surface,
    el: $.ui.resolve(e),
    columns: e.viewport?.columns ?? 80,
    source,
    control: (controlId) => controlsNow[at(controlId)] ?? fresh,
    answer: async (controlId, answer) => {
      const step = await advance(controlId, { kind: "answered", answer });
      for (const effect of step?.effects ?? []) {
        try {
          await answered();
          await $.prompt.submit({ text: Tree.describe(tree, effect.event) });
          await advance(controlId, { kind: "accepted" });
        } catch (error) {
          await advance(controlId, { kind: "refused", why: whyOf(error) });
        }
      }
    },
    field: (formId, fieldId) => formsNow[at(formId)]?.[fieldId],
    setField: async (formId, fieldId, value) => {
      await update($, forms, (all) => ({ ...all, [at(formId)]: { ...all[at(formId)], [fieldId]: value } }));
    },
    note: (id) => notesNow[at(id)],
    setNote: async (id, text) => {
      await update($, notes, (all) => {
        const { [at(id)]: _old, ...rest } = all;
        return text === undefined ? rest : { ...rest, [at(id)]: text };
      });
    }
  });
}
export const register = (on) => {
  on("session.start", async ($, e, next) => {
    const old = await read($, used);
    if (Object.keys(old).length > 0) {
      await update($, controls, (all) => ({
        ...Object.fromEntries(Object.entries(old).map(([key, value]) => [key, { kind: "sent", answer: value === "submitted" ? { kind: "submit", values: {} } : { kind: "press", option: value } }])),
        ...all
      }));
      await update($, used, () => ({}));
    }
    await $.store.set(STARTS, startCounted(await $.store.get(STARTS) ?? {}));
    await $.tool.register(SHOW_TOOL);
    await $.tool.register(DEMO_TOOL);
    await $.command.register({ name: "intui", description: "IntUI: how often each component was used, for evals" });
    return next(e);
  });
  on("tool.describe", { tool: "mcp__intui__show" }, async ($, e, next) => ({ ...await next(e), isDeferred: false }));
  on("command.run", { command: "intui" }, async ($) => ({
    text: summary(await $.store.get(LOG) ?? [], {
      escapes: await $.store.get(ESCAPES) ?? [],
      starts: await $.store.get(STARTS) ?? {},
      toolTokens: estimatedToolTokens()
    })
  }));
  on("prompt.submit", async ($, e, next) => {
    const session = await $.session.id();
    const verdict = pendingAfterPrompt(await $.store.get(PENDING) ?? {}, session, e.origin.kind);
    if (verdict.escaped) {
      await $.store.set(PENDING, verdict.pending);
      await $.store.set(ESCAPES, appended(await $.store.get(ESCAPES) ?? [], { at: new Date().toISOString(), session }));
    }
    return next(e);
  });
  on("tool.call", { tool: "mcp__intui__show" }, async ($, e) => {
    const { tree: input, wanted } = showInput(e);
    const session = await $.session.id();
    const log = async (entry) => $.store.set(LOG, appended(await $.store.get(LOG) ?? [], entry));
    const result = Tree.parse(input, { author: "model" });
    if (result.kind === "refused") {
      await log(refusedEntry(result.problems.length || 1, session, wanted));
      return { deny: result.message };
    }
    const entry = shownEntry(result.value, session, wanted, new Date, drawnTypes());
    await log(entry);
    await $.store.set(PENDING, pendingAfterShow(await $.store.get(PENDING) ?? {}, session, entry.interactive ?? 0));
    return { result: Tree.toText(result.value) };
  });
  on("ui.render", { component: "ToolUse", props: { tool: "mcp__intui__show" } }, async ($, e, next) => {
    if (e.props.isErrored || e.props.isInterrupted)
      return next(e);
    const result = Tree.parse(showInput(e.props.input).tree, { author: "model" });
    return result.kind === "parsed" ? drawForRow($, e, result.value) : next(e);
  });
  on("ui.render", { component: "ToolResult", props: { tool: "mcp__intui__show" } }, async ($, e, next) => {
    if (e.props.isErrored)
      return next(e);
    const { Box } = $.ui.resolve(e);
    return /* @__PURE__ */ h(Box, null);
  });
  on("ui.render", { component: "ToolResult" }, async ($, e, next) => {
    if (e.props.isErrored)
      return next(e);
    const kept = (await read($, trees))[e.props.tool_use_id];
    const fromStore = kept ? Tree.parse(kept, { author: "code" }) : undefined;
    const tree = fromStore ? fromStore.kind === "parsed" ? fromStore.value : undefined : treeFromOutput(e.props.output);
    return tree ? drawForRow($, e, tree) : next(e);
  });
  on("tool.call", async ($, e, next) => {
    let tree;
    let answer;
    if (e.tool === DEMO_TOOL_FULL_NAME) {
      const made = demoTree();
      tree = made;
      await update($, trees, (all) => Object.fromEntries(Object.entries({ ...all, [e.tool_use_id]: Tree.toJSON(made) }).slice(-MAX_TREES)));
      answer = { result: Tree.toText(made) };
    } else {
      answer = await next(e);
      if (e.tool !== "mcp__intui__show" && "result" in answer && answer.result !== undefined)
        tree = treeFromOutput(answer.result);
    }
    if (tree) {
      const entry = codeEntry(tree, await $.session.id(), e.tool, new Date, drawnTypes());
      await $.store.set(LOG, appended(await $.store.get(LOG) ?? [], entry));
    }
    return answer;
  });
};
