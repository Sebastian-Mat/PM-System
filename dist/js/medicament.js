import Pharmacy from "./pharmacy.js";

export default class Medicament extends Pharmacy {
    constructor(id, m_name, description, price, p_name, nit, address, cellphone) {
      super(p_name, nit, address, cellphone);
      this.id = id;
      this.m_name = m_name;
      this.description = description;
      this.price = price;
    }
    Sell() {
      console.log("Medicament is Sold");
    }
  }