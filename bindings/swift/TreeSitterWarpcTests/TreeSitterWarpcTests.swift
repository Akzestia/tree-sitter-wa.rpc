import XCTest
import SwiftTreeSitter
import TreeSitterWarpc

final class TreeSitterWarpcTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_warpc())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading warpc grammar")
    }
}
