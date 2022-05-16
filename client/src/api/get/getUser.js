export default async function getUsers(userId) {
    const users = await fetch('/api/get-user?uid=' + userId)
        .catch(error => console.log(error))
    return await users.json()
}
