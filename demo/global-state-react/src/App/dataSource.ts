const dataSource = {
  count: 0,
  tick() {
    this.count += 1;
    this.update();
  },
  update() {

  }
}

export default dataSource;