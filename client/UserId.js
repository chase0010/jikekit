export function hasLocalStorage() {
  return (!!window.localStorage);
}

export function getUserId() {
  console.log('getUserId');
  console.log(document.location.href);
  return window.localStorage.getItem('userId');
}

export function setUserId() {
  console.log('setUserId');
  console.log(document.location);
  let id = 'userIdxyz';
  window.localStorage.setItem('userId', id);

  function getParameter(sProp)
  {
      var re = new RegExp(sProp + "=([^\&]*)" , "i" );
      var a = re.exec (document.location.search );
      if (a == null )
          return null ;
      return a[1];
  };
  console.log(getParameter('code'));

  return id;
}

export function getOrSetUserId() {
  if (!hasLocalStorage()) {
    return 'baseUser';
  } else {
    let userId = getUserId();
    return (userId) ? setUserId() : setUserId();
  }
}