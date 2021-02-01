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

export function saveHistoryToLocalStorage(title) {
  try {
    const localHistory = localStorage.getItem("minino-history");
    if (localHistory === null) {
      localStorage.setItem("minino-hisotry", JSON.stringify([title]));
    } else {
      localHistory = JSON.parse(localHistory).push(title);
      localStorage.setItem("minino-history", localHistory);
    }
  } catch (e) {
    console.log("error trying to save history to local storage");
  }
}

export function fetchHistoryFromLocalStorage() {
  try {
    const localHistory = localStorage.getItem("minino-history");
    if (localHistory === null) return undefined;
    return JSON.parse(localHistory);
  } catch (e) {
    console.log("error trying to fetch history from local storage");
  }
}
