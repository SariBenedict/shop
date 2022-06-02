class Product{
    constructor( name,id,price,quantity,category )
    {
        this.name=name;
        this.id=id;
        this.price=price;
        this.quantity=quantity;
        this.category=category;
    }

    updateProduct =()=>
    {
        const form_edit = document.createElement('form');
        const nameInput = document.createElement('input');
        const idInput = document.createElement('input');
        const priceInput = document.createElement('input');
        const quantityInput = document.createElement('input');
        const categoryInput = document.createElement('input');
        const update_button = document.createElement('button');
        nameInput.name = 'name'; idInput.name = 'id'; priceInput.name = 'price'; quantityInput.name = 'quantity';
        categoryInput.name = 'category';
        nameInput.placeholder = 'name: '+this.name; idInput.placeholder = 'barcode: '+this.id; priceInput.placeholder = 'price: '+this.price;
        quantityInput.placeholder = 'quantity: '+ this.quantity; categoryInput.placeholder = 'category: '+this.category;
        priceInput.type = 'number'; quantityInput.type = 'number';
        update_button.type = "submit";
        update_button.textContent = "Update"
        form_edit.appendChild(nameInput);
        form_edit.appendChild(idInput);
        form_edit.appendChild(priceInput);
        form_edit.appendChild(quantityInput);
        form_edit.appendChild(categoryInput);
        form_edit.appendChild(update_button);
        h3.innerHTML = `Update the productws datailes`;
        space.innerHTML=``;
        space.appendChild(form_edit);
        form_edit.onsubmit =(e)=>
        {
            e.preventDefault();
            const formData=new FormData(form_edit);
            //מקבל את כל הערכים שיש בפורם DATA 
            const data=Object.fromEntries([...formData.entries()]); 
            if(this.name != data.name && data.name != '')
            {
                this.name = data.name;
            }
            if(this.id != data.id && data.id != '')
            {
                this.id = data.id;
            }
            if(this.price != data.price && data.price != '')
            {
                this.price = data.price;
            }
            if(this.quantity != data.quantity && data.quantity != '')
            {
                this.quantity = data.quantity;
            }
            if(this.category != data.category && data.category != '')
            {
                this.category = data.category;
            }
            this.viewProduct();
            space.innerHTML = ``;
        }
    }

    viewProduct()
    {
        const productToView = document.createElement("ul");
        const namev = document.createElement("li");
        const idv = document.createElement("li");
        const pricev = document.createElement("li");
        const quantityv = document.createElement("li");
        const categoryv = document.createElement("li");
        const button_to_edit = document.createElement("button");
        button_to_edit.textContent = 'Edit';
        const name = this.name; const barcode = this.id; const price = this.price;
        const quantity = this.quantity; const category = this.category;
        namev.innerHTML=`product name: `+this.name; idv.innerHTML=`barcode: `+this.id; pricev.innerHTML=`price: `+this.price;
        quantityv.innerHTML=`quantity: `+this.quantity; categoryv.innerHTML=`category: `+this.category;
        productToView.appendChild(namev);  
        productToView.appendChild(idv); 
        productToView.appendChild(pricev); 
        productToView.appendChild(quantityv); 
        productToView.appendChild(categoryv); 
        view_product.appendChild(productToView);
        view_product.appendChild(button_to_edit);
        button_to_edit.type= 'button';
        button_to_edit.onclick = () =>
        {
            this.updateProduct();
            view_product.removeChild(productToView );
            view_product.removeChild(button_to_edit );
        }
    }
}

function createNewProduct(name, id, price, quantity, category)
{ 
    const p = new Product (name, id, price, quantity, category);
    return p;
}

const update_space = document.getElementById("update");

//********************************************************//
class Shop{
    
    constructor()
    {
        this.allProducts=[];
    }

    showAll()
    {
        view_product.innerHTML=``;
        this.allProducts.forEach(p=> {
            p.viewProduct();
        })
    }

    addProduct()
    {
        h3.innerHTML = `Add a new product`;
        const form_add_product = document.createElement('form');
        const nameInput = document.createElement('input');
        const idInput = document.createElement('input');
        const priceInput = document.createElement('input');
        const quantityInput = document.createElement('input');
        const categoryInput = document.createElement('input');
        const add_button = document.createElement('button');
        nameInput.name = 'name'; idInput.name = 'id'; priceInput.name = 'price'; quantityInput.name = 'quantity';
        categoryInput.name = 'category';
        nameInput.placeholder = 'product name'; idInput.placeholder = 'barcode'; priceInput.placeholder = 'price';
        quantityInput.placeholder = 'quantity'; categoryInput.placeholder = 'category';
        priceInput.type = 'number'; quantityInput.type = 'number';
        add_button.type = "submit";
        add_button.textContent = "Add"
        form_add_product.appendChild(nameInput);
        form_add_product.appendChild(idInput);
        form_add_product.appendChild(priceInput);
        form_add_product.appendChild(quantityInput);
        form_add_product.appendChild(categoryInput);
        form_add_product.appendChild(add_button);
        space.appendChild(form_add_product);
        form_add_product.onsubmit = (e) => {
            e.preventDefault();
            const formData=new FormData(form_add_product);
            //מקבל את כל הערכים שיש בפורם DATA 
            const data=Object.fromEntries([...formData.entries()]);   
            const newProduct = createNewProduct(data.name, data.id ,data.price, data.quantity, data.category);
            this.allProducts.push(newProduct);
            newProduct.viewProduct();
        }
    }

    searchByCategory()
    {
        console.log("yes")
        const select_category = document.createElement('select');

        // ---- filling the options in the select category
        const select_categories = () =>
        { 
            const categories = [];
            let i;
            for(i=0;i<this.allProducts.length;i++)
            {
                let j;
                for( j=0 ; j<categories.length ; j++)
                {
                    if(categories[j] === this.allProducts[i].category)
                        break;
                }
                console.log("j"+j);
                if(j === categories.length)
                    categories.push(shop.allProducts[i].category)
            }
            categories.forEach(c => {
                var opt = c;
                var el = document.createElement('option');
                el.textContent = opt;
                el.value = opt;
                select_category.appendChild(el);   
                console.log(el.textContent);
            })   
            space.innerHTML=``;
            h3.innerHTML = `Search....`;
            space.appendChild(select_category);
        }

        // --- activating the function
        select_categories();
        select_category. onchange =()=>
        {
            const categorySelected = select_category.options[select_category.selectedIndex].value;
            const results =[];
            // //the search by category
            const search =()=>
            {
            return shop.allProducts.filter((p) => {
                if(p.category === categorySelected)
                    results.push(p);
                })
            }
            // --- activating the function
            search();
            view_product.innerHTML=``;
            results.forEach(r => {
                r.viewProduct();
        });;
        }
        
    }

    searchByPrices()
    {
        const form_choose_prices = document.createElement('form');
        const max_price = document.createElement('input');
        max_price.type = 'number';
        max_price.placeholder = 'Insert the maximum price';
        max_price.name = 'max_price';
        const ok_button = document.createElement('button');
        ok_button.type = "submit";
        ok_button.textContent = "OK";
        form_choose_prices.appendChild(max_price);
        form_choose_prices.appendChild(ok_button);
        space.innerHTML = ``;
        space.appendChild(form_choose_prices);
        form_choose_prices.onsubmit =(e)=>
        {
            e.preventDefault();
            const formData=new FormData(form_choose_prices);
            //מקבל את כל הערכים שיש בפורם DATA 
            const data=Object.fromEntries([...formData.entries()]); 
            const maxPrice = data.max_price;
            const results =[];
            // //the search by max price
            const searchPrice =()=>
            {
                    return this.allProducts.filter((p) => {
                    if(parseInt(p.price) <= maxPrice )
                    {
                        results.push(p);
                    }
                })
            }
            
            // --- activating the function
            searchPrice();
            view_product.innerHTML=``;
            results.forEach(r => {
                r.viewProduct();
        });  
        if(results.length === 0)
        {
            view_product.innerHTML=`no results`;
        }
        }
        
    }

}

// מופע של חנות 
const shop = new Shop ();

// view all products
const btn_view_all_products = document.getElementById('viewAll');
btn_view_all_products.onclick = () =>{ shop.showAll(); }

//add a new product
const btn_add_product = document.getElementById('addProduct');
btn_add_product.onclick = () =>
{
    space.innerHTML=``;
    shop.addProduct();
}

//search
const btn_search = document.getElementById('search');
btn_search.onclick = () =>{
    space.innerHTML=``;
    btn_search.style.opacity = 0.5;
    const btn_search_by_category = document.createElement('button'); 
    btn_search_by_category.type = "button";
    btn_search_by_category.textContent = 'search by category';
    space.appendChild(btn_search_by_category);
    const btn_search_by_prices = document.createElement('button'); 
    btn_search_by_prices.type = "button";
    btn_search_by_prices.textContent = 'search by prices';
    space.appendChild(btn_search_by_prices);
    btn_search_by_category.onclick = () =>{ shop.searchByCategory(); }
    btn_search_by_prices.onclick = () =>{ shop.searchByPrices(); }
 }

//space to view the product's datails
const view_product = document.getElementById('viewProduct');

const space = document.getElementById('space');

const h3 = document.querySelector('h3');


