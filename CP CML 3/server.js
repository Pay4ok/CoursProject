"use strict"

const XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

const xhr = new XHR();

xhr.open('GET', 'tours.xml', false);

xhr.onload = function() {
  const parser = new DOMParser();

  const dataBase = parser.parseFromString(this.response, "application/xml").children[0];
  
  window.onload = () => {
    for (let i in dataBase.children) {
      const tr = document.createElement('tr');
      tr.onclick = tourDBClose;
      for (let j in dataBase.children[i].children) {
        if (dataBase.children[i].children[j].textContent != undefined) {
          const td = document.createElement('td');
          td.textContent =  dataBase.children[i].children[j].textContent;

          tr.appendChild(td);
          document.querySelector('.tours-db-tbody').appendChild(tr);
        }
      }
    }
  }

  console.log(dataBase);
}

xhr.onerror = function() {
  alert( 'Ошибка ' + this.status );
}

xhr.send();