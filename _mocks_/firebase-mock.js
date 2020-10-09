const firestore = () => {
    return{
        collection: (nameCollection) => {
            return{
                add: (objData) => {
                    return new Promise((resolve) => {
                        resolve('usuario en la nube')
                    })
                }
            }
        }
    }
}

const firebase = {
    firestore:firestore
}

export default jest.fn(() => {
    return firebase;
})