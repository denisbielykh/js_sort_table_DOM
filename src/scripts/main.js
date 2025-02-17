'use strict';

const thead = document.querySelector('thead');
const tbody = document.querySelector('tbody');

thead.addEventListener('click', sortTable);

function sortTable(e) {
  if (!e.target.closest('th')) {
    return;
  }

  const sortBy = e.target.textContent.toLowerCase();
  const data = createDataObject();
  const sortedData = sortData(data, sortBy);

  const newHTML = sortedData.reduce((prev, elem) => {
    return (
      prev +
      `
      <tr>
        <td>${elem.name}</td>
        <td>${elem.position}</td>
        <td>${elem.age}</td>
        <td>${elem.salary}</td>
      </tr>
    `
    );
  }, '');

  tbody.innerHTML = '';
  tbody.insertAdjacentHTML('beforeend', newHTML);
}

function createDataObject() {
  const trs = [...document.querySelector('tbody').children];

  const data = trs.map((tr) => {
    const cells = [...tr.children];

    return {
      name: cells[0].textContent.trim(),
      position: cells[1].textContent.trim(),
      age: Number(cells[2].textContent.trim()),
      salary: Number(cells[3].textContent.replace('$', '').replace(',', '')),
    };
  });

  return data;
}

function sortData(data, sortBy) {
  return data.sort((p1, p2) => {
    if (typeof p1[sortBy] === 'string') {
      return p1[sortBy].localeCompare(p2[sortBy]);
    }

    return p1[sortBy] - p2[sortBy];
  });
}
