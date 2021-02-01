/**
 *  Handle localStorage to use as persistant state
 */

export function saveToLocalStorage(payload) {
  try {
    const serialisedPayload = JSON.stringify(payload);
    localStorage.setItem("minino", serialisedPayload);
  } catch (e) {
    console.log("error trying to save to localStorage");
  }
}

export function fetchFromLocalStorage() {
  try {
    const serialisedPayload = localStorage.getItem("minino");
    if (serialisedPayload === null) return undefined;
    return JSON.parse(serialisedPayload);
  } catch (e) {
    console.log("error fetching form local storage");
  }
}
