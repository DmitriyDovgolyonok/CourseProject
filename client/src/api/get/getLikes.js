export default async function getLikes(collectionId) {
    const likes = await fetch('/api/get-likes?id=' + collectionId)
        .catch(error => console.log(error))
    return await likes.json()
}
