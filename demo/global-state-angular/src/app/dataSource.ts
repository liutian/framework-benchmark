const dataSource = {
  count: 0,
  tick() {
    dataSource.count += 1;
    dataSource.update();
  },
  update() {

  }
}


function wrapper(target: any): any {
  return new Proxy(target, {
    set(oTarget, sKey, vValue) {
      if (Object.prototype.toString.apply(oTarget[sKey]) === '[object Function]') {
        oTarget[sKey] = vValue;
        return true;
      }
      console.error('can not use set');
      return false;
    },
    deleteProperty(oTarget, sKey) {
      console.error('can not use delete');
      return false;
    },
    get(oTarget, sKey) {
      const value = oTarget[sKey] || undefined;
      if (!isBaseType(value)) {
        return wrapper(oTarget[sKey]);
      }

      return value;
    }
  })
}

const typeList = ['Number', 'String', 'Null', 'Undefined', 'Boolean', 'Symbol'];
function isBaseType(value: any) {
  const typeStr = Object.prototype.toString.apply(value);
  return typeList.some(type => typeStr.includes(type));
}

// 控制数据智能内部改动外部只能读取
// export default wrapper(dataSource);
export default dataSource;

