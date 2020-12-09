const a = [];

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function loadSessionStorage(){
  sessionStorage.setItem("images", JSON.stringify([]));
}

function getObjs(){
  const Objs = JSON.parse(sessionStorage.getItem("images"));
  return Objs;
}

function isExists(name){
  const Objs = getObjs();
  const isExists = Objs.filter(function(item) {
    if(item.name === name) {
      return true;
    }
  });
  return isExists;
}

function add(){

  const url = document.getElementById('url').value;
  const name = document.getElementById('name').value;
  const info = document.getElementById('info').value;
  const date = document.getElementById('date').value;

  if(url && name && info && date) {
    let Objs = JSON.parse(sessionStorage.getItem("images"));

    console.log(Objs, ' i am objs')

    if(Objs === null) {
      sessionStorage.setItem("images", JSON.stringify([]));

      Objs = JSON.parse(sessionStorage.getItem("images"));
    }
  
    Objs.push({
      url,
      name,
      info,
      date
    })

    a.push('boom');

    sessionStorage.setItem("images", JSON.stringify(Objs));
    console.log(a, " I am a");
  }
}

function remove(){
  const name = document.getElementById('removeName').value;
  if(isExists(name)){
    const Objs = getObjs();
    const newObjs = Objs.filter(item => item.name !== name);

    sessionStorage.setItem("images", JSON.stringify(newObjs));
  }
}

function edit(){

  const url = document.getElementById('url').value;
  const name = document.getElementById('name').value;
  const info = document.getElementById('info').value;
  const date = document.getElementById('date').value;

  if(isExists(name)) {
    const Objs = getObjs();
    const newObjs = Objs.map(item => {
      if(item.name === name) {
        return {
          ...item,
          url,
          name,
          info,
          date
        }
      }
      else {
        return item;
      }
    })

    sessionStorage.setItem("images", JSON.stringify(newObjs));
  }

  else {
    alert(name + "does not exists")
  }
}