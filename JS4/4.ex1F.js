const t = document.querySelector("h1");

const s = document.querySelector("span");
const v = document.querySelector("body");

function thefunction(func,a,b,n) {
    console.log('function = ',func );
    console.log('first variable a=',a);
    console.log('second variable b=',b);
    console.log('number of samples=',n);
    const k = (b-a)/(n-1);
    const v = document.querySelector("body");
    const newf = document.createElement("h1");
    newf.textContent = (func)
    v.appendChild(newf)
    const d = document.createElement("div");
    d.textContent =(`${n} samples on [${a},${b}]:`);
    v.appendChild(d)
    const pa = document.createElement("p")
    pa.textContent =(`Values : [`)
    for(let l=a; l<=b; l=l+k){
        console.log(func(l));
        pa.textContent += (` ${func(l)};`);
      }
      pa.textContent += (`]`)
      v.appendChild(pa);
    
}
console.log( thefunction( x=>x*x, -2, 2, 9 ) );
console.log( thefunction( x =>Math.sqrt(x), 0, 2, 5 ) );