const readline = require('readline');
const dic = require('./dictionary_alpha_arrays');

// Define a class for Trie node
class TrieNode {
  constructor() {
    this.children = new Map();
    this.endOfWord = false;
  }
}

// Define a Trie data structure
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word into the Trie
  insert(word) {
    let currentNode = this.root;

    // Traverse the Trie, adding new nodes as necessary
    for (let i = 0; i < word.length; i++) {
      let ch = word.charAt(i);
      let node = currentNode.children.get(ch);

      if (!node) {
        node = new TrieNode();
        currentNode.children.set(ch, node);
      }

      currentNode = node;
    }

    // Mark the end of the word
    currentNode.endOfWord = true;
  }

  // Search for a word in the Trie
  search(word) {
    let currentNode = this.root;

    // Traverse the Trie, looking for the word
    for (let i = 0; i < word.length; i++) {
      let ch = word.charAt(i);
      let node = currentNode.children.get(ch);

      if (!node) {
        return false; // Word is not in the Trie
      }

      currentNode = node;
    }

    // Return true if the end of the word is marked in the Trie
    return currentNode.endOfWord;
  }

  // Return all words in the Trie that start with the given prefix
  getWordsWithPrefix(prefix) {
    let words = [];

    // Find the node corresponding to the prefix
    let currentNode = this.root;
    for (let i = 0; i < prefix.length; i++) {
      let ch = prefix.charAt(i);
      let node = currentNode.children.get(ch);

      if (!node) {
        return words; // Prefix is not in the Trie
      }

      currentNode = node;
    }

    // Traverse the subtree rooted at the prefix node
    this.traverse(currentNode, prefix, words);

    return words;
  }

  // Traverse the Trie subtree rooted at the given node, building a list of words
  traverse(node, prefix, words) {
    // If the node marks the end of a word, add it to the list
    if (node.endOfWord) {
      words.push(prefix);
    }

    // Recursively traverse the children of the node
    for (let [ch, child] of node.children) {
      this.traverse(child, prefix + ch, words);
    }
  }
}

// Create a new Trie and insert some words
const trie = new Trie();

var arrayOfwords = []
for(var i = 0; i < dic.data.length; i++)
{
  arrayOfwords.push(...Object.keys(dic.data[i]));
}

for(var i = 0; i < arrayOfwords.length; i++) 
{
  trie.insert(arrayOfwords[i]);
}

// Get user input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("ENTER THE PREFIX TO SEARCH : ", function(prefix) {
  // Print all words in the Trie that start with the given prefix

  const a = new Date();
  let words = trie.getWordsWithPrefix(prefix);
  console.log("Here are the words starting with " + prefix);
  console.log(words);
  
  const b = new Date();

  console.log("It took " + String(b - a) + " seconds to search the prefix [" + prefix + "]");

  rl.close();
});

