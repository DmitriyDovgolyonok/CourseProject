export default async function getBlockStatus(userId) {
    const status = await fetch('/api/get-block-status?uid=' + userId)
        .catch(error => console.log(error))
    return await status.json()
}
