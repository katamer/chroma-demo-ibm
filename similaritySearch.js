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

async function main() {
    try {
        const collection = await client.getOrCreateCollection({
            name: collectionName,
            embeddings: default_emd,

        });

        const embeddingsData = await default_emd.generate(texts);

        collection.add({
            ids,
            documents: texts,
            embeddings: embeddingsData,
        })

        const allItems = await collection.get();
        await performSimilaritySearch(collection, allItems);
        
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
        const id = results.ids[0][i];
        const score = results.distances[0][i];
        const text = allItems.documents[allItems.ids.indexOf(id)];
        
        if(!text) {
            console.log(` - ID: ${id}, Text: 'Text not available', Score: ${score}`);
        }
        else {
            console.log(` - ID: ${id}, Text: '${text}', Score: ${score}`);
        }
    }
}

main();