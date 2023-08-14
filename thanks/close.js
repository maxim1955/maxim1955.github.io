let closeButton2 = document.getElementById("closeButton2");

closeButton2.addEventListener('click', closeForm);

function closeForm() {
    // document.getElementById("fomPage").style.display = "none";
    document.getElementById("openButton").style.display = "block";
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}