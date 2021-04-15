const t = document.querySelector("h1");
const d = document.querySelector("div");
const s = document.querySelector("span");
const v = ''

function thefunction(func,a,b,n) {
    console.log('function = ',func );
    console.log('first variable a=',a);
    console.log('second variable b=',b);
    console.log('number of samples=',n);
    const k = (b-a)/(n-1)
    t.textContent +=(func);
    d.textContent +=(`${n} samples on [${a},${b}]`);
    for(let l=a; l<=b; l=l+k){
        console.log(func(l));
        s.textContent+=(func(l));
      }
}

console.log( thefunction(x=> x*x, -2, 2, 9 ) );
console.log( thefunction( x =>Math.sqrt(x), 0, 2, 5 ) );


