class PassService {
    constructor() {
        this.collection = db.collection('visitor_passes');
    }

    async getPassByToken(token) {
        try {
            const querySnapshot = await this.collection.where('token', '==', token).limit(1).get();
            
            if (querySnapshot.empty) {
                return null;
            }

            const doc = querySnapshot.docs[0];
            return {
                id: doc.id,
                ...doc.data()
            };
        } catch (error) {
            console.error('Error fetching pass:', error);
            throw new Error('Failed to fetch pass details');
        }
    }

    // Optional: Real-time listener if needed
    subscribeToPassUpdates(token, callback) {
        return this.collection.where('token', '==', token).limit(1)
            .onSnapshot(snapshot => {
                if (!snapshot.empty) {
                    const doc = snapshot.docs[0];
                    callback({ id: doc.id, ...doc.data() });
                }
            }, error => {
                console.error('Error listening to pass updates:', error);
            });
    }
}

const passService = new PassService();
