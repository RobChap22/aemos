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


export const readSingleArmy = (id) => {
  let army = null;

  return db.collection("armies").doc(id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        army = {
          id: doc.id,
          name: doc.data().name,
          faction: doc.data().faction,
          requisition: doc.data().requisition,
          battlesWon: doc.data().battlesWon,
          battleTally: doc.data().battleTally,
          supplyLimit: doc.data().supplyLimit,
          supplyUsed: doc.data().supplyUsed,
        }
        return army;
        console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
};


export const readUnits = (id) => {
  const units = [];
  console.log(id);

  return db.collection("units").where("armyRef", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        units.push({
          id: doc.id,
          name: doc.data().name,
          supplyCost: doc.data().supplyCost,
          role: doc.data().role,
          armyRef: doc.data().armyRef,
        });
        // console.log(doc.id, " => ", doc.data());
      });
      return units;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};



export const readSingleUnit = (id) => {
  let unit = null;

  return db.collection("units").doc(id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        unit = {
          id: doc.id,
          name: doc.data().name,
          supplyCost: parseInt(doc.data().supplyCost, 10),
          role: doc.data().role,
          armyRef: doc.data().armyRef,
        }
        return unit;
        console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
};




export const createArmy = ({name, faction}) => {
  return db.collection("armies")
    .add({
      faction: faction,
      name: name,
      requisition: 5,
      battlesWon: 0,
      battleTally: 0,
      supplyLimit: 50,
      supplyUsed: 0
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      return docRef.id
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};


export const createUnit = ({name, role, supplyCost, armyId}) => {
  db.collection("units")
    .add({
      name: name,
      role: role,
      supplyCost: parseInt(supplyCost, 10),
      armyRef: armyId
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};
