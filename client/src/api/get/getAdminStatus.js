export default async function getAdminStatus(userId) {
    if (userId == null) {
        return false
    }
    var admin = await fetch('/api/get-admin-status?uid=' + userId)
        .catch(error => console.log(error))
    return await admin.json()
}
