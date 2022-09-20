
// these are all form elements
const form = document.forms['credit-card-form'];
const holdername = form['name'];
const number  = form['number'];
const month = form['MM'];
const year = form['YY'];
const cvc = form['cvc'];
// these are all card disp elements
const nameBox= document.getElementById('cc__name');
const cvvBox= document.getElementById('cc__cvv');
const ccnumBox= document.getElementById('cc__num');
const monBox= document.getElementById('cc__mon');
const yearBox= document.getElementById('cc__year');


// error boxes
const monError= document.getElementById('month-error');
const yearError = document.getElementById('year-error');
const cvcError = document.getElementById('cvc-error');
const nameError = document.getElementById('name-error');
const cardnoError= document.getElementById('num-error');

console.log(nameBox,holdername)




// function to update data in real time in card with some validation


// name change realtime
holdername.addEventListener('input', (e) => {
    if(holdername.value == '')
    nameBox.textContent="Rajesh Singh";
    else
    nameBox.textContent = holdername.value;
    showError('',holdername,nameError,show=false)
});


// number change real time
number.addEventListener('input', (e) => {
    if(number.value == '')
    ccnumBox.textContent="0000 0000 0000 0000";
    else{

        if(number.value.match(/[A-z]/g))
            showError("Wrong format, Number only",number,cardnoError);
        else
        {
            ccnumBox.textContent = number.value;
        number.value = number.value.replace(/\s/g, '').replace(/([0-9]{4})/g,'$1 ').trim();
        showError("Wrong format, Number only",number,cardnoError,show=false);
        }
    }
} )


// month change real time
month.addEventListener('input', (e) => {
if(month.value == '')
    monBox.textContent='12';
else{

    if(month.value.match(/[A-z]/g))
        showError("Wrong format, Number only",month,monError);
    else
    {
        monBox.textContent = month.value;
        showError("Wrong format, Number only",month,monError,show=false);
    }
}
});



// year change real time
year.addEventListener('input', (e) => {
    if(year.value == '')
        yearBox.textContent='12';
    else{
    
        if(year.value.match(/[A-z]/g))
            showError("Wrong format, Number only",year,yearError);
        else
        {
            yearBox.textContent = year.value;
            showError("Wrong format, Number only",year,yearError,show=false);
        }
    }
    });



    // cvc change real time
cvc.addEventListener('input', (e) => {
    if(cvc.value == '')
        cvvBox.textContent='12';
    else{
    
        if(cvc.value.match(/[A-z]/g))
            showError("Wrong format, Number only",cvc,cvcError);
        else
        {
            cvvBox.textContent = cvc.value;
            showError("Wrong format, Number only",cvc,cvcError,show=false);
        }
    }
    });






    // now final validation before submitting it

    form.addEventListener('submit', (e) =>{
        e.preventDefault();

        let namevalid = false;
        let numvalid = false;
        let monthvalid= false;
        let yearvalid = false;
        let cvcvalid = false;

        if(isempty(holdername))
        {
            namevalid=false;
            showError('required',holdername,nameError);
        }
        else{
            namevalid=true;
            showError('',holdername,nameError,false);
        }


        if(isempty(number))
        {
            numvalid=false;
            showError('required',number,cardnoError);
        }
        else{
            if(number.value.length < 19 || number.value.match(/[A-z]/g)){
                showError('invalid number',number,cardnoError);
                numvalid=false;
            }
            else{
                showError('',number,cardnoError,false);
                numvalid=true;
            }
        }



        if(isempty(month)){
            monthvalid=false;
            showError('required',month,monError);
        }
        else if(month.value < 0 || month.value > 12 || month.value.match(/[A-z]/g)){
            monthvalid=false;
            showError('invalid month',month,monError);
        }
        else{
            showError('invalid month',month,monError,show=false);
            monthvalid=true;
        }




        if(isempty(year)){
            yearvalid=false;
            showError('required',year,yearError);
        }
        else if(year.value < 22 || year.value > 50 || year.value.match(/[A-z]/g)){
            yearvalid=false;
            showError('invalid year',year,yearError);
        }
        else{
            showError('invalid year',month,monError,show=false);
            yearvalid=true;
        }




        if(isempty(cvc)){
            showError("required",cvc,cvcError);
        }
        else if(cvc.value.length < 3 || cvc.value.match(/[A-z]/g)){
            showError('invalid cvc',cvc,cvcError);
            cvcvalid=false;
        }
        else{
            showError('invalid cvc',cvc,cvcError,show = false);
            cvcvalid=true;
        }



        // final step

        console.log(namevalid,numvalid,monthvalid,yearvalid,cvcvalid)
        if(namevalid && numvalid && monthvalid && yearvalid && cvcvalid){

            form.style.display = "none";
            document.getElementById('complete').style.display = "flex";
        }

    },false);



// continue button in last after form completion
    document.getElementById('continue-btn').addEventListener('click',(e) =>{
        form.reset();
        form.style.display = "flex";
            document.getElementById('complete').style.display = "none";
    })



    function isempty(element){
        if(element.value=='')
            return true;
        else false;
    }








    // show error
function showError(error,errorinput,errordiv,show=true){
    if(show)
    {
        errordiv.textContent=error;
        errorinput.style.borderColor="hsl(0, 100%, 66%)";

    }
    else{
        errordiv.textContent='';
        errorinput.style.borderColor="hsl(270, 3%, 87%)";
    }

}