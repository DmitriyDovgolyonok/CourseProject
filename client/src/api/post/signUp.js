export default async function signUp(name, email, password) {
    const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, password: password })
    })
    if (!response.ok) {
        throw new Error(await response.text())
    }
}
