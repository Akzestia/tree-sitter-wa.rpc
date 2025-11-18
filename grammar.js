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

    message: ($) =>
      seq(
        "message",
        field("message_name", $.identifier),
        "{",
        field("message_field", repeat($.message_field)),
        "}",
      ),

    message_field: ($) =>
      seq(
        field("field_name", $.identifier),
        ":",
        field("field_type", $.warpc_types),
      ),

    warpc_types: ($) =>
      seq(choice($.basic_type, $.identifier), repeat(seq("[", "]"))),

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

    identifier: ($) => /[A-Za-z_][A-Za-z0-9_]*/,
  },
});
