// TODO: Refactoring
// API website -> https://www.yt-download.org/developers

/* Extracting URL from current tab */
let mainProcess = async () => {
  try {
    // URL extraction
    await chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      let tabURL = tabs[0].url;

      // Id extraction
      const videoId = youtube_parser(tabURL);

      // API URL + video ID
      const APIURL = `https://www.yt-download.org/@api/button/mp3/`;
      // const APIURL = `https://www.yt-download.org/api/widget/mp3/`;
      const completeApiUrl = APIURL+videoId;

      // Inject iframe (download buttons) into extention
      videoIdInject(completeApiUrl);
      
      console.log(APIURL)
      console.log(videoId)
      console.log(completeApiUrl)
    });
  }
  catch (e) {
    window.console.log(`tabURL is undefined: ${e}`);
    reject(e);
  };
};

/* Extracting video id */
let youtube_parser = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  try {
    const match = url.match(regExp); 
    return (match&&match[7].length==11)? match[7] : false;
  }
  catch(e) {
    console.log(`Cannot find video ID: ${e}`);
  };
};

/* Injecting thired party api call to our extension */
let videoIdInject = (src) => {
  const iframecontainer = document.getElementById('iframecontainer');
  iframecontainer.innerHTML = `<iframe id=iframe src="${src}" width="100%" height="100px" scrolling="no" style="border:none;"></iframe>`;
  // iframecontainer.innerHTML = `<iframe src="${src}" width="100%" height="100%" allowtransparency="true" scrolling="no" style="border:none"></iframe>`;
};

mainProcess()