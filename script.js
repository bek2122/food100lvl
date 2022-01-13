const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 200,
        amount: 0,
        get Sum() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 300,
        amount: 0,
        get Sum() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 350,
        amount: 0,
        get Sum() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    }
}


const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 500,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 1500,
        kcall: 30
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');

btnPlusOrMinus.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        plusOrMinus(this);
    })
})

function plusOrMinus(element) {
    /* 
    closest() - метод объкета. Который подключается и получает родителя элемента
    getAttribute() - получает значение аттрибута у элемента
    */


    const parent = element.closest('.main__product'),
          parentId = parent.getAttribute('id'),
          productAmount = parent.querySelector('.main__product-num'),
          price = parent.querySelector('.main__product-price span'),
          kcall = parent.querySelector('.main__product-kcall span'),
          symbol = element.getAttribute('data-symbol')

          if(symbol == '+') {
              product[parentId].amount++;
          }else if (symbol ==  '-' && product[parentId].amount > 0 ) {
              product[parentId].amount--;
          }
          
        
productAmount.innerHTML = product[parentId].amount;
price.innerHTML = product[parentId].Sum;
kcall.innerHTML = product[parentId].Kcall;
}





const headerTimerExtra = document.querySelector('.header__timer-extra')


function timerLog(){
    if(headerTimerExtra.innerHTML == 99){
        headerTimerExtra.innerHTML = headerTimerExtra.innerHTML
    }else if(headerTimerExtra.innerHTML >= 50){
        setTimeout(() => {
            timerLog()
        },200);
    } else if(headerTimerExtra.innerHTML < 50){
        setTimeout(() => {
            timerLog()
    }, 70);
    }
    headerTimerExtra.innerHTML++
}
setTimeout(() => {
   timerLog()
}, 100);



const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');

checkExtraProduct.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        addExtraProduct(checkbox)
    })
})

function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
    parentId = parent.getAttribute('id'),
    elementAtrr = element.getAttribute('data-extra'),
    price = parent.querySelector('.main__product-price span'),
    kcall = parent.querySelector('.main__product-kcall span');

    // let check = element.checked 
    product[parentId][elementAtrr] = element.checked

  if(product[parentId][elementAtrr]) {
      product[parentId].price += extraProduct[elementAtrr].price 
      product[parentId].kcall += extraProduct[elementAtrr].kcall
  }else  {
      product[parentId].price -= extraProduct[elementAtrr].price
      product[parentId].kcall -= extraProduct[elementAtrr].kcall
  }
   price.innerHTML = product[parentId].Sum
   kcall.innerHTML = product[parentId].Kcall
}


const addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut  = document.querySelector('.receipt__window-out');

let arrProduct = []
totalPrice = 0,
totalKcall = 0,
totalName = '';
    
    addCart.addEventListener('click', function() {
        for(const key in product) {
            if(product[key].amount > 0) {
                arrProduct.push(product[key])
               for(const newKey in product[key]) {
                   if(product[key][newKey] === true) {
                       product[key].name += ' | ' + extraProduct[newKey].name
                   }
               }
            }
        }


        arrProduct.forEach(product => {
          totalPrice += product.price * product.amount;
          totalKcall += product.kcall * product.amount;
          totalName += product.name + '' + product.amount + 'шт. ';
        })

        receiptOut.innerHTML = `Вы купили: \n ${totalName} \n Каллорийность: ${totalKcall} \n Общая сумма: ${totalPrice}`
if(totalPrice == 0) {
    alert('Вы нечего не купили');
}else {
    receipt.style.display = 'flex';
    setTimeout(() => {
        receipt.style.opacity = '1';
    }, 200)
    setTimeout(() => {
        receiptWindow.style.top = '25%';
    }, 300)
    document.body.style.overflow = 'hidden';
}  
    })


    const receiptWindowBtn = document.querySelector('.receipt__window-btn');
    receiptWindowBtn.addEventListener('click', () => {
        location.reload();
    })

    const view = document.querySelector('.view'),
          viewImg = view.querySelector('img'),
          mainProductInfo = document.querySelectorAll('.main__product-info'),
          viewClose = document.querySelector('.view__close');

          mainProductInfo.forEach( item => {
              item.addEventListener('dblclick', () => {
                  let img = item.querySelector('img').getAttribute('src');
                  viewImg.setAttribute('src', img)
                  view.classList.add('active')
                
              })
             
          })
          viewClose.addEventListener('click', () => {
              view.classList.remove('active')
          })

    
    
    
   
         







