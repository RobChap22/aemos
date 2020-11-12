import firebase from "@/api/firebaseInit";


const db = firebase.firestore();

function getUnitRoleImg(role) {
  if (role === 'HQ') {
    return "/HQ.png";

  } else if (role === 'Troops') {
    return "/Troops.png";

  } else if (role === 'Elite') {
    return "/Elite.png";

  } else if (role === 'Fast Attack') {
    return "/fast-attack.png";

  } else if (role === 'Heavy Support') {
    return "/heavy-support.png";

  } else if (role === 'Flyer') {
    return "/flyer.png";

  } else if (role === 'Lord of War') {
    return "/lord-of-war.png";

  } else if (role === 'Dedicated Transport') {
    return "/dedicated-transport.png";

  } else {
    return '';
  }
}



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
          experiencePoints: doc.data().experiencePoints,
          crusadePoints: doc.data().crusadePoints,
          battleHonours: doc.data().battleHonours,
          roleImg: getUnitRoleImg(doc.data().role),
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


export const createUnit = ({ name, role, supplyCost, armyId, unitType, equipment }) => {
  return db.collection("units")
    .add({
      name: name,
      role: role,
      supplyCost: parseInt(supplyCost, 10),
      armyRef: armyId,
      battleHonours: [],
      battleScars: [],
      unitType: unitType,
      equipment: equipment,
      experiencePoints: 0,
      crusadePoints: 0,
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};



// Add a new document in collection "cities"
// db.collection("cities").doc("LA").set({
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"
// })
// .then(function() {
//     console.log("Document successfully written!");
// })
// .catch(function(error) {
//     console.error("Error writing document: ", error);
// });


export const updateArmy = ({ armyId, requisition }) => {
  return db.collection("armies").doc(armyId)
    .update({
      "requisition": parseInt(requisition, 10),
      // battlesWon: battlesWon,
      // battleTally: battleTally,
      // supplyLimit: supplyLimit,
    })
    .then(function() {
      console.log("Document successfully written!");
      console.log(requisition)
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};
