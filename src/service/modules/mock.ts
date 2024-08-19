import request from "../request/index.ts";

export function getData() {
  return request.get({
    url: "/data/list",
  });
}
