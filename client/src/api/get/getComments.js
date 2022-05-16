export default async function getComments(collectionId) {
    const comments = await fetch('/api/get-comments?id=' + collectionId)
        .catch(error => console.log(error))
    return await comments.json()
}
