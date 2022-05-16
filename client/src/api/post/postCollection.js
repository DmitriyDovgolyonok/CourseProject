import firebase from 'utils/firebase'

export default async function postCollection(title, category, tags, description, items, files) {
    var data = new FormData()
    data.append('title', title)
    data.append('category', category)
    data.append('tags', tags)
    data.append('description', description)
    data.append('items', JSON.stringify(items))
    files.forEach(file => data.append(file.title, file.file))
    await fetch('/api/post-collection', {
        method: 'POST',
        headers: {
            'Token': await firebase.auth().currentUser.getIdToken()
        },
        body: data
    })
        .catch(error => console.log(error))
}