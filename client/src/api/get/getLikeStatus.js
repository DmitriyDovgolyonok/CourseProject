export default async function getLikeStatus(userId, collectionId) {
    const collections = await fetch('/api/get-like-status?uid=' + userId + '&id=' + collectionId)
        .catch(error => console.log(error))
    return await collections.json()
}
