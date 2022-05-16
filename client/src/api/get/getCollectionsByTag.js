export default async function getCollectionsByTag(tag) {
    const collections = await fetch('/api/get-collections-by-tag?tag=' + tag)
        .catch(error => console.log(error))
    return await collections.json()
}
