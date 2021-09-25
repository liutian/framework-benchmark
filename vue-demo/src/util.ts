let uuid = 0;

export function createItem() {
  return {
    id: ++uuid,
    author: "xxx",
    content: "hello world ...... ---> " + uuid,
    comments: [],
    isShowComment: false,
    favorite: 0,
    like: 0,
    forward: 0
  };
}

export function resetUUID() {
  uuid = 0;
}