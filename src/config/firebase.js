import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};


firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
// const deleteId = async () => {
//     console.log(messages.id)
//     await
//         db.collection("messages").doc(id).delete()
//     // db.collection("messages").where("id", "==", messages.id)
//     //     .get()
//     //     .then((querySnapshot) => {
//     //         querySnapshot.forEach((doc) => {
//     //             doc.ref.delete();
//     //         })
//     //     })
// };
// const db = firebase.firestore();
// export const messagesRef = db.collection('messages')
//create
// export const createData = async () => {
//     await db.collection("users").add({
//         first: "Aaa",
//         last: "Lovelace",
//         born: 2000
//     })
//         .then((docRef) => {
//             console.log("Document written with ID: ", docRef.id);
//         })
//         .catch((error) => {
//             console.error("Error adding document: ", error);
//         })
// }
//read
// export const readData = async () => {
//     await db.collection("messages").get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             console.log(`${doc.id} `);
//             console.log(`${doc.id} => ${doc.data().name}`);
//             console.log(`${doc.id} => ${doc.data().messages}`);
//             console.log(`${doc.id} => ${doc.data().createAt}`);
//         });
//         querySnapshot.forEach((doc) => {
//             // querySnapshot = (doc) => {
//             return {
//                 ...this, id: `${doc.id} `, name: `${doc.data().name}`, message: ` ${doc.data().messages}`, createAt: ` ${doc.data().createAt}`
//             },
//                 // return { ...this, id: doc.id, name: doc.name, messages: doc.messages, timestamp: doc.timestamp },
//                 console.log(querySnapshot)
//             // };
//         });
//     });

// class Users {
//     constructor(first, last, born) {
//         // this.id = id;
//         this.first = first;
//         this.last = last;
//         this.born = born;
//     }
//     toString() {
//         return this.first + ', ' + this.last + ', ' + this.born;
//     }
// }
// // Firestore data converter
// var usersConverter = {
//     toFirestore: function (users) {
//         return {
//             first: users.first,
//             last: users.last,
//             born: users.born
//         };
//     },
//         fromFirestore: function (snapshot, options) {
//             const data = snapshot.data(options);
//             return new Users(data.first, data.last, data.born);
//         }
//     };
// }

// export const setData = async () => {
//     await
//         db.collection("cities").doc("LA").set({
//             name: "LA",
//             state: "CA",
//             country: "USA"
//         })
//             .then(() => {
//                 console.log("Document successfully written!");
//             })
//             .catch((error) => {
//                 console.error("Error writing document: ", error);
//             });
// }
// export const upDate = async () => {
//     await
//         db.collection("cities").doc("LA").update({
//             name: "San Francisco",
//             state: "AA"
//         })
//             .then(() => {
//                 console.log("Document successfully updated!");
//             });
// }
// export const Delete = async () => {
//     await
//         db.collection("messages").doc("LA").delete().then(() => {
//             console.log("Document successfully deleted!");
//         }).catch((error) => {
//             console.error("Error removing document: ", error);
//         });
// }
export default firebase;