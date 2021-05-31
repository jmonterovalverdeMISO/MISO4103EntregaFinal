import AprioriPool from "./apriori";
import RandomPool from "./random";

class DataPool {
  constructor() {
    this.pools = {
      apriori: new AprioriPool(),
      random: new RandomPool()
    };
  }

  get apriori() {
    return this.pools.apriori;
  }

  get random() {
    return this.pools.random;
  }
}

export default DataPool;
