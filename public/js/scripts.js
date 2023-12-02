const clickMe = () => {
    $('#unitModal').modal('open');
};

function postUnit(unit){
    $.ajax({
        url:'/api/unit',
        type:'POST',
        data:unit,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('Succesfully added unit');
            }
        }
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.description = $('#description').val();
    formData.link = $('#link').val();
    postUnit(formData);
};

const addCards = (items) => {
    console.log('adding cards...', items)
    items.forEach(item => {
        let cardHtml = `
            <div class="col s12 m6">
                <div class="card darken-1 card-style">
                    <div class="card-content white-text">
                        <span class="card-title">${item.title}</span>
                        <span class="card-title">${item.subTitle}</span>
                        <p>${item.description}</p>
                    </div>
                    <div class="card-action">
                        <a href="${item.link}">Unit details</a>
                    </div>
                </div>
            </div>
        `;
        $("#card-section").append(cardHtml);
        console.log('card added', item)
    });
};


function getAllUnits(){
    $.get('/api/units', (response)=>{
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            console.log(response.data);
            addCards(response.data);
        }
    });
}


$(document).ready(function () {
    // $('.materialboxed').materialbox();
    $('#clickMeButton').click(() => {
        clickMe();
    })
    $('#formSubmit').click(() => {
        formSubmitted();
    });
    getAllUnits();
    $('.modal').modal();
});

