/**
 * Helpers Functions
 * This functions are helpers.
 */

const getMidnight = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0);
};

const getLastQuarter = () => {
  const now = new Date();
  return now.setMinutes(now.getMinutes() - 15);
};

const getTimestamp = () => {
  return +new Date();
};

const setData = (data) => {
  const midnight = getMidnight();
  const useAurora = { ...data, expires: +midnight };
  localStorage.setItem("_useAurora", JSON.stringify(useAurora));
};

const createUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const getData = () => {
  const useAurora = JSON.parse(localStorage.getItem("_useAurora"));
  const lastQuarter = getLastQuarter();

  if (!useAurora || useAurora.expires <= +new Date()) {
    const ts = getTimestamp();
    const uid = createUUID();

    return {
      uid: uid,
      isNewVisitor: true,
      isNewSession: true,
      lastPageViewID: null,
      lastVisitAt: ts,
    };
  }

  if (useAurora.lastVisitAt <= +lastQuarter) {
    data.isNewSession = true;
  }

  return useAurora;
};

const sum = (args = []) => args.reduce((acc, el) => acc + el, 0);

(async (window) => {
  const {
    navigator: { language },
    location: { pathname, host },
    document,
    history,
  } = window;

  let lastPageViewID = null;
  let current = pathname;

  const events = Object.freeze({
    PAGE_VIEW: "pageView",
  });

  // Check Script Exists
  const script = document.querySelector("script[aurora-id]");

  if (!script) return false;

  // Only HTTP/HTTPS
  if (host === "") return false;

  const analyticsUrl = script
    .getAttribute("src")
    .replace("/public/aurora.js", "/v2/collect");

  const seed = script.getAttribute("aurora-id");

  // Tracking
  const track = async (path) => {
    const data = getData();

    try {
      const res = await fetch(analyticsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: events.PAGE_VIEW,
          element: path,
          language: language,
          seed: seed,
          referrer: document.referrer,
          ...data,
        }),
      });

      const resJson = await res.json();
      data.lastPageViewID = resJson.id;
    } catch (err) {
      console.log("Err");
    }

    // After Tracking..
    // data.lastPageViewID = 1; //res.id;
    data.isNewVisitor = false;
    data.isNewSession = false;
    data.lastVisitAt = getTimestamp();

    setData(data);
  };

  // Listerer Cycle
  const initializeTimings = (timings = []) => {
    let start = performance.now();

    return () => {
      if (document.visibilityState === "hidden") {
        // Push current duration in timings
        timings.push(performance.now() - start);

        const blob = new Blob(
          [
            JSON.stringify({
              seed: seed,
              duration: sum(timings),
            }),
          ],
          { type: "application/json; charset=UTF-8" }
        );

        navigator.sendBeacon(`${analyticsUrl}/${lastPageViewID}`, blob);
      } else {
        start = performance.now();
      }
    };
  };

  track(current);

  const sendTiming = initializeTimings();

  document.addEventListener("visibilitychange", sendTiming);

  const handlePushState = () => {
    const pushState = history.pushState;

    return (...args) => {
      const [, , url] = args;

      if (url !== current) {
        current = url;
        track(url);
      }

      return pushState.apply(history, args);
    };
  };

  history.pushState = handlePushState();
})(window);
