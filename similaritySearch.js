const { ChromaClient, DefaultEmbeddingFunction } = require('chromadb');

// Array of grocery-related text items (e.g., product descriptions or names)
const texts = [
    'fresh red apples',
    'organic bananas',
    'ripe mangoes',
    'whole wheat bread',
    'farm-fresh eggs',
    'natural yogurt',
    'frozen vegetables',
    'grass-fed beef',
    'free-range chicken',
    'fresh salmon fillet',
    'aromatic coffee beans',
    'pure honey',
    'golden apple',
    'red fruit'
];

const client = new ChromaClient();
const collectionName = "my_grocery_collection";

const default_emd = new DefaultEmbeddingFunction();

const ids = texts.map((_, index) => `food_${index + 1}`);
const embeddingsData = await default_emd.generate(texts);

async function main() {
    try {
        const collection = await client.getOrCreateCollection({
            name: collectionName,
            embeddings: default_emd,

        })
        collection.add({
            ids,
            documents: texts,
            embeddings: embeddingsData,ata,
        })

        const allItems = await collection.get();
        console.log(allItems);
        
    }
    catch(error) {
        console.error("Error:", error);
    }
}

async function performSimilaritySearch(collection, allItems) {
    const queryTerm = 'apple';
    const results = await collection.query({
        collection: collectionName,
        queryTexts: [queryTerm],
        n: 3
    })

    if(!results || results.length === 0) {
        console.log(`No documents found similar to "${queryTerm}"`);
        return;
    }

    for(let i = 0; i < 3; i++) {
        co
    }

}