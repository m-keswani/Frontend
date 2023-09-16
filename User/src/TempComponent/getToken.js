function getToken(name) {
    let cookieval = null;
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieval = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieval;
  }
  export default getToken