// start information
let allInputs = Array.from(document.querySelectorAll(".header-container div input"));
let caseNumber = document.querySelector("#case-number");
let clientName = document.querySelector("#client-name");
let against = document.querySelector("#against");
let fromSession = document.querySelector("#from-session");
let toSession = document.querySelector("#to-session");
let caseType = document.querySelector("#case-type");

let createBtn = document.querySelector(".create");
let removeBtn = document.querySelector(".remove-all");
let bodyTable = document.querySelector(".tbody");
let temp;
let clientsInfo;
// end information
if (localStorage.getItem("cases") !== null){
        clientsInfo = JSON.parse(localStorage.getItem("cases"))
        }else{
            clientsInfo = [];
        }
createBtn.addEventListener("click", ()=>{
        let clientObj = {
            theCaseNumber: caseNumber.value,
            theClientName: clientName.value,
            theAgainst: against.value,
            theFrom: fromSession.value,
            theTo: toSession.value,
            theCaseType: caseType.value,
        }
        
        if(createBtn.innerHTML === "إنشاء"){
            clientsInfo.push(clientObj);
            window.localStorage.setItem("cases", JSON.stringify(clientsInfo));
        }else if(createBtn.innerHTML === "تعديل") {
            modifiedHandle(clientObj);
            window.localStorage.setItem("cases", JSON.stringify(clientsInfo));
        }else{
            false;
        }

        emptyInput();
        createNewRow();
    }
)

let emptyInput = ()=>{
    allInputs.forEach((input)=> input.value = "");
}

let createNewRow = ()=>{
    let tr = ``;
    for(let i = 0; i < clientsInfo.length; i++){
        temp = i;
        tr += `
        <tr>
            <td>${clientsInfo[i].theCaseNumber}</td>
            <td>${clientsInfo[i].theClientName}</td>
            <td>${clientsInfo[i].theAgainst}</td>
            <td>${clientsInfo[i].theFrom}</td>
            <td>${clientsInfo[i].theTo}</td>
            <td>${clientsInfo[i].theCaseType}</td>
            <td>
                <button class="btn btn-primary m-1 edit" onClick = {editHandle(${i})}>تعديل</button>
                <button class="btn btn-primary m-1 delete" onClick = {deletHandle(${i})}>حذف</button>
            </td>
        </tr>
    `
    }
    document.querySelector(".tbody").innerHTML = tr;
}
createNewRow();

// clear all items
removeBtn.addEventListener("click", ()=>{
    clientsInfo.splice(0);
    localStorage.setItem("cases", JSON.stringify(clientsInfo));
    createNewRow();
});

// edit button function
let editHandle = (i)=>{
    caseNumber.value = clientsInfo[i].theCaseNumber;
    clientName.value = clientsInfo[i].theClientName;
    against.value = clientsInfo[i].theAgainst;
    fromSession.value = clientsInfo[i].theFrom;
    toSession.value = clientsInfo[i].theTo;
    caseType.value = clientsInfo[i].theCaseType;
    createBtn.innerHTML = "تعديل";
}

// delet one item
let deletHandle = (i)=>{
    clientsInfo.splice(i, 1);
    localStorage.setItem("cases", JSON.stringify(clientsInfo));
    createNewRow();
}


//every thing modified
let modifiedHandle = (clientObj)=>{
            clientsInfo[temp] = clientObj;
            createBtn.innerHTML = "إنشاء";
}