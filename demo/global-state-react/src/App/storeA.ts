import React from "react";

export const StoreAContext = React.createContext({});

const store = {
  data: {
    count: 0
  },
  tick() {
    this.data.count += 1;
    this.update();
  },
  update() {

  }
}

export default store;