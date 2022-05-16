export default async function search(search) {
    const results = await fetch('/api/search?search=' + search)
        .catch(error => console.log(error))
    return await results.json()
}
