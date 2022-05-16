export default async function getPopularTags() {
    const tags = await fetch('/api/get-popular-tags')
        .catch(error => console.log(error))
    return await tags.json()
}
