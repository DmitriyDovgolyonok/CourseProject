export default async function getTags() {
    const tags = await fetch('/api/get-tags')
        .catch(error => console.log(error))
    return await tags.json()
}
