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

const DownloadJSON = (id) => {
  let name = id + ".json";
  let bill = localStorage.getItem("bill");
  let blob = new Blob([bill], { type: "text/plain;charset=utf-8" });
  saveAs(blob, name);
};

const ShowBill = () => {
  document.querySelector("#table-body").innerHTML = "";
  let bill_info = JSON.parse(localStorage.getItem("bill"));
  let cont = 1;
  let numUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  if (bill_info === null) {
    bill_info = [];
  } else {
    document.querySelector("#id-bill").innerHTML = bill_info.id;
    document.querySelector("#date-bill").innerHTML = bill_info.date;
    document.querySelector("#c-name").innerHTML =
      "In voice to : " + bill_info.c_name;
    document.querySelector("#c-id").innerHTML = bill_info.c_id;
    document.querySelector("#c-address").innerHTML = bill_info.c_address;
    document.querySelector("#c-cellphone").innerHTML = bill_info.c_cellphone;
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
    setTimeout(Download, 1000)
    setTimeout(DownloadJSON(bill_info.id), 1900);
    setTimeout(function(){
      window.close()
    }, 2000)
    localStorage.removeItem("bill");
  }
};

document.addEventListener("DOMContentLoaded", ShowBill);
