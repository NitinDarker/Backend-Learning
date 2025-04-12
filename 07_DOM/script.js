
function calculateSum() {
    const a = document.getElementById("firstNum").value;
    const b = document.getElementById("secondNum").value;
    let sum = a + b;
    const finalSum = document.getElementById("answer");
    finalSum.innerHTML = sum;
    console.log(sum);
}