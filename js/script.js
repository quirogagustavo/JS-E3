const input=document.querySelector('.input-text');
const addForm=document.querySelector('.add-form');
const taskList=document.querySelector('.card');
const nombreClass=document.querySelector('.nombre');
//taskList.style.visibility='hidden';

//Aca empieza E1 JS
class Pizza {
    constructor(id,nombre,ingredientes,precio, src){
        this.id=id;
        this.nombre=nombre;
        this.ingredientes=ingredientes;
        this.precio=precio;
        this.src=src;
    }
}

let tipoPizza=[];
tipoPizza.push(new Pizza(1,'Muzzarella',['Salsa de tomate','Muzzarella'],700,'./assets/images/muza.jpg'));
tipoPizza.push(new Pizza(2,'Especial',['Tomate','Muzzarella','Jamon','Morron','Aceitunas'],1000,'./assets/images/pizza-especial.jpg'));
tipoPizza.push(new Pizza(3,'Calabresa',['Muzzarella','Tomate','cantimpalo'],1200,'./assets/images/pizza-calabresa.png'));
tipoPizza.push(new Pizza(4,'Napolitana',['Muzzarella','Rodaja de Tomate','Ajo'],1100,'./assets/images/pizza-napolitana.jpg'));
tipoPizza.push(new Pizza(5,'Palmito',['Muzzarella','Jamon','Palmito','Salsa Golf'],1200,'./assets/images/pizza-palmito.jpg'));
tipoPizza.push(new Pizza(6,'Margarita',['Muzzarella','Tomate','Oregano'],800,'./assets/images/pizza-margarita.jpg'));

const createHTMLList = ({nombre,precio,ingredientes,src}) => { 
    //console.log(nombre);
    
 //console.log(nombreClass);
 //taskList.className='card_visible';
 
/*    document.querySelector(".imagen").style.visibility="imagen";
*/
    return `<div class="card">
    <div class="nombre">${nombre}</div>
    <div class="imagen">
      <img src="${src}" alt="muestra" />
    </div>
    <div class="ingrediente">${ingredientes}</div>

    <div class="precio">Precio: ${precio} $</div>
    <div></div>
  </div>`
    //<li> <h2>${nombre}</h2>       <h3>${precio}</h3> </li>`
}

const renderPizzaList = (result) => {

    const allTasks = result.map((task) => createHTMLList(task)).join('');
    console.log(allTasks);
    
    taskList.style.visibility='visible';        
    taskList.innerHTML=allTasks;
}

const deleteAll=() => {
    list = [];
    renderPizzaList(list);
 };


const addTask = (e) => {
    //Evita que recargue la pagina cuando se ejecuta el submit
    e.preventDefault();
    const vacio = deleteAll();

    //Verifica que ingreso un numero
    if (isNaN(parseInt(input.value))) { 
        let mensaje =[];
        mensaje.push(new Pizza(0,'Advertencia',['Debe ingresar un numero de ID'],'','./assets/images/advertencia.jpg'));
        renderPizzaList(mensaje);
        return;    
    }
    const pizzaId=parseInt(input.value);
    
    const result = tipoPizza.filter(({ id }) => id === pizzaId);

    //Verifica que el ID ingresado esta en el arreglo
    if (result.length===0) { 
        let mensaje =[]; 
        
        mensaje.push(new Pizza(0,'Advertencia',['No hay pizza para el ID ' + pizzaId],'','./assets/images/advertencia.jpg'));
        renderPizzaList(mensaje);
        return;    
    }
    
    //Almacena en localstorage
    localStorage.setItem('buscado',JSON.stringify(result));   
    renderPizzaList(result);

};

const ultimo=localStorage.getItem('buscado');
if (ultimo !== null) {
    ultimaPizza=JSON.parse(ultimo);
    renderPizzaList(ultimaPizza)
};
addForm.addEventListener('submit',addTask);