import firebase from "@/api/firebaseInit";


const db = firebase.firestore();



export const readArmies = () => {
  const armies = [];

  return db.collection("armies")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        armies.push({
          id: doc.id,
          name: doc.data().name,
          faction: doc.data().faction,
        });
        // console.log(doc.id, " => ", doc.data());
      });
      return armies;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};



export const createArmy = (name, faction) => {
  db.collection("armies")
    .add({ faction: faction, name: name })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};
