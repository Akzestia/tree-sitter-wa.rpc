package tree_sitter_warpc_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_warpc "github.com/tree-sitter/tree-sitter-warpc/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_warpc.Language())
	if language == nil {
		t.Errorf("Error loading warpc grammar")
	}
}
