async function sendRequest(api, method, data) {
  const body = data ? data : null;
  const response = await fetch('http://localhost:3001/' + api, {
    method: method,
    body: body,
  });
  const response_data = await response.json();
  return response_data;
}

const changeHeader = (planet) => {
  document.querySelector('h1').textContent = planet['planetName'];
  document.getElementById('create-btn').textContent = 'Edit';
  document.getElementById('header-div').classList.add('visible');
  document.getElementById('def-header-div').className = 'def-header-div';
  const SINGLE_GRID = document.getElementById('single-grid');
  SINGLE_GRID.style.display = 'block';
  document.getElementById('input-search').style.display = 'none';

  const {
    imageUrl,
    planetName,
    description,
    planetColor,
    planetRadiusKM,
    distInMillionsKM: { fromSun, fromEarth },
  } = planet;

  let html = `
  <div class="grid-container-single">
      <div>
        <img class="img-radius" width="70" height="70" src=${imageUrl}>
        <h2>${planetName}</h2>
        <div class="inline">
            <div class="wrap">
              <p>${description}</p>
            </div>
        </div>
      </div>
      <div>
        <table height=100%; width=100%">
          <tr>
            <td style="text-align: center;">
              <h2>${planetRadiusKM}</h2>
              <p>Radius in km</p>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;">
              <h2>${planetColor}</h2>
              <p>Color</p>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <table height=100%; width=100%">
          <tr>
            <td style="text-align: center;">
              <h2>${fromEarth}</h2>
              <p>Dist. from Earth</p>
          <tr>
            <td style="text-align: center;">
              <h2>${fromSun}</h2>
              <p>Dist. from Sun</p>
            </td>
          </tr>
        </table>
      </div> 
  </div>
  `;
  SINGLE_GRID.innerHTML = html;
};

function init() {

  const MAIN_GRID = document.querySelector('#main-grid');
  const FORM = document.getElementById('form');
  let singlePlanetData;
  const CREATE_PLANET_MODAL = document.getElementById('add-modal');
  let action;
  const TABLE_GRID = document.querySelector('#table-div');
  const IMG_PREVIEW = document.getElementById('img-preview');

  const backdropToggle = () => {
    const BACKDROP = document.getElementById('backdrop');
    BACKDROP.classList.toggle('visible');
  };

  const addEventOnSinglePlanet = (domElement, domClass) => {
    domElement.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      if (event.target.closest(domClass)) {
        const ID = event.target.closest(domClass).id;
        sendRequest(`api/planets/${ID}`, 'GET').then((response) => {
          domElement === TABLE_GRID
            ? (domElement.style.display = 'none')
            : domElement.classList.add('visible');
          singlePlanetData = response;
          changeHeader(response);
        });
      } else return;
    });
  };

  const addPlanetsToGrid = (data) => {
    data.forEach((planet) => {
      const {
        id,
        imageUrl,
        planetName,
        description,
        planetColor,
        planetRadiusKM,
        distInMillionsKM: { fromSun, fromEarth },
      } = planet;

      let html = `
        <div class="div-item" id=${id}>
          <img class="img-radius" width="50" height="50" src=${imageUrl}>
          <h2>${planetName}</h2>
          <div class="inline">
            <div class="wrap">
              <p>${description}</p>
            </div>
          </div>
          <div id="textbox">
            <span class="alignleft">Color: ${planetColor}</span>
            <span class="alignright">Dist.from Sun: ${fromSun}</span>
          </div>
          <div style="clear: both;"></div>
          <div id="textbox">
            <span class="alignleft">Radius[km]: ${planetRadiusKM}</span>
            <span class="alignright">Dist.from Earth: ${fromEarth}</span>
          </div>
        </div>
        `;

      MAIN_GRID.insertAdjacentHTML('beforeend', html);
      addEventOnSinglePlanet(MAIN_GRID, '.div-item');
    });
  };

  const addPlanetsToTable = (data) => {
    data.forEach((planet) => {
      const {
        id,
        imageUrl,
        planetName,
        description,
        planetColor,
        planetRadiusKM,
        distInMillionsKM,
      } = planet;

      let html = `
      <tr class='selected-tr' id=${id}>
        <td>
          <img style="height:100%" class="img-radius" width="30" height="30" src=${imageUrl}>
        </td>
        <td class='sort'>${planetName}</td>
        <td style='font-size: 11px'>${description.slice(0, 50)}...</td>  
        <td class='sort'>${planetColor}</td>
        <td class='sort'>${planetRadiusKM}</td>
        <td class='sort'>${distInMillionsKM.fromSun}</td>
        <td class='sort'>${distInMillionsKM.fromEarth}</td>
      </tr>
      `;
      TABLE_GRID.querySelector('table').insertAdjacentHTML('beforeend', html);
    });

    addEventOnSinglePlanet(TABLE_GRID, '.selected-tr');
  };

  sendRequest('api/planets', 'GET').then((response) => {
    addPlanetsToTable(response);
    addPlanetsToGrid(response);
  });

  const modalActions = (display) => {
    document.querySelector('#modal-popup').style.display = display;
    backdropToggle();
    CREATE_PLANET_MODAL.classList.remove('visible');
  };

  document
    .getElementById('cancel-popup')
    .addEventListener('click', modalActions.bind(this, 'none'));

  document
    .getElementById('cancel-btn')
    .addEventListener('click', modalActions.bind(this, 'none'));

  document
    .getElementById('backdrop')
    .addEventListener('click', modalActions.bind(this, 'none'));

  document.getElementById('create-btn').addEventListener('click', () => {
    CREATE_PLANET_MODAL.classList.add('visible');
    backdropToggle();
    if (
      MAIN_GRID.className === 'grid-container visible' &&
      TABLE_GRID.style.display === 'none'
    ) {
      document.querySelector('.btn--success').textContent = 'Edit';
      AddDataInForm();
    } else {
      const inputs = FORM.querySelectorAll('input');
      for (const input of inputs) {
        input.value = '';
        IMG_PREVIEW.innerHTML = '';
      }
      document.getElementById('description').value = '';
    }
  });

  document.querySelector('.btn--success').addEventListener('click', () => {
    backdropToggle();
    if (
      MAIN_GRID.className === 'grid-container visible' &&
      TABLE_GRID.style.display === 'none'
    ) {
      action = 'edit';
      openPopup(action);
    } else {
      if (!IMG_PREVIEW.querySelector('img')) {
        alert('you need to write all data...');
        backdropToggle();
        return;
      }
      for (const input of FORM.querySelectorAll('input')) {
        if (!input.value) {
          alert('you need to write all data...');
          backdropToggle();
          return;
        }
      }
      action = 'create';
      openPopup(action);
    }
  });

  document
    .getElementById('sort-color')
    .addEventListener('click', sortColorHandler.bind(this, 1));

  function sortColorHandler(n) {
    let table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById('table-planets');
    switching = true;
    dir = 'asc';
    while (switching) {
      switching = false;
      rows = table.rows;
      console.log(rows);
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        x = rows[i].querySelectorAll('td')[n];
        y = rows[i + 1].querySelectorAll('td')[n];
        console.log(n);
        if (dir == 'asc') {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == 'desc') {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && dir == 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  }

  document
    .getElementById('input-search')
    .addEventListener('keyup', function () {
      let filter, table, tr, td, i;
      filter = this.value.toUpperCase();
      table = document.getElementById('table-planets');
      tr = table.querySelectorAll('tr');
      for (let i = 0; i < tr.length; i++) {
        td = tr[i].querySelectorAll('.sort');
        for (let j = 0; j < td.length; j++) {
          let tdata = td[j];
          if (tdata) {
            if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = '';
              break;
            } else {
              tr[i].style.display = 'none';
            }
          }
        }
      }
    });

  document
    .getElementById('choose-file')
    .addEventListener('change', function () {
      const files = this.files[0];
      if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener('load', function () {
          IMG_PREVIEW.style.display = 'block';
          IMG_PREVIEW.innerHTML =
            '<img width="30" height="30" src="' + this.result + '" />';
        });
        document.getElementById('image-name').value = files.name;
      }
    });

  document.getElementById('grid-view').addEventListener('click', () => {
    MAIN_GRID.classList.remove('visible');
    TABLE_GRID.style.display = 'none';
  });

  document.getElementById('table-view').addEventListener('click', () => {
    MAIN_GRID.classList.add('visible');
    TABLE_GRID.style.display = 'block';
  });

  const openPopup = (type) => {
    modalActions('block');
    let message = `Are you sure you want to ${type} `;
    if (type === 'edit') {
      message += `${singlePlanetData['planetName']} ?`;
    } else if (type === 'create') {
      message += `${document.getElementById('planetName').value} ?`;
    } else {
      message += `${singlePlanetData['planetName']} ?`;
      action = 'delete';
    }

    document.getElementById('confirm-text').textContent = message;
  };

  document
    .getElementById('delete-btn')
    .addEventListener('click', openPopup.bind(this, 'delete'));

  document.getElementById('confirm-popup').addEventListener('click', () => {
    const ID = singlePlanetData ? singlePlanetData['id'] : null;
    if (action === 'edit') {
      let fd = new FormData(FORM);
      fd.append('id', ID);
      fd.append('imageUrl', IMG_PREVIEW.querySelector('img').src);
      sendRequest(`api/planets/${ID}`, 'PUT', fd).then((response) => {
        singlePlanetData = response;
        changeHeader(response);
      });
    } else if (action === 'create') {
      createPlanet();
    } else {
      sendRequest(`api/planets/${ID}`, 'DELETE').then((response) => {
        window.location.reload(); // DA LI OVO DA OSTAVIM
      });
    }

    modalActions('none');
  });

  const AddDataInForm = () => {
    console.log(singlePlanetData);
    const properties = ({
      imageName,
      planetName,
      planetRadiusKM,
      planetColor,
      distInMillionsKM: { fromSun, fromEarth },
    }) => [
      imageName,
      planetName,
      planetRadiusKM,
      planetColor,
      fromSun,
      fromEarth,
    ];

    const property_values = properties(singlePlanetData);

    document.querySelector('textarea').value = singlePlanetData['description'];
    IMG_PREVIEW.innerHTML = `<img style="border-radius: 50%;" width="30" height="30" src="
      ${singlePlanetData['imageUrl']}" />`;

    const INPUTS = document.querySelectorAll('input');

    for (let i = 2; i < INPUTS.length; i++) {
      INPUTS[i].value = property_values[i - 2];
    }
  };

  const createPlanet = () => {
    fd = new FormData(FORM);
    fd.append('imageUrl', IMG_PREVIEW.querySelector('img').src);

    sendRequest('api/planets', 'POST', fd).then((response) => {
      addPlanetsToGrid([response]);
      addPlanetsToTable([response]);
    });
  };
}
