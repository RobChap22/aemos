import { firebase, db } from "@/api/firebaseInit";


// the following two functions return imgpaths for faction and role
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

function getFactionImg(faction) {
  if (faction === 'Imperium') {
    return "/imperium.svg";
  } else if (faction === 'Chaos') {
    return "/chaos.svg";
  } else if (faction === 'Aeldari') {
    return "/eldar.svg";
  } else if (faction === 'Tyranids') {
    return "/tyranid.svg";
  } else if (faction === 'Orks') {
    return "/orks.svg";
  } else if (faction === 'Necrons') {
    return "/necrons.svg";
  } else if (faction === 'Tau Empire') {
    return "/tau.svg";
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
          factionImg: getFactionImg(doc.data().faction),
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
          relics: doc.data().relics,
          unitType: doc.data().unitType,
          warlordTraits: doc.data().warlordTraits,
          psychicPowers: doc.data().psychicPowers,
          experiencePoints: doc.data().experiencePoints,
          crusadePoints: doc.data().crusadePoints,
          battleHonours: doc.data().battleHonours,
          battleScars: doc.data().battleScars,
          character: doc.data().character,
          psyker: doc.data().psyker,
          killTally: doc.data().killTally,
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

export const createUnit = ({ name, role, supplyCost, armyId, unitType, equipment, psyker, character, psychicPowers }) => {
  return db.collection("units")
    .add({
      name: name,
      role: role,
      supplyCost: parseInt(supplyCost, 10),
      armyRef: armyId,
      unitType: unitType,
      equipment: equipment,
      experiencePoints: 0,
      crusadePoints: 0,
      battleHonours: [],
      battleScars: [],
      relics: [],
      warlordTraits: [],
      psychicPowers: psychicPowers,
      psyker: psyker,
      character: character,
      killTally: 0,
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};


export const updateArmy = ({ armyId, requisition, supplyLimit, battleTally, battlesWon }) => {
  return db.collection("armies").doc(armyId)
    .update({
      requisition: parseInt(requisition, 10),
      battlesWon: battlesWon,
      battleTally: battleTally,
      supplyLimit: supplyLimit,
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};

export const updateUnit = ({ unitId, equipment, experiencePoints, crusadePoints, battleHonours, battleScars, supplyCost, relics, warlordTraits, psychicPowers, killTally }) => {
  return db.collection("units").doc(unitId)
    .update({
      equipment: equipment,
      experiencePoints: experiencePoints,
      crusadePoints: crusadePoints,
      psychicPowers: psychicPowers,
      battleHonours: firebase.firestore.FieldValue.arrayUnion(battleHonours),
      battleScars: firebase.firestore.FieldValue.arrayUnion(battleScars),
      relics: firebase.firestore.FieldValue.arrayUnion(relics),
      warlordTraits: firebase.firestore.FieldValue.arrayUnion(warlordTraits),
      supplyCost: supplyCost,
      killTally: killTally,
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};


export const deleteArmy = (armyId) => {
  db.collection("armies").doc(armyId).delete().then(function() {
    console.log("Army successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
};

export const deleteUnit = (unitId) => {
  db.collection("units").doc(unitId).delete().then(function() {
    console.log("Army successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
};
