function getPostId(urlId) {
  const linkedinURL = document.querySelector(`#${urlId}`).value;
  const regex = /([0-9]{19})/;
  const postId = regex.exec(linkedinURL)?.pop();
  return postId;
}

function getCommentId(urlId) {
  const linkedinURL = decodeURIComponent(document.querySelector(`#${urlId}`).value);
  const regex = /fsd_comment:\((\d+),urn:li:activity:\d+\)/;
  const match = regex.exec(linkedinURL);
  
  return match ? match[1] : null; // Return commentId or null
}

function extractUnixTimestamp(postId) {
  if (!postId) return "";
  const asBinary = BigInt(postId).toString(2);
  const first41Chars = asBinary.slice(0, 41);
  return parseInt(first41Chars, 2);
}

function unixTimestampToHumanDate(timestamp) {
  return new Date(timestamp).toUTCString() + " (UTC)";
}

function unixTimestampToLocalDate(timestamp) {
  return ("" + new Date(timestamp)).substring(0, 25);
}

function getDate(urlId, localTimeId, dateId) {
  const postId = getPostId(urlId);
  const commentId = getCommentId(urlId);
  
  let unixTimestamp = commentId ? extractUnixTimestamp(commentId) : extractUnixTimestamp(postId);
  
  document.querySelector(`#${dateId}`).textContent = unixTimestampToHumanDate(unixTimestamp);
  document.querySelector(`#${localTimeId}`).textContent = unixTimestampToLocalDate(unixTimestamp);
}

function clearUrlField(urlId) { 
  document.querySelector(`#${urlId}`).value = "";
  document.querySelector(`#${urlId}`).focus();
}
