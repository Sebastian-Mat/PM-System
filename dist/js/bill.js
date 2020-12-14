import Pharmacy from "./pharmacy.js";

export default class Bill extends Pharmacy {
    constructor(
      id,
      p_name,
      p_nit,
      p_address,
      p_cellphone,
      date,
      c_name,
      c_id,
      c_age,
      c_cellphone,
      c_address,
      medicaments,
      total
    ) {
      super(p_name, p_nit, p_address, p_cellphone);
      this.id = id;
      this.date = date;
      this.c_name = c_name;
      this.c_id = c_id;
      this.c_age = c_age;
      this.c_cellphone = c_cellphone;
      this.c_address = c_address;
      this.medicaments = medicaments;
      this.total = total;
    }
    Pay() {
      console.log("Medicament is Payed");
    }
  }