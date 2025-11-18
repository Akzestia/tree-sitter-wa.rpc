/**
 * @file Warpc grammar for tree-sitter
 * @author アクゼスティア <akzestia@gmail.com>
 * @license MIT
 */

module.exports = grammar({
  name: "warpc",

  // treat whitespace and comments as extras
  extras: ($) => [/\s+/, $.comment],

  rules: {
    source_file: ($) => repeat($.message),

    comment: ($) => choice($.line_comment, $.block_comment),

    line_comment: ($) => token(seq(choice("--", "//"), /.*/)),

    block_comment: ($) => token(seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),

    // expect `message` + name + block
    message: ($) =>
      seq("message", $.identifier, "{", repeat($.message_field), "}"),

    // message field: name : type
    message_field: ($) => seq($.identifier, ":", $.warpc_types),

    // warpc types: either a builtin or an identifier, optionally followed by [] repeats
    warpc_types: ($) =>
      seq(
        choice($.basic_type, $.identifier), // builtin or user-defined type
        repeat(seq("[", "]")), // zero or more array suffixes: [] or [][] ...
      ),

    // built-in scalar types
    basic_type: () =>
      choice(
        "u8",
        "u16",
        "u32",
        "u64",
        "i16",
        "i32",
        "i64",
        "f32",
        "f64",
        "string",
        "bool",
      ),

    // identifiers should not start with a digit
    identifier: ($) => /[A-Za-z_][A-Za-z0-9_]*/,
  },
});
