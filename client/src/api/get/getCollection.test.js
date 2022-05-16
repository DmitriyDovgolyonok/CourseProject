import getCollection from './getCollection'

it('fetch collection', () => {
    return getCollection('0').then(result => expect(result).toBeDefined())
})