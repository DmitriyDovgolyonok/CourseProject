export default async function getCollection(collectionId) {
    if (typeof collectionId !== 'string' || collectionId.length < 1) {
        throw new Error('Invalid argument')
    }
    const collection = await fetch('/api/get-collection?id=' + collectionId)
    if (!collection.ok) {
        throw new Error('Server error');
    }
    return await collection.json()
}
