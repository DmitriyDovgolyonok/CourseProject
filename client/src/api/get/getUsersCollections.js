export default async function getUsersCollections(userId) {
    const collections = await fetch('/api/get-users-collections?uid=' + userId)
        .catch(error => console.log(error))
    return await collections.json()
}
