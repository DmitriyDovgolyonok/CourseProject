export default async function getCategories(collectionId) {
    const categories = await fetch('/api/get-categories')
        .catch(error => console.log(error))
    return await categories.json()
}
