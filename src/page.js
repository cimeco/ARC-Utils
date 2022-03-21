import _ from "lodash";

function page(href) {
  function defineValue(value) {
    const hrefParts = (href || "").split("#");
    const uri = hrefParts[0];
    const hash = hrefParts.slice(1).join("#");
    const urlParts = uri.split("?");
    const endpoint = urlParts[0];
    const query = urlParts.slice(1).join("?");

    const endpointParts = endpoint.split("/");

    const filteredEndpoint = endpointParts
      .filter(part => {
        return _.isNaN(Number(part));
      })
      .join("/");

    const newEndpoint =
      typeof value !== "undefined"
        ? `/${filteredEndpoint}/${value}`
        : `/${filteredEndpoint}`;

    return `${newEndpoint}${
      !_.isUndefined(query) && query !== "" ? `?${query}` : ""
    }${hash ? `#${hash}` : ""}`;
  }

  return defineValue;
}

export default page;
