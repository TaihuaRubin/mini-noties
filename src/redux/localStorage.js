/**
 *  Handle localStorage to use as persistant state
 */

export function saveToLocalStorage(payload) {
  try {
    const serialisedPayload = JSON.stringify(payload);
    localStorage.setItem("minino", serialisedPayload);
  } catch (e) {
    console.log(e);
  }
}

export function fetchFromLocalStorage() {
  try {
    const serialisedPayload = localStorage.getItem("minino");
    if (serialisedPayload === null) return undefined;
    return JSON.parse(serialisedPayload);
  } catch (e) {
    console.log(e);
  }
}

export function saveHistoryToLocalStorage(title) {
  try {
    const deserializedHistory = fetchHistoryFromLocalStorage();
    deserializedHistory.push(title);
    localStorage.setItem("minino-history", JSON.stringify(deserializedHistory));
  } catch (e) {
    console.log(e);
  }
}

export function fetchHistoryFromLocalStorage() {
  try {
    const serializedHistory = localStorage.getItem("minino-history");
    if (!serializedHistory) {
      return [];
    } else {
      return JSON.parse(serializedHistory);
    }
  } catch (e) {
    console.log(e);
  }
}
