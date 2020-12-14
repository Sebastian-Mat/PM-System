const Download = () => {
  const $element = document.querySelector("#bill");
  html2pdf()
    .set({
      margin: 1,
      filename: "Bill.pdf",
      image: {
        type: "jpeg",
        quality: 0.98,
      },
      html2canvas: {
        scale: 3,
        letterRendering: true,
      },
      jsPDF: {
        unit: "in",
        format: "a3",
        orientation: "portrait",
      },
    })
    .from($element)
    .save()
    .catch((err) => console.log(err));
};

const ShowBill = () => {
  let id_bill = JSON.parse(localStorage.getItem("id-bill"));
  let location = "./dist/bills/" + id_bill[0].id;
  document.querySelector("#table-body").innerHTML = "";
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", location, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let bill_info = JSON.parse(this.responseText);
      let cont = 1;
      let numUSD = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      if (bill_info !== null) {
        console.log(bill_info)
        document.querySelector("#id-bill").innerHTML = bill_info.id;
        document.querySelector("#date-bill").innerHTML = bill_info.date;
        document.querySelector("#c-name").innerHTML =
          "In voice to : " + bill_info.c_name;
        document.querySelector("#c-id").innerHTML = bill_info.c_id;
        document.querySelector("#c-address").innerHTML = bill_info.c_address;
        document.querySelector("#c-cellphone").innerHTML =
          bill_info.c_cellphone;
        document.querySelector("#p-name").innerHTML = bill_info.p_name;
        document.querySelector("#p-nit").innerHTML = bill_info.p_nit;
        let medicaments = bill_info.medicaments;
        medicaments.forEach((element) => {
          document.querySelector("#table-body").innerHTML += `<tr>
        <td>${cont}</td>
      <td style="text-align: left">${element.medicament.m_name}</td>
      <td>${numUSD.format(element.medicament.price)}</td>
      <td>${element.quantity}</td>
      <td>${numUSD.format(
        element.quantity * element.medicament.price
      )}</td></tr>`;
          cont++;
        });
        document.querySelector("#sub-total").innerHTML = numUSD.format(
          bill_info.total
        );
        document.querySelector("#total-total").innerHTML = numUSD.format(
          bill_info.total
        );
        localStorage.removeItem("id-bill");
      }
    }
  };
};

document.querySelector("#download").addEventListener("click", (e) => {
  e.preventDefault();
  Download();
});

document.addEventListener("DOMContentLoaded", ShowBill);