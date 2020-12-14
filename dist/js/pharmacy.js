export default class Pharmacy {
    constructor(name, nit, address, cellphone) {
      this.name = name;
      this.nit = nit;
      this.address = address;
      this.cellphone = cellphone;
    }
  
    Diagnose() {
      console.log("Is diagnosing");
    }
  }