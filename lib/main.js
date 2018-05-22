const DOMNodeCollection = require("./dom_node_collection");

window.$l = (arg) => {
  switch (typeof arg) {
    case "string":
      return getNodesFromDom(arg);
    case HTMLElement:
      return new DOMNodeCollection(arg);
    default:

  }
};

const getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
};

$l.extend = (base, ...other) => {
  other.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      base[key] = obj[key];
    });
  });
  return base;
};

$l.ajax = (options) => {
  const request = new XMLHttpRequest();
  let defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: '',
    success: () => {},
    error: () => {},
    data: {}
  };
  options = window.$l.extend(defaults, options)

  return new Promise((resolve, reject) => {
    request.open(options.method, options.url)
    request.onload = () => {
      if (request.status === 200) {
        resolve(request.response);
        options.success(request.response);
      } else {
        reject({
          status: this.status,
          statusText: request.statusText,
        });
      }
    };
    request.send(JSON.stringify(options.data));
  });
}
