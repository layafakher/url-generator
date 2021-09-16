const paramTemplate = '<input class="q-input" placeholder="Param Key" />';
const queryTemplate =
  '<input class="q-input" placeholder="Query Key" /><input class="q-input" placeholder="Query Value" />';
const baseUrl = "https://website.ir";
let queryValue = [];

const addNewParam = () => {
  let params = document.querySelectorAll('#params-container input');
  let paramsContainer = document.querySelector('#params-container');
  if (params[params.length-1].value){
      let newDiv = document.createElement('div');
      newDiv.classList.add('keyValue-box');
      newDiv.innerHTML = paramTemplate;
      paramsContainer.appendChild(newDiv);
  }
};
const addNewQuery = () => {
    let queries = document.querySelectorAll('#queries-container input');
    let queriesContainer = document.querySelector('#queries-container');
    if (queries[queries.length-1].value && queries[queries.length-2].value){
        let newDiv = document.createElement('div');
        newDiv.classList.add('keyValue-box');
        newDiv.innerHTML = queryTemplate;
        queriesContainer.appendChild(newDiv);
    }
};
const generateURL = () => {
    let value = baseUrl;
    let params = document.querySelectorAll('#params-container input');
    let queries = document.querySelectorAll('#queries-container input');
    params.forEach((e)=>{
        if (e.value && e.value!=' '){
            value = value.concat(`/${e.value}`);
        }
    });
    for (let i = 0; i < queries.length-1; i++) {
        if (queryValue.includes(queries[i].value)){
            let id = queryValue.indexOf(queries[i].value);
            queryValue[id+1]=queries[i+1].value+'';
        }else
            queryValue.push(queries[i].value+'');
    }
    queryValue.push(queries[queries.length-1].value+'');

    if (queryValue.length>0){
        if (queryValue[0]!=' ' && queryValue[1]!=' ' && queryValue[0] && queryValue[1]){
            value = value.concat('?'+queryValue[0]+"="+queryValue[1]);
        }

        for (let i = 2; i < queryValue.length-1; i+=2) {
            if (queryValue[i]!=' ' && queryValue[i+1]!=' ' && queryValue[i] && queryValue[i+1]){
                value = value.concat("&"+queryValue[i]+"="+queryValue[i+1]);
            }
        }
    }
    renderUrl(value);
};

const renderUrl = (url) => {
  const el = document.getElementById("url-container");
  el.innerHTML = `<p>${url}</p>`;
};

document.getElementById("param-submit").addEventListener("click", addNewParam);
document.getElementById("query-submit").addEventListener("click", addNewQuery);
document.getElementById("generate").addEventListener("click", generateURL);



//
// if (queryValue.includes(queries[queries.length-2])){
//     for (let i = 0; i < queryValue.length; i++) {
//         if (queryValue[i]==queries[queries.length-2]){
//             queryValue[i+1] = queries[queries.length-1];
//         }
//     }
// }
// else {
//     queryValue.push(''+queries[queries.length-2].value);
//     queryValue.push(''+queries[queries.length-1].value);
// }