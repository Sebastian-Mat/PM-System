import Pharmacy from "./pharmacy.js";
import Medicament from "./medicament.js";
import Bill from "./bill.js";

//  Variables
let p_list = [];
let m_list = [];
let bill = new Bill();
let m_list_bill = [];
let m_filter_bill = [];

let numUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const p_form = document.querySelector("#pharmacy-form");
const p_table = document.querySelector("#pharmacy-table-body");
const m_form = document.querySelector("#medicament-form");
const m_table = document.querySelector("#medicament-table-body");
const b_form = document.querySelector("#bill-form");
const b_medicamentForm = document.querySelector("#bill-medicament-form");
const b_table = document.querySelector("#bill-table");
const u_form = document.querySelector("#upload-form");

//  Functions
const AddCalculations = (m_quantity, m_price, total) => {
  let p_total =
    parseFloat(document.querySelector("#price-total").dataset.total) +
    parseFloat(m_price);
  let q_total =
    parseInt(document.querySelector("#quantity-total").dataset.total) +
    parseInt(m_quantity);
  let t_total =
    parseFloat(document.querySelector("#total-total").dataset.total) +
    parseFloat(total);

  document.querySelector("#price-total").innerHTML = numUSD.format(p_total);
  document.querySelector("#quantity-total").innerHTML = q_total;
  document.querySelector("#total-total").innerHTML = numUSD.format(t_total);

  document.querySelector("#price-total").dataset.total = p_total;
  document.querySelector("#quantity-total").dataset.total = q_total;
  document.querySelector("#total-total").dataset.total = t_total;
};

const DeleteCalculations = (index) => {
  let p_total =
    parseFloat(document.querySelector("#price-total").dataset.total) -
    m_list_bill[index].medicament.price;
  let q_total =
    parseInt(document.querySelector("#quantity-total").dataset.total) -
    m_list_bill[index].quantity;
  let t_total =
    parseFloat(document.querySelector("#total-total").dataset.total) -
    m_list_bill[index].medicament.price * m_list_bill[index].quantity;

  document.querySelector("#price-total").innerHTML = numUSD.format(p_total);
  document.querySelector("#quantity-total").innerHTML = q_total;
  document.querySelector("#total-total").innerHTML = numUSD.format(t_total);

  document.querySelector("#price-total").dataset.total = p_total;
  document.querySelector("#quantity-total").dataset.total = q_total;
  document.querySelector("#total-total").dataset.total = t_total;
};

const CreatePharmacy = (p_name, p_nit, p_address, p_cellphone) => {
  let pharmacy = new Pharmacy(p_name, p_nit, p_address, p_cellphone);
  p_list.push(pharmacy);
  return pharmacy;
};

const CreateMedicament = (
  m_id,
  m_name,
  m_description,
  m_price,
  p_name,
  p_nit,
  p_address,
  p_cellphone
) => {
  let medicament = new Medicament(
    m_id,
    m_name,
    m_description,
    m_price,
    p_name,
    p_nit,
    p_address,
    p_cellphone
  );
  m_list.push(medicament);
  return medicament;
};

const p_saveDB = () => {
  localStorage.setItem("pharmacys", JSON.stringify(p_list));
  p_show();
};

const m_saveDB = () => {
  localStorage.setItem("medicaments", JSON.stringify(m_list));
  m_show();
};

const b_m_saveDB = () => {
  localStorage.setItem("bill-medicaments", JSON.stringify(m_list_bill));
  mb_show();
};

const p_show = () => {
  p_table.innerHTML = "";
  p_list = JSON.parse(localStorage.getItem("pharmacys"));

  if (p_list === null) {
    p_list = [];
  } else {
    p_list.forEach((element) => {
      p_table.innerHTML += `<tr>
    <td>${element.name}</td>
    <td>${element.nit}</td>
    <td>${element.address}</td>
    <td>${element.cellphone}</td>
    <td>
    <a href="#change-pharmacy" class="modal-trigger"><i class="material-icons amber-text" id="p-modify" style="cursor: pointer">create</i></a>
    <i class="material-icons red-text text-darken-2" id="p-delete" style="cursor: pointer">delete_forever</i>
    </td></tr>`;
    });
  }
};

const m_show = () => {
  m_table.innerHTML = "";
  m_list = JSON.parse(localStorage.getItem("medicaments"));

  if (m_list === null) {
    m_list = [];
  } else {
    m_list.forEach((element) => {
      m_table.innerHTML += `<tr>
    <td>${element.id}</td>
    <td>${element.m_name}</td>
    <td>${element.name}</td>
    <td>${element.description}</td>
    <td>${numUSD.format(element.price)}</td>
    <td>
    <a href="#change-medicament" class="modal-trigger"><i class="material-icons amber-text" id="m-modify" style="cursor: pointer">create</i></a>
    <i class="material-icons red-text text-darken-2" id="m-delete" style="cursor: pointer">delete_forever</i>
    </td></tr>`;
    });
  }
};

const mb_show = () => {
  b_table.innerHTML = "";
  m_list_bill = JSON.parse(localStorage.getItem("bill-medicaments"));

  if (m_list_bill === null) {
    m_list_bill = [];
  } else {
    m_list_bill.forEach((element) => {
      b_table.innerHTML += `<tr>
    <td>${element.medicament.m_name}</td>
    <td>${numUSD.format(element.medicament.price)}</td>
    <td>${element.quantity}</td>
    <td>${numUSD.format(element.medicament.price * element.quantity)}</td>
    <td>
    <i class="material-icons red-text text-darken-2" id="bm-delete" style="cursor: pointer">delete_forever</i>
    </td></tr>`;
    });
  }
};

const b_m_delete = (index) => {
  DeleteCalculations(index);
  m_list_bill.splice(index, 1);
  b_m_saveDB();
};

const m_delete = (code) => {
  let indexArray = m_list.findIndex((element) => {
    return element.id === code;
  });
  m_list.splice(indexArray, 1);
  m_saveDB();
};

const m_modify = (code) => {
  let indexArray = m_list.findIndex((element) => {
    return element.id === code;
  });

  let me_form = document.querySelector("#medicament-edit-form");
  document.querySelector("#m-e-code").value = m_list[indexArray].id;
  document.querySelector("#m-e-name").value = m_list[indexArray].m_name;
  document.querySelector("#m-e-description").value =
    m_list[indexArray].description;
  document.querySelector("#m-e-price").value = m_list[indexArray].price;

  me_form.addEventListener("submit", (e) => {
    e.preventDefault();
    m_list[indexArray].m_name = document.querySelector("#m-e-name").value;
    m_list[indexArray].description = document.querySelector(
      "#m-e-description"
    ).value;
    m_list[indexArray].price = document.querySelector("#m-e-price").value;
    m_saveDB();
  });
};

const p_delete = (nit) => {
  let indexArray = p_list.findIndex((element) => {
    return element.nit === nit;
  });

  for (let index = 0; index < m_list.length; index++) {
    if (m_list[index].nit === nit) {
      m_list.splice(index, 1);
    }
  }
  m_saveDB();
  p_list.splice(indexArray, 1);
  p_saveDB();
};

const p_modify = (nit) => {
  let indexArray;
  p_list.forEach((element, index) => {
    if (element.nit === nit) {
      indexArray = index;
    }
  });

  let pe_form = document.querySelector("#pharmacy-edit-form");
  document.querySelector("#p-e-name").value = p_list[indexArray].name;
  document.querySelector("#p-e-nit").value = p_list[indexArray].nit;
  document.querySelector("#p-e-address").value = p_list[indexArray].address;
  document.querySelector("#p-e-cellphone").value = p_list[indexArray].cellphone;

  pe_form.addEventListener("submit", (e) => {
    e.preventDefault();
    for (let index = 0; index < m_list.length; index++) {
      if (m_list[index].nit === nit) {
        m_list[indexArray].name = document.querySelector("#p-e-name").value;
        m_list[indexArray].nit = document.querySelector("#p-e-nit").value;
        m_list[indexArray].address = document.querySelector(
          "#p-e-address"
        ).value;
        m_list[indexArray].cellphone = document.querySelector(
          "#p-e-cellphone"
        ).value;
      }
    }
    p_list[indexArray].name = document.querySelector("#p-e-name").value;
    p_list[indexArray].nit = document.querySelector("#p-e-nit").value;
    p_list[indexArray].address = document.querySelector("#p-e-address").value;
    p_list[indexArray].cellphone = document.querySelector(
      "#p-e-cellphone"
    ).value;
    m_saveDB();
    p_saveDB();
  });
};

p_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let p_name = document.querySelector("#p-name").value;
  let p_nit = document.querySelector("#p-nit").value;
  let p_address = document.querySelector("#p-address").value;
  let p_cellphone = document.querySelector("#p-cellphone").value;

  if (p_name === "" || p_nit === "" || p_address === "" || p_cellphone === "") {
    alert("You must to fill all the form");
  } else {
    CreatePharmacy(p_name, p_nit, p_address, p_cellphone);
    p_saveDB();
    p_form.reset();
  }
});

m_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let code = document.querySelector("#m-code").value;
  let m_name = document.querySelector("#m-name").value;
  let m_description = document.querySelector("#m-description").value;
  let m_price = document.querySelector("#m-price").value;
  let p_name = document.querySelector("#mp-name").value;
  let p_nit = document.querySelector("#mp-nit").value;
  let p_address = document.querySelector("#mp-address").value;
  let p_cellphone = document.querySelector("#mp-cellphone").value;

  if (
    code === "" ||
    m_name === "" ||
    m_description === "" ||
    m_price === "" ||
    p_nit === ""
  ) {
    alert("You must fill the Medicament Info and the NIT");
  } else {
    let exists = p_list.find((element) => element.nit === p_nit);
    if (exists) {
      let indexArray = p_list.findIndex((element) => {
        return element.nit === p_nit;
      });
      CreateMedicament(
        code,
        m_name,
        m_description,
        m_price,
        p_list[indexArray].name,
        p_nit,
        p_list[indexArray].address,
        p_list[indexArray].cellphone
      );
      m_saveDB();
      m_form.reset();
    } else {
      if (p_name === "" || p_address === "" || p_cellphone === "") {
        alert("You must fill all the form");
      } else {
        CreatePharmacy(p_name, p_nit, p_address, p_cellphone);
        p_saveDB();
        CreateMedicament(
          code,
          m_name,
          m_description,
          m_price,
          p_name,
          p_nit,
          p_address,
          p_cellphone
        );
        m_saveDB();
        m_form.reset();
      }
    }
  }
});
b_form.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.removeItem("bill-medicaments");
  m_list_bill = [];
  let c_name = document.querySelector("#b-name").value;
  let c_id = document.querySelector("#b-id").value;
  let c_age = document.querySelector("#b-age").value;
  let c_cellphone = document.querySelector("#b-cellphone").value;
  let p_nit = document.querySelector("#b-nit").value;
  let b_date = document.querySelector("#b-date").value;
  let b_address = document.querySelector("#b-address").value;
  document.querySelector("#price-total").innerHTML = 0;
  document.querySelector("#quantity-total").innerHTML = 0;
  document.querySelector("#total-total").innerHTML = 0;

  document.querySelector("#price-total").dataset.total = 0;
  document.querySelector("#quantity-total").dataset.total = 0;
  document.querySelector("#total-total").dataset.total = 0;
  if (
    c_name === "" ||
    c_id === "" ||
    c_age === "" ||
    c_cellphone === "" ||
    p_nit === "" ||
    b_date === "" ||
    b_address === ""
  ) {
    alert("You must to fill all the information");
  } else {
    let exists = p_list.find((element) => {
      return element.nit === p_nit;
    });
    if (exists) {
      let indexArray = p_list.findIndex((element) => {
        return element.nit === p_nit;
      });
      let num = Math.floor(Math.random() * (2000 - 1000)) + 1000;
      bill = {
        id: num,
        date: b_date,
        p_name: p_list[indexArray].name,
        p_nit: p_nit,
        p_address: p_list[indexArray].addres,
        p_cellphone: p_list[indexArray].cellphone,
        c_name: c_name,
        c_id: c_id,
        c_address: b_address,
        c_cellphone: c_cellphone,
      };
      m_filter_bill = m_list.filter((element) => element.nit === p_nit);
      document.querySelector("#b-name").disabled = true;
      document.querySelector("#b-id").disabled = true;
      document.querySelector("#b-age").disabled = true;
      document.querySelector("#b-cellphone").disabled = true;
      document.querySelector("#b-nit").disabled = true;
      document.querySelector("#b-date").disabled = true;
      document.querySelector("#b-address").disabled = true;
      b_table.innerHTML = "";
      document.querySelector("#price-total").innerHTML = 0;
      document.querySelector("#quantity-total").innerHTML = 0;
      document.querySelector("#total-total").innerHTML = 0;
    } else {
      alert("The Pharmacy NIT is incorrect, please check the NIT");
    }
  }
});
b_medicamentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let m_name = document.querySelector("#b-medicament").value;
  let m_quantity = parseInt(document.querySelector("#b-quantity").value);

  if (m_name === "" || m_quantity === "") {
    alert("You must fill all the information");
  } else {
    let indexArray = m_filter_bill.findIndex((element) => {
      return element.m_name.toLowerCase() === m_name.toLowerCase();
    });
    if (indexArray !== -1) {
      let total = parseFloat(m_filter_bill[indexArray].price) * m_quantity;
      m_list_bill.push({
        medicament: m_filter_bill[indexArray],
        quantity: m_quantity,
      });
      AddCalculations(
        m_quantity,
        parseFloat(m_filter_bill[indexArray].price),
        total
      );
      b_m_saveDB();
      b_medicamentForm.reset();
    } else {
      alert("The medicament IS NOT in the list, please check the name");
    }
  }
});
u_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let id_bill = document.querySelector("#u-id").value + ".json";
  if (id_bill !== "") {
    let array = [{ id: id_bill }];
    localStorage.setItem("id-bill", JSON.stringify(array));
    window.open("./uploaded-bill.html");
  } else {
    alert("You have to fill the Information");
  }
});

document.querySelector("#bill-modify").addEventListener("click", (e) => {
  e.preventDefault();
  if ((document.querySelector("#b-name").disabled = true)) {
    document.querySelector("#b-name").disabled = false;
    document.querySelector("#b-id").disabled = false;
    document.querySelector("#b-age").disabled = false;
    document.querySelector("#b-cellphone").disabled = false;
    document.querySelector("#b-nit").disabled = false;
    document.querySelector("#b-date").disabled = false;
    document.querySelector("#b-address").disabled = false;
  }
});
document.querySelector("#bill-delete").addEventListener("click", (e) => {
  if (confirm("Do you really want to delete the full bill?")) {
    e.preventDefault();

    document.querySelector("#b-name").disabled = false;
    document.querySelector("#b-id").disabled = false;
    document.querySelector("#b-age").disabled = false;
    document.querySelector("#b-cellphone").disabled = false;
    document.querySelector("#b-nit").disabled = false;
    document.querySelector("#b-date").disabled = false;
    document.querySelector("#b-address").disabled = false;

    b_form.reset();
    localStorage.removeItem("bill-medicaments");
    mb_show();

    delete bill.id;
    delete bill.date;
    delete bill.p_name;
    delete bill.p_nit;
    delete bill.p_address;
    delete bill.p_cellphone;
    delete bill.c_name;
    delete bill.c_id;
    delete bill.c_address;
    delete bill.c_cellphone;

    document.querySelector("#price-total").innerHTML = 0;
    document.querySelector("#quantity-total").innerHTML = 0;
    document.querySelector("#total-total").innerHTML = 0;

    document.querySelector("#price-total").dataset.total = 0;
    document.querySelector("#quantity-total").dataset.total = 0;
    document.querySelector("#total-total").dataset.total = 0;
  }
});
document.querySelector("#bill-generate").addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("Do you really want to finish and generate the bill?")) {
    bill.medicaments = m_list_bill;
    let total = document.querySelector("#total-total").dataset.total;
    bill.total = total;
    localStorage.setItem("bill", JSON.stringify(bill));
    window.open("./bill.html");
    localStorage.removeItem("bill-medicaments");
    mb_show();
    b_form.reset();
    document.querySelector("#b-name").disabled = false;
    document.querySelector("#b-id").disabled = false;
    document.querySelector("#b-age").disabled = false;
    document.querySelector("#b-cellphone").disabled = false;
    document.querySelector("#b-nit").disabled = false;
    document.querySelector("#b-date").disabled = false;
    document.querySelector("#b-address").disabled = false;

    document.querySelector("#price-total").innerHTML = 0;
    document.querySelector("#quantity-total").innerHTML = 0;
    document.querySelector("#total-total").innerHTML = 0;

    document.querySelector("#price-total").dataset.total = 0;
    document.querySelector("#quantity-total").dataset.total = 0;
    document.querySelector("#total-total").dataset.total = 0;
  }
});

p_table.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    e.target.innerHTML === "delete_forever" ||
    e.target.innerHTML === "create"
  ) {
    if (e.target.innerHTML === "delete_forever") {
      if (
        confirm(
          "Do you really want to delete the Pharmacy? The medicament of this pharmacy will be deleted!"
        )
      ) {
        let nit = e.path[2].childNodes[3].innerHTML;
        p_delete(nit);
      }
    }
    if (e.target.innerHTML === "create") {
      let nit = e.path[3].childNodes[3].innerHTML;
      p_modify(nit);
    }
  }
});

m_table.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    e.target.innerHTML === "delete_forever" ||
    e.target.innerHTML === "create"
  ) {
    if (e.target.innerHTML === "delete_forever") {
      if (confirm("Do you really want to delete the medicament?")) {
        let nit = e.path[2].childNodes[1].innerHTML;
        m_delete(nit);
      }
    }
    if (e.target.innerHTML === "create") {
      let nit = e.path[3].childNodes[1].innerHTML;
      m_modify(nit);
    }
  }
});

b_table.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e)
  if (e.target.innerHTML === "delete_forever") {
    if (confirm("Do you really want to delete the medicament?")) {
      let name = e.path[2].childNodes[1].innerHTML;
      let indexArray = m_list_bill.findIndex((element) => {
        return element.medicament.m_name.toLowerCase() === name.toLowerCase();
      });
      b_m_delete(indexArray);
    }
  }
});

document.addEventListener("DOMContentLoaded", p_show);
document.addEventListener("DOMContentLoaded", m_show);
