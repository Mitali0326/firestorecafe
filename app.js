const cafeList = document.getElementById("cafe-list");
const form = document.getElementById('add-cafe-form');
// create element and render cafe
function renderCafe(doc){
   let li = document.createElement("li");
   let name = document.createElement("span");
   let city = document.createElement("span"); 
   let cross = document.createElement('div');

   li.setAttribute('data-id' ,doc.id);
   name.textContent = doc.data().name;
   city.textContent =doc.data().city;
   cross.textContent='x'
   li.appendChild(name);
   li.appendChild(city); 
   li.appendChild(cross);
   cafeList.appendChild(li);

   //deleting data
   cross.addEventListener('click' , (e) =>{
     e.stopPropagation();
     let id = e.target.parentElement.getAttribute('data-id');
     db.collection("cafes").doc(id).delete();
   })

 } 
 //getting data
 
 //search Where the data is 
//  == / > / <
// db.collection('cafes').where('city' , '==' ,'Indore').get().then((snapshot)=>{
//   snapshot.docs.forEach(doc =>{
  
//    renderCafe(doc);
//   })

//orderBY method to sort 
//name and city
//  upper case comes before lower case 
// db.collection('cafes').orderBy('city').get().then((snapshot)=>{
// snapshot.docs.forEach(doc =>{
// // console.log(doc.id);

//  renderCafe(doc);
// })
// and we can combine orderBy and where aslo
// db.collection('cafes').where('city', '==' ,'Indore').orderBy('name').get().then((snapshot)=>{
//   snapshot.docs.forEach(doc =>{
//    renderCafe(doc);
//   })
// db.collection('cafes').get().then((snapshot)=>{
//   snapshot.docs.forEach(doc =>{
//    renderCafe(doc);
//   })
// })



//saving data
form.addEventListener('submit' , (e)=>{
  e.preventDefault();
  db.collection('cafes').add({
    name:form.name.value,
    city:form.city.value
  })
form.name.value ='';
form.city.value='';
})

//real-time listener
//onSnapshort
db.collection("cafes").orderBy('city').onSnapshot(snapshot =>{
  let changes =snapshot.docChanges();
  changes.forEach(changes => {
    if(changes.type == 'added'){
      renderCafe(changes.doc);
    }else if(changes.type == 'removed'){
      let li = cafeList.querySelector('[data-id=' + changes.doc.id + ']');
      cafeList.removeChild(li);

    }

    
  });
})
// db.collection('cafes').doc('mitali').get().then((mydata)=>{
//   console.log(mydata);

// }) 

//update
//updates
db.collection("cafes").doc("xyz").update({
  name:"New YORK"
})

//set
//overwrite
db.collection("cafes").doc("xyz").set({
  name:"New YORK"
})