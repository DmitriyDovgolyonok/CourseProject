export default async function getAllCollections() {
    const collections = await fetch('/api/get-all-collections')
        .catch(error => console.log(error))
    return await collections.json()
}
