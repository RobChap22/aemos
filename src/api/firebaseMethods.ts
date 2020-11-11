import firebase from "@/api/firebaseInit";


const db = firebase.firestore();



export const readArmies = (userId) => {
  const armies = [];

  return db.collection("armies").where("userId", "==", userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        armies.push({
          id: doc.id,
          name: doc.data().name,
          faction: doc.data().faction,
          requisition: doc.data().requisition,
          battlesWon: doc.data().battlesWon,
          battleTally: doc.data().battleTally,
          supplyLimit: doc.data().supplyLimit,
          supplyUsed: doc.data().supplyUsed,
        });
        // console.log(doc.id, " => ", doc.data());
      });
      return armies;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};


export const readUnits = (id) => {
  const units = [];

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
          equipment: doc.data().equipment,
          relic: doc.data().relic,
          unitType: doc.data().unitType,
          warlordTrait: doc.data().warlordTrait,
          psychicPowers: doc.data().psychicPowers,
        });
        // console.log(doc.id, " => ", doc.data());
      });
      return units;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};


export const createArmy = ({name, faction, userId }) => {
  return db.collection("armies")
    .add({
      userId: userId,
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
  return db.collection("units")
    .add({
      name: name,
      role: role,
      supplyCost: parseInt(supplyCost, 10),
      armyRef: armyId
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};
