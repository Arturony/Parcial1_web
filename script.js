/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
let producs = [];

let favs = [];

let toDelete = [];

const url = "https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce";

loadProducts();

function loadProducts()
{
    //fetch the list from the page
    fetch(url).then(function(response) 
    {
        if(response.ok) 
        {
          response.json().then(function(miBlob) {
            producs = miBlob.items;
            renderList(producs);
          });
        } else {
          //console.log("Respuesta de red OK pero respuesta HTTP no OK");
        }
      })
      .catch(function(error) {
        //console.log("Hubo un problema con la petición Fetch:" + error.message);
      });
}

function renderListNoList()
{
    //change the dom to load the list
    document.getElementById("main").innerHTML = "";
    let html = '<div class="container main-content">';
    
    for(let i = 0; i < producs.length; i++)
    {
        const formatter = new Intl.NumberFormat("en-US",
    {
        style: "currency",
        currency: producs[i].price.currency,
    });
        price = formatter.format(producs[i].price.amount);

        html += '<div class="row item">';
        html += '<img src='+ producs[i].picture +' alt="phone small" class="list-img" onclick="loadDetail(\''+producs[i].id+'\')">';
        html += '<span class="list-text list-price">'+ price +'</span>';
        if(producs[i].free_shipping == true)
        {
            html += '<img src="data/free-shipping.png" alt="free-shipping" class="list-shipping">';
        }
        html += '<span class="list-text list-location">'+producs[i].location+'</span>';
        html += '<span class="list-model">'+producs[i].title+'</span>';
        html += '</div>';
    }
    html += '</div>';
    document.getElementById("main").innerHTML = html;
}

function renderList(prod)
{
    //change the dom to load the list
    document.getElementById("main").innerHTML = "";
    let html = '<div class="container main-content">';
    
    for(let i = 0; i < prod.length; i++)
    {
        const formatter = new Intl.NumberFormat("en-US",
    {
        style: "currency",
        currency: prod[i].price.currency,
    });
        price = formatter.format(prod[i].price.amount);

        html += '<div class="row item">';
        html += '<img src='+ prod[i].picture +' alt="phone small" class="list-img" onclick="loadDetail(\''+producs[i].id+'\')">';
        html += '<span class="list-text list-price">'+ price + '</span>';
        if(prod[i].free_shipping == true)
        {
            html += '<img src="data/free-shipping.png" alt="free-shipping" class="list-shipping">';
        }
        html += '<span class="list-text list-location">'+prod[i].location+'</span>';
        html += '<span class="list-model">'+prod[i].title+'</span>';
        html += '</div>';
    }
    html += '</div>';
    document.getElementById("main").innerHTML = html;
}

function searchProduct()
{
    let a = document.getElementById("search").value;
    let temp = [];
    for(let i = 0; i < producs.length; i++)
    {
        for(let j = 0; j < producs[i].categories.length; j++)
        {
            if(producs[i].categories[i] === a)
            {
                temp.push(producs[i]);
            }
        }
    }

    if(temp.length == 0)
    {
        alert("No se encontraron productos con esa categoría");
    }
    else
    {
        renderList(temp);
    }
}

function loadDetail(id)
{
    document.getElementById("main").innerHTML = "";
    //render detail basically
    prod = producs.find( pro => pro.id === id);
    const formatter = new Intl.NumberFormat("en-US",
    {
        style: "currency",
        currency: prod.price.currency,
    });
    price = formatter.format(prod.price.amount);
    html ='<span class="detail-title">';
    for(let i = 0; i < prod.categories.length - 1; i++)
    {
        html += prod.categories[i] + " > ";
    }
    html += prod.categories[prod.categories.length - 1];
    html += '</span>';  
    html += '<div class="container-fluid detail-container">';
    html += '<img src='+ prod.picture +' alt="phone-detail" class="img-detail">';
    html += '<span class="product-qnt">'+ prod.condition + ' | '+ prod.sold_quantity +' vendidos</span>';
    html += '<span class="detail-model">'+ prod.title +'</span>';
    html += '<span class="detail-price">'+ price+'</span>';
    html += '<button class="button-buy-detail" onclick="showAlert(\''+prod.title+'\')"><label class="button-label-detail">Comprar</label></button>';
    test = favs.find(pro => pro === prod.id);
    if(test != undefined)
    {
        html += '<button id="fav" class="button-add-fav" onclick="addToFav(\''+prod.id+'\')"><label class="button-label-detail" >Eliminar de favoritos</label></button>';
    }
    else
    {
        html += '<button id="fav" class="button-add-fav" onclick="addToFav(\''+prod.id+'\')"><label class="button-label-detail" >Añadir a favoritos</label></button>';
    }
    html += '<span class="detail-description">Descripción del producto</span>';
    html += '<p class="product-description">'+ prod.description+'</p>';
    html += '</div>';
    document.getElementById("main").innerHTML = html;
}

function showAlert(model)
{
    alert(model + '\n' + "Agregado al carrito de compras");
}

function addToFav(prod)
{
    test = favs.find(pro => pro === prod);
    if(test != undefined)
    {
        ind = favs.indexOf(prod);
        html = '<label class="button-label-detail" >Agregar a favoritos</label>';
        document.getElementById("fav").innerHTML = html;
        favs.splice(ind, ind+1);
    }
    else
    {
        html = '<label class="button-label-detail" >Eliminar de favoritos</label>';
        document.getElementById("fav").innerHTML = html;
        favs.push(prod);
    }
}

function addToDelete(id)
{
    //when a checkbox is edited to true, add it to the delete list
    test = toDelete.find(pro => pro === id);
    if(test != undefined)
    {
        ind = toDelete.indexOf(id);
        toDelete.splice(ind, ind+1);
        if(toDelete.length == 0)
        {
            document.getElementById("del").disabled = true;
            document.getElementById("del").style.background = '#ECE9E9';
        }
    }
    else
    {
        toDelete.push(id);
        document.getElementById("del").disabled = false;
        document.getElementById("del").style.background = '#E1677D';
    }
}

function deleteFavorites()
{
    //remove from the fav list. Then render
    for(let i = 0; i < toDelete.length; i++)
    {
        ind = favs.indexOf(toDelete[i]);
        favs.splice(ind, ind+1);
    }
    toDelete = [];
    renderFavourites();
}

function checkAll()
{
    let cheks = document.getElementsByClassName("sel-checkbox");
    for(let i = 0; i < cheks.length; i++)
    {
        if("createEvent" in document) {
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            cheks[i].dispatchEvent(evt);
        }
        else
        {
            cheks[i].fireEvent("onchange");
        }
        cheks[i].checked = !cheks[i].checked;
    }
}

function renderFavourites()
{
    //render fav list
    document.getElementById("main").innerHTML = "";
    html =  '<h2 class="title-fav">Favoritos</h2>';
    html += '<div class="container main-fav-content">';
    html += '<div class="row delete-fav">';
    html += '<input type="checkbox" id="delete-check" class="del-checkbox" value="first_checkbox" onchange="checkAll()">';
    html += '<button class="button-delete-fav" onclick="deleteFavorites()" id="del" disabled><label class="button-label">Eliminar</label></button>';
    html += '</div>';

    for(let i = 0; i < favs.length; i++)
    {
        prod = producs.find( pro => pro.id === favs[i]);
        const formatter = new Intl.NumberFormat('en-US',
        {
        style: 'currency',
        currency: prod.price.currency,
        });
        price = formatter.format(prod.price.amount);
        html += '<div class="row item">';
        html += '<input type="checkbox" id="select-check" class="sel-checkbox" value="first_checkbox" onchange="addToDelete(\''+favs[i]+'\')">';
        html += '<img src='+ prod.picture +' alt="phone-list" class="fav-img" onclick="loadDetail(\''+favs[i]+'\')">';
        html += '<span class="list-text list-price">'+price+'</span>';
        if(prod.free_shipping == true)
        {
            html += '<img src="data/free-shipping.png" alt="free-shipping" class="list-shipping">';
        }
        html += '<span class="list-model">'+prod.title+'</span>';
        html += '<button class="fav-detail-button" onclick="loadDetail(\''+favs[i]+'\')"><label class="button-label">Ver artículo</label></button>';
        html += '</div>';
    }
    html += '</div>';
    document.getElementById("main").innerHTML = html;
}